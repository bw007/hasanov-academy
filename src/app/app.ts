import { Component, computed, inject, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Responsive, Theme } from "@core/services/layout";
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  template: `
    <p-toast [breakpoints]="{ '580px': { width: '280px' } }" [position]="toastPosition()" />
    <router-outlet />
  `,
  imports: [RouterOutlet, ToastModule],
})
export class App implements OnInit{
  private theme = inject(Theme);
  protected readonly responsive = inject(Responsive);

  toastPosition = computed(() => this.responsive.isDesktop() ? "top-right" : "top-center");

  ngOnInit(): void {
    this.theme.loadTheme();
  }
}