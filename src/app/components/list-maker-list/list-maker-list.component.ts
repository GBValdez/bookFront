import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-maker-list',
  standalone: true,
  imports: [],
  templateUrl: './list-maker-list.component.html',
  styleUrl: './list-maker-list.component.scss',
})
export class ListMakerListComponent {
  @Input() list: any[] = [];
}
