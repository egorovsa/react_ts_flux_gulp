import * as React from 'react';
import {TodoActions} from '../actions/todo';


interface Props {
    title:string,
    id:number,
    item: any
}

interface State {

}

export class TodoItem extends React.Component<Props, State> {
    state:State = {}

    private deleteItem():void {
        TodoActions.deleteItem(this.props.id);
    }

    private itemStatusClass():string {
        return this.props.item.ended?'ended':'';
    }

    private changeStatus():void{
        TodoActions.changeStatus(this.props.id);
    }

    public render() {
        return <li className="list-group-item">
            <div className="row">
                <div className="col-sm-12 todoItem">
                    <span className={this.itemStatusClass()} onClick={this.changeStatus.bind(this)}>{this.props.title}</span>
                    <button className="btn btn-danger navbar-right" onClick={this.deleteItem.bind(this)}>Удалить
                    </button>
                </div>

            </div>

        </li>
    }
}
