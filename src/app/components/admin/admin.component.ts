import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  cake = {
    name: '',
    description: '',
    image: '',
    type: 'Cake',
    category: 'General',
    variants: [
      { weight: '250g', price: 0, isDefault: false },
      { weight: '500g', price: 0, isDefault: true },
      { weight: '1kg', price: 0, isDefault: false }
    ]
  };

  message = '';
  isError = false;

  constructor(private adminService: AdminService) {}

  submitCake() {
    this.adminService.addCake(this.cake).subscribe({
      next: (res: any) => {
        this.message = 'Cake added successfully!';
        this.isError = false;
        this.resetForm();
      },
      error: (err) => {
        this.message = 'Error adding cake. Please try again.';
        this.isError = true;
      }
    });
  }

  resetForm() {
    this.cake = {
      name: '',
      description: '',
      image: '',
      type: 'Cake',
      category: 'General',
      variants: [
        { weight: '250g', price: 0, isDefault: false },
        { weight: '500g', price: 0, isDefault: true },
        { weight: '1kg', price: 0, isDefault: false }
      ]
    };
  }
}
