import { LiveAnnouncer} from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { Contact, InputSocialNetwork } from './store/contact';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromActions from './store/contacts.actions';
import * as fromStore from './store/contacts.reducer';
import * as fromSelector from './store/contacts.selectors';


let ELEMENT_DATA: Contact[] = [
  {id: '0', firstName: 'Ankit', middleName: 'Kumar', lastName: 'Sharma', createdAt: ['2021.02.21', '15:41'], updatedAt: ['2021.02.21', '12:41'], communication: []},
  {id: '1', firstName: 'Mayank', middleName: 'Singh', lastName: 'Sharma', createdAt: ['2021.02.01', '22:41'], updatedAt: ['2021.02.21', '12:41'], communication: [{type: 'facebook', value: 'https://yandex.ru/'}, {type: 'phone', value: '1-800-123-4567'}, {type: 'email', value: 'email@email.ru'}]},
  {id: '2', firstName: 'Aman', middleName: 'Singh', lastName: 'Rawat', createdAt: ['2021.03.21', '12:41'], updatedAt: ['2021.02.21', '12:41'], communication: [{type: 'email', value: 'email@email'}, {type: 'phone', value: '050-XXXX-XXXX'}]}
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
  public displayedColumns: string[] = ['id', 'firstName', 'middleName', 'lastName', 'createdAt', 'updatedAt', 'communication', 'options'];
  public dataSource = new MatTableDataSource(ELEMENT_DATA);
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  contacts$!: Observable<Contact[]>;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private router: Router,
    private store: Store<fromStore.ContactState>
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.store.dispatch(fromActions.requestLoadContacts());
    
    
    this.contacts$ = this.store.select(fromSelector.contacts);
    this.contacts$.subscribe(contacts => {
      console.log('contacts', contacts);
    });
    // this.isLoading$ = this.store.select(fromSelector.isLoading);
    // this.error$ = this.store.select(fromSelector.error);


    this.store.select(state => state).subscribe(data => {
      console.log('data', data);
    });
  }

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

  editRecord(row: Contact): void {
    const dialogRef = this.openDialog(
      {
        modalName: 'Edit Contact',
        row: row
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = ELEMENT_DATA.findIndex(object => {
          return object.id === result.id;
        });
        ELEMENT_DATA[index] = {...ELEMENT_DATA[index], ...result};

        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      }
    });
  }

  deleteRecord(recordId: string): void {
    ELEMENT_DATA = ELEMENT_DATA.filter(item => item.id !== recordId);
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  addRecord(): void {
    const dialogRef = this.openDialog(
      {
        modalName: 'Add Contact',
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

  getHint(data: InputSocialNetwork): string {
    return `${data.type}: ${data.value}`;
  }

  getHref(data: InputSocialNetwork): string {
    switch(data.type) {
      case 'email':
        return `mailto:${data.value}`;
    
      case 'phone':
        return `tel:+${data.value}`;
    
      default:
        return data.value;
    }
  }
}
