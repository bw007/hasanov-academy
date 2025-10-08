import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CardModule } from 'primeng/card';

@Component({
  selector: "app-auth-layout",
  templateUrl: "./auth-layout.html",
  imports: [RouterOutlet, CardModule],
})
export class AuthLayout {}