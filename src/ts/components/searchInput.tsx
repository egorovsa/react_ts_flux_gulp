import * as React from 'react';

interface Props {
    searchUpdate: any,
    appendNewItem: any
}

interface State {
    newItemText:string
}

export class SearchInput extends React.Component<Props, State> {
    state:State = {
        newItemText: ''
    };

    private appendNew(e:KeyboardEvent):void {
        e.preventDefault();

        this.props.appendNewItem(this.state.newItemText);
        this.setState({
            newItemText:''
        });
    }

    private handleNewItemChange(e):void {
        this.setState({
            newItemText:e.target.value
        })
    }

    private handleSearchChange(e):void {
        this.props.searchUpdate(e.target.value);
    }

    public render() {
        return <div className="row">
            <div className="col-lg-6">
                <input type="text" className="form-control" placeholder="Search for..."
                       onChange={this.handleSearchChange.bind(this)}/>
            </div>
            <div className="col-lg-6">
                <form className="input-group" onSubmit={this.appendNew.bind(this)}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="New item here..."
                        value={this.state.newItemText}
                        onChange={this.handleNewItemChange.bind(this)}
                    />
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="submit">
                            Go!
                        </button>
                    </span>
                </form>
            </div>
        </div>

    }
}
