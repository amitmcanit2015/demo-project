import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">User Management</h1>
      <div class="table-container">
        <table class="data-table">
          <thead class="table-header">
            <tr>
              <th *ngFor="let header of tableHeaders">{{ header }}</th>
            </tr>
          </thead>
          <tbody class="table-body">
            <tr *ngFor="let item of userData" 
                class="table-row"
                (click)="viewDetails(item)">
              <td *ngFor="let header of tableHeaders" 
                  class="editable-cell">
                <ng-container *ngIf="!isEditing(item, header); else editField">
                  {{ item[header] }}
                </ng-container>
                <ng-template #editField>
                  <input type="text" 
                         [(ngModel)]="item[header]"
                         (click)="$event.stopPropagation()"
                         class="form-input">
                </ng-template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class UserTableComponent implements OnInit {
  userData: any[] = [];
  tableHeaders: string[] = [];
  editingCell: { item: any, field: string } | null = null;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.userData = Array.isArray(data) ? data : [data];
      if (this.userData.length > 0) {
        this.tableHeaders = Object.keys(this.userData[0]);
      }
    });
  }

  viewDetails(item: any) {
    this.router.navigate(['/details', item.id]);
  }

  isEditing(item: any, field: string): boolean {
    return this.editingCell?.item === item && this.editingCell?.field === field;
  }

  startEditing(item: any, field: string, event: Event) {
    event.stopPropagation();
    this.editingCell = { item, field };
  }
}