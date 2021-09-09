import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from '../shared/shared.module';
import { UserAddComponent } from './user-add/user-add.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ],
  entryComponents : [UserAddComponent],
  declarations: [UserListComponent, UserAddComponent]
})
export class UsersModule { }
