import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: MyInputComponent, multi: true },
  ],
})
export class MyInputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'number' | 'password' = 'text';
  @Input() label: string = '';
  @Input() value: string | number = '';

  public labelFocused = false;
  onChange!: (value: string | number) => void;
  onTouched!: () => void;

  setValue(newValue: string) {
    this.value = this.type == 'number' ? parseFloat(newValue) : newValue;
    this.onChange(newValue);
    this.onTouched();
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
}
