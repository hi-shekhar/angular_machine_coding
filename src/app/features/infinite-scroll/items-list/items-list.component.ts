import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  ViewChild,
  signal,
  AfterViewInit,
  DestroyRef 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ItemsService, Item } from '../services/items.service'; 
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, filter } from 'rxjs/operators'; 

@Component({
  selector: 'app-items-list',
  imports: [CommonModule, ScrollingModule],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsListComponent implements OnInit, AfterViewInit {
  private itemsService = inject(ItemsService);
  private destroyRef = inject(DestroyRef);

  @ViewChild(CdkVirtualScrollViewport)
  viewport!: CdkVirtualScrollViewport;

  items = signal<Item[]>([]);
  isLoading = signal<boolean>(false);
  hasMoreData = signal<boolean>(true);
  offset = signal<number>(0);
  pageSize = 10;
  totalItemsCount = 0;

  constructor() {
    this.totalItemsCount = this.itemsService.getTotalItemsCount();
  }

  ngOnInit(): void {
    this.loadItems();
  }

  ngAfterViewInit(): void {
    if (!this.viewport) {
      console.warn('CdkVirtualScrollViewport not found. So, scroll events will not be monitored.');
      return;
    }

    this.viewport.scrolledIndexChange.pipe(
      debounceTime(100),
      filter(() => !this.isLoading() && this.hasMoreData() && !!this.viewport),
      takeUntilDestroyed(this.destroyRef) 
    ).subscribe((index: number) => {
      const loadedItemsCount = this.items().length;
      const totalItemsInBackend = this.totalItemsCount;

      const loadThreshold = loadedItemsCount - this.pageSize;

      if (loadedItemsCount >= totalItemsInBackend) {
        this.hasMoreData.set(false);
        return;
      }
      // Index is what the user is currently looking at.
      // loadThreshold is where you want to start loading more data.
      // When the user is looking at an item that is part of the last pageSize 
      // items currently loaded, start loading the next page.
      if (index >= loadThreshold) {
        console.log(`Loading more... Scrolled index: ${index}, Loaded count: ${loadedItemsCount}, Threshold: ${loadThreshold}`);
        this.loadMoreItems();
      }
    });
  }

  /**
   * Loads the initial set of items or appends new items.
   */
  loadItems(): void {
    if (this.isLoading() || !this.hasMoreData()) {
      return;
    }

    this.isLoading.set(true);

    this.itemsService.getItems(this.offset(), this.pageSize)
      .subscribe({
        next: (newItems: Item[]) => {
          if (newItems.length > 0) {
            this.items.update(currentItems => [...currentItems, ...newItems]);
            this.offset.update(currentOffset => currentOffset + newItems.length);
            this.hasMoreData.set(this.items().length < this.totalItemsCount);
          } else {
            this.hasMoreData.set(false);
          }
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error loading items:', err);
          this.isLoading.set(false);
        }
      });
  }

  /**
   * Triggers loading of the next batch of items.
   */
  loadMoreItems(): void {
    this.loadItems();
  }

  trackByItemId(index: number, item: Item): number {
    return item.id;
  }
}