import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateService } from 'src/app/components/contacts/service/date.service';
import { InputSocialNetwork } from '../../store/contact';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public form: FormGroup = new FormGroup('', []);
  
  createId: string = '';
  socialName: string[] = ['facebook', 'phone', 'email', 'feedback'];

  communication: InputSocialNetwork[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateService: DateService
  ) { }

  ngOnInit(): void {
    this.createId = this.data.row.id || '0';

    this.form = this.formBuilder.group({
      firstName: [this.data.row.firstName || '', Validators.required],
      middleName: [this.data.row.middleName || '', Validators.required],
      lastName: [this.data.row.lastName || '', Validators.required],
      communication: this.formBuilder.array(this.data && this.data.row.communication ? this.data.row.communication.map((x: InputSocialNetwork) =>
        this.networks(x)
      ) : []),
    });
  }

  get networksFieldAsFormArray(): any {
    return this.form.get('communication') as FormArray;
  }

  networks(data: any = null): FormGroup {
    data = {type:'feedback', value: '', ...data}

    return this.formBuilder.group({
      type: this.formBuilder.control(data.type, Validators.required),
      value: this.formBuilder.control(data.value, Validators.required),
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

  errorUrlCommunication(i: number): boolean {
    return this.form.get('communication')?.value[i]?.type.length === 0;
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.valid) {
      let data = {
        id: this.createId,
        updatedAt: [
          this.dateService.getDateYMD(),
          this.dateService.getTimeHM()
        ]
      }

      if (this.data.modalName === 'Edit Contact') {
        let updatedData = this.form.value;
        data = {...data, ...updatedData};

        this.dialogRef.close(data);
      } else {
        const updatedData = {
          id: Math.floor(Math.random() * (444 - 0) + 0).toString(),
          firstName: this.form.value.firstName,
          middleName: this.form.value.middleName,
          lastName: this.form.value.lastName,
          createdAt: [
            this.dateService.getDateYMD(),
            this.dateService.getTimeHM()
          ],
          communication: this.form.value.communication
        }
        data = {...data, ...updatedData}

        this.dialogRef.close(data);
      }
    }
  }
}
