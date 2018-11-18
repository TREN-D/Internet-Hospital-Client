import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../../Services/registration.service';
import { ImageValidationService } from '../../../Services/image-validation.service';
import { NotificationService } from '../../../Services/notification.service';
import { first } from 'rxjs/operators';
import { SIGN_IN } from './../../../config';
import { ImageHandlingService } from '../../../Services/image-handling.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private service: RegistrationService,
     private validation: ImageValidationService,
     private router: Router,
     private notification: NotificationService,
     private imageHandling: ImageHandlingService
    ) { }

  ngOnInit() {
    this.service.form.controls['Role'].setValue('Patient');
  }

  onClear() {
    this.service.form.reset();
  }

  onSubmit() {
    this.service.postUser(this.imageHandling.fileToUpload)
        .pipe(first())
        .subscribe(
            data => {
              this.router.navigate([SIGN_IN]);
              this.notification.success(data['message']);
              this.service.form.reset();
              this.service.initializeFormGroup();
            },
            error => {
              this.notification.error(error);
            });
  }
}