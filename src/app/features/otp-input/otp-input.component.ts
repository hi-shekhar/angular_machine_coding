import {
    Component,
    Input,
    Output,
    EventEmitter,
    signal,
    OnInit,
    ViewChildren,
    QueryList,
    ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-otp-input',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink
    ],
    templateUrl: './otp-input.component.html',
    styleUrls: ['./otp-input.component.scss']
})
export class OtpInputComponent implements OnInit {

    @Input() otpLength: number = 6;
    @Output() otpCompleted = new EventEmitter<string>();


    otpDigits = signal<string[]>([]);

    @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

    isOtpValid = signal(false);
    enteredOtp = signal('');

    ngOnInit(): void {
        this.otpDigits.set(new Array(this.otpLength).fill(''));
    }

    private findFirstEmptyInputIndex(): number {
        return this.otpDigits().findIndex(digit => digit === '');
    }

    handleInput(event: Event, index: number): void {
        const input = event.target as HTMLInputElement;
        let value = input.value;

        const firstEmptyIndex = this.findFirstEmptyInputIndex();

        if (index > firstEmptyIndex && firstEmptyIndex !== -1) {
            // Clear the value that was just typed in the wrong place (if any)
            input.value = this.otpDigits()[index];
            this.otpInputs.get(firstEmptyIndex)?.nativeElement.focus();
            event.preventDefault();
            return;
        }

        // Filter out non-numeric characters and ensure only one digit
        value = value.replace(/[^0-9]/g, '');
        if (value.length > 1) {
            // Take only one character.
            value = value.charAt(0);
        }

        // Update the signal with the cleaned value
        this.otpDigits.update(digits => {
            const newDigits = [...digits];
            newDigits[index] = value;
            return newDigits;
        });

        // If a digit was entered and it's not the last field, auto-advance focus
        if (value !== '' && index < this.otpLength - 1) {
            this.otpInputs.get(index + 1)?.nativeElement.focus();
        }

        this.checkOtpCompletion();
    }

    handleKeyDown(event: KeyboardEvent, index: number): void {
        const input = event.target as HTMLInputElement;

        switch (event.key) {
            case 'Backspace':
                // If current field is empty, move focus to previous field
                if (input.value === '' && index > 0) {
                    this.otpInputs.get(index - 1)?.nativeElement.focus();
                }
                break;

            case 'ArrowLeft':
                if (index > 0) {
                    this.otpInputs.get(index - 1)?.nativeElement.focus();
                }
                break;

            case 'ArrowRight':
                if (index < this.otpLength - 1) {
                    this.otpInputs.get(index + 1)?.nativeElement.focus();
                }
                break;

            default:
                const isDigit = /^[0-9]$/.test(event.key);
                const isControlKey = event.key.length > 1 || event.ctrlKey || event.metaKey;

                // Block non-digits and non-control keys
                if (!isDigit && !isControlKey) {
                    event.preventDefault();
                }
                break;
        }
    }

    handlePaste(event: ClipboardEvent, startIndex: number): void {
        event.preventDefault();

        const pasteData = event.clipboardData?.getData('text/plain');
        if (pasteData) {
            // Filter non-numeric characters
            const digitsToPaste = pasteData.replace(/[^0-9]/g, '');
            this.otpDigits.update(digits => {
                const newDigits = [...digits];
                for (let i = 0; i < this.otpLength; i++) {
                    if (startIndex + i < this.otpLength && i < digitsToPaste.length) {
                        newDigits[startIndex + i] = digitsToPaste.charAt(i);
                    }
                }
                return newDigits;
            });

            // Auto-focus the next relevant field or the last one if filled
            const lastPastedIndex = startIndex + digitsToPaste.length - 1;
            const focusIndex = Math.min(lastPastedIndex + 1, this.otpLength - 1);
            this.otpInputs.get(focusIndex)?.nativeElement.focus();

            this.checkOtpCompletion();
        }
    }

    private checkOtpCompletion(): void {
        const fullOtp = this.otpDigits().join('');
        if (fullOtp.length === this.otpLength && /^\d+$/.test(fullOtp)) {
            this.isOtpValid.set(true);
            this.enteredOtp.set(fullOtp);
            this.otpCompleted.emit(fullOtp);
        } else {
            this.isOtpValid.set(false);
            this.enteredOtp.set('');
        }
    }

    clearOtp(): void {
        this.otpDigits.set(new Array(this.otpLength).fill(''));
        this.isOtpValid.set(false);
        this.enteredOtp.set('');
        this.otpInputs.first?.nativeElement.focus();
    }
}