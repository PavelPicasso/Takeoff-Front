import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getDateYMD(): string {
    const date = new Date();
    let createDate = date.getFullYear() + '.'
                    + ('0' + (date.getMonth() + 1)).slice(-2) + '.'
                    + ('0' + date.getDate()).slice(-2);

    return createDate;
  }

  getTimeHM(): string {
    const date = new Date();
    let createTime = ('0' + (date.getHours())).slice(-2) + '.'
                    + ('0' + date.getMinutes()).slice(-2);
    
    return createTime;
  }
}
