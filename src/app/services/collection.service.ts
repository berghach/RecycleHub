import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private collectionsKey = 'collections';

  constructor(private localStorageService: LocalStorageService) { }

  getCollections(): any[] {
    return this.localStorageService.getItem(this.collectionsKey) || [];
  }

  getCollectionsByUser(user: any): any[] {
    const collections = this.getCollections();
    return collections.filter((collection: any) => collection.userId === user.id);
  }

  getCollectionById(id: number): any {
    const collections = this.getCollections();
    return collections.find((collection: any) => collection.id === id);
  }

  addCollection(collection: any, user: any): void {
    const collections = this.getCollections();
    let nextId = collections.length + 1;
    const newCollection = { ...collection, id: nextId, status: 'pending', userId: user.id };
    collections.push(newCollection);
    this.localStorageService.setItem(this.collectionsKey, collections);
  }

  updateCollection(id: number, updatedCollection: any): void {
    const collections = this.getCollections();
    const index = collections.findIndex((collection: any) => collection.id === id);
    if (index >= 0) {
      collections[index] = { ...collections[index], ...updatedCollection };
      this.localStorageService.setItem(this.collectionsKey, collections);
    }
  }

  deleteCollection(id: number): void {
    let collections = this.getCollections();
    collections = collections.filter((collection: any) => collection.id !== id);
    this.localStorageService.setItem(this.collectionsKey, collections);
  }

  changeCollectionStatus(id: number, status: string): void {
    const collections = this.getCollections();
    const index = collections.findIndex((collection: any) => collection.id === id);
    if (index >= 0) {
      collections[index].status = status;
      this.localStorageService.setItem(this.collectionsKey, collections);
    }
  }
}
