import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CollectionService } from '../../services/collection.service';
import { LoginService } from '../../services/auth/login.service';
import e from 'express';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collections-list',
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './collections-list.component.html',
  styleUrl: './collections-list.component.css'
})
export class CollectionsListComponent implements OnInit {

  collections: any[] = [];
  loggedInUser: any;

  constructor(
    private router: Router,
    private collectionService: CollectionService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.loginService.getLoggedInUser();
    if(this.loggedInUser.role === 'particular'){
      this.collections = this.collectionService.getCollectionsByUser(this.loggedInUser);
    }else{
      this.collections = this.collectionService.getCollections();
    }
  }

  onEdit(collection: any): void {
    this.router.navigate(['/collection/request', collection.id]);
  }

  onDelete(collectionId: number): void {
    this.collectionService.deleteCollection(collectionId);
    this.collections = this.collections.filter(c => c.id !== collectionId);
  }
  goToDetails(collection: any): void {
    this.router.navigate(['/collection/request-detail', collection.id]);
  }
}