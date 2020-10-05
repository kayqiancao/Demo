import * as ItemLists from './ItemList';

export interface ApplicationState {
    itemLists: ItemLists.ItemListState | undefined;
}

export const reducers = {
    itemLists: ItemLists.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
