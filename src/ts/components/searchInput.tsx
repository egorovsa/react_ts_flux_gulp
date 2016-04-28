import * as React from 'react';
import {Container} from 'flux/utils';
import {TodoStore} from '../stores/todo';
import {TodoActions} from '../actions/todo';

interface Props {

}

interface State {

}

class SI extends React.Component<Props, State> {
    private newItem:string = '';

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

    private appendNew():void {
        TodoActions.appendItem(this.newItem);
    }

    private handleNewItemChange(e):void {
        this.newItem = e.target.value;
    }

    public render() {
        return <div className="row">
            <div className="col-lg-6">
                <input type="text" className="form-control" placeholder="Search for..."/>
            </div>
            <div className="col-lg-6">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="New item here..."
                           onChange={this.handleNewItemChange.bind(this)}/>
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button" onClick={this.appendNew.bind(this)}>
                            Go!
                        </button>
                    </span>
                </div>
            </div>
        </div>

    }
}

export var SearchInput = Container.create(SI);