import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateService } from 'src/app/service/date.service';

export interface InputSocial {
  social: string,
  url: string
}

export interface InputData {
  firstName: string,
  middleName: string,
  lastName: string,
  social: InputSocial[]
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public form: FormGroup = new FormGroup('', []);
  
  createFirstName = '';
  createMiddleName = '';
  createLastName = '';
  infoClients: InputData | undefined;


  socialNetworks: InputSocial[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateService: DateService
  ) { }

  ngOnInit(): void {
    this.createFirstName = this.data.row.firstName;
    this.createMiddleName = this.data.row.middleName;
    this.createLastName = this.data.row.lastName;
    this.socialNetworks = this.data.row.communication;

    this.form = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required)
    });
  }

  trackByFn(index: number, item: any): number {
    return item.id!;
  }

  close(): void {
    this.dialogRef.close();
  }

  clearUrlSocial(index: number ): void {
    this.socialNetworks[index].url = '';
  }

  save(): void {
    if (this.form.valid) {    
      const createData = {
        id: this.data.row.id,
        firstName: this.createFirstName,
        middleName: this.createMiddleName,
        lastName: this.createLastName,
        dateTimeCreation: [
          this.dateService.getDateYMD(),
          this.dateService.getTimeHM()
        ],
        lastChange: [
          this.dateService.getDateYMD(),
          this.dateService.getTimeHM()
        ]
      };
  
      this.dialogRef.close(createData);
    }
  }
}
