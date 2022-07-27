import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { firstValueFrom, map, Observable, of, tap } from 'rxjs';
import { Filters } from '../models/enums';
import { Item } from '../models/Item';
import { filterSelector } from '../store/selectors/item.selector';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  allItems: Item[] = [];
  constructor(
    private store: Store
  ) {
    this.allItems = [
      { description: 'eat', done: true },
      { description: 'sleep', done: false },
      { description: 'play', done: false },
      { description: 'laugh', done: false },
    ]
  }

  getItems(): Observable<Item[]> {
    let filter = Filters.all
    this.store.select(filterSelector).subscribe(sub => filter = sub)

    return of(filter === Filters.all ? this.allItems : this.allItems.filter(item => filter === 'done' ? item.done : !item.done))
  }

  addItem(description: string): Observable<boolean> {
    let item: Item = {
      description,
      done: false
    }
    this.allItems = [item, ...this.allItems]

    return of(true)

  }

  remove(item: Item): Observable<boolean> {
    this.allItems = [...this.allItems.filter(i => i !== item)];
    return of(true)
  }

  update(oldItem: Item, newItem: Item) {
    this.allItems = this.allItems.map(i => i === oldItem ? newItem : i)
    return of(true)
  }
}
