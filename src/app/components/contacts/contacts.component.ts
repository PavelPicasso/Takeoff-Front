import { LiveAnnouncer} from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CreateComponent } from '../create/create.component';

export interface InputSocial {
  social: string,
  url: string
}

export interface PeriodicElement {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dateTimeCreation: string[];
  lastChange: string[];
  communication: InputSocial[];
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 0, firstName: 'Ankit', middleName: 'Kumar', lastName: 'Sharma', dateTimeCreation: ['21.02.2021', '15:41'], lastChange: ['21.02.2021', '12:41'], communication: []},
  {id: 1, firstName: 'Mayank', middleName: 'Singh', lastName: 'Sharma', dateTimeCreation: ['1.02.2021', '22:41'], lastChange: ['21.02.2021', '12:41'], communication: [{social: 'facebook', url: 'www'}, {social: 'phone', url: 'wqe'}, {social: 'email', url: 'www'}]},
  {id: 2, firstName: 'Aman', middleName: 'Singh', lastName: 'Rawat', dateTimeCreation: ['21.03.2021', '12:41'], lastChange: ['21.02.2021', '12:41'], communication: [{social: 'email', url: 'www'}, {social: 'phone', url: 'wqe'}]}
];

/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements AfterViewInit {
  public displayedColumns: string[] = ['id', 'firstName', 'middleName', 'lastName', 'dateTimeCreation', 'lastChange', 'communication', 'options'];
  public dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  dataToDisplay = [...ELEMENT_DATA];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private router: Router
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event): void {
    let filterValue = (event.target as HTMLInputElement).value;
    
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editRecord(row: PeriodicElement): void {
    const dialogRef = this.openDialog(
      {
        modalName: 'Edit Client',
        row: row
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        ELEMENT_DATA[result.id] = result;
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      }
    });
  }

  deleteRecord(recordId: number): void {
    this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    this.dataSource = new MatTableDataSource(this.dataToDisplay);
  }

  addRecord(): void {
    const dialogRef = this.openDialog(
      {
        modalName: 'Add Client',
        row: {}
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        ELEMENT_DATA.push(result)
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      }
    });
  }

  openDialog(data: any): MatDialogRef<CreateComponent, any> {
    return this.dialog.open(CreateComponent, {
      width: '650px',
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
      data: data
    });
  }

  logout(): void {
    this.router.navigate(['login']);
  }
}
