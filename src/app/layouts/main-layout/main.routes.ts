import { Routes } from "@angular/router";
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
];
