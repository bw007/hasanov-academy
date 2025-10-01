import { NgClass, NgIf } from "@angular/common";
import { Component, signal } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { PanelModule } from 'primeng/panel';

@Component({
  selector: "app-course-topics",
  templateUrl: "./course-topics.html",
  imports: [
    PanelModule,
    ButtonModule
  ],
})
export class CourseTopics {
  topics = signal([
    {
      title: "Angularga kirish",
      duration: '45',
      lessons: [
        {
          title: "Angular nima?",
          duration: '5',
          autenticated: false
        },
        {
          title: "Angular o'rnatish",
          duration: '10',
          autenticated: false
        },
        {
          title: "Birinchi Angular loyihangiz",
          duration: '15',
          autenticated: true
        },
        {
          title: "Angular komponentlari",
          duration: '15',
          autenticated: true
        }
      ]
    },
    {
      title: "Angular komponentlari va shablonlar",
      duration: '60',
      lessons: [
        {
          title: "Komponentlar va shablonlar",
          duration: '10',
          autenticated: false
        },
        {
          title: "Ma'lumot bog'lash",
          duration: '15',
          autenticated: true
        },
        {
          title: "Hodisa ishlovchilari",
          duration: '15',
          autenticated: true
        },
        {
          title: "Direktivlar",
          duration: '20',
          autenticated: true
        }
      ]
    },
    {
      title: "Xizmatlar va qaramliklarni kiritish",
      duration: '50',
      lessons: [
        {
          title: "Xizmatlar nima?",
          duration: '10',
          autenticated: false
        },
        {
          title: "Qaramliklarni kiritish",
          duration: '15',
          autenticated: true
        },
        {
          title: "Xizmatlar bilan ishlash",
          duration: '15',
          autenticated: true
        },
        {
          title: "Qaramliklarni kiritish misollari",
          duration: '10',
          autenticated: true
        }
      ]
    },
    {
      title: "Yo'nalish va navigatsiya",
      duration: '40',
      lessons: [
        {
          title: "Yo'nalish asoslari",
          duration: '10',
          autenticated: true
        },
        {
          title: "Yo'nalish sozlamalari",
          duration: '10',
          autenticated: true
        },
        {
          title: "Yo'nalish va komponentlar",
          duration: '10',
          autenticated: true
        },
        {
          title: "Yo'nalish misollari",
          duration: '10',
          autenticated: true
        }
      ]
    },
    {
      title: "HTTP va tashqi APIlar",
      duration: '55',
      lessons: [
        {
          title: "HTTP mijozini tanishtirish",
          duration: '15',
          autenticated: false
        },
        {
          title: "Ma'lumotlarni olish",
          duration: '15',
          autenticated: true
        },
        {
          title: "Ma'lumotlarni yuborish",
          duration: '15',
          autenticated: true
        },
        {
          title: "Xatolarni boshqarish",
          duration: '10',
          autenticated: true
        }
      ]
    }
  ])
}