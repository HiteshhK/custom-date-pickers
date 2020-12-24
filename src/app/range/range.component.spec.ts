import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeComponent } from './range.component';
import { DomHelper } from '../testing/DomHelper';
import { compileNgModule } from '@angular/compiler';
describe('RangeComponent', () => {
  let component: RangeComponent;
  let fixture: ComponentFixture<RangeComponent>;
  let dh: DomHelper<RangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RangeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeComponent);
    component = fixture.componentInstance;
    dh = new DomHelper(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have selectedRange variable with from date_range array', () => {
    const includesIn = component.date_range.includes(component.selectedRange);
    expect(includesIn).toBe(true);
  })
  describe('HTML content', () => {

    it('Should show same number of buttons as date_range.length', () => {
      const len = component.date_range.length;
      expect(dh.count('button')).toBeGreaterThanOrEqual(len);
    });
  })
  let date = new Date()
  let y = date.getFullYear()
  let m = date.getMonth();
  describe('Form Content', () => {
    let date = new Date()
    let y = date.getFullYear()
    let m = date.getMonth();
    let dateMap = {
      'SUNDAY': 0,
      'MONDAY': 1
    }
    it('should have start and end date same by default', () => {
      const startDate = component.dateForm.get('startDate').value;
      const endDate = component.dateForm.get('endDate').value;
      expect(startDate.toString()).toEqual(endDate.toString());
    })
    it('should have default date as today', () => {
      const startDate = component.dateForm.get('startDate').value;
      expect(startDate.toString()).toEqual(new Date().toString());
    })
    it('should have startDate and endDate as yesterday if selected range is yesterday', () => {
      component.calculateRange('yesterday');
      fixture.detectChanges();
      let startDate = component.dateForm.get('startDate').value;
      let endDate = component.dateForm.get('endDate').value;
      let yd = new Date(y, m, date.getDate() - 1);

      expect(startDate.toString()).toEqual(yd.toString());
      expect(endDate.toString()).toEqual(yd.toString());
    })

    it('should have startDate as first day of this week for selected range as currentWeek', () => {
      component.calculateRange('currentWeek');
      fixture.detectChanges();
      let sd = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
      // let ed = date.getDate() - (date.getDay() - 1) + 6;
      let cwd = new Date(y, m, sd);

      let startDate = component.dateForm.get('startDate').value;

      expect(startDate.toString()).toEqual(cwd.toString());
      expect(cwd.getDay()).toBe(dateMap.MONDAY)
    })
    it('should have endDate as last day(sunday) of this week for selected range as currentWeek', () => {
      component.calculateRange('currentWeek');
      fixture.detectChanges();
      // let sd = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
      let ed = date.getDate() - (date.getDay() - 1) + 6;
      let cwd = new Date(y, m, ed);

      let d = component.dateForm.get('endDate').value;

      expect(d.toString()).toEqual(cwd.toString());
      expect(cwd.getDay()).toBe(dateMap.SUNDAY)
    })
    it('should have startDate as first day(monday) of previous week for selected range as previousWeek', () => {
      component.calculateRange('previousWeek');
      fixture.detectChanges();
      let sd = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
      // let ed = date.getDate() - (date.getDay() - 1) + 6;
      let cwd = new Date(y, m, sd - 7);

      let d = component.dateForm.get('startDate').value;

      expect(d.toString()).toEqual(cwd.toString());
      expect(cwd.getDay()).toBe(dateMap.MONDAY)
    })
    it('should have endDate as last day(sunday) of previous week for selected range as previousWeek', () => {
      component.calculateRange('previousWeek');
      fixture.detectChanges();
      // let sd = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
      let ed = date.getDate() - (date.getDay() - 1) + 6;
      let cwd = new Date(y, m, ed - 7);

      let d = component.dateForm.get('endDate').value;

      expect(component.selectedRange).toEqual('previousWeek');
      expect(d.toString()).toEqual(cwd.toString());
      expect(cwd.getDay()).toBe(dateMap.SUNDAY)
    })

    it('should have start date as(monday) and endDate as last day(sunday) of previous 2nd week for selected range as previous2Week', () => {
      component.calculateRange('previous2Week');
      fixture.detectChanges();
      let sd = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
      let ed = date.getDate() - (date.getDay() - 1) + 6;

      let wSd = new Date(y, m, sd - (2 * 7));//start date
      let wEd = new Date(y, m, ed - 7);//end date

      let endD = component.dateForm.get('endDate').value;
      let startD = component.dateForm.get('startDate').value;

      expect(component.selectedRange).toEqual('previous2Week');

      expect(endD.toString()).toEqual(wEd.toString());
      expect(wEd.getDay()).toBe(dateMap.SUNDAY)

      expect(startD.toString()).toEqual(wSd.toString());
      expect(wSd.getDay()).toBe(dateMap.MONDAY)
    })

    it('should have start date as(monday) and endDate as last day(sunday) of previous 4th week for selected range as previous4Week', () => {
      component.calculateRange('previous4Week');
      fixture.detectChanges();
      let sd = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
      let ed = date.getDate() - (date.getDay() - 1) + 6;

      let wSd = new Date(y, m, sd - (4 * 7));//start date
      let wEd = new Date(y, m, ed - 7);//end date

      let endD = component.dateForm.get('endDate').value;
      let startD = component.dateForm.get('startDate').value;

      expect(component.selectedRange).toEqual('previous4Week');

      expect(endD.toString()).toEqual(wEd.toString());
      expect(wEd.getDay()).toBe(dateMap.SUNDAY)

      expect(startD.toString()).toEqual(wSd.toString());
      expect(wSd.getDay()).toBe(dateMap.MONDAY)
    })
    it('should have start date as 1st of month and endDate as last date of this month for selected range as currentMonth', () => {
      component.calculateRange('currentMonth');
      fixture.detectChanges();

      let startDate = new Date(y, m, 1);
      let endDate = new Date(y, m + 1, 0);

      let endD = component.dateForm.get('endDate').value;
      let startD = component.dateForm.get('startDate').value;

      expect(component.selectedRange).toEqual('currentMonth');

      expect(endD.toString()).toEqual(endDate.toString());
      expect(startD.toString()).toEqual(startDate.toString());
    })

    it('should have start date as 1st and endDate as last date of previous month for selected range as previousMonth', () => {
      component.calculateRange('previousMonth');
      fixture.detectChanges();

      let startDate = new Date(y, m - 1, 1);
      let endDate = new Date(y, m, 0);

      let endD = component.dateForm.get('endDate').value;
      let startD = component.dateForm.get('startDate').value;

      expect(component.selectedRange).toEqual('previousMonth');

      expect(endD.toString()).toEqual(endDate.toString());
      expect(startD.toString()).toEqual(startDate.toString());
    })

    it('should have start date as 1st and endDate as last date of this year for selected range as currentYear', () => {
      component.calculateRange('currentYear');
      fixture.detectChanges();

      let startDate = new Date(y, 0, 1);
      let endDate = new Date(y, 11, 31);

      let endD = component.dateForm.get('endDate').value;
      let startD = component.dateForm.get('startDate').value;

      expect(component.selectedRange).toEqual('currentYear');

      expect(endD.toString()).toEqual(endDate.toString());
      expect(startD.toString()).toEqual(startDate.toString());
    })
    it('should have start date as 1st and endDate as today of this year for selected range as yearToDate', () => {
      component.calculateRange('yearToDate');
      fixture.detectChanges();

      let startDate = new Date(y, 0, 1);
      let endDate = new Date(y, m, date.getDate());

      let endD = component.dateForm.get('endDate').value;
      let startD = component.dateForm.get('startDate').value;

      expect(component.selectedRange).toEqual('yearToDate');

      expect(endD.toString()).toEqual(endDate.toString());
      expect(startD.toString()).toEqual(startDate.toString());
      expect(endDate.getDate()).toEqual(new Date().getDate());
    })

  })
  describe('Form error handling', () => {
    it('should have a small tag in case of invalid range', () => {
      component.dateForm.controls['startDate'].setValue(date);
      let yd = new Date(y, m, date.getDate() - 1);
      component.dateForm.controls['endDate'].setValue(yd);
      fixture.detectChanges();
      expect(dh.count('small')).toBe(1);
    })
    it('should display error "Not valid" when endDate smaller than startDate', () => {
      component.dateForm.controls['startDate'].setValue(date);
      let yd = new Date(y, m, date.getDate() - 1);
      component.dateForm.controls['endDate'].setValue(yd);
      fixture.detectChanges();
      expect(dh.singleTest('small')).toBe('Not valid');
    })

    it('should not display error initially', () => {
      expect(dh.count('small')).toBe(0);
    })
    it('should not display error when form is valid', () => {
      component.dateForm.controls['startDate'].setValue(new Date());
      component.dateForm.controls['endDate'].setValue(new Date());
      fixture.detectChanges();
      expect(dh.count('small')).toBe(0);
    })
  })
});
