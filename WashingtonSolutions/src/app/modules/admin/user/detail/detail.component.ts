import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';

import { AlertService } from '../../../../core/services/alert.service';
import { AccountService } from '../../../../core/services/account.service';
import { FileService } from '../../../../core/services/file.service';
import { GroupService } from '../../../../core/services/group.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Option {
    value: number;
    viewValue: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  form: FormGroup;
  id: number;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  imageUrl: string;

  roles: Option[] = [
    { value: 1, viewValue: 'kapitein' },
    { value: 2, viewValue: 'admin'},
    { value: 3, viewValue: 'gebruiker' }
  ] 

  groups: Option[] = [

  ]

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private fileService: FileService,
    private groupService: GroupService,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.params['id']);//parse
    this.isAddMode = !this.id;

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(1)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', passwordValidators],
      email: ['', Validators.required],
      roleID: [2],
      dob: ['', Validators.required],
      userPictureID: [],
      groupID: []
    });

    if (!this.isAddMode) {
      this.accountService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          let date = this.ngbDateParserFormatter.parse(x.dob);
          console.log(x)
          this.form.patchValue(x);
          this.form.patchValue({
            dob: date
          });
          this.fileService.getFile(x.userPictureID).subscribe(x => this.imageUrl = environment.apiUrl.slice(0, -3) + x.path);
        });
    }

    this.groupService.getGroups()
      .pipe(first())
      .subscribe(x =>
        x.forEach(group =>
          this.groups.push(
            { value: group.groupID, viewValue: group.name }
          )
        )
      );
  }

  get f () { return this.form.controls; }

  onSubmit () {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private createUser () {
    let values = this.form.value;
    let ngbDate = values.dob;
    let date = this.ngbDateParserFormatter.format(ngbDate);
    var newUser = {
      roleID: parseInt(values.roleID),
      username: values.username,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      dob: date+"T00:00:00",
      userPictureID: 1,
      groupID: parseInt(values.groupID)
    }
    this.accountService.register(newUser)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Gebruiker succesvol toegevoegd', { keepAfterRouteChange: true });
          this.router.navigate(['../list'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  private updateUser1 () {
    let values = this.form.value;
    let ngbDate = values.dob;
    let date = this.ngbDateParserFormatter.format(ngbDate);
    console.log(date);
    var updateUser = {
      roleID: parseInt(values.roleID),
      username: values.username,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      userID: this.id,
      dob: date+"T00:00:00",
      userPictureID: 1,
      groupID: parseInt(values.groupID)
    }
    this.accountService.update(this.id, updateUser)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Update succesvol', { keepAfterRouteChange: true });
          this.router.navigate(['../../list'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
          console.log(updateUser);
        }
      });
  }

  private updateUser () {
    let patchDocument = []
    let values = this.form.value;
    if (this.form.controls['firstName'].dirty) {
      patchDocument.push({op: "replace", path:"/firstName", value: values.firstName})
    }
    if (this.form.controls['lastName'].dirty) {
      patchDocument.push({ op: "replace", path: "/lastName", value: values.lastName })
    }
    if (this.form.controls['username'].dirty) {
      patchDocument.push({ op: "replace", path: "/username", value: values.username })
    }
    if (this.form.controls['password'].dirty) {
      patchDocument.push({ op: "replace", path: "/password", value: values.password })
    }
    if (this.form.controls['email'].dirty) {
      patchDocument.push({ op: "replace", path: "/email", value: values.email })
    }
    if (this.form.controls['roleID'].dirty) {
      patchDocument.push({ op: "replace", path: "/roleID", value: values.roleID })
    }
    if (this.form.controls['dob'].dirty) {
      let date = this.ngbDateParserFormatter.format(values.dob)+"T00:00:00"
      patchDocument.push({ op: "replace", path: "/dob", value: date })
    }
    if (this.form.controls['userPictureID'].dirty) {
      patchDocument.push({ op: "replace", path: "/userPictureID", value: values.userPictureID })
    }
    if (this.form.controls['groupID'].dirty) {
      patchDocument.push({ op: "replace", path: "/groupID", value: values.groupID })
    }
    console.log(patchDocument);
    this.accountService.patch(this.id,patchDocument).subscribe({
      next: () => {
        this.router.navigate(['../../list'], { relativeTo: this.route });
      },
       error: error => {
        this.alertService.error(error);
        this.loading = false;
      }
    })
  }

  goBack() {
    this.router.navigateByUrl("/admin/user/list")
  }

}
