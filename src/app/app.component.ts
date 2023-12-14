import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RatingModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-17-ssr';
  value = 4;
  constructor(
    private meta: Meta
  ) { }
  ngOnInit(): void {
    this.meta.updateTag({ name: 'title', content: 'App start structure' })
    this.meta.updateTag({ name: 'description', content: 'App description' })
  }
}
