import {
  Component,
  signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  /** Default total stars  */
  totalStars = signal(5);
  readOnly = signal(false);

  /** Array to generate star elements  */
  stars = signal<number[]>([]);
  /** Holds the selected rating  */
  currentRating = signal<number>(0);
  /** Holds the rating under hover */
  hoverRating = signal<number>(0);

  constructor() {
    effect(() => {
      let newTotal = this.totalStars();

      if (typeof newTotal !== 'number' || isNaN(newTotal) || newTotal < 1) {
        newTotal = 1;
      }
      newTotal = Math.max(1, Math.min(10, newTotal));

      this.stars.set(Array(newTotal).fill(0).map((_, i) => i + 1));
      if (this.currentRating() > newTotal) {
        this.currentRating.set(newTotal);
      }
      this.hoverRating.set(0);
    });
  }

  isStarFilled(starValue: number): boolean {
    const displayRating = this.hoverRating() > 0 ? this.hoverRating() : this.currentRating();
    return starValue <= displayRating;
  }

  selectRating(starValue: number) {
    if (this.readOnly()) return;
    this.currentRating.set(starValue);
    this.hoverRating.set(0);
  }

  clearRating(): void {
    this.currentRating.set(0);
    this.hoverRating.set(0);
  }

  onStarHover(starValue: number) {
    if (this.readOnly()) return;
    this.hoverRating.set(starValue);
  }

  onMouseLeave() {
    if (this.readOnly()) return;
    this.hoverRating.set(0);
  }
}