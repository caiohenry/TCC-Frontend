import { NgClass } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [],
  template: `
    <header class="title-page-comp">
      <div class="title-page-header">
        @if (icon) {
        <i class="material-icons page-icon">{{ icon }}</i>
        }

          <h1 class="page-title">{{ title }}</h1>
         
      </div>
      <div>
        <ng-content></ng-content>
      </div>
    </header>
  `,
  styleUrl: './page-title.component.scss',
})
export class PageTitleComponent implements OnInit {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() icon: string = '';
  @Input() type: 'page' | 'sub-page' = 'page';
  $route = inject(ActivatedRoute);

  ngOnInit() {
    if (!this.title) {
      this.title = this.$route.snapshot.title || '';
    }
  }
}