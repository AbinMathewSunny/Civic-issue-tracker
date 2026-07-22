import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IssueCategory, IssuePriority, IssueService } from '../../core/services/issue.service';
@Component({
  selector: 'app-issue-form',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  template:
    '<h1>{{ editing ? "Edit issue" : "Report an issue" }}</h1><p>Give clear details so your local team can act quickly.</p><mat-card><form [formGroup]="form" (ngSubmit)="submit()"><mat-form-field><mat-label>Issue title</mat-label><input matInput formControlName="title"><mat-error>A title of at least 5 characters is required.</mat-error></mat-form-field><mat-form-field><mat-label>Category</mat-label><mat-select formControlName="category">@for (category of categories; track category) { <mat-option [value]="category">{{ category }}</mat-option> }</mat-select></mat-form-field><mat-form-field><mat-label>Location</mat-label><input matInput formControlName="location"><mat-error>Please provide a location.</mat-error></mat-form-field><mat-form-field><mat-label>Priority</mat-label><mat-select formControlName="priority">@for (priority of priorities; track priority) { <mat-option [value]="priority">{{ priority }}</mat-option> }</mat-select></mat-form-field><mat-form-field class="full"><mat-label>Description</mat-label><textarea matInput rows="5" formControlName="description"></textarea><mat-error>Describe the issue in at least 15 characters.</mat-error></mat-form-field><div class="actions"><button mat-button type="button" (click)="cancel()">Cancel</button><button mat-flat-button type="submit" [disabled]="form.invalid">{{ editing ? "Save changes" : "Submit report" }}</button></div></form></mat-card>',
  styles: [
    'h1{margin-bottom:.25rem;color:#102a43}p{color:#627d98}mat-card{max-width:760px;margin-top:1.5rem;padding:1.5rem}form{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}.full,.actions{grid-column:1/-1}.actions{display:flex;justify-content:flex-end;gap:.75rem;margin-top:.5rem}@media(max-width:600px){form{grid-template-columns:1fr}}',
  ],
})
export class IssueFormComponent {
  private fb = inject(FormBuilder);
  private service = inject(IssueService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected categories: IssueCategory[] = ['Roads', 'Sanitation', 'Streetlights', 'Water'];
  protected priorities: IssuePriority[] = ['Low', 'Medium', 'High'];
  protected id = Number(this.route.snapshot.paramMap.get('id'));
  protected editing = Number.isFinite(this.id) && this.id > 0;
  protected form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    category: ['Roads' as IssueCategory, Validators.required],
    location: ['', Validators.required],
    priority: ['Medium' as IssuePriority, Validators.required],
    description: ['', [Validators.required, Validators.minLength(15)]],
  });
  constructor() {
    if (this.editing) {
      const issue = this.service.getById(this.id);
      if (issue) {
        this.form.patchValue(issue);
      } else {
        this.router.navigateByUrl('/issues');
      }
    }
  }
  protected submit() {
    if (this.form.invalid) return;
    const draft = this.form.getRawValue();
    if (this.editing) this.service.update(this.id, draft);
    else this.id = this.service.create(draft).id;
    this.router.navigate(['/issues', this.id]);
  }
  protected cancel() {
    this.router.navigateByUrl('/issues');
  }
}
