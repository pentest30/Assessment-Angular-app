
import { Injectable, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
    providedIn: 'root'
  })
export class NotificationHelper {
    constructor(private snackBar: MatSnackBar){

    }
    
    showNotification(cls, text, placementFrom, placementAlign) {
        this.snackBar.open(text, '', {
          duration: 8000,
          verticalPosition: placementFrom,
          horizontalPosition: placementAlign,
          panelClass: ['mat-toolbar', cls]
        });
      }
      init(){

      }
} 