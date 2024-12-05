import { AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';

export function getErrorMessage(control: AbstractControl | null, fieldName: string): string | null {
  if (!control || !control.errors || !control.touched) return null;

  if (control.errors['required']) {
    return `${fieldName} is required.`;
  }
  if (control.errors['email']) {
    return `Invalid ${fieldName.toLowerCase()} format.`;
  }
  if (control.errors['minlength']) {
    const requiredLength = control.errors['minlength'].requiredLength;
    return `${fieldName} must be at least ${requiredLength} characters long.`;
  }
  return null;
}

