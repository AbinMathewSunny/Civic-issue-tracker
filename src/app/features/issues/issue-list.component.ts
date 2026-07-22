import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { IssueService } from '../../core/services/issue.service';
@Component({
  selector: 'app-issue-list',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatChipsModule],
  template:
    '<div class="heading"><div><p class="eyebrow">Civic reports</p><h1>All issues</h1><p>Track reports submitted by your community.</p></div><a mat-flat-button routerLink="/issues/new">Report an issue</a></div><section>@for (issue of issues(); track issue.id) { <mat-card><mat-card-header><mat-card-title><a [routerLink]="[\'/issues\', issue.id]">{{ issue.title }}</a></mat-card-title><mat-card-subtitle>{{ issue.category }} · {{ issue.location }}</mat-card-subtitle></mat-card-header><mat-card-content><p>{{ issue.description }}</p><mat-chip-set><mat-chip>{{ issue.status }}</mat-chip><mat-chip>{{ issue.priority }} priority</mat-chip></mat-chip-set><small>Reported by {{ issue.reportedBy }}</small></mat-card-content><mat-card-actions><a mat-button [routerLink]="[\'/issues\', issue.id]">View details</a></mat-card-actions></mat-card> }</section>',
  styles: [
    '.heading{display:flex;justify-content:space-between;gap:1rem;align-items:center}.heading p{color:#627d98}.eyebrow{color:#0b7285!important;font-weight:700;text-transform:uppercase;font-size:.78rem;letter-spacing:.08em}h1{margin:0;color:#102a43;font-size:2rem}section{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;margin-top:2rem}mat-card{min-height:255px}mat-card-content{padding-top:1rem}mat-card-content p,small{color:#627d98}mat-chip-set{margin:1rem 0}mat-card-title a{color:#102a43;text-decoration:none}@media(max-width:600px){.heading{align-items:flex-start;flex-direction:column}}',
  ],
})
export class IssueListComponent {
  protected issues = inject(IssueService).issues;
}
