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
        let classname = 'col-sm-12 todoItem';
        return this.props.item.ended ? classname+' ended' : classname;
    }

    private changeStatus():void {
        TodoActions.changeStatus(this.props.id);
    }

    public render() {
        return <li className="list-group-item">
            <div className="row">
                <div className={this.itemStatusClass()}   onClick={this.changeStatus.bind(this)}>
                    <span>{this.props.title}</span>
                    <button className="btn btn-danger navbar-right" onClick={this.deleteItem.bind(this)}>
                        DEL
                    </button>
                </div>

            </div>

        </li>
    }
}
