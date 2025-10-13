import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'app-home',
  template: `
    <div class="lg:container mx-auto mt-6 px-4 sm:px-6">
      <h1 class="text-xl mb-6">Bosh sahifa. Tez orada...</h1>
      <p-button
        label="Kurslarni ko'rish"
        severity="primary"
        size="small"
      />
    </div>
  `,
  imports: [
    ButtonModule
  ]
})

export class Home {}