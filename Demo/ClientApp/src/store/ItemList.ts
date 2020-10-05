import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

export interface ItemListState {
    isLoading?: boolean;
    allItems?: Item[];
}

export interface Item {
    id?: number,
    name?: string,
    price?: number,
    category?: string
}

export interface Category {
    categoryName: string,
    items: Item[];
}

interface RequestItemListAction {
    type: 'REQUEST_ITEM_LIST';
}

interface ReceiveItemListAction {
    type: 'RECEIVE_ITEM_LIST';
    allItems: Item[];
}

interface PostedItemAction {
    type: 'POSTED_ITEM';
    newItem: Item[],
}

interface DeletedItemAction {
    type: 'DELETED_ITEM';
    newItem: Item[],
}

type KnownAction = RequestItemListAction | ReceiveItemListAction | PostedItemAction | DeletedItemAction;

export const actionCreators = {
    requestItemList: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.itemLists) {
            fetch(`itemlist`)
                .then(response => response.json() as Promise<Item[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_ITEM_LIST', allItems: data });
                });

            dispatch({ type: 'REQUEST_ITEM_LIST' });
        }
    },
    postItem: (state: Item): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.itemLists) {
            fetch(`itemlist`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ Name: state.name, category: state.category, price: Number(state.price) })
                })
                .then(response => response.json() as Promise<Item[]>)
                .then(data => {
                    dispatch({ type: 'POSTED_ITEM', newItem: data });
                });
        }
    },
    deleteItem: (state: Item): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.itemLists) {
            fetch(`itemlist`,
                {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ Name: state.name, category: state.category, price: state.price, id: state.id })
                })
                .then(response => response.json() as Promise<Item[]>)
                .then(data => {
                    dispatch({ type: 'DELETED_ITEM', newItem: data });
                });
        }
    }
};

const unloadedState: ItemListState = { allItems: [], isLoading: false };

export const reducer: Reducer<ItemListState> = (state: ItemListState | undefined, incomingAction: Action): ItemListState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_ITEM_LIST':
            return {
                allItems: state.allItems,
                isLoading: true
            };
        case 'RECEIVE_ITEM_LIST':
            return {
                allItems: action.allItems,
                isLoading: false
            };
            break;
        case 'POSTED_ITEM':
            return {
                allItems: action.newItem,
                isLoading: false
            }
            break;
        case 'DELETED_ITEM':
            return {
                allItems: action.newItem,
                isLoading: false
            }
    }

    return state;
};
