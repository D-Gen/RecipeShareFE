import {Component, inject, Input} from '@angular/core';
import {Divider} from 'primeng/divider';
import {Router, RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    Divider,
    NgOptimizedImage,
    RouterLink,
  ],
  standalone: true,
  template: `
    <header class="w-full border-b-2 border-gray-100" style="height: 81px; padding: 30px">
      <div class="w-full flex justify-between">
        <a routerLink="/">
          <img ngSrc="Logo.svg"
               width="168"
               height="41"
               class="h-full object-cover"
               alt="Logo"
          />
        </a>
        <div class="h-full self-center">
        </div>
        <div class="flex h-full" style="margin-left: 70px">
          <div class="flex h-full mr-2">
            <p-divider layout="vertical" class="!hidden md:!flex"/>
            <sub style="font-size: 1.25rem; align-self: center;">👋
              Welcome, to Recipe Sharez</sub>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: ``
})
export class HeaderComponent {
  router: Router = inject(Router);

  open = false;
  @Input() name = '';
  @Input() onHamburgerClick = ()=>{};

  logout(){
    this.router.navigate(['']);
  }
}
