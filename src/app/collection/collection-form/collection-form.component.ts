import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CollectionService } from '../../services/collection.service';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-collection-form',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './collection-form.component.html',
  styleUrl: './collection-form.component.css'
})
export class CollectionFormComponent implements OnInit {

  collectionForm: FormGroup;
  isEditMode: boolean = false;
  collectionId: any | null = null;
  loggedInUser: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private collectionService: CollectionService,
    private loginService: LoginService
  ) { 
    this.loggedInUser = this.loginService.getLoggedInUser();

    this.collectionForm = this.fb.group({
      wasteType: ['', Validators.required],
      photos: [''],
      estimatedWeight: ['', [Validators.required, Validators.min(1000)]],
      collectionAddress: ['', Validators.required],
      collectionDate: ['', Validators.required],
      collectionTimeSlot: ['', Validators.required],
      additionalNotes: ['']
    });
  }

  ngOnInit(): void {
    this.collectionId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = this.collectionId !== 'new';

    if (this.isEditMode) {
      const collection = this.collectionService.getCollectionById(this.collectionId);
      if (collection) {
        this.collectionForm.patchValue(collection);
      }
    }
  }

  onSubmit(): void {
    if (this.collectionForm.valid) {
      if (this.isEditMode) {
        this.collectionService.updateCollection(this.collectionId, this.collectionForm.value);
      } else {
        this.collectionService.addCollection(this.collectionForm.value, this.loggedInUser);
      }
      this.router.navigate(['/collections']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/collections']);
  }
}