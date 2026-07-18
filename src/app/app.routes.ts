import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', title: 'Dashboard | CivicTrack', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'issues', title: 'All Issues | CivicTrack', loadComponent: () => import('./features/issues/issue-list.component').then(m => m.IssueListComponent) },
  { path: '**', redirectTo: 'dashboard' },
];
