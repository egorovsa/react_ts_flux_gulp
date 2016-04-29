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
        filteredData:any,
        searchRequest: string
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
                {
                    id: 3,
                    title: 'Foo',
                    ended: true
                },
                {
                    id: 4,
                    title: 'Bar',
                    ended: true
                },
            ],
            filteredData: [],
            searchRequest : ''
        };

        public getState():any {
            return _.extend({}, this.state);
        }

        public __onDispatch(payload:any):void {
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
                    this.state.todoData.map((todo:Todo) => {
                        if (todo.id == payload.id) {
                            todo.ended = !todo.ended;
                        }
                    });

                    break;
                }
                case 'SEARCH_ITEMS' :
                {
                    this.state.searchRequest = payload.text;
                    this.state.filteredData = this.state.todoData.filter((todo:Todo) => {
                        if (todo.title.toLowerCase().indexOf(payload.text.toLowerCase()) >= 0) {
                            return true;
                        }
                        return false;
                    });

                    break;
                }
            }

            this.__emitChange();
        }
    }

    export let store = new S(AppDispatcher);
}