import { AfterContentChecked, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationHelper } from 'src/app/shared/messages-notfi/notif-helper';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit,AfterContentChecked  {
  public userName: string;
  public role: string;
  public password : string;
  public id : string;
  public modalTitle : string;
  roles : any[];
  public form: FormGroup;
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserAddComponent>,
    @Inject(MAT_DIALOG_DATA) data,private cdRef : ChangeDetectorRef,
    private service: AuthenticationService, private notifHelper :NotificationHelper) { }
  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }

  async ngOnInit() {
    this.createFrom();
    setTimeout(async () => {
     
     this.roles = await this.service.getAllRoles().toPromise();
    });
    
  }
  private createFrom() {
    this.form = this.fb.group({
      userName: [this.userName, [Validators.required]],
      role: [this.role, [Validators.required]],
      password: [this.password, [Validators.required]],
      id : [this.id , []]
    });
  }
  save() {
    if(this.form.invalid) return;
    if(this.form.value.id == null){
      this.service.add(this.form.value).subscribe(msg => {
        this.notifHelper.showNotification('mat-primary', "Operation succeeded", 'top', 'right');
        this.dialogRef.close(this.form.value);
      }, (error) => {
        this.notifHelper.showNotification('mat-warn', error, 'top', 'right');
        return;
      });
    }
  }
  close() {
    this.dialogRef.close();
  }

}
