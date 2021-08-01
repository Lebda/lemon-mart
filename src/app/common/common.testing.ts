import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SecurityContext } from '@angular/core';
import { MediaChange } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeResourceUrl, SafeValue } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ObservablePropertyStrategy, autoSpyObj } from 'angular-unit-test-helper';
import { Observable, Subscription, of } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { MaterialModule } from '../material.module';
import { UiService } from './ui.service';

const FAKE_SVGS = {
  lemon: '<svg><path id="lemon" name="lemon"></path></svg>',
};

export class MediaObserverFake {
  public isActive(query: string): boolean {
    return false;
  }

  public asObservable(): Observable<MediaChange> {
    return of({} as MediaChange);
  }
  public subscribe(
    next?: (value: MediaChange) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): Subscription {
    return new Subscription();
  }
}

export class MatIconRegistryFake {
  // tslint:disable-next-line: variable-name
  public _document = document;
  public addSvgIcon(iconName: string, url: SafeResourceUrl): this {
    // this.addSvgIcon('lemon', 'lemon.svg')
    return this;
  }

  public getNamedSvgIcon(name: string, namespace: string = ''): Observable<SVGElement> {
    return of(this._svgElementFromString(FAKE_SVGS.lemon));
  }

  private _svgElementFromString(str: string): SVGElement {
    const div = (this._document || document).createElement('DIV');
    div.innerHTML = str;
    const svg = div.querySelector('svg') as SVGElement;
    if (!svg) {
      throw Error('<svg> tag not found');
    }
    return svg;
  }
}

export class DomSanitizerFake {
  public bypassSecurityTrustResourceUrl(url: string): SafeResourceUrl {
    return {} as SafeResourceUrl;
  }
  public sanitize(
    context: SecurityContext,
    value: SafeValue | string | null
  ): string | null {
    return value?.toString() || null;
  }
}
// useValue: { authStatus$: new BehaviorSubject<IAuthStatus>(defaultAuthStatus) },
export const commonTestingProviders: any[] = [
  {
    provide: AuthService,
    useValue: autoSpyObj(
      AuthService,
      ['authStatus$'],
      ObservablePropertyStrategy.BehaviorSubject
    ),
  },
  { provide: UiService, useValue: autoSpyObj(UiService) },
];

export const commonTestingModules: any[] = [
  ReactiveFormsModule,
  MaterialModule,
  NoopAnimationsModule,
  HttpClientTestingModule,
  RouterTestingModule,
];
