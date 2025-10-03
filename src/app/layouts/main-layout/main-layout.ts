import { Component, computed, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { View } from "@core/enums";

import { Navigation, Responsive } from "@core/services/layout";
import { BottomNav } from "./bottom-nav/bottom-nav";
import { Header } from "./header/header";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.html",
  imports: [Header, BottomNav, RouterOutlet]
})
export class MainLayout {
  private responsive = inject(Responsive);
  private navigation = inject(Navigation);

  currentView = computed(() => {
    if (this.responsive.isMobile()) return View.Mobile;
    if (this.responsive.isTablet()) return View.Tablet;
    return View.Desktop;
  });

  getNavsTopSecondary = computed(() => this.navigation.getTopSecondaryItems());

  getNavsCurrentBreakpoint = computed(() => {
    const view = this.currentView();

    switch (view) {
      case View.Desktop:
        return this.navigation.getTopPrimaryItems();
      default:
        return this.navigation.getBottomNavItems();        
    }
  });
}