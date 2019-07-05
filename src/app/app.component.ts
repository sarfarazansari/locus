import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { WindowRefService, LocalService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title: string = 'locus';
  public dataList: any[] = [];
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  constructor(
    private winRef: WindowRefService,
    private localService: LocalService,
    private cdRef: ChangeDetectorRef,
  ) { }

  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public ngOnInit() {
    this.drawUI();
  }

  private drawUI() {
    this.localService.getMockData()
    .then((res: any[]) => {
      if (res && res.length > 0) {
        this.dataList = res;
      }
    });
  }
}
