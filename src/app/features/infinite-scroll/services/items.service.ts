
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Define an interface for our mock item
export interface Item {
  id: number;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private allItems: Item[] = [];
  // Simulate a backend with 100 items
  private readonly TOTAL_ITEMS = 100;

  constructor() {
    this.generateMockItems();
  }

  /** Generates a predefined number of mock items. */
  private generateMockItems(): void {
    for (let i = 1; i <= this.TOTAL_ITEMS; i++) {
      this.allItems.push({
        id: i,
        title: `Item Number ${i}`,
        description: `This is the description for item number ${i}.`
      });
    }
  }

  /**
   * Simulates fetching items with pagination.
   * @param offset The starting index for fetching items.
   * @param limit The maximum number of items to return.
   * @returns An Observable of an array of Item objects.
   */
  getItems(offset: number, limit: number): Observable<Item[]> {
    const startIndex = offset;
    const endIndex = offset + limit;

    // Simulate network delay
    const mockDelayMs = 700;

    const itemsToReturn = this.allItems.slice(startIndex, endIndex);

    // Return an Observable to simulate an asynchronous API call
    return of(itemsToReturn).pipe(delay(mockDelayMs));
  }


  /** Returns the total number of mock items available. */
  getTotalItemsCount(): number {
    return this.TOTAL_ITEMS;
  }
}