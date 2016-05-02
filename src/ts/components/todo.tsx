import * as React from 'react';
import {Container} from 'flux/utils';
import {SearchInput} from './searchInput';
import {TodoItem} from './todoitem';
import {TodoStore} from '../stores/todo';
import * as _ from 'lodash';

interface Props {

}

interface State {
    todoStore: TodoStore.State
}

class C extends React.Component<Props, State> {
    private searchingText = '';

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
        this.searchingText = searchText;
        this.forceUpdate();
    }

    private filteringTodo(searchingText, todoData){
        if(searchingText){
            let filtered = todoData.filter((item)=> {
                if (item.title.toLowerCase().indexOf(searchingText.toString().toLowerCase()) >= 0) {
                    return true;
                }
            });
            return filtered;
        }else{
            return todoData;
        }
    }

    public render() {
        let todoData = this.filteringTodo(this.searchingText,this.state.todoStore.todoData);

        return <div className="todoMain">
            <h2>ToDo (React + TypeScript + Flux + Gulp)</h2>
            <SearchInput searchUpdate={this.searchUpdate.bind(this)}/>
            <br/>
            <ul className="list-group">
                {todoData.map((item:TodoStore.Todo, i) => <TodoItem key={i} item={item} id={item.id} title={item.title}/>)}
            </ul>

        </div>;
    }
}

export var Todo = Container.create(C);