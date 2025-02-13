import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { provideHttpClient } from '@angular/common/http'; // ✅ Use provideHttpClient

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    UserListComponent, 
    CommonModule, 
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular_Test';
}
