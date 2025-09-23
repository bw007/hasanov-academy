import { Component, computed, DOCUMENT, inject, input, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Menubar } from "primeng/menubar";
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem, PrimeIcons } from "primeng/api";
import { AvatarModule } from "primeng/avatar"
import { NavItems, View } from "@core/enums";

enum Theme {
  Light = 'light',
  Dark = 'dark'
}

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  imports: [Menubar, ButtonModule, RouterLink, MenuModule, AvatarModule]
})
export class Header {
  private document = inject(DOCUMENT);

  readonly primaryNavs = input<MenuItem[]>();
  readonly secondaryNavs = input<MenuItem[]>();
  readonly view = input.required<View>();

  theme = signal<Theme | ''>('');
  userName = signal('Hasanov');

  constructor() {
    const savedTheme = <Theme>localStorage.getItem('theme');

    if (savedTheme) {
      this.setTheme(savedTheme);
    }
  }

  profileNav = computed(() =>
    this.secondaryNavs()?.find(nav => nav.label === NavItems.Profile)
  );
  
  themeIcon = computed(() => 
    this.theme() === Theme.Dark ? PrimeIcons.SUN : PrimeIcons.MOON
  );

  themeLabel = computed(() =>
    this.theme() === Theme.Dark ? 'Yorug mavzu' : 'Tungi mavzu'
  );

  setTheme(theme: Theme) {
    const el = this.document.documentElement;
    const darkModeSelector = "app-dark";

    this.theme.set(theme);
    localStorage.setItem('theme', this.theme());

    el.classList.toggle(darkModeSelector, theme === Theme.Dark);
  }

  toggleTheme() {    
    if (this.theme() !== Theme.Dark) {
      this.setTheme(Theme.Dark);
      return;
    }
    this.setTheme(Theme.Light);
  }
}