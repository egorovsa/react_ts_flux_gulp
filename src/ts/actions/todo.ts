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
        console.log('ddd')
        AppDispatcher.dispatch({
            actionType: 'CHANGE_STATUS',
            id: id
        })
    }

}

export var TodoActions = new Actions(AppDispatcher);
