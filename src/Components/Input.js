import React, { Component } from 'react';
import { message,Input, Button } from 'antd';

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
      var inputbox = document.getElementById("clear")
      if (inputbox.value !== ""){
        this.props.handleSetData("data", this.state.data)
        inputbox.value = "";
        message.success('Student is added !');
      } else {
        message.warning('You have put a name here !');
      }
      
      
    }
    
    
    render() { 
        return (  
            
            <div className='content'>

                <Input className="inputBox" id="clear" type="text" onChange={this.setData} onPressEnter={this.submitData}></Input>
                <Button onClick={this.submitData}>Add Student</Button>
            </div>

        );
    }
}

export default Fire;