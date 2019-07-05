import {
  Component, OnInit, OnDestroy, ViewChild,
  ElementRef, ViewChildren,
  QueryList, Input, AfterViewInit, NgZone
} from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ActiveDescendantKeyManager, FocusMonitor } from '@angular/cdk/a11y';
import { UP_ARROW, DOWN_ARROW, ENTER } from '@angular/cdk/keycodes';
import { ListItemComponent } from '../list-item';

@Component({
  selector: 'app-search',
  styleUrls: ['./list.component.scss'],
  templateUrl: './list.component.html'
})

export class ListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('input') public input: ElementRef<HTMLInputElement>;
  @ViewChild('listItem') public listItem: ElementRef<HTMLUListElement>;
  @ViewChild('scrollerRef') public scrollerRef: ElementRef<HTMLDivElement>;
  @ViewChildren(ListItemComponent) items: QueryList<ListItemComponent>;
  private keyboardEventsManager: ActiveDescendantKeyManager<ListItemComponent>;

  @Input() public users: any[];
  public isOpen: boolean = false;

  public defaultExcludedTags: string = 'input, button, .searchEle, .search-wrapper';
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private doingByMouse: boolean = false;

  constructor(
    private ngZone: NgZone,
    private focusMonitor: FocusMonitor
  ) {}

  public ngAfterViewInit() {
    // init
    setTimeout(() => {
      this.doUIErrands();
    }, 0);

    // listen on input box
    this.focusMonitor.monitor(this.input)
    .pipe(takeUntil(this.destroyed$))
    .subscribe(origin => this.ngZone.run(() => {
      if (origin) {
        this.isOpen = true;
      }
    }));
  }

  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public ngOnInit() {
    //
  }

  // to hide dropdown on outside click
  public handleOutSideClick(e: any) {
    if (this.isOpen) {
      this.hide();
    }
  }

  // close on outside click
  public hide() {
    this.isOpen = false;
    // this.closeEmitter.emit(true);
  }

  public handleKeyUp(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    this.doingByMouse = false;
    if (this.keyboardEventsManager) {
      // tslint:disable-next-line: deprecation
      if (event.keyCode === ENTER) {
        console.log( this.keyboardEventsManager.activeItem.item );
      } else {
        // tslint:disable-next-line: deprecation
        if (event.keyCode === DOWN_ARROW || event.keyCode === UP_ARROW) {
          this.keyboardEventsManager.onKeydown(event);
        }
      }
      return;
    }
  }

  // handle mouse event
  public handleMouseEvent(e: MouseEvent, item: any) {
    this.doingByMouse = true;
    let itemIdx = this.users.findIndex(o => o.id === item.id);
    this.keyboardEventsManager.setActiveItem(itemIdx);
  }

  // handle click event
  public itemSelected(e: KeyboardEvent, item: any) {
    e.stopImmediatePropagation();
    console.log(item);
  }

  // p
  private doUIErrands() {
    if (this.users) {
      this.keyboardEventsManager = new ActiveDescendantKeyManager(this.items).withWrap()
      .withTypeAhead();
      this.listenOnKeyboard();
    }
  }

  private listenOnKeyboard() {
    this.keyboardEventsManager.change
    .pipe().subscribe(idx => {
      if (this.scrollerRef && !this.doingByMouse) {
        if (this.listItem) {
          const child = this.listItem.nativeElement.children[idx];
          if (child) {
            child.scrollIntoView();
          }
        }
      }
    });
  }
}
