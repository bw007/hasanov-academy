import { Component, computed, input, ViewEncapsulation } from "@angular/core";
import { ToolbarModule } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import { AvatarModule } from "primeng/avatar";
import { MenuItem } from "primeng/api";
import { SpeedDialModule } from "primeng/speeddial";
import { NavItems, View } from "@core/enums";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-bottom-nav",
  templateUrl: "./bottom-nav.html",
  styleUrl: "./bottom-nav.css",
  imports: [
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
  readonly view = input.required<View>();

  readonly mobileNavs = computed(() => {
    const navs = [...(this.currentNavs() || [])];
    const homeIndex = navs.findIndex((item) => item.label === NavItems.Home);

    if (homeIndex !== -1) {
      const homeItem = navs.splice(homeIndex, 1)[0];
      navs.splice(2, 0, homeItem);
    }

    return navs;
  });
}
