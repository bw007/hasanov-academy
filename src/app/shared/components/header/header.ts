import { Component, OnInit, signal } from "@angular/core";
import { MenuItem } from "primeng/api";
import { Menubar } from "primeng/menubar";

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [Menubar]
})
export class Header implements OnInit {
  menuItems = signal(<MenuItem[]>([]))

  ngOnInit(): void {
    this.menuItems.set([
      { label: 'Bosh sahifa', icon: 'pi pi-home', routerLink: '/' },
      { label: 'Kurslar', icon: 'pi pi-info', routerLink: '/courses' },
      { label: 'Bog`lanish', icon: 'pi pi-book', routerLink: '/courses' },
    ]);
  }
}