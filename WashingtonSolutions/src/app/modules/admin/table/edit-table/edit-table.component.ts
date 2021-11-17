import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableService } from 'src/app/core/services/table.service'
import { Table } from 'src/app/shared/models/table.model'
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../core/services/alert.service';
import { FileService } from 'src/app/core/services/file.service';
import { AccountService } from 'src/app/core/services/account.service';
import { environment } from 'src/environments/environment';

interface Option {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.scss']
})
export class EditTableComponent implements OnInit {


  form: FormGroup;
  loading = false;
  submitted = false;
  table: Table;
  data = false;

  message;
  imagePath;
  imgURL;
  @ViewChild('inputFile') inputFile: ElementRef;
  imageUrl;

  users: Option[] = [

  ]

  constructor(
    private _tableService: TableService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private fileService: FileService,
    private accountService: AccountService,
    private alertService: AlertService) { }

  ngOnInit(): void {

    //deze functie in new-table component zetten zou beter zijn! <-- TODO
    var id = Number(this.route.snapshot.paramMap.get("id"));
    this._tableService.getTable(id).subscribe(result => {
      this.table = result
      console.log(result)
      this.data = true;

      this.fileService.getFile(result.tablePictureID).subscribe(x => this.imageUrl = environment.apiUrl.slice(0, -3) + x.path);

      this.form = this.formBuilder.group({
        tableName: ['', Validators.required],
        companyName: ['', Validators.required],
        address: ['', Validators.required],
        contactPersonID: []
      });

      this.accountService.getAll().subscribe(x => x.forEach(user =>
        this.users.push({ value: user.userID, viewValue: user.firstName + " " + user.lastName })))

      this.form.patchValue(result)
      //errors nog doen
    })
    
  }

  get f() { return this.form.controls; }
 

  onSubmit(files) {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
   //tablevariablen
    this.table.tableName = this.f.tableName.value;
    this.table.companyName = this.f.companyName.value;
    this.table.address = this.f.address.value;
    console.log(this.table);

    if (this.imgURL) {
      const file = files[0];
      this.fileService.upload(file).subscribe(data => {
        this.table.tablePictureID = data.fileID;

        this._tableService.putTable(this.table)
          .subscribe({
            next: () => {
              const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
              this.router.navigateByUrl("/admin/table");
            },
            error: error => {
              this.alertService.error(error);
              this.loading = false;
            }
          });
      })
    } else {
      this._tableService.putTable(this.table)
        .subscribe({
          next: () => {
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl("/admin/table");
          },
          error: error => {
            this.alertService.error(error);
            this.loading = false;
          }
        });
    }
  }

  goBack () {
    this.router.navigateByUrl("/admin/table")
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
}
