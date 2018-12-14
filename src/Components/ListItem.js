import React, { Component } from 'react';

class ListItem extends Component {
    
    render() {
    let completed = this.props.completed ? "item-completed" : "";
    return (
        <li className='task-li'>
        <span className={completed}
            onClick={(e) => this.props.updateItem(this.props.index, !this.props.completed)}>
            {this.props.text}
        </span>
        <button onClick={(e) => this.props.removeItem(e.target.value, this.props.index)}>-</button>
        </li>
    );
    } 
}

export default ListItem;