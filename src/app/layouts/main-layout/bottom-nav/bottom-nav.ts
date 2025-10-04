import { Component, input, ViewEncapsulation } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NgClass } from "@angular/common";

import { ToolbarModule } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import { AvatarModule } from "primeng/avatar";
import { MenuItem } from "primeng/api";
import { SpeedDialModule } from "primeng/speeddial";
import { MenubarModule } from "primeng/menubar";

@Component({
  selector: "app-bottom-nav",
  templateUrl: "./bottom-nav.html",
  styleUrl: "./bottom-nav.css",
  imports: [
    NgClass,
    MenubarModule,
    ToolbarModule,
    ButtonModule,
    AvatarModule,
    RouterLink,
    RouterLinkActive,
    SpeedDialModule,
  ],
  encapsulation: ViewEncapsulation.None
})
export class BottomNav {
  readonly currentNavs = input<MenuItem[]>();
}
