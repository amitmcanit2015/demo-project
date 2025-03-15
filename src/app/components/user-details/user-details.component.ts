import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <button 
        (click)="goBack()"
        class="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded">
        ← Back
      </button>
      
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-4">User Details</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div *ngFor="let key of objectKeys(userDetails)" class="border-b pb-2">
            <div class="text-sm text-gray-600">{{ key }}</div>
            <div class="text-lg">{{ userDetails[key] }}</div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UserDetailsComponent implements OnInit {
  userDetails: any = {};
  objectKeys = Object.keys;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      const id = this.route.snapshot.paramMap.get('id');
      this.userDetails = Array.isArray(data) 
        ? data.find(user => user.id === id)
        : data;
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}