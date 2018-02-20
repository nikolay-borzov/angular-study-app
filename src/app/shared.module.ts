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
  MatListModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatDialogModule
} from '@angular/material';

import * as pipesMap from '../app/pipes';

const modules = [
  CommonModule,
  FormsModule,
  RouterModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatDialogModule
];

export function getArrayFromObject(obj) {
  return Object.keys(obj).map(key => obj[key]);
}

const pipes = [...getArrayFromObject(pipesMap)];

@NgModule({
  imports: [...modules],
  declarations: [...pipes],
  exports: [...modules, ...pipes]
})
export class SharedModule {}
