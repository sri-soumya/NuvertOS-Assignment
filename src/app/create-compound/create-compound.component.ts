import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompoundService } from '../services/compound.service';

@Component({
  selector: 'app-create-compound',
  templateUrl: './create-compound.component.html',
  styleUrl: './create-compound.component.css',
})
export class CreateCompoundComponent {
  newCompound: any = {};

  constructor(
    private router: Router,
    private compoundService: CompoundService
  ) {}

  cancelChanges(): void {
    this.newCompound = {};
    this.router.navigate(['/compounds']);
  }

  saveCompound(): void {
    this.compoundService.addCompound(this.newCompound).subscribe((compound) => {
      this.newCompound = compound;
      this.router.navigate(['/compounds']);
    });
  }
}
