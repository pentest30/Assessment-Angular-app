import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration-add/registration.component';
import { SharedModule } from '../shared/shared.module';
import { RegistrationRoutingModule } from './registration-routing.module';
import { MAT_DATE_LOCALE } from '@angular/material';


@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
  
    RegistrationRoutingModule,
    SharedModule
  ], exports : [RegistrationComponent],providers: [{ provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }]
})
export class RegistrationModule { }
