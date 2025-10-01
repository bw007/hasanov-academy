import { Component, OnInit, signal } from "@angular/core";
import { CourseCardComponent } from "@shared/components/course-card/course-card";
import { FilterPanel } from "./filter-panel/filter-panel";
import { SearchBar } from "./search-bar/search-bar";
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.html',
  imports: [
    CourseCardComponent,
    FilterPanel,
    SearchBar,
    SkeletonModule
  ]
})
export class CoursesList implements OnInit {
  isLoading = signal(true);

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 2000);
  }

  items = signal([
    {
      id: 1,
      title: "Vue.Js"
    },
    {
      id: 2,
      title: "Angular.Js"
    },
    {
      id: 3,
      title: "React.Js"
    },
    {
      id: 4,
      title: "Vue.Js"
    },
  ]);
}