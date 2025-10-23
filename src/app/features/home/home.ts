import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";

import AOS from 'aos'

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  imports: [
    ButtonModule,
    RouterLink
  ]
})

export class Home implements OnInit {

  ngOnInit(): void {
    AOS.init()
  }
}
