import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';
import { preRegisteredCollectors } from './services/collectors';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  // standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'recycle-hub';

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    const collectors = this.localStorageService.getItem('collectors');
    if (!collectors) {
      this.localStorageService.setItem('collectors', preRegisteredCollectors);
    }
  }
}
