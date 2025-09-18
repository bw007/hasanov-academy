import { Component, inject, OnInit } from "@angular/core";
import { ResponsiveService } from "../../../core/services/responsive";

import { Header } from "../../components/header/header";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.html",
  imports: [Header]
})
export class MainLayout implements OnInit {
  private responsiveService = inject(ResponsiveService);

  ngOnInit(): void {
    this.responsiveService.isWeb$.subscribe(result => {
      console.log(result.matches);
    });    
  }
}