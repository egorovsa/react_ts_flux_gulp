import * as React from 'react';
import {Container} from 'flux/utils';
import {SearchInput} from './searchInput';
import {TodoItem} from './todoitem';
import {TodoStore} from '../stores/todo';


interface Props {

}

interface State {
    todoStore: TodoStore.State
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


    public render() {
        return <div className="todoMain">
                <h2>ToDo (React + TypeScript + Flux + Gulp)</h2>
                <SearchInput/>
                <br/>
                <ul className="list-group">
                    {this.state.todoStore.todoData.map((item:TodoStore.Todo, i) => <TodoItem key={i} item={item} id={item.id} title={item.title}/>)}
                </ul>

        </div>;
    }
}

export var Todo = Container.create(C);