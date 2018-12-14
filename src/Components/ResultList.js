import React from 'react';


class ResultList extends React.Component {
    state = { 
        display: false,
    }

    listItem=()=>{
        //const selectedResult = this.props.handleSelectedResult;
        const items=[];
        for(let i=0;i<this.props.dataSource.results.length;i++){
            items.push(
            <li className="student-item">
                {this.props.dataSource.results[i]} 
                <a href={this.link(i)} className='arrow' id={this.handleArrowId(i)} onClick={(e)=>this.props.handleSelectedResult(e.target.id)}> >> </a>
            </li> 
            );
    }
    return items;
}

    link=(i)=> {
        return '#' + i
    }

    handleArrowId=(i) => {
        return '0' + i
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