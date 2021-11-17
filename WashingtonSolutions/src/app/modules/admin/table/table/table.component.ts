import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/core/services/table.service'
import { Table } from 'src/app/shared/models/table.model'
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(
    private _tableService: TableService,
    private _accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router) {
    this.getTables()
    this.getUsers();
  };


  tables: Table[];
  users;
  columnsToDisplay = ['userID', 'name', 'companyname', 'address', 'contact', 'verwijderen'];

  //CRUD methods

  deleteTable(id: number) {
    this._tableService.deleteTable(id).subscribe({
      next: () => {
        //refresh table
        this.getTables()

      }
    })
  }

  editTable(id: number) {
    this.router.navigateByUrl("/table/" + id);
  }

  getTables() {
    this._tableService.getTables().subscribe(result => {
      this.tables = result;
    })
  }

  ngOnInit(): void {
  }

  getUsers() {
    this._accountService.getAll().subscribe(
      result => {
        this.users = result;
        console.log(result)
      }
    )
  }

}
