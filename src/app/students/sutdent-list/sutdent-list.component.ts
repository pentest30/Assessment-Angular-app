import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { StudentService } from 'src/app/core/services/student.service';
import { NotificationHelper } from 'src/app/shared/messages-notfi/notif-helper';

@Component({
  selector: 'app-sutdent-list',
  templateUrl: './sutdent-list.component.html',
  styleUrls: ['./sutdent-list.component.css']
})
export class SutdentListComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'birthDate','speciality', 'schoolYear', 'status','actions'];
  dataSource =  new MatTableDataSource();
role : boolean = false;
  constructor(private studentService : StudentService,
     private authService:AuthenticationService,private notifHelper :NotificationHelper) { }

  async ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.role = user.role && user.role=="HumanResource";
    var data = await this.studentService.getAll().toPromise();
    this.dataSource.data  = data;
  }
 validate(row) {
    console.log(row);
    this.studentService.activate(row.id).subscribe( msg => {
      this.notifHelper.showNotification('mat-primary', "Activation succeeded", 'top', 'right');
      this.studentService.getAll().subscribe(s=> {
        this.dataSource.data  = s;
      });
    
    }, (error) => {
      this.notifHelper.showNotification('mat-warn', error, 'top', 'right');
      return;
    });
  }
  deactivate(row) {
    this.studentService.deactivate(row.id).subscribe( msg => {
      this.notifHelper.showNotification('mat-primary', "Activation succeeded", 'top', 'right');
      this.studentService.getAll().subscribe(s=> {
        this.dataSource.data  = s;
      });
    
    }, (error) => {
      this.notifHelper.showNotification('mat-warn', error, 'top', 'right');
      return;
    });
  }

}
