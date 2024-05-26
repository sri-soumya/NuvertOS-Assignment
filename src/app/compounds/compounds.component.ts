import { Component, OnInit } from '@angular/core';
import { CompoundService } from '../services/compound.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-compounds',
  templateUrl: './compounds.component.html',
  styleUrls: ['./compounds.component.css'],
})
export class CompoundsComponent implements OnInit {
  compounds: any[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  page: number = 1;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private compoundService: CompoundService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCompounds();
    const token: string | null = localStorage.getItem('token');
    if (token !== null) {
      const decoded: any = jwtDecode(token);
      this.isAdmin = decoded.isAdmin;
    }
  }

  loadCompounds(): void {
    this.compoundService
      .getCompounds(this.page, this.pageSize)
      .subscribe((data) => {
        this.compounds = data.compounds;
        this.totalItems = data.totalItems;
      });
  }

  onChange(page: number): void {
    this.page = page;
    this.loadCompounds();
  }

  goToDetails(id: number): void {
    this.router.navigate(['/compounds', id]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToAdminPanel(): void {
    this.router.navigate(['/admin']);
  }

  goToAddCompound(): void {
    this.router.navigate(['/compounds/add']);
  }
}
