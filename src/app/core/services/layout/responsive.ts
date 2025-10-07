import { computed, inject, Injectable } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable({ providedIn: 'root' })
export class Responsive {
  private breakpointObserver = inject(BreakpointObserver);

  private handset$ = this.breakpointObserver.observe([Breakpoints.XSmall]);
  private tablet$ = this.breakpointObserver.observe(['(min-width: 600px) and (max-width: 839.98px)']);
  private web$ = this.breakpointObserver.observe(['(min-width: 840px)']);

  handset = toSignal(this.handset$, { initialValue: { matches: false, breakpoints: {} } });
  tablet = toSignal(this.tablet$, { initialValue: { matches: false, breakpoints: {} } });
  web = toSignal(this.web$);

  isMobile = computed(() => this.handset()?.matches ?? false);
  isTablet = computed(() => this.tablet()?.matches ?? false);
  isDesktop = computed(() => this.web()?.matches ?? false);
}