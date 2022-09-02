import { LiveAnnouncer} from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
import { merge, Subject } from 'rxjs';
import { startWith, switchMap, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ContactsService } from './service/contacts.service';

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
  public dataSource: MatTableDataSource<Contact> = new MatTableDataSource();
  public tableData: Array<Contact> = [];
  public isLoading: boolean = true;

  contacts$: Observable<Contact[]> = this.store.select(fromSelector.contacts);

  pageEvent!: PageEvent;
  pageSize: number = 5;
  currentPage: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100]; // !!!!!!!!!!!!
  totalRows: number = 0;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private router: Router,
    private store: Store<fromStore.ContactState>,
    private contactsService: ContactsService
  ) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.getStore();
    this.initDataSource(); // !!!!!!!!!!!!!!!!!!!
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

  getStore(): void {
    this.store.dispatch(fromActions.requestLoadContacts());

    this.contacts$.subscribe(contacts => { this.totalRows = contacts.length; });
  }

  initDataSource() {
    this.contactsService.loadPage(1, this.pageSize).subscribe(contacts => {
      this.tableData = contacts;
      
      this.isLoading = !this.isLoading;
      this.dataSource = new MatTableDataSource(this.tableData);
    });
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page +1;
    this.isLoading = !this.isLoading;
    
    this.contactsService.loadPage(page, size).subscribe(contacts => {
      this.tableData = contacts;

      this.isLoading = !this.isLoading;
      this.dataSource = new MatTableDataSource(this.tableData);
    });
  }

  editRecord(row: Contact): void {
    const dialogRef = this.openDialog(
      {
        modalName: 'Edit Contact',
        row: row
      }
    );

    dialogRef.afterClosed().subscribe(contact => {
      this.store.dispatch(fromActions.updateContact(contact));
      
      // if (result) {
      //   const index = this.tableData.findIndex(object => {
      //     return object.id === result.id;
      //   });
      //   this.tableData[index] = {...this.tableData[index], ...result};

      //   this.dataSource = new MatTableDataSource(this.tableData);
      // }
    });
  }

  deleteRecord(recordId: number): void {
    const r = confirm('Are you sure?');
    if (r) {
      this.store.dispatch(fromActions.deleteContact({id: recordId}));
      this.contactsService.deleteContact(recordId).subscribe();
    }
    
    // this.tableData = this.tableData.filter(item => item.id !== recordId);
    // this.dataSource = new MatTableDataSource(this.tableData);
  }

  addRecord(): void {
    const dialogRef = this.openDialog(
      {
        modalName: 'Add Contact',
        row: {}
      }
    );

    dialogRef.afterClosed().subscribe(contact => {
      this.store.dispatch(fromActions.addContact(contact));
      // if (contact) {
      //   this.tableData.push(contact);
      //   this.dataSource = new MatTableDataSource(this.tableData);
      // }
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
