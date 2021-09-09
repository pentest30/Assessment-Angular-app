import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { NotificationService } from '../../core/services/notification.service';
import { NGXLogger } from 'ngx-logger';
import { MatDialog, MatDialogConfig, MatSort, MatTableDataSource } from '@angular/material';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { UserAddComponent } from '../user-add/user-add.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'role'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title, 
    private authService: AuthenticationService,private dialog: MatDialog, private router: Router
  ) { 
    
  }

  async ngOnInit() {
    

    var data = await this.authService.getAll().toPromise();
    this.dataSource.data = data;
    this.titleService.setTitle('angular-material-template - Users');
    this.logger.log('Users loaded');
  }
  opendDialog() {
    this.createModalDialog()
  }
  private createModalDialog() {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    var modalRef = this.dialog.open(UserAddComponent, dialogConfig);
    modalRef.afterClosed().subscribe(data => {
      if (data != null)
        this.loadData();
    });
  }
  async loadData() {
    var data = await this.authService.getAll().toPromise();
    this.dataSource.data = data;
  }
}
