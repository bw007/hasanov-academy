import { inject, Injectable } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

@Injectable({ providedIn: 'root' })
export class ResponsiveService {
  breakpointObserver$ = inject(BreakpointObserver);

  isHandset$ = this.breakpointObserver$.observe([Breakpoints.XSmall]);
  isTablet$ = this.breakpointObserver$.observe([Breakpoints.Tablet]);
  isWeb$ = this.breakpointObserver$.observe([Breakpoints.Web]);

  isHandsetOrTablet$ = this.breakpointObserver$.observe('(max-width: 959px)');
}