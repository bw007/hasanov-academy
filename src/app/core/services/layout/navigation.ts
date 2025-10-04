import { computed, Injectable, signal } from "@angular/core";
import { NavigationCategory, NavType } from "@core/enums";
import { type MenuItem, PrimeIcons } from "primeng/api";

export interface NavItem extends MenuItem {
  type?: NavType,
  categories?: NavigationCategory[];
}

@Injectable({ providedIn: "root" })
export class Navigation {
  private navItems = signal<NavItem[]>([
    {
      title: "Asosiy",
      type: NavType.Home,
      icon: PrimeIcons.HOME,
      routerLink: "/home",
      styleClass: "nav-home",
      categories: [NavigationCategory.TopPrimary, NavigationCategory.BottomPrimary],
    },
    {
      title: "Kurslar",
      type: NavType.Courses,
      icon: PrimeIcons.TH_LARGE,
      routerLink: "/courses",
      categories: [NavigationCategory.TopPrimary, NavigationCategory.BottomPrimary],
    },
    {
      title: "Blog",
      type: NavType.Blog,
      icon: PrimeIcons.BOOK,
      routerLink: "/blog",
      categories: [NavigationCategory.TopPrimary, NavigationCategory.BottomPrimary],
    },
    {
      title: "Kirish",
      type: NavType.SignIn,
      icon: PrimeIcons.SIGN_IN,
      routerLink: "/auth/sign-in",
      styleClass: "nav-sign-in",
      categories: [NavigationCategory.TopSecondary, NavigationCategory.BottomPrimary],
    },
    {
      title: "Kurslarim",
      type: NavType.MyCourses,
      icon: PrimeIcons.BOOK,
      routerLink: "/my-courses",
      categories: [NavigationCategory.TopSecondary],
    },
    {
      title: "Hisobim",
      type: NavType.Profile,
      icon: PrimeIcons.USER,
      routerLink: "/profile",
      categories: [NavigationCategory.TopSecondary, NavigationCategory.BottomPrimary],
    },
    {
      title: "Chiqish",
      type: NavType.SignOut,
      icon: PrimeIcons.SIGN_OUT,
      routerLink: "/auth/sign-out",
      styleClass: "nav-sign-out",
      categories: [NavigationCategory.TopSecondary],
    }
  ]);

  private isAuthenticated = signal<boolean>(true);
  
  private getFilteredItems(category: NavigationCategory) {
    const filtered = this.navItems().filter(item => 
      item.categories?.includes(category)
    );
    
    return this.isAuthenticated()
      ? filtered.filter(item => item.type !== NavType.SignIn)
      : filtered.filter(item => item.type !== NavType.Profile);
  };

  getNavItems = this.navItems.asReadonly();

  getTopPrimaryItems = computed(() => this.getFilteredItems(NavigationCategory.TopPrimary));
  getTopSecondaryItems = computed(() => this.getFilteredItems(NavigationCategory.TopSecondary));
  getBottomNavItems = computed(() => this.getFilteredItems(NavigationCategory.BottomPrimary));
}
