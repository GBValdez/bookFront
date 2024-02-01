import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { InputAutocompleteComponent } from '@components/input-autocomplete/input-autocomplete.component';
import { catalogueInterface } from '@interfaces/commons.interface';

@Component({
  selector: 'app-list-maker-list',
  standalone: true,
  imports: [InputAutocompleteComponent, MatCardModule, MatIconModule],
  templateUrl: './list-maker-list.component.html',
  styleUrl: './list-maker-list.component.scss',
})
export class ListMakerListComponent implements ControlValueAccessor {
  onTouch?: Function;
  onWrite?: Function;

  writeValue(obj: catalogueInterface[]): void {
    if (obj) {
      this.itemsSelected = obj;
      this.onWrite?.(this.itemsSelected.map((el) => el.id));
    }
  }
  registerOnChange(fn: any): void {
    this.onWrite = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
  @Output() foundingEvent: EventEmitter<string> = new EventEmitter();
  @Input() listOpt: catalogueInterface[] = [];
  founding(value: string): void {
    this.foundingEvent.emit(value);
  }
  itemsSelected: catalogueInterface[] = [];
  removeItem(item: catalogueInterface): void {
    this.itemsSelected = this.itemsSelected.filter((el) => el.id !== item.id);
    this.onWrite?.(this.itemsSelected.map((el) => el.id));
  }

  addItems(item: catalogueInterface): void {
    console.log(item);
    this.itemsSelected.push(item);
    this.onWrite?.(this.itemsSelected.map((el) => el.id));
  }
}
