import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { IssueService } from '../../core/services/issue.service';

@Component({
  selector: 'app-issue-detail',
  imports: [DatePipe, RouterLink, MatButtonModule, MatCardModule, MatChipsModule],
  template: `
    @if (issue(); as item) {
      <a mat-button routerLink="/issues">← All issues</a>
      <div class="heading">
        <div>
          <p class="eyebrow">{{ item.category }}</p>
          <h1>{{ item.title }}</h1>
          <p>{{ item.location }}</p>
        </div>
        @if (item.reportedBy === currentUser) {
          <div>
            <a mat-stroked-button [routerLink]="['/issues', item.id, 'edit']">Edit</a
            ><button mat-button class="delete" (click)="remove()">Delete</button>
          </div>
        }
      </div>
      <mat-card>
        <mat-chip-set
          ><mat-chip>{{ item.status }}</mat-chip
          ><mat-chip>{{ item.priority }} priority</mat-chip></mat-chip-set
        >
        <h2>Description</h2>
        <p>{{ item.description }}</p>
        <hr />
        <small
          >Reported by {{ item.reportedBy }} · Last updated
          {{ item.updatedAt | date: 'mediumDate' }}</small
        >
      </mat-card>
    } @else {
      <p>Issue not found.</p>
    }
  `,
  styles: [
    `
      .heading {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: center;
        margin: 1rem 0;
      }
      .heading h1 {
        margin: 0.25rem 0;
        color: #102a43;
      }
      .heading p,
      small {
        color: #627d98;
      }
      .eyebrow {
        color: #0b7285 !important;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 0.78rem;
        letter-spacing: 0.08em;
      }
      mat-card {
        max-width: 760px;
        padding: 1.5rem;
      }
      mat-chip-set {
        margin-bottom: 1.5rem;
      }
      h2 {
        font-size: 1.1rem;
        color: #102a43;
      }
      hr {
        border: 0;
        border-top: 1px solid #d9e2ec;
        margin: 1.5rem 0;
      }
      .delete {
        color: #c92a2a;
      }
    `,
  ],
})
export class IssueDetailComponent {
  private service = inject(IssueService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected currentUser = this.service.currentUser;
  private id = Number(this.route.snapshot.paramMap.get('id'));
  protected issue = computed(() => this.service.getById(this.id));
  protected remove(): void {
    if (confirm('Delete this issue report?')) {
      this.service.delete(this.id);
      this.router.navigateByUrl('/issues');
    }
  }
}
