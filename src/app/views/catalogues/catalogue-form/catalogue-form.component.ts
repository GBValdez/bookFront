import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { catalogueModal } from '@interfaces/commons.interface';
import { CatalogueService } from '@services/catalogue.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalogue-form',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  templateUrl: './catalogue-form.component.html',
  styleUrl: './catalogue-form.component.scss',
})
export class CatalogueFormComponent implements OnInit {
  dataCatalogue!: catalogueModal;
  form: FormGroup = this.fb.group({
    name: [''],
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: catalogueModal,
    private fb: FormBuilder,
    private catalogueSvc: CatalogueService,
    private dialogRef: MatDialogRef<CatalogueFormComponent>
  ) {}
  ngOnInit(): void {
    this.dataCatalogue = this.data;
    if (this.dataCatalogue.catalogue) {
      this.form.patchValue({ name: this.dataCatalogue.catalogue.name });
    }
  }
  cleanForm() {
    this.form.patchValue({ name: '' });
  }
  async onSubmit() {
    if (this.form.valid) {
      const result = Swal.fire({
        title: '¿Quieres guardar los cambios?',
        showCancelButton: true,
        confirmButtonText: `Guardar`,
        icon: 'question',
      });
      if ((await result).isConfirmed) {
        if (this.dataCatalogue.catalogue) {
          this.catalogueSvc
            .update(
              this.dataCatalogue.catalogue.id!,
              this.dataCatalogue.typeCatalogue,
              this.form.value
            )
            .subscribe((res) => {
              this.closeDialog();
            });
        } else {
          this.catalogueSvc
            .create(this.form.value, this.dataCatalogue.typeCatalogue)
            .subscribe((res) => {
              this.closeDialog();
            });
        }
      }
    }
  }

  async closeDialog() {
    await Swal.fire({
      title: 'La operación se realizo con éxito',
      icon: 'success',
      confirmButtonText: `Aceptar`,
    });
    this.dialogRef.close({
      modify: true,
    });
  }
}
