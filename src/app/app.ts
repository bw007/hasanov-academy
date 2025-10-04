import { Component, inject, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Theme } from "@core/services/layout";

@Component({
  selector: 'app-root',
  template: `<router-outlet />`,
  imports: [RouterOutlet],
})
export class App implements OnInit{
  private theme = inject(Theme);

  ngOnInit(): void {
    this.theme.loadTheme();
  }
}