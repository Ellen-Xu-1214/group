import React, { Component } from 'react';

class RowItem extends Component {
    render() {
        const { content, activedId } = this.props;
        return (
            <div className={activedId === content ? 'row__item row__item-active' : 'row__item'} id={`row_item_${content}`}>
                {content}
            </div>
        )
    }
    }

export default RowItem;