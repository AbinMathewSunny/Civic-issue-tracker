import { Injectable, signal } from '@angular/core';
export interface Issue { id: number; title: string; description: string; location: string; priority: 'Low' | 'Medium' | 'High'; status: 'Open' | 'In Progress' | 'Resolved'; reportedBy: string; createdAt: string; }
@Injectable({ providedIn: 'root' })
export class IssueService { readonly issues = signal<Issue[]>([
  { id: 1, title: 'Large pothole near City Library', description: 'A deep pothole is damaging two-wheelers near the entrance.', location: 'MG Road, Central Ward', priority: 'High', status: 'Open', reportedBy: 'Priya Sharma', createdAt: '2026-07-16' },
  { id: 2, title: 'Streetlight not working', description: 'The crossing becomes unsafe after sunset.', location: 'Lake View Junction', priority: 'Medium', status: 'In Progress', reportedBy: 'Arjun Mehta', createdAt: '2026-07-14' },
  { id: 3, title: 'Overflowing waste bin', description: 'The public bin has not been cleared for several days.', location: 'Green Park Market', priority: 'Medium', status: 'Resolved', reportedBy: 'Neha Singh', createdAt: '2026-07-10' },
]); }
