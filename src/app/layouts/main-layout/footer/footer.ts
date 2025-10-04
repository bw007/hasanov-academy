import { Component, signal } from "@angular/core";

@Component({
  selector: 'app-footer',
  template: `
    <div class="text-center border-t border-color p-4">
      <p class="text-secondary text-sm">
        &copy; {{currentYear()}} Hasanov Academy
      </p>
    </div>
  `
})
export class Footer {
  readonly currentYear = signal(new Date().getFullYear());
}