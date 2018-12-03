import React from 'react';
import {List} from 'antd';

class ResultList extends React.Component {
    state = { 
        display: false,
    }

    render() { 
        return ( 
        <div>
        <List
            bordered
            dataSource={this.props.dataSource.results}
            renderItem={item => (
                <List.Item>
                    {item} <br/>
                    <a href="#dot" className='arrow'> >> </a>
                </List.Item>)} 
        />

        </div>
    );
    }
}

export default ResultList;