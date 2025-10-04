import { Component, computed, inject, input, signal, ViewEncapsulation } from "@angular/core";
import { NgClass } from "@angular/common";
import { RouterLink } from "@angular/router";

import { type MenuItem } from "primeng/api";
import { type NavItem } from "@core/services/layout/navigation";
import { NavType, View } from "@core/enums";
import { Theme } from "@core/services/layout";

import { MenubarModule } from "primeng/menubar";
import { MenuModule } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import { AvatarModule } from "primeng/avatar";
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: "app-header",
  templateUrl: "./header.html",
  styleUrl: "./header.css",
  imports: [
    NgClass,
    MenubarModule,
    ButtonModule,
    RouterLink,
    MenuModule,
    AvatarModule,
    BadgeModule
  ],
  encapsulation: ViewEncapsulation.None
})
export class Header {
  protected readonly theme = inject(Theme);

  readonly primaryNavs = input<MenuItem[]>();
  readonly secondaryNavs = input<NavItem[]>();
  readonly currentView = input.required<View>();
  protected readonly view = View;

  readonly scrollDown = input.required<boolean>();

  userName = signal("Hasanov");

  profileNav = computed(() =>
    this.secondaryNavs()?.find((nav) => nav.type === NavType.Profile)
  );
}
