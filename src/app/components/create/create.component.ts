import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InputData, InputSocial } from 'src/app/models/client';
import { DateService } from 'src/app/service/date.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public form: FormGroup = new FormGroup('', []);
  
  createId: number = 0;
  socialName: string[] = ['facebook', 'phone', 'email', 'feedback'];
  infoClients: InputData | undefined;


  socialNetworks: InputSocial[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateService: DateService
  ) { }

  ngOnInit(): void {
    this.createId = this.data.row.id || 0;

    this.form = this.formBuilder.group({
      firstName: [this.data.row.firstName || '', Validators.required],
      middleName: [this.data.row.middleName || '', Validators.required],
      lastName: [this.data.row.lastName || '', Validators.required],
      socialNetworks: this.formBuilder.array(this.data && this.data.row.communication ? this.data.row.communication.map((x: InputSocial) =>
        this.networks(x)
      ) : []),
    });
  }

  get networksFieldAsFormArray(): any {
    return this.form.get('socialNetworks') as FormArray;
  }

  networks(data: any = null): FormGroup {
    data = {url:'', social: 'feedback', ...data}

    return this.formBuilder.group({
      url: this.formBuilder.control(data.url, Validators.required),
      social: this.formBuilder.control(data.social, Validators.required),
    });
  }

  addControl(): void {
    this.networksFieldAsFormArray.push(this.networks());
  }

  remove(i: number): void {
    this.networksFieldAsFormArray.removeAt(i);
  }

  trackByFn(index: number, item: any): number {
    return item.id!;
  }

  errorUrlSocialNetworks(i: number): boolean {
    return this.form.get('socialNetworks')?.value[i]?.url.length === 0;
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.valid) {
      const genId = this.data.modalName === 'Edit Client' ? this.createId : Math.floor(Math.random() * (444 - 0) + 0); // created in the db

      const createData = {
        id: genId,
        firstName: this.form.value.firstName,
        middleName: this.form.value.middleName,
        lastName: this.form.value.lastName,
        dateTimeCreation: [
          this.dateService.getDateYMD(),
          this.dateService.getTimeHM()
        ],
        lastChange: [
          this.dateService.getDateYMD(),
          this.dateService.getTimeHM()
        ],
        communication: this.form.value.socialNetworks
      };
      
      console.log(this.form.value.socialNetworks);
      this.dialogRef.close(createData);
    }
  }
}
