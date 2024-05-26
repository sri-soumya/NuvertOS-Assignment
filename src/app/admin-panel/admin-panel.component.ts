import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent implements OnInit {
  users: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.authService.getUsers().subscribe((users) => {
      this.users = users.users;
    });
  }

  promoteToAdmin(userId: number): void {
    this.authService
      .promoteToAdmin({ id: userId, isAdmin: true })
      .subscribe(() => {
        const user = this.users.find((u: any) => u.id === userId);
        if (user) {
          user.isAdmin = true;
        }
      });
  }
}
