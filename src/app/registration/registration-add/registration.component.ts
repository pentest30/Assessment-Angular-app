import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material';
import { Router } from '@angular/router';
import { SchoolYearsService } from 'src/app/core/services/school-years.service';
import { SpecialityService } from 'src/app/core/services/speciality.service';
import { StudentService } from 'src/app/core/services/student.service';
import { NotificationHelper } from 'src/app/shared/messages-notfi/notif-helper';
import { Student } from '../models/student';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public firstName: string;
  public lastName: string;
  public id : string;
  public specialityId : string;
  public schoolYearId : string;
  public birthDate : Date = new Date();
  public specialities : any [];
  public schoolYears : any [];
  modalTitle  ="Registration"
  public form: FormGroup;
  constructor( private fb: FormBuilder, 
    private router: Router,
    private studentService :StudentService, 
    private specialityService: SpecialityService ,
    private schoolYearService : SchoolYearsService,
    private dateAdapter: DateAdapter<Date>, 
    private notifHelper :NotificationHelper) { 
      this.dateAdapter.setLocale('fr-FR');
    }

  async ngOnInit() {
    this.createFrom();
    this.specialities = await this.specialityService.getAll().toPromise();
    this.schoolYears = await this.schoolYearService.getAll().toPromise();
   
  }
  private createFrom() {
    this.form = this.fb.group({
      firstName: [this.firstName, [Validators.required]],
      lastName: [this.lastName, [Validators.required]],
      specialityId : [this.specialityId, [Validators.required]],
      birthDate : [this.birthDate,[Validators.required]],
      schoolYearId : [null , [Validators.required]]
    });
  }
  close() {
    this.router.navigate(['/']);
  }
  save () {
    if (this.form.invalid)
      return;
      var s = new Student();
      s.birthDate = this.form.value.birthDate;
      s.firstName = this.form.value.firstName;
      s.lastName = this.form.value.lastName;
      s.specialityId = this.form.value.specialityId;
      s.schoolYearId = this.form.value.schoolYearId;      
      this.studentService.add(s).subscribe(msg => {
        this.notifHelper.showNotification('mat-primary', "Operation succeeded", 'top', 'right');
       
      }, (error) => {
        this.notifHelper.showNotification('mat-warn', error, 'top', 'right');
        return;
      });
    
  }

}
