import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CardModule } from 'primeng/card';

@Component({
  selector: "app-auth-layout",
  templateUrl: "./auth-layout.html",
  styleUrls: ["./auth-layout.css"],
  imports: [RouterOutlet, CardModule],
})
export class AuthLayout {}