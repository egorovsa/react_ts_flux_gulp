import {Store} from 'flux/utils';
import {AppDispatcher} from '../dispatchers/app';
import * as _ from 'lodash';

export  namespace TodoStore {
    export interface Todo {
        id: number,
        title: string,
        ended: boolean
    }

    export interface State {
        todoData: any,
        newItemData: string
    }

    class S extends Store {
        state:State = {
            todoData: [
                {
                    id: 1,
                    title: 'first',
                    ended: true
                },
                {
                    id: 2,
                    title: 'Second',
                    ended: false
                },

            ],
            newItemData: ''
        };

        public getState():any {
            return _.extend({}, this.state);
        }

        public __onDispatch(payload:any):void {
            console.log(payload);

            switch (payload.actionType) {
                case 'DELETE' :
                {
                    let newTotos:Todo[] = [];

                    this.state.todoData.forEach((todo:Todo) => {
                        if (payload.id != todo.id) {
                            newTotos.push(todo);
                        }
                    });

                    this.state.todoData = newTotos;
                    break;
                }
                case 'NEW_ITEM' :
                {

                    this.state.todoData.push(
                        {
                            id: Date.now(),
                            title: payload.title
                        }
                    );
                    break;
                }
                case 'CHANGE_STATUS' :
                {
                    this.state.todoData = this.state.todoData.map((todo:Todo) => {
                        if(todo.id == payload.id){
                            todo.ended = !todo.ended;
                        }

                        return todo;
                    });

                    break;
                }
            }

            this.__emitChange();
        }
    }

    export let store = new S(AppDispatcher);
}