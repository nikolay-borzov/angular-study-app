import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import * as directivesMap from '../app/directives';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
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
const directives = [...getArrayFromObject(directivesMap)];

@NgModule({
  imports: [...modules],
  declarations: [...pipes, ...directives],
  exports: [...modules, ...pipes, ...directives]
})
export class SharedModule {}
