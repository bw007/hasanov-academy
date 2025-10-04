import { computed, Injectable, signal } from "@angular/core";
import { NavigationCategory, NavItems } from "@core/enums";
import { type MenuItem, PrimeIcons } from "primeng/api";

interface NavItem extends MenuItem {
  categories?: NavigationCategory[];
}

@Injectable({ providedIn: "root" })
export class Navigation {
  private navItems = signal<NavItem[]>([
    {
      label: NavItems.Home,
      icon: PrimeIcons.HOME,
      routerLink: "/home",
      styleClass: "nav-home",
      categories: [NavigationCategory.TopPrimary, NavigationCategory.BottomPrimary],
    },
    {
      label: NavItems.Courses,
      icon: PrimeIcons.TH_LARGE,
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
      label: NavItems.SignIn,
      icon: PrimeIcons.SIGN_IN,
      routerLink: "/auth/sign-in",
      styleClass: "nav-sign-in",
      categories: [NavigationCategory.TopSecondary, NavigationCategory.BottomPrimary],
    },
    {
      label: NavItems.MyCourses,
      icon: PrimeIcons.BOOK,
      routerLink: "/my-courses",
      categories: [NavigationCategory.TopSecondary],
    },
    {
      label: NavItems.Profile,
      icon: PrimeIcons.USER,
      routerLink: "/profile",
      categories: [NavigationCategory.TopSecondary, NavigationCategory.BottomPrimary],
    },
    {
      label: NavItems.SignOut,
      icon: PrimeIcons.SIGN_OUT,
      routerLink: "/auth/sign-out",
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
      ? filtered.filter(item => item.label !== NavItems.SignIn)
      : filtered.filter(item => item.label !== NavItems.Profile);
  };

  getNavItems = this.navItems.asReadonly();

  getTopPrimaryItems = computed(() => this.getFilteredItems(NavigationCategory.TopPrimary));
  getTopSecondaryItems = computed(() => this.getFilteredItems(NavigationCategory.TopSecondary));
  getBottomNavItems = computed(() => this.getFilteredItems(NavigationCategory.BottomPrimary));
}
