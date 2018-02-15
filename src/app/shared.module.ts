import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatListModule
} from '@angular/material';

const modules = [
  CommonModule,
  FormsModule,
  RouterModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatListModule
];

export function getArrayFromObject(obj) {
  return Object.keys(obj).map(key => obj[key]);
}

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class SharedModule {}
