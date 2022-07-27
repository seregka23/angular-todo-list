import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { Filters } from './models/enums';
import { Item } from './models/Item';
import { addItem, changeFilter, getItems, removeItem } from './store/actions/item.action';
import { filterSelector, itemSelector } from './store/selectors/item.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store
  ) { }
  ngOnInit(): void {
    this.store.dispatch(getItems())
  }

  title = "todo";

  items$ = this.store.select(itemSelector)
  filter$ = this.store.select(filterSelector)

  addItem(description: string) {
    this.store.dispatch(addItem({ description }))
  }
  remove(item: Item) {
    this.store.dispatch(removeItem({ item }))
  }

  swapFilter(filter: string) {
    this.store.dispatch(changeFilter({ filter: <Filters>filter }))
  }
}
