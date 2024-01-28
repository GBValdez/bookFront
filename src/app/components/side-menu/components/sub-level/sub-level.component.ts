import { Component, Input, OnInit } from '@angular/core';
import { clickType, sideMenuInterface } from '../../side-menu.interface';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sub-level',
  templateUrl: './sub-level.component.html',
  styleUrls: ['./sub-level.component.css'],
})
export class SubLevelComponent implements OnInit {
  @Input() buttons: sideMenuInterface[] = [];
  @Input() showElementsObs!: Observable<boolean>;
  @Input() collapseObs!: Observable<boolean>;
  @Input() level: number = 0;
  showElements!: boolean;
  collapse!: boolean;
  buttonOpenedChildren?: sideMenuInterface;
  hideButton(button: sideMenuInterface): boolean {
    if (button.child && button.show === undefined) {
      return button.child.some((child) => this.hideButton(child));
    }
    return button.show ?? false;
  }

  click(button: sideMenuInterface, click?: clickType) {
    if (click)
      if (typeof click == 'string') {
        this.route.navigate([click]);
      } else {
        click();
      }
    if (button.child) {
      if (!button.openChild) {
        if (this.buttonOpenedChildren) {
          this.buttonOpenedChildren.openChild = false;
        }
        this.buttonOpenedChildren = button;
        button.openChild = true;
      } else {
        this.buttonOpenedChildren = undefined;
        button.openChild = false;
      }
    }
  }
  constructor(private route: Router) {}

  getChild(button: sideMenuInterface): sideMenuInterface[] {
    return button.child || [];
  }

  getPaddingLeft(): string {
    return `${this.level + 1 * 20}px`;
  }
  ngOnInit(): void {
    this.showElementsObs.subscribe((show) => {
      this.showElements = show;
    });
    this.collapseObs.subscribe((collapse) => {
      this.collapse = collapse;
    });
    this.buttons.forEach((button) => {
      if (button.child) {
        button.openChild = false;
      }
    });
  }
}
