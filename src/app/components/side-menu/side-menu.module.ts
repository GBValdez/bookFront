import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { SubLevelComponent } from './components/sub-level/sub-level.component';

@NgModule({
  declarations: [SideMenuComponent, SubLevelComponent],
  imports: [CommonModule, MatIconModule, RouterModule, MatMenuModule],
  exports: [SideMenuComponent],
})
export class SideMenuModule {}
