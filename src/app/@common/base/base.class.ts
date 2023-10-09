import { Directive, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Directive()
export abstract class BaseClass implements OnInit, OnDestroy {
  private destroyer$ = new Subject<any>();
  public limit = 30;
  public page = 1;
  public totalRecords = 0;
  public cookie = {};
  protected _coookie = inject(CookieService);

  protected unsubsribeOnDestroy = (
    source: Observable<any>
  ): Observable<any> => {
    return source.pipe(takeUntil(this.destroyer$));
  };

  ngOnInit(): void {
    this.cookie = this._coookie.getAll();
  }

  ngOnDestroy(): void {
    this.destroyer$.next(null);
    this.destroyer$.complete();
  }
}
