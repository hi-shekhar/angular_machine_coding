import {
  Component,
  signal,
  WritableSignal,
  OnDestroy,
  effect,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stop-watch',
  imports: [RouterLink],
  templateUrl: './stop-watch.component.html',
  styleUrl: './stop-watch.component.scss',
})
export class StopWatchComponent implements OnDestroy {
  // A signal to hold the current time
  time: WritableSignal<number> = signal(0);
  // A signal to control the running state
  running: WritableSignal<boolean> = signal(false);

  // A local variable to hold the interval ID
  private intervalId: any;

  constructor() {
    // An effect that runs whenever the 'running' signal changes
    effect(() => {
      const isRunning = this.running();

      if (isRunning) {
        // Start the interval.
        this.intervalId = setInterval(() => {
          this.time.update((prevTime) => prevTime + 10);
        }, 10);
      } else if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    });
  }

  // Function to format the time (e.g., 00:00:00)
  formatTime(milliseconds: number) {
    const minutes = Math.floor((milliseconds / 60000) % 60);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const ms = Math.floor((milliseconds % 1000) / 10);
    // MM:SS:ms format.
    return (
      (minutes < 10 ? '0' : '') +
      minutes +
      ':' +
      (seconds < 10 ? '0' : '') +
      seconds +
      ':' +
      (ms < 10 ? '0' : '') +
      ms
    );
  }

  handleStart() {
    this.running.set(true);
  }

  handlePause() {
    this.running.set(false);
  }

  handleReset() {
    this.running.set(false);
    this.time.set(0);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
