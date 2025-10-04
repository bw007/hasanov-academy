import { computed, DOCUMENT, inject, Injectable, signal } from "@angular/core";
import { PrimeIcons } from "primeng/api";

export enum ThemeType {
  Light = "light",
  Dark = "dark"
}

@Injectable({ providedIn: 'root' })
export class Theme {
  private document = inject(DOCUMENT);
  private readonly htmlDocument = this.document.documentElement;
  
  private readonly selector = "app-dark";
  private readonly storageKey = "theme";

  currentTheme = signal<ThemeType | null>(null);

  themeIcon = computed(() =>
    this.currentTheme() === ThemeType.Dark ? PrimeIcons.MOON : PrimeIcons.SUN
  );

  themeLabel = computed(() =>
    this.currentTheme() === ThemeType.Dark ? 'Yorug mavzu' : 'Tungi mavzu'
  );

  loadTheme() {
    const savedTheme = localStorage.getItem(this.storageKey);
    if (savedTheme) this.setTheme(savedTheme as ThemeType);
  }

  setTheme(theme: ThemeType) {
    this.currentTheme.set(theme);
    localStorage.setItem(this.storageKey, theme);

    this.htmlDocument.classList.toggle(this.selector, theme === ThemeType.Dark);
  }

  toggleTheme() {
    if (this.currentTheme() !== ThemeType.Dark) {
      this.setTheme(ThemeType.Dark);
      return;
    }
    this.setTheme(ThemeType.Light);
  }
}