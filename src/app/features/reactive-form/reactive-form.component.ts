import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

// Custom validator for email match
export function emailMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const email = control.get('email');
  const confirmEmail = control.get('confirmEmail');
  return email && confirmEmail && email.value !== confirmEmail.value
    ? { emailMismatch: true }
    : null;
}

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss',
})
export class ReactiveFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  profileForm!: FormGroup;
  addressFormGroup!: FormGroup;

  ngOnInit(): void {
    this.profileForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', [Validators.required, Validators.maxLength(20)]],
        address: this.fb.group({
          street: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          zip: [
            '',
            [Validators.required, Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/)],
          ],
        }),
        isProfessional: [false],
        jobTitle: [''],
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
        phones: this.fb.array([this.creadPhoneControl()]),
      },
      {
        validators: [emailMatchValidator],
      }
    );

    this.addressFormGroup = this.profileForm.get('address') as FormGroup;

    // Use valueChanges to apply conditional validation
    this.profileForm.get('isProfessional')?.valueChanges.subscribe((value) => {
      const jobTitleControl = this.profileForm.get('jobTitle');
      if (value) {
        jobTitleControl?.setValidators(Validators.required);
      } else {
        jobTitleControl?.clearValidators();
      }
      jobTitleControl?.updateValueAndValidity();
    });
  }

  get phoneArray(): FormArray {
    return this.profileForm.get('phones') as FormArray;
  }

  addPhone(): void {
    this.phoneArray.push(this.creadPhoneControl());
  }

  removePhone(index: number): void {
    this.phoneArray.removeAt(index);
  }

  creadPhoneControl(): FormGroup {
    return this.fb.group({
      number: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      type: ['home', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log('Form submitted:', this.profileForm.value);
    } else {
      console.log('Form is invalid.');
      this.profileForm.markAllAsTouched();
    }
  }

  onReset() {
    this.profileForm.reset();
  }

  onLoad() {
    const sampleData = {
      firstName: 'Himanshu',
      lastName: 'Shekhar',
      address: {
        street: '123 Angular Street',
        city: 'Reactive City',
        state: 'CA',
        zip: '90210',
      },
      isProfessional: true,
      jobTitle: 'Frontend Developer',
      email: 'him.shek@example.com',
      confirmEmail: 'him.shek@example.com',
      phones: [
        { number: '1234567890', type: 'home' },
        { number: '0987654321', type: 'work' },
      ],
    };
    this.profileForm.patchValue(sampleData);
  }
}
