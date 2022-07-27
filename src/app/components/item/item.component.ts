import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from 'src/app/models/Item';
import { updateItem } from 'src/app/store/actions/item.action';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(
    private store: Store
  ) { }

  editable = false;

  @Input() item!: Item;
  @Input() newItem!: string;
  @Output() remove = new EventEmitter<Item>();

  saveItem(description: string) {
    if (!description) return;
    this.store.dispatch(updateItem({
      newItem: { ...this.item, description },
      oldItem: this.item
    }))
    this.editable = true;
  }

  ngOnInit(): void {
  }

  change() {
    this.store.dispatch(updateItem({
      newItem: { ...this.item, done: !this.item.done },
      oldItem: this.item
    }))

  }

}
