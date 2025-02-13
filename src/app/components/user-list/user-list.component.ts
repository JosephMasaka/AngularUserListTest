import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user'; // ✅ Ensure this file exists
import { debounceTime, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  isLoading = true;
  searchTerm = new Subject<string>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Fetch users
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false; // ✅ Removed misplaced comma
        alert('Error fetching users');
      }
    });

    // Handle search with debounce
    this.searchTerm.pipe(debounceTime(300)).subscribe(term => {
      this.filteredUsers = this.users.filter(user => 
        user.name.toLowerCase().includes(term.toLowerCase())
      );
    });
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.next(value);
  }
}
