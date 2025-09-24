import {Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  template: `
    <main>
      <img ngSrc="Error404.svg" priority fill alt="">
    </main>
  `,
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
})
export class Error404Page {}
