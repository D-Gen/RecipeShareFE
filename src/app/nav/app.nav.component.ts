import {Component, OnInit} from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-nav',
  imports: [
    MenubarModule,
  ]
  ,
  templateUrl: './app.nav.component.html',
  standalone: true,
  styleUrl: './app.nav.component.css'
})
export class NavComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Add Recipe',
        routerLink: '/add-recipe',
      }

    ]
  }

}
