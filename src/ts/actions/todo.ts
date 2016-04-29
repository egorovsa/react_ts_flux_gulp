import {AppDispatcher} from '../dispatchers/app';

class Actions {
    private dispatcher:any = null;

    constructor(dispathcer) {
        this.dispatcher = dispathcer;
    }

    public deleteItem(id:number):void {
        AppDispatcher.dispatch({
            actionType: 'DELETE',
            id: id
        });
    }

    public  appendItem(title:string):void {
        AppDispatcher.dispatch({
            actionType: 'NEW_ITEM',
            title: title
        });
    }

    public changeStatus(id:number):void {
        AppDispatcher.dispatch({
            actionType: 'CHANGE_STATUS',
            id: id
        })
    }

    public searchItems(text:string):void{
        AppDispatcher.dispatch({
            actionType:'SEARCH_ITEMS',
            text: text
        })
    }

}

export var TodoActions = new Actions(AppDispatcher);
