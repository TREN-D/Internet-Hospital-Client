import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FeedbackViewModel } from 'src/app/Models/FeedbackViewModel';

@Component({
  selector: 'app-reply-dialog',
  templateUrl: './reply-dialog.component.html',
  styleUrls: ['./reply-dialog.component.scss']
})
export class ReplyDialogComponent implements OnInit {

  replyText: string;

  constructor(
    public dialogRef: MatDialogRef<ReplyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FeedbackViewModel) {}

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveClick() {
    alert(this.data.selectedUser.text);
  }

}
