import { Component } from "@angular/core";
import { StudyHeader } from "./header/study-header";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-study-layout',
  templateUrl: './study-layout.html',
  imports: [StudyHeader, RouterOutlet]
})
export class StudyLayout {}