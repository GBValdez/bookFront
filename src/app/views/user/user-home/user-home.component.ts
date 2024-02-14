import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { catalogueInterface } from '@interfaces/commons.interface';
import { UserDto, userQueryFilter } from '@interfaces/user.interface';
import { RolService } from '@services/rol.service';
import { UserAdminService } from '@services/user-admin.service';
import { formIsEmptyValidator } from '@utilsFunctions/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    DatePipe,
    RouterModule,
    MatSelectModule,
  ],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss',
})
export class UserHomeComponent implements OnInit {
  constructor(
    private userAdminSvc: UserAdminService,
    private fb: FormBuilder,
    private rolSvc: RolService
  ) {}
  ngOnInit(): void {
    this.getUser(1, 10);
    this.rolSvc.getRoles(1, 1, true).subscribe((res) => {
      console.log('amor', res);
      this.rolesOpt = res.items;
    });
  }
  rolesOpt: catalogueInterface[] = [];
  form: FormGroup = this.fb.group(
    {
      UserNameCont: [''],
      EmailCont: [''],
      roles: [''],
      isActive: [null],
    },
    {
      validators: formIsEmptyValidator(),
    }
  );
  users: UserDto[] = [];
  sizeUsers: number = 0;
  indexPage: number = 0;
  pageSize: number = 10;

  getUser(page: number, pageSize: number, filter?: userQueryFilter) {
    this.userAdminSvc.getUsers(pageSize, page, filter).subscribe((res) => {
      this.users = res.items;
      this.sizeUsers = res.total;
    });
  }

  changePagination(event: PageEvent) {
    this.indexPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getUser(event.pageIndex + 1, event.pageSize);
  }
  search() {
    if (this.form.valid) this.getUser(1, 10, this.form.value);
  }
  cleanFilter() {
    this.form.patchValue({
      UserNameCont: '',
      EmailCont: '',
      roles: [],
      isActive: null,
    });
    this.getUser(1, 10);
  }
}
