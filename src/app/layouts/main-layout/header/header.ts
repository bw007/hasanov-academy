import { Component, computed, inject, input, ViewEncapsulation } from "@angular/core";
import { NgClass } from "@angular/common";
import { RouterLink } from "@angular/router";

import { Auth } from "@core/services/api";
import { type MenuItem } from "primeng/api";
import { type NavItem } from "@core/constants/navigation-items";

import { NavType, View } from "@core/enums";
import { Theme } from "@core/services/layout";

import { MenubarModule } from "primeng/menubar";
import { ButtonModule } from "primeng/button";
import { AvatarModule } from "primeng/avatar";
import { BadgeModule } from 'primeng/badge';
import { SpeedDialModule } from 'primeng/speeddial';

@Component({
  selector: "app-header",
  templateUrl: "./header.html",
  styleUrl: "./header.css",
  imports: [
    NgClass,
    MenubarModule,
    ButtonModule,
    RouterLink,
    AvatarModule,
    BadgeModule,
    SpeedDialModule
  ],
  encapsulation: ViewEncapsulation.None
})
export class Header {
  protected readonly theme = inject(Theme);
  private auth = inject(Auth);

  readonly primaryNavs = input<MenuItem[]>();
  readonly secondaryNavs = input.required<NavItem[]>();
  readonly currentView = input.required<View>();
  protected readonly view = View;

  readonly scrollDown = input.required<boolean>();

  isStudent = this.auth.isStudent;
  userName = computed(() => this.auth.user()?.name);
  avatar = computed(() => this.auth.user()?.avatar);
  cart = computed(() => this.auth.user()?.cart?.length || '');
  favourites = computed(() => this.auth.user()?.favourites?.length || '')

  profileNav = computed(() =>
    this.secondaryNavs()?.find((nav) => nav.type === NavType.Profile)
  );
}
