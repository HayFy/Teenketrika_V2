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
  get entreprise() { return this.jobForm.get('entreprise')!; }
  get titre() { return this.jobForm.get('titre')!; }
  get typeContrat() { return this.jobForm.get('typeContrat')!; }
  get tags() { return this.jobForm.get('tags')!; }
  get emailCandidature() { return this.jobForm.get('emailCandidature')!; }
  get emailObjet() { return this.jobForm.get('emailObjet')!; }
  get region() { return this.jobForm.get('region')!; }
  get district() { return this.jobForm.get('district')!; }
  get commune() { return this.jobForm.get('commune')!; }
  get categorie() { return this.jobForm.get('categorie')!; }
  get sousCategorie() { return this.jobForm.get('sousCategorie')!; }
  get description() { return this.jobForm.get('description')!; }
  get mission() { return this.jobForm.get('mission')!; }
  get profile() { return this.jobForm.get('profile')!; }
  get dossierRequis() { return this.jobForm.get('dossierRequis')!; }
  get details() { return this.jobForm.get('details')!; }
  get dateCreation() { return new Date()!;}


  ngOnInit(): void {
    this.initialState.subscribe(job => {
      this.jobForm = this.fb.group({
        entreprise: [ job.entreprise, [Validators.required, Validators.minLength(3)]],
        titre: [ job.titre, [ Validators.required, Validators.minLength(3)]],
        typeContrat: [ job.typeContrat, [Validators.required]],
        tags: [job.tags, [Validators.required]],
        emailCandidature: [job.emailCandidature ,[Validators.required, Validators.email]],
        emailObjet: [job.emailObjet ,[Validators.required],Validators.minLength(4)],
        region: [job.region ,[Validators.required]],
        district: [job.district ,[Validators.required]],
        commune: [job.commune ,[Validators.required]],
        categorie: [job.categorie ,[Validators.required]],
        sousCategorie: [job.sousCategorie ,[Validators.required]],
        description: [job.description ,[Validators.required]],
        mission: [job.mission],
        profile: [job.profile],
        dossierRequis: [job.dossierRequis],
        details: [job.details],
        dateCreation: [job.dateCreation ,[Validators.required]]

      });
    });

    this.jobForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.jobForm.value);
  }

}
