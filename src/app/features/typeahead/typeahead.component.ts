import { Component, signal, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { countries } from './data';

@Component({
  selector: 'app-typeahead',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './typeahead.component.html',
  styleUrl: './typeahead.component.scss'
})
export class TypeaheadComponent {
  @Input() staticData: string[] = countries;

  @Output()
  suggestionSelected = new EventEmitter<string>();

  inputValue = signal<string>('');

  filteredSuggestions = signal<string[]>([]);

  isDropdownOpen = signal<boolean>(false);

  highlightedIndex = signal<number>(-1)

  constructor() { }

  onInputChange(): void {
    const currentInput = this.inputValue();
    if (currentInput.length > 0) {
      this.isDropdownOpen.set(true);
      this.filteredSuggestions.set(
        this.staticData.filter(item =>
          item.toLowerCase().includes(currentInput.toLowerCase())
        )
      );
    } else {
      this.isDropdownOpen.set(false);
      this.filteredSuggestions.set([]);
    }
  }

  selectSuggestion(suggestion: string): void {
    this.inputValue.set(suggestion);
    this.isDropdownOpen.set(false);
    this.suggestionSelected.emit(suggestion);
  }

  onKeyDown(event: KeyboardEvent): void {
    const totalSuggestions = this.filteredSuggestions().length;

    if (totalSuggestions === 0 && !this.inputValue()) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.highlightedIndex.update(index => (index + 1) % totalSuggestions);
        this.isDropdownOpen.set(true);
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.highlightedIndex.update(index => (index - 1 + totalSuggestions) % totalSuggestions);
        this.isDropdownOpen.set(true);
        break;

      case 'Enter':
        event.preventDefault(); 
        const highlighted = this.highlightedIndex();
        if (highlighted !== -1 && this.filteredSuggestions()[highlighted]) {
          this.selectSuggestion(this.filteredSuggestions()[highlighted]);
        } else {
          this.isDropdownOpen.set(false);
        }
        break;

      case 'Escape':
        this.isDropdownOpen.set(false);
        this.highlightedIndex.set(-1);
        break;

      default:
        if (!this.isDropdownOpen() && this.inputValue().length > 0) {
          this.isDropdownOpen.set(true);
        }
        break;
    }
  }

  onInputFocus(): void {
    if (this.inputValue().length > 0) {
      this.onInputChange();
    }
  }
}
