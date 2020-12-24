import { ComponentFixture } from '@angular/core/testing';
import { from } from 'rxjs';
import { By } from '@angular/platform-browser';
export class DomHelper<T> {
    fixture: ComponentFixture<T>;
    constructor(fixture: ComponentFixture<T>) {
        this.fixture = fixture;

    }
    singleTest(tagName: string): string {
        const elem = this.fixture.debugElement.query(By.css(tagName));
        if (elem) {
            return elem.nativeElement.textContent
        }
    }
    count(tagName: string): number {
        const elem = this.fixture.debugElement
            .queryAll(By.css(tagName));
        return elem.length;
    }
    countText(tagName: string, text: string): number {
        let el = this.fixture.debugElement
            .queryAll(By.css(tagName));
        return el.filter(elem => elem.nativeElement.textContent === text).length;
    }

    clickButton(btnText: string) {
        this.findAll('button').forEach(button => {
            const btnElement: HTMLButtonElement = button.nativeElement;
            if (btnElement.textContent === btnText) {
                btnElement.click();
            }
        });
    }
    findAll(tagName: string) {
        debugger;
        return this.fixture.debugElement.queryAll(By.css(tagName));
    }
}