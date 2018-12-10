import React from 'react';


class ResultList extends React.Component {
    state = { 
        display: false,
    }

    listItem=()=>{
        const items=[];
        for(let i=0;i<this.props.dataSource.results.length;i++){
            items.push(
            <li className="student-item">
                {this.props.dataSource.results[i]} 
                <a href={this.link(i)} className='arrow'> >> </a>
            </li>
            );
    }
    return items;
}

    link=(i)=> {
        return '#' + i
    }

    render() { 
        return ( 
        <div>
        <ul className="student-list">
            {this.listItem()}
        </ul>

        </div>
    );
    }
}

export default ResultList;