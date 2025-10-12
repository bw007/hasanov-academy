import { Component, computed, DestroyRef, inject, OnInit, signal } from "@angular/core";

import { tap } from "rxjs";
import { Notification } from "@core/services/common";
import { Auth, Cart, Course, Favourite } from "@core/services/api";
import { Router, RouterLink } from "@angular/router";

import { CourseCardComponent } from "@shared/components/course-card/course-card";
import { SearchBar } from "./search-bar/search-bar";
import { SkeletonModule } from "primeng/skeleton";
import { ButtonModule } from "primeng/button";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.html',
  imports: [
    CourseCardComponent,
    SearchBar,
    SkeletonModule,
    ButtonModule,
    RouterLink
  ]
})
export class CoursesList implements OnInit {
  private dsRef = inject(DestroyRef);
  private course = inject(Course);
  private auth = inject(Auth);
  private cart = inject(Cart);
  private favourite = inject(Favourite);
  private router = inject(Router);
  private notification = inject(Notification);

  userCart = signal(this.auth.user()?.cart || []);
  userFavourites = signal(this.auth.user()?.favourites || []);
  enrolledCouses = this.auth.user()?.enrolledCourses || [];
  isStudent = this.auth.isStudent;
  
  allCourses = computed(() => {
    return this.course.allCourses().map(item => {
      const inCart = this.userCart().some(id => id === item.id);
      const enrolled = this.enrolledCouses.some(id => id === item.id);
      const favourite = this.userFavourites().some(id => id === item.id);
      
      return { ...item, inCart, enrolled, favourite }
    })
  });
  
  isLoading = this.course.isLoading;

  ngOnInit(): void {
    this.course.getAllCourses()
      .pipe(takeUntilDestroyed(this.dsRef))
      .subscribe();
  }

  toggleFavourite(courseId: string) {
    const prevFavouritetData = this.userFavourites();

    this.userFavourites.update(oldData => {
      if (oldData.includes(courseId)) {
        return oldData.filter(item => item !== courseId);
      } else {
        return [...oldData, courseId];
      }
    });

    this.favourite.toggleFavourite(courseId)
      .pipe(
        tap(res => {
          this.auth.verifyUser().subscribe();      
          if (res.isFavourite) {
            this.notification.success({
              summary: "Sevimlilarga qo'shildi",
              message: ""
            })
          }
        })
      )
      .subscribe({
        error: () => {
          this.userFavourites.set(prevFavouritetData)
        }
      });
  }

  addCart(courseId: string) {
    const existingOnCart = this.userCart()?.some(id => id === courseId);

    const prevCartData = this.userCart();

    if (existingOnCart) {
      this.router.navigateByUrl("cart");
      return;
    }
    
    this.userCart.update(oldData => [ ...oldData, courseId ]);
    this.cart.addCart(courseId)
      .pipe(
        tap(res => {
          this.auth.verifyUser().subscribe();
          this.notification.success({
            summary: "Savatga qo'shildi",
            message: ""
          })
        })
      )
      .subscribe({
        error: () => {
          this.userCart.set(prevCartData)
        }
      });
  }
}