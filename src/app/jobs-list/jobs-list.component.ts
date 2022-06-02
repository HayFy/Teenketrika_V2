import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../job';
import { JobService } from '../job.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {
  jobs$: Observable<Job[]> = new Observable();
  constructor(private jobsService: JobService) { }

  ngOnInit(): void {
    this.fetchJobs();
  }

  deleteJob(id: string): void {
    this.jobsService.deleteJob(id).subscribe({
      next: () => this.fetchJobs()
    });
  }

  private fetchJobs(): void {
    this.jobs$ = this.jobsService.getJobs();
  }



}
