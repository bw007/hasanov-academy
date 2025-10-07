import { InjectionToken, Provider } from "@angular/core";
import { NavigationCategory, NavType } from "@core/enums";
import { PrimeIcons, type MenuItem } from "primeng/api";

export interface NavItem extends MenuItem {
  type?: NavType;
  categories?: NavigationCategory[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Asosiy",
    type: NavType.Home,
    icon: PrimeIcons.HOME,
    routerLink: "/home",
    styleClass: "nav-home",
    categories: [
      NavigationCategory.TopPrimary,
      NavigationCategory.BottomPrimary,
    ],
  },
  {
    label: "Kurslar",
    type: NavType.Courses,
    icon: PrimeIcons.TH_LARGE,
    routerLink: "/courses",
    categories: [
      NavigationCategory.TopPrimary,
      NavigationCategory.BottomPrimary,
    ],
  },
  {
    label: "Blog",
    type: NavType.Blog,
    icon: PrimeIcons.BOOK,
    routerLink: "/blog",
    categories: [
      NavigationCategory.TopPrimary,
      NavigationCategory.BottomPrimary,
    ],
  },
  {
    label: "Boshqaruv",
    type: NavType.Control,
    icon: PrimeIcons.LOCK,
    routerLink: "/admin-dashboard",
    categories: [
      NavigationCategory.TopPrimary
    ],
  },
  {
    label: "Kirish",
    type: NavType.SignIn,
    icon: PrimeIcons.SIGN_IN,
    routerLink: "/auth/sign-in",
    styleClass: "nav-sign-in",
    categories: [
      NavigationCategory.TopSecondary,
      NavigationCategory.BottomPrimary,
    ],
  },
  {
    label: "Kurslarim",
    type: NavType.MyCourses,
    icon: PrimeIcons.BOOK,
    routerLink: "/my-courses",
    categories: [NavigationCategory.TopSecondary],
  },
  {
    label: "Hisobim",
    type: NavType.Profile,
    icon: PrimeIcons.USER,
    routerLink: "/profile",
    categories: [
      NavigationCategory.TopSecondary,
      NavigationCategory.BottomPrimary,
    ],
  },
  {
    label: "Chiqish",
    type: NavType.SignOut,
    icon: PrimeIcons.SIGN_OUT,
    routerLink: "/auth/sign-out",
    styleClass: "nav-sign-out",
    categories: [NavigationCategory.TopSecondary],
  },
];

export const NAV_ITEMS_TOKEN = new InjectionToken<NavItem[]>("success-messages");

export const navItemsProvider: Provider = {
  provide: NAV_ITEMS_TOKEN,
  useValue: NAV_ITEMS,
};
