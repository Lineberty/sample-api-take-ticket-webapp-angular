import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  title: string;
  text: string;
  confirm: string;
  cancel: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

  onConfirm(): void {
    this.dialogRef.close( { res: true } );
  }

  onCancel(): void {
    this.dialogRef.close( { res: false } );
  }

}
