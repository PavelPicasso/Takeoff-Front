import { LiveAnnouncer} from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { InputSocial, PeriodicElement } from 'src/app/models/client';
import { CreateComponent } from '../create/create.component';


let ELEMENT_DATA: PeriodicElement[] = [
  {id: 0, firstName: 'Ankit', middleName: 'Kumar', lastName: 'Sharma', dateTimeCreation: ['21.02.2021', '15:41'], lastChange: ['21.02.2021', '12:41'], communication: []},
  {id: 1, firstName: 'Mayank', middleName: 'Singh', lastName: 'Sharma', dateTimeCreation: ['01.02.2021', '22:41'], lastChange: ['21.02.2021', '12:41'], communication: [{social: 'facebook', url: 'https://yandex.ru/'}, {social: 'phone', url: '1-800-123-4567'}, {social: 'email', url: 'email@email.ru'}]},
  {id: 2, firstName: 'Aman', middleName: 'Singh', lastName: 'Rawat', dateTimeCreation: ['21.03.2021', '12:41'], lastChange: ['21.02.2021', '12:41'], communication: [{social: 'email', url: 'email@email'}, {social: 'phone', url: '050-XXXX-XXXX'}]}
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
    ELEMENT_DATA = ELEMENT_DATA.filter(item => item.id !== recordId);
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
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
        ELEMENT_DATA.push(result);
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

  getHint(data: InputSocial): string {
    return `${data.social}: ${data.url}`;
  }

  getHref(data: InputSocial): string {
    switch(data.social) {
      case 'email':
        return `mailto:${data.url}`;
    
      case 'phone':
        return `tel:+${data.url}`;
    
      default:
        return data.url;
    }
  }
}
