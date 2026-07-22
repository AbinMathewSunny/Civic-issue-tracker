import { Injectable, signal } from '@angular/core';

export type IssueCategory = 'Roads' | 'Sanitation' | 'Streetlights' | 'Water';
export type IssuePriority = 'Low' | 'Medium' | 'High';
export type IssueStatus = 'Open' | 'In Progress' | 'Resolved';
export interface Issue {
  id: number;
  title: string;
  description: string;
  category: IssueCategory;
  location: string;
  priority: IssuePriority;
  status: IssueStatus;
  reportedBy: string;
  createdAt: string;
  updatedAt: string;
}
export type IssueDraft = Omit<Issue, 'id' | 'status' | 'reportedBy' | 'createdAt' | 'updatedAt'>;

const STORAGE_KEY = 'civic-track-issues';
const CURRENT_USER = 'Priya Sharma';
const SEED_ISSUES: Issue[] = [
  {
    id: 1,
    title: 'Large pothole near City Library',
    description: 'A deep pothole is damaging two-wheelers near the entrance.',
    category: 'Roads',
    location: 'MG Road, Central Ward',
    priority: 'High',
    status: 'Open',
    reportedBy: CURRENT_USER,
    createdAt: '2026-07-16',
    updatedAt: '2026-07-16',
  },
  {
    id: 2,
    title: 'Streetlight not working',
    description: 'The crossing becomes unsafe after sunset.',
    category: 'Streetlights',
    location: 'Lake View Junction',
    priority: 'Medium',
    status: 'In Progress',
    reportedBy: 'Arjun Mehta',
    createdAt: '2026-07-14',
    updatedAt: '2026-07-17',
  },
  {
    id: 3,
    title: 'Overflowing waste bin',
    description: 'The public bin has not been cleared for several days.',
    category: 'Sanitation',
    location: 'Green Park Market',
    priority: 'Medium',
    status: 'Resolved',
    reportedBy: 'Neha Singh',
    createdAt: '2026-07-10',
    updatedAt: '2026-07-15',
  },
];

@Injectable({ providedIn: 'root' })
export class IssueService {
  readonly currentUser = CURRENT_USER;
  readonly issues = signal<Issue[]>(this.loadIssues());
  getById(id: number): Issue | undefined {
    return this.issues().find((issue) => issue.id === id);
  }
  create(draft: IssueDraft): Issue {
    const date = new Date().toISOString();
    const issue = {
      ...draft,
      id: Date.now(),
      status: 'Open' as const,
      reportedBy: CURRENT_USER,
      createdAt: date,
      updatedAt: date,
    };
    this.save([issue, ...this.issues()]);
    return issue;
  }
  update(id: number, draft: IssueDraft): void {
    this.save(
      this.issues().map((issue) =>
        issue.id === id ? { ...issue, ...draft, updatedAt: new Date().toISOString() } : issue,
      ),
    );
  }
  delete(id: number): void {
    this.save(this.issues().filter((issue) => issue.id !== id));
  }
  private loadIssues(): Issue[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as Issue[]) : SEED_ISSUES;
    } catch {
      return SEED_ISSUES;
    }
  }
  private save(issues: Issue[]): void {
    this.issues.set(issues);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));
  }
}
