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
  allowHalfStars = signal(false);

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
    // A star is fully filled if its value is less than or equal to the display rating,
    // AND it's not the half-filled part of a star.
    return starValue <= displayRating && (starValue - 0.5 !== displayRating);
  }

  isStarHalfFilled(starValue: number): boolean {
    if (!this.allowHalfStars()) return false;

    const displayRating = this.hoverRating() > 0 ? this.hoverRating() : this.currentRating();
    return starValue - 0.5 === displayRating;
  }

  selectRating(starValue: number) {
    if (this.readOnly()) return;
    let newRating = 0;
    if (this.allowHalfStars()) {
      // If clicking a half-star (based on hover state or direct click position)
      if (this.hoverRating() === starValue - 0.5 && this.currentRating() !== starValue - 0.5) {
        newRating = starValue - 0.5;
      }
      // If clicking the same full star, toggle off (like 5 stars then click 5 again => 0 stars)
      else if (this.hoverRating() === starValue && this.currentRating() === starValue) {
        newRating = 0;
      }
      else {
        // Otherwise, set to full star
        newRating = starValue;
      }
    } else {
      // If half stars not allowed, just toggle full star
      newRating = (this.currentRating() === starValue) ? 0 : starValue;
    }

    this.currentRating.set(newRating);
    this.hoverRating.set(0);
  }

  clearRating(): void {
    this.currentRating.set(0);
    this.hoverRating.set(0);
  }

  onStarHover(starValue: number, event: MouseEvent) {
    if (this.readOnly()) return;
    if (this.allowHalfStars()) {
      // Get the specific star element
      const starElement = event.target as HTMLElement;
      // Get its position and size
      const rect = starElement.getBoundingClientRect();
      // X position of mouse relative to star's left edge
      const x = event.clientX - rect.left;
      const width = rect.width;

      if (x < width / 2) {
        // If mouse is on left half, set half-star
        this.hoverRating.set(starValue - 0.5);
      } else {
        // If mouse is on right half, set full star
        this.hoverRating.set(starValue);
      }
    } else {
      this.hoverRating.set(starValue);
    }
  }

  onMouseLeave() {
    if (this.readOnly()) return;
    this.hoverRating.set(0);
  }
}