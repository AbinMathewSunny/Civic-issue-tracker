import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    title: 'Dashboard | CivicTrack',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'issues',
    title: 'All Issues | CivicTrack',
    loadComponent: () =>
      import('./features/issues/issue-list.component').then((m) => m.IssueListComponent),
  },
  {
    path: 'issues/new',
    title: 'Report Issue | CivicTrack',
    loadComponent: () =>
      import('./features/issues/issue-form.component').then((m) => m.IssueFormComponent),
  },
  {
    path: 'issues/:id/edit',
    title: 'Edit Issue | CivicTrack',
    loadComponent: () =>
      import('./features/issues/issue-form.component').then((m) => m.IssueFormComponent),
  },
  {
    path: 'issues/:id',
    title: 'Issue Details | CivicTrack',
    loadComponent: () =>
      import('./features/issues/issue-detail.component').then((m) => m.IssueDetailComponent),
  },
  { path: '**', redirectTo: 'dashboard' },
];
