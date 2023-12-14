import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-17-ssr';

  constructor(
    private meta: Meta
  ) { }
  ngOnInit(): void {
    this.meta.updateTag({ name: 'title', content: 'App start structure' })
  }
}
