import React, { Component } from 'react';
import { Button } from 'antd';

class Fire extends Component {
    constructor(props){
      super(props)
      this.state ={
        data: '',
      };
      this.setData = this.setData.bind(this);
      this.submitData = this.submitData.bind(this);
    };
    
    setData = (event) => {
      this.setState({
        data: event.target.value
      })
    }
    
    submitData(){
      this.props.handleSetData("data", this.state.data)
      this.props.changeClass()
    }
    
    
    render() { 
        return (  
            
            <div className='content'>

                <input type="text" onChange={this.setData}></input>
                <Button onClick={this.submitData}>Add Student</Button>

            </div>

        );
    }
}
 
export default Fire;
