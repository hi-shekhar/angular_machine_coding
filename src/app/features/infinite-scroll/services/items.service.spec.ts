import { TestBed } from '@angular/core/testing';
import { ItemsService, Item } from './items.service';
import { of } from 'rxjs'; // For mocking observables

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a correct number of items for the first page', (done) => {
    const offset = 0;
    const limit = 10;
    service.getItems(offset, limit).subscribe(items => {
      expect(items.length).toBe(limit);
      expect(items[0].id).toBe(1);
      expect(items[9].id).toBe(10);
      done();
    });
  });

  it('should return a correct number of items for a subsequent page', (done) => {
    const offset = 10;
    const limit = 5;
    service.getItems(offset, limit).subscribe(items => {
      expect(items.length).toBe(limit);
      expect(items[0].id).toBe(11);
      expect(items[4].id).toBe(15);
      done();
    });
  });

  it('should return an empty array if offset is beyond total items', (done) => {
    const offset = 100;
    const limit = 10;
    service.getItems(offset, limit).subscribe(items => {
      expect(items.length).toBe(0);
      done();
    });
  });

  it('should return the correct total items count', () => {
    expect(service.getTotalItemsCount()).toBe(100);
  });
});