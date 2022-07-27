import { act } from "@ngrx/effects";
import { createReducer, on } from "@ngrx/store";
import { Filters } from "src/app/models/enums";
import { Item } from "src/app/models/Item";
import { getItemsFailed, getItemsSucceded, changeFilter } from "../actions/item.action";

export interface ItemState {
    items: Item[];
    filter: Filters;
    error: string;
}

const initialState: ItemState = {
    items: [],
    filter: Filters.all,
    error: ""
}

export const itemReducer = createReducer(
    initialState,
    on(getItemsSucceded, (state, action) => (
        {
            ...state,
            items: action.items
        }
    )),
    on(getItemsFailed, (state, action) => (
        {
            ...state,
            error: action.error
        }
    )),
    on(changeFilter, (state, action) => ({
        ...state,
        filter: action.filter
    }))
)