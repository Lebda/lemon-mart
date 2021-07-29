import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export abstract class BaseComponent implements OnDestroy {
  private readonly subs = new Array<Subscription>();

  protected constructor() {}

  protected sink(sub: Subscription): void {
    this.subs.push(sub);
  }

  public ngOnDestroy(): void {
    this.subs.forEach((item) => item.unsubscribe());
  }
}
