import {Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Job } from '../job';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent implements OnInit {

  @Input() initialState: BehaviorSubject<Job> = new BehaviorSubject({});
  @Output() formValuesChanged = new EventEmitter<Job>();
  @Output() formSubmitted = new EventEmitter<Job>();
  jobForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initialState.subscribe(job => {
      this.jobForm = this.fb.group({
        name: [ jobForm.name, [Validators.required] ],
        position: [ jobForm.position, [ Validators.required, Validators.minLength(5) ] ],
        level: [ jobForm.level, [Validators.required] ]
      });
    });

    this.jobForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

}
