import * as React from 'react';
import {Container} from 'flux/utils';
import {SearchInput} from './searchInput';
import {TodoItem} from './todoitem';
import {TodoStore} from '../stores/todo';
import {TodoActions} from '../actions/todo';
import * as _ from 'lodash';

interface Props {

}

interface State {
    todoStore: TodoStore.State,
}

class C extends React.Component<Props, State> {

    static getStores() {
        return [
            TodoStore.store
        ];
    }

    static calculateState() {
        return {
            todoStore: TodoStore.store.getState()
        }
    }

    private searchUpdate(searchText) {
        TodoActions.updateSearchRequest(searchText);
    }

    private appendNewItem(searchText) {
        TodoActions.appendItem(searchText);
    }

    private filteringTodo(searchingText, todoData) {
        if (searchingText) {
            let filtered = todoData.filter((item)=> {
                if (item.title.toLowerCase().indexOf(searchingText.toString().toLowerCase()) >= 0) {
                    return true;
                }
            });
            return filtered;
        }

        return todoData;

    }

    private endedToDownSort(todoData) {
        let active =  todoData.filter(function(item){
           return !item.ended;
        });
        let ended =  todoData.filter(function(item){
           return item.ended;
        });
        return active.concat(ended);
    }

    public render() {
        let todoData = this.filteringTodo(this.state.todoStore.searchRequest, this.state.todoStore.todoData);
        todoData = this.endedToDownSort(todoData);

        return <div className="todoMain">
            <h2>ToDo (React + TypeScript + Flux + Gulp)</h2>
            <SearchInput searchUpdate={this.searchUpdate.bind(this)} appendNewItem={this.appendNewItem.bind(this)}/>
            <br/>
            <ul className="list-group">
                {todoData.map((item:TodoStore.Todo, i) =>
                <TodoItem key={i} item={item} id={item.id} title={item.title}/>)}
            </ul>

        </div>;
    }
}

export var Todo = Container.create(C);