import { Component, OnInit, OnDestroy, HostBinding, Input } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements Highlightable, OnInit, OnDestroy {
  @Input() item: any;
  @Input() term: string;
  // tslint:disable-next-line: variable-name
  private _isActive = false;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  @HostBinding('class.active') get isActive() {
    return this._isActive;
  }

  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public ngOnInit() {
    //
  }

  public setActiveStyles() {
    this._isActive = true;
  }

  public setInactiveStyles() {
    this._isActive = false;
  }

  public getLabel() {
    return this.item.name;
  }

}
