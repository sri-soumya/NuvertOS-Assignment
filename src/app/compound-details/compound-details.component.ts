import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompoundService } from '../services/compound.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-compound-details',
  templateUrl: './compound-details.component.html',
  styleUrls: ['./compound-details.component.css'],
})
export class CompoundDetailsComponent implements OnInit {
  compound: any = {};
  isAdmin: boolean = false;
  isEditing: boolean = false;
  editedCompound: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private compoundService: CompoundService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.compoundService.getCompound(+id).subscribe((data) => {
        this.compound = data;
        const date = new Date(this.compound.dateModified);
        this.compound.dateModified = date.toLocaleString();
        this.editedCompound = { ...data };
      });
    }
    this.isAdmin = this.authService.isAdmin();
  }

  enableEdit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editedCompound = { ...this.compound };
  }

  saveChanges(): void {
    this.compoundService
      .updateCompound(this.compound.id, this.editedCompound)
      .subscribe(() => {
        this.compound = { ...this.editedCompound };
        const date = new Date();
        this.compound.dateModified = date.toLocaleString();
        this.isEditing = false;
      });
  }

  deleteCompound(): void {
    this.compoundService.deleteCompound(this.compound.id).subscribe(() => {
      this.router.navigate(['/compounds']);
    });
  }
}
