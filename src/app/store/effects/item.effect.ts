import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { ItemsService } from "src/app/services/items.service";
import { addItem, changeFilter, getItems, getItemsFailed, getItemsSucceded, removeItem, updateItem } from "../actions/item.action";

@Injectable()
export class ItemEffect {
    constructor(
        private _actions: Actions,
        private itemService: ItemsService
    ) { }

    getItems$ = createEffect(
        () => this._actions.pipe(
            ofType(getItems),
            switchMap((action) => this.itemService.getItems().pipe(
                map(items => getItemsSucceded({ items })),
                catchError(error => of(getItemsFailed({ error: "Failed" })))
            ))
        )
    )

    getItemsSucceded$ = createEffect(
        () => this._actions.pipe(
            ofType(getItemsSucceded),
            tap(
                () => {
                    console.log("getItemsSucceded");
                }
            )
        ), { dispatch: false }
    )

    getItemFailed$ = createEffect(
        () => this._actions.pipe(
            ofType(getItemsFailed)
        ), { dispatch: false }
    )

    changeFilter$ = createEffect(
        () => this._actions.pipe(
            ofType(changeFilter),
            switchMap(() => of(getItems()))
        )
    )

    addItem$ = createEffect(
        () => this._actions.pipe(
            ofType(addItem),
            switchMap(item => this.itemService.addItem(item.description).pipe(
                map(() => getItems()),
                catchError(error => of(getItemsFailed({ error: "Failed:" + error })))
            )
            )
        )
    )

    removeItem$ = createEffect(
        () => this._actions.pipe(
            ofType(removeItem),
            switchMap(item => this.itemService.remove(item.item).pipe(
                map(() => getItems()),
                catchError(error => of(getItemsFailed({ error: "Failed:" + error })))
            )
            )
        )
    )

    updateItem$ = createEffect(
        () => this._actions.pipe(
            ofType(updateItem),
            switchMap(state => this.itemService.update(state.oldItem, state.newItem).pipe(
                map(() => getItems()),
                catchError(error => of(getItemsFailed({ error: "Failed:" + error })))
            ))
        )
    )

}