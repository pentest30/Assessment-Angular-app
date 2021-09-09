import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SutdentListComponent } from './sutdent-list/sutdent-list.component';
import { SutdentsRoutingModule } from './student.routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [SutdentListComponent],
  imports: [
    CommonModule,
     SutdentsRoutingModule,
     SharedModule
  ],exports: [SutdentListComponent],
})
export class StudentsModule { }
