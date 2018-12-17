import React from 'react';

import TaskList from './TodoList';

class Task extends React.Component{
    constructor(p) {
    super(p);
    this.state = {
        text: "",
        items: [ ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    }
    
    handleChange(t) { this.setState({text: t}); }
    
    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text) return;
        let item = { text: this.state.text, completed: false };
        this.setState({text: "", items: this.state.items.concat(item)});
    }
    removeItem(e, index) {
        let items = this.state.items;
        items.splice(index, 1);
        this.setState({items: items});
    }
    updateItem(idx, state) {
        let items = this.state.items;
        items[idx].completed = state;
        this.setState({items: items});
    }
    
    render() {
        return (
        <div id='todo'>
            <h2 className='bold'>Tasks</h2>
            <form onSubmit={this.handleSubmit}>
                <div className="input-group">
            <input className='task-input'
                onChange={(e) => this.handleChange(e.target.value)}
                type="text" placeholder="What needs to be done?"
                value = {this.state.text}>
            </input>
            <button type="submit">+</button>
            </div>
            </form>
            
            <TaskList data={this.state.items} 
                updateItem={this.updateItem} removeItem={this.removeItem}/>
        </div>
        );
    }
}


export default Task;