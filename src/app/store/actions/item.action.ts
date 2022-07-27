import { createAction, props } from "@ngrx/store";
import { Filters } from "src/app/models/enums";
import { Item } from "src/app/models/Item";

export const getItems = createAction(
    "[Item] Get Items"
)
export const getItemsSucceded = createAction(
    "[Item] Get Items Succeded",
    props<{ items: Item[] }>()
)
export const getItemsFailed = createAction(
    "[Item] Get Items Failed",
    props<{ error: string }>()
)
export const addItem = createAction(
    "[Item] Add Item",
    props<{ description: string }>()
)

export const removeItem = createAction(
    "[Item] Remove Item",
    props<{ item: Item }>()
)

export const updateItem = createAction(
    "[Item] Update Item",
    props<{ oldItem: Item, newItem: Item }>()
)

export const changeFilter = createAction(
    "[Item] Change Filter",
    props<{ filter: Filters }>()
)