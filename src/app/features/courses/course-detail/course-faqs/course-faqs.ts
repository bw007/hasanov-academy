import { Component, signal } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { PanelModule } from "primeng/panel";

@Component({
  selector: "app-course-faqs",
  templateUrl: "./course-faqs.html",
  imports: [PanelModule, ButtonModule],
})
export class CourseFaqs {
  faqs = signal([
    {
      question: "Angular nima?",
      answer: "Angular - bu javascript framework",
    },
    {
      question: "Kurs kimlar uchun?",
      answer: "Angularni o'rganmoqchi bo'lganlar va tajribani oshirmoqchilar uchun",
    },
    {
      question: "Angular",
      answer: "Angular - bu javascript framework",
    },
    {
      question: "Angular nima?",
      answer: "Angular - bu javascript framework",
    },
  ]);
}
