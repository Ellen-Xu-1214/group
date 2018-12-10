import React from 'react';

import TodoList from './TodoList';

class Todo extends React.Component{
    constructor(p) {
    super(p);
    this.state = {
        text: "",
        items: [ ]
    };
    this.updateText = this.updateText.bind(this);
    this.addItem    = this.addItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    }
    
    updateText(t) { this.setState({text: t}); }
    
    addItem(e) {
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
            <h2>Tasks</h2>
            <form onSubmit={this.addItem}>
                <div className="input-group">
            <input
                onChange={(e) => this.updateText(e.target.value)}
                type="text" placeholder="What needs to be done?"
                value = {this.state.text}>
            </input>
            <button type="submit">+</button>
            </div>
            </form>
            
            <TodoList data={this.state.items} 
                updateItem={this.updateItem} removeItem={this.removeItem}/>
        </div>
        );
    }
}


export default Todo;