import {
  Component,
  forwardRef,
  Input,
  QueryList,
  ViewChildren,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-otp-input',
  templateUrl: './totp.component.html',
  styleUrl: './totp.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OtpInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => OtpInputComponent),
      multi: true,
    },
  ],
})
export class OtpInputComponent
  implements ControlValueAccessor, Validator, AfterViewInit
{
  @Input() length = 4;

  @ViewChildren('otpInput') inputs!: QueryList<ElementRef>;

  digits: string[] = Array(this.length).fill('');
  disabled = false;

  onChange = (value: string) => {};
  onTouched = () => {};

  ngAfterViewInit(): void {
    this.focusInput(0);
  }

  writeValue(value: string): void {
    this.digits = value
      ? value.split('').slice(0, this.length)
      : Array(this.length).fill('');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const otp = this.digits.join('');
    if (!otp || otp.length !== this.length || !/^[0-9]+$/.test(otp)) {
      return { otpInvalid: true };
    }
    return null;
  }

  onInput(event: Event, index: number): void {
    const input = (event.target as HTMLInputElement).value;
    if (!/^[0-9]?$/.test(input)) return;
    this.digits[index] = input;
    this.propagate();

    if (input && index < this.length - 1) {
      this.focusInput(index + 1);
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.digits[index] && index > 0) {
      this.focusInput(index - 1);
    }
  }

  private propagate(): void {
    this.onChange(this.digits.join(''));
    this.onTouched();
  }

  private focusInput(index: number): void {
    const inputEl = this.inputs.toArray()[index]
      ?.nativeElement as HTMLInputElement;
    if (inputEl) inputEl.focus();
  }
}
