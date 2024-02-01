import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  forwardRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input-autocomplete',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input-autocomplete.component.html',
  styleUrl: './input-autocomplete.component.scss',
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => InputAutocompleteComponent),
  //     multi: true,
  //   },
  // ],
})
export class InputAutocompleteComponent
  implements OnInit, ControlValueAccessor
{
  constructor(
    private fb: FormBuilder,
    @Optional() @Self() private ngControl: NgControl
  ) {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  form = new FormControl();

  showErrors() {
    console.log(this.form.errors);
  }
  onTouch?: Function;
  onWrite?: Function;

  writeValue(values: string): void {
    this.form.patchValue(values);
  }
  registerOnChange(fn: any): void {
    this.onWrite = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}

  ngOnInit(): void {
    if (this.ngControl?.control)
      this.form.setValidators(this.ngControl.control.validator!);
    this.form.updateValueAndValidity();
  }

  currentValue: string = '';
  @Input() options: string[] = [];
  @Output() noExistOptionEvent: EventEmitter<string> = new EventEmitter();
  optionsFilter: string[] = [];
  filter(event: FocusEvent | Event): void {
    setTimeout(() => {
      const value = (event.target as HTMLInputElement).value;
      this.currentValue = value;
      const opt: string | undefined = this.options.find(
        (opt) => opt.toLowerCase() === value.toLowerCase()
      );
      if (opt) {
        this.onWrite?.(opt);
      } else {
        this.onWrite?.('');
        this.optionsFilter = this.options.filter((opt) =>
          opt.toLowerCase().includes(value.toLowerCase())
        );
      }
    }, 10);
  }

  selectOption(option: string): void {
    setTimeout(() => {
      this.onWrite?.(option);
      this.currentValue = option;
    }, 10);
    // this.optionsFilter = [];
  }
  noExistOption() {
    setTimeout(async () => {
      if (this.currentValue.trim().length == 0) return;
      const opt: string | undefined = this.options.find(
        (option) => option.toLowerCase() == this.currentValue.toLowerCase()
      );
      console.log(opt, this.currentValue);
      if (!opt) this.noExistOptionEvent.emit(this.currentValue);
      else {
        this.onWrite?.(opt);
        this.form.patchValue(opt);
        // setTimeout(() => {
        // }, 10);
      }
      this.onTouch?.();
    }, 150);
  }
  show(a: string) {
    console.log('showing ' + a);
  }
}
