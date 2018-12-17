import React, { Component } from 'react';

class RowItem extends Component {
    render() {
        const { content, redBrick, show } = this.props;
        return (
            <div className={redBrick === content ? 'brick brick-active' : 'brick'} id={`brick_${content}`}>
                {show} 
            </div>
        )
    }
    }

export default RowItem;