import { computed, Injectable, signal } from "@angular/core";
import { NavigationCategory, NavItems } from "@core/enums";
import { MenuItem, PrimeIcons } from "primeng/api";


interface NavItem extends MenuItem {
  categories?: NavigationCategory[];
}

@Injectable({ providedIn: "root" })
export class Navigation {
  private navItems = signal<NavItem[]>([
    {
      label: NavItems.Home,
      icon: PrimeIcons.TH_LARGE,
      routerLink: "/home",
      styleClass: "nav-home",
      categories: [NavigationCategory.TopPrimary, NavigationCategory.BottomPrimary],
    },
    {
      label: NavItems.Courses,
      icon: PrimeIcons.BOX,
      routerLink: "/courses",
      categories: [NavigationCategory.TopPrimary, NavigationCategory.BottomPrimary],
    },
    {
      label: NavItems.Blog,
      icon: PrimeIcons.BOOK,
      routerLink: "/blog",
      categories: [NavigationCategory.TopPrimary, NavigationCategory.BottomPrimary],
    },
    {
      label: NavItems.Contact,
      icon: PrimeIcons.ENVELOPE,
      routerLink: "/contact",
      categories: [NavigationCategory.TopPrimary, NavigationCategory.BottomPrimary],
    },
    {
      label: NavItems.Signin,
      icon: PrimeIcons.SIGN_IN,
      routerLink: "/auth",
      styleClass: "nav-sign-in",
      categories: [NavigationCategory.TopSecondary, NavigationCategory.BottomPrimary],
    },
    {
      label: NavItems.Profile,
      icon: PrimeIcons.USER,
      routerLink: "/profile",
      categories: [NavigationCategory.TopSecondary, NavigationCategory.BottomPrimary],
    },
    {
      label: NavItems.Logout,
      icon: PrimeIcons.SIGN_OUT,
      routerLink: "/logout",
      styleClass: "nav-sign-out",
      categories: [NavigationCategory.TopSecondary],
    }
  ]);

  private isAuthenticated = signal<boolean>(false);
  
  private getFilteredItems(category: NavigationCategory) {
    const filtered = this.navItems().filter(item => 
      item.categories?.includes(category)
    );
    
    return this.isAuthenticated()
      ? filtered.filter(item => item.label !== NavItems.Signin)
      : filtered.filter(item => item.label !== NavItems.Profile);
  };

  getNavItems = this.navItems.asReadonly();

  getTopPrimaryItems = computed(() => this.getFilteredItems(NavigationCategory.TopPrimary));
  getTopSecondaryItems = computed(() => this.getFilteredItems(NavigationCategory.TopSecondary));
  getBottomNavItems = computed(() => this.getFilteredItems(NavigationCategory.BottomPrimary));
}
