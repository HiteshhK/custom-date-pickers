import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { rangeType } from '../types';
@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.css']
})
export class RangeComponent implements OnInit {
  date_range: rangeType[] = ['today', 'yesterday', 'currentWeek', 'previousWeek',
    'previous2Week', 'previous4Week', 'currentMonth', 'previousMonth', 'currentYear', 'yearToDate'];
  // startDate = new FormControl();
  // endDate = new FormControl();
  dateForm: FormGroup;
  selectedRange: rangeType = 'today';
  constructor() {
    this.dateForm = new FormGroup({
      startDate: new FormControl(new Date()),
      endDate: new FormControl(new Date())
    }, this.checkRange)
  }

  ngOnInit(): void {
  }

  checkRange(group: FormGroup) {
    if (group.controls.endDate.value < group.controls.startDate.value) {
      return { notValid: true }
    }
    return null;
  }

  calculateRange(range: rangeType) {
    this.selectedRange = range;
    let date = new Date()
    let y = date.getFullYear()
    let m = date.getMonth();
    switch (range) {
      case 'today': {
        this.setRange(date, date)
        break;
      }
      case 'yesterday': {
        let yd = new Date(y, m, date.getDate() - 1);
        this.setRange(yd, yd);
        break;
      }
      case 'currentWeek':
      case 'previousWeek':
      case 'previous2Week':
      case 'previous4Week': {
        let sd = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
        let ed = date.getDate() - (date.getDay() - 1) + 6;
        if (range == 'previousWeek') { sd = sd - 7; ed = ed - 7 };
        if (range == 'previous2Week') { sd = sd - (2 * 7); ed = ed - 7 };
        if (range == 'previous4Week') { sd = sd - (4 * 7); ed = ed - 7 };
        let startDate = new Date(y, m, sd);
        let endDate = new Date(y, m, ed);
        this.setRange(startDate, endDate)
        break;
      }
      case 'currentMonth': {
        let date = new Date(), y = date.getFullYear(), m = date.getMonth();
        let startDate = new Date(y, m, 1);
        let endDate = new Date(y, m + 1, 0);
        this.setRange(startDate, endDate)
        break;
      }
      case 'previousMonth': {
        let date = new Date()
        let y = date.getFullYear()
        let m = date.getMonth();
        let startDate = new Date(y, m - 1, 1);
        let endDate = new Date(y, m, 0);
        this.setRange(startDate, endDate)
        break;
      }
      case 'currentYear': {
        let date = new Date()
        let y = date.getFullYear()
        let startDate = new Date(y, 0, 1);
        let endDate = new Date(y, 11, 31);
        this.setRange(startDate, endDate)
        break;
      }
      case 'yearToDate': {
        let date = new Date()
        let y = date.getFullYear()
        let m = date.getMonth();
        let startDate = new Date(y, 0, 1);
        let endDate = new Date(y, m, date.getDate());
        this.setRange(startDate, endDate)
        break;
      }
    }
    console.log({ startDate: this.dateForm.get('startDate').value, endDate: this.dateForm.get('endDate').value });

  }

  setRange(sd: Date, ed: Date) {
    this.dateForm.controls['startDate'].setValue(sd);
    this.dateForm.controls['endDate'].setValue(ed);
  }
}
