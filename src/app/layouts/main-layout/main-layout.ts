import { Component, computed, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NgClass, ViewportScroller } from "@angular/common";
import { debounceTime, fromEvent } from "rxjs";

import { Navigation, Responsive } from "@core/services/layout";
import { View } from "@core/enums";

import { BottomNav } from "./bottom-nav/bottom-nav";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.html",
  imports: [Header, BottomNav, RouterOutlet, NgClass, Footer],
})
export class MainLayout implements OnInit {
  private dsRef = inject(DestroyRef);
  private responsive = inject(Responsive);
  protected readonly navigation = inject(Navigation);
  private viewportScroller = inject(ViewportScroller);
  protected readonly view = View;

  currentView = computed(() => {
    if (this.responsive.isMobile()) return View.Mobile;
    if (this.responsive.isTablet()) return View.Tablet;
    return View.Desktop;
  });

  getNavsCurrentBreakpoint = computed(() => {
    switch (this.currentView()) {
      case View.Desktop:
        return this.navigation.getTopPrimaryItems();
      default:
        return this.navigation.getBottomNavItems();        
    }
  });

  scrollDown = signal(false);

  ngOnInit(): void {
    const subscription = fromEvent(window, 'scroll')
      .pipe(debounceTime(100))
      .subscribe({
        next: () => {
          if (this.viewportScroller.getScrollPosition()[1] > 80) {
            this.scrollDown.set(true);
          } else {
            this.scrollDown.set(false);
          }
        }
      });
    
    this.dsRef.onDestroy(() => subscription.unsubscribe())
  };
}