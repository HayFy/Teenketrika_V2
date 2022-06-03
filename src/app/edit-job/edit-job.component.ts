import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Job } from '../job';
import { JobService } from '../job.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {

  job: BehaviorSubject<Job> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jobService: JobService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.jobService.getJob(id !).subscribe((job) => {
     this.job.next(job);
    });
  }

  editJob(job: Job) {
    this.jobService.updateJob(this.job.value._id || '', job)
      .subscribe({
        next: () => {
          this.router.navigate(['/jobs']);
        },
        error: (error) => {
          alert('Failed to update job');
          console.error(error);
        }
      })
  }

}
