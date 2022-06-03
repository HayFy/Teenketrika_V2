import { Component,  } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from '../job';
import { JobService } from '../job.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent   {

  constructor(
    private router: Router,
    private jobService: JobService
  ) { }

  addJob(job: Job) {
   this.jobService.createJob(job)
     .subscribe({
       next: () => {
         this.router.navigate(['/jobs']);
       },
       error: (error) => {
         alert("Failed to create job");
         console.error(error);
       }
     });
 }

}
