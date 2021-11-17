import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../core/services/alert.service';
import { AccountService } from '../../../../core/services/account.service';
import { User } from '../../../../shared/models/user.model';
import { HttpEventType } from '@angular/common/http';
import { FileService } from '../../../../core/services/file.service';
import { first } from 'rxjs/operators';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  id: number;
  loading = false;
  submitted = false;
  user: User;
  @ViewChild('inputFile') inputFile: ElementRef;
  message: string;
  public imagePath;
  imgURL: any;
  imageID: number;
  imageUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private fileService: FileService,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', Validators.required]
    });

    this.accountService.user
      .pipe(first())
      .subscribe(x => {
        let date = this.ngbDateParserFormatter.parse(x.dob);
        this.user = x;
        this.form.patchValue(x);
        this.form.patchValue({
          dob: date
        });
        console.log(this.user);
        console.log(this.form.value);
        this.fileService.getFile(x.userPictureID)
          .pipe(first())
          .subscribe(x => this.imageUrl = environment.apiUrl.slice(0, -3) + x.path);
      });
  }

  get f () { return this.form.controls; }

  onSubmit (files) {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    console.log(this.user);
    console.log(this.form.value);
    let values = this.form.value;
    let ngbDate = values.dob;
    let date = this.ngbDateParserFormatter.format(ngbDate);

    let userPictureID = this.user.userPictureID;
    if (this.imgURL) {//als er een nieuwe foto is
      const file = files[0];
      this.fileService.upload(file).subscribe(data => {
        userPictureID = data.fileID;
        console.log(userPictureID);

        var updateUser = {
          roleID: this.user.roleID,
          username: values.username,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          dob: date + "T00:00:00",
          userID: this.user.userID,
          userPictureID: userPictureID,
          groupID: this.user.groupID
        }
        console.log(updateUser);
        this.accountService.update(this.user.userID, updateUser)
          .pipe(first())
          .subscribe({
            next: () => {
              this.alertService.success('Update succesvol', { keepAfterRouteChange: true });
              this.router.navigate(['/']);
            },
            error: error => {
              this.alertService.error(error);
              this.loading = false;
              console.log(updateUser);
            }
          });
      });
    } else {
      var updateUser = {
        roleID: this.user.roleID,
        username: values.username,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        dob: date + "T00:00:00",
        userID: this.user.userID,
        userPictureID: userPictureID,
        groupID: this.user.groupID
      }
      console.log(updateUser);
      this.accountService.update(this.user.userID, updateUser)
        .pipe(first())
        .subscribe({
          next: () => {
            this.alertService.success('Update succesvol', { keepAfterRouteChange: true });
            this.router.navigate(['/']);
          },
          error: error => {
            this.alertService.error(error);
            this.loading = false;
            console.log(updateUser);
          }
        });
    }
  }

  preview (files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  public upload (files) {
    if (files && files.length > 0) {
      const file = files[0];

      this.fileService.uploadFile(file).subscribe(
        data => {
          console.log(data);
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:

                break;
              case HttpEventType.Response:
                this.inputFile.nativeElement.value = '';
                console.log(data.body);
                this.imageID = parseInt(JSON.stringify(data.body));
                console.log(this.imageID);
                break;
            }
          }
        },
        error => {
          this.inputFile.nativeElement.value = '';

        }
      );
    }
  }

  public delete () {
    this.inputFile.nativeElement.value = "";
  }

}
