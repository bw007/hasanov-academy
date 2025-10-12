import { Routes } from "@angular/router";
import { StudentGuard } from "@core/guards";
import { Home } from "@features/home/home";

export const MAIN_ROUTES: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { 
    path: "home", 
    component: Home
  },
  {
    path: "courses",
    children: [
      { 
        path: "", 
        loadComponent: () => import("@features/courses/courses-list/courses-list").then(m => m.CoursesList)
      },
      { 
        path: ":id", 
        loadComponent: () => import("@features/courses/course-detail/course-detail").then(m => m.CourseDetail)
      }
    ]
  },
  {
    path: 'blog',
    pathMatch: "full",
    redirectTo: "/"
  },
  {
    path: "cart",
    pathMatch: "full",
    canActivate: [StudentGuard],
    loadComponent: () => import("@features/cart-view/cart-view").then(m => m.CartView)
  },
  {
    path: "favourites",
    pathMatch: "full",
    canActivate: [StudentGuard],
    loadComponent: () => import("@features/favourites/favourites").then(m => m.Favourites)
  },
  {
    path: 'my-courses',
    pathMatch: "full",
    redirectTo: "/"
  },
  {
    path: 'profile',
    pathMatch: "full",
    redirectTo: "/"
  },
];
