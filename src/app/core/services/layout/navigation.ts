import { computed, inject, Injectable } from "@angular/core";

import { NAV_ITEMS_TOKEN } from "@core/constants/navigation-items";
import { Auth } from "../api";
import { UserRole } from "@core/models";
import { NavigationCategory, NavType } from "@core/enums";

@Injectable({ providedIn: "root" })
export class Navigation {
  private auth = inject(Auth);
  private navItems = inject(NAV_ITEMS_TOKEN);
  protected readonly userRole = UserRole;

  private isAuthenticated = computed(() => this.auth.isAuthenticated());
  
  private getFilteredItems(category: NavigationCategory) {
    const filtered = this.navItems.filter(item => 
      item.categories?.includes(category)
    );
    
    const role = this.auth.user()?.role;
    const isAuth = this.isAuthenticated();
    
    return filtered.filter(item => {
      // Guest
      if (!isAuth) {
        return item.type !== NavType.Profile && item.type !== NavType.Control;
      }

      // Admin
      if (role === this.userRole.Admin) {
        return item.type !== NavType.SignIn;
      }

      // Student
      return item.type !== NavType.Control && item.type !== NavType.SignIn;
    });
  };

  readonly getNavItems = this.navItems;

  getTopPrimaryItems = computed(() => this.getFilteredItems(NavigationCategory.TopPrimary));
  getTopSecondaryItems = computed(() => this.getFilteredItems(NavigationCategory.TopSecondary));
  getBottomNavItems = computed(() => this.getFilteredItems(NavigationCategory.BottomPrimary));
}
