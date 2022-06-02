import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Job } from './job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private url = 'http://localhost:5200';
  private jobs$: Subject<Job[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshJobs() {
    this.httpClient.get<Job[]>(`${this.url}/jobs`)
      .subscribe(jobs => {
        this.jobs$.next(jobs);
      });
  }

  getJobs(): Subject<Job[]> {
    this.refreshJobs();
    return this.jobs$;
  }

  getJob(id: string): Observable<Job> {
    return this.httpClient.get<Job>(`${this.url}/Jobs/${id}`);
  }

  createJob(job: Job): Observable<string> {
    return this.httpClient.post(`${this.url}/jobs`, job, { responseType: 'text' });
  }

  updateJob(id: string, job: Job): Observable<string> {
    return this.httpClient.put(`${this.url}/jobs/${id}`, job, { responseType: 'text' });
  }

  deleteJob(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/jobs/${id}`, { responseType: 'text' });
  }
}
