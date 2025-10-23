import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'app-home',
  template: `
    <div class="w-full lg:max-w-5xl xl:max-w-7xl mx-auto mt-6 px-4 sm:px-6">
      <h1 class="text-xl mb-6">Bosh sahifa. Tez orada...</h1>
      <h1>Iltimos kuting, server uyg'onishi uchun boshlani'shiga ozroq vaqt kerak.</h1>
      <p-button
        label="Kurslarni ko'rish"
        severity="primary"
        size="small"
        routerLink="/courses"
      />
    </div>
  `,
  imports: [
    ButtonModule,
    RouterLink
  ]
})

export class Home {}
