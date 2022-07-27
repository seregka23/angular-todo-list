import { createFeatureSelector, createSelector } from "@ngrx/store"
import { ItemState } from "../reducers/item.reducer"

export const ITEM_FEATURE_KEY = 'item'

export const itemSelector = createFeatureSelector<ItemState>(ITEM_FEATURE_KEY)
export const filterSelector = createSelector(
    itemSelector,
    (state) => state.filter
)