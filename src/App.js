import React, { Component } from 'react';
import { Layout, Icon, Row, Col, Cascader, Card, InputNumber} from 'antd';
import { Button } from 'antd';
import './App.css';
import firebase from 'firebase';
import {firebase_config} from './firebase_config.js'
import ResultList from './Components/ResultList.js';
import RowItem from './Components/RowItem';
import Todo from './Components/Todo';
import Fire from './Components/Input';

firebase.initializeApp(firebase_config);
const database = firebase.database();

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      num:'6', 
      results: [],
      groups: [],
      member:[],
      perGroup: '2',
      
      list: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      activedId: '',
      prizeId: null,
      times: 0,
      actTimes: 0,
      // Whether rolling
      isRolling: false,

      selectedResult: null,

      options : [
        {
        value: 'Class 1 (12 students)',
        label: 'Class 1 (12 students)',
        number: 12,
        class1: ['Amy','Jenny','Ben','Lily','Alice','John','Robert','Angel','James','Jacky','Nathan','Willow']
        },
        {
        value: 'Class 2 (16 students)',
        label: 'Class 2 (16 students)',
        number: 9,
        class2: ['Onna','Jackson','Matt','Yuchen','Sheldon','Dargon','Nick','Iris','Krystal']
        }
      ],
      
    };
  }

  setNewData(path,data){
    let reference = database.ref(path);
    var nwePostRef = reference.push();
    console.log('setNewData function is called!')
    nwePostRef.set(data);
  }

  changeClass(){
    this.setState({
      class1: ['']
    })
  }
  
  handleBegin() {
    // Start to draw when this.state.isRolling is false
    if (!this.state.isRolling) {
      // After click, back to default
      this.setState({
        activedId: '',
        prizeId: null,
        times: 0,
        actTimes: 0,
        isRolling: true
      }, () => {
        // Essential start
        this.handlePlay()
      })
    }
  }
  handlePlay() {
    // Random choose id
    let prize = Math.floor(Math.random() * this.state.perGroup)
    console.log(prize)
    this.setState({
      prizeId: prize,
      activedId: 0
    })
    
    let times = this.state.list.length * Math.floor(Math.random() * 3 )
    this.setState({
      times: times
    })
    // Drawing
    this.begin = setInterval(() => {
      let num;

      if (this.state.activedId === this.state.prizeId && this.state.actTimes > this.state.times) {
        clearInterval(this.begin)
        this.setState({
          isRolling: false
        })
        return
      }

      if (this.state.activedId === '') {
        num = 0
        this.setState({
          activedId: num
        })
      } else {
        num = this.state.activedId
        if (num === 6) {
          num = 0
          this.setState({
            activedId: num
          })
        } else {
          num = num + 1
          this.setState({
            activedId: num
          })
        }
      }

      this.setState({
        actTimes: this.state.actTimes + 1
      })
    }, 100)
  }


  groupMaker = (list,num) => {

    list=this.state.options[0].class1;
    num=list.length/document.getElementById("perGroup").value;
    let n=list.length-1;
    let length=n/num;
    let list1=list,list2=[],list3=[];
    for(let i=0;i<num;i++){
            let newlist=[];
            for(let j=0;j<length;j++){
                let id=Math.ceil(Math.random(0,list1.length-1)*list1.length-1);
                if(list1[id]!== undefined){newlist.push(list1[id]);};
                list1.splice(id,1);
            }
            let item = newlist.join(', ');
            list2.push(item);
            list3.push(newlist);
    };
    this.setState({
      results: list2,
      num: num,
      groups:list3, 
      perGroup: document.getElementById("perGroup").value,
    });
    console.log(list2,list3);
  }


  bricks = (i) => {
    
    let bricks = [];
    let num=12/this.state.num;

    for(let j = 1; j <= num; j++){
      if(this.state.groups[i][j-1] !== undefined){
      bricks.push(
        <RowItem show={this.state.groups[i][j-1]} content={this.state.list[j-1]} activedId={this.state.activedId}/>
        )
      }
    }
      return bricks;
  }

  setSelectedResult=(selectedResult)=>{
    this.setState({selectedResult:selectedResult});
    console.log(this.state.selectedResult)
  }

  cardMaker = () => {

    let cards = [];
    let groups = this.state.groups;

    for(let i=0; i<groups.length; i++){
      cards.push(
        <div>
        <Card className='card' bordered={false} id={i}>
          <Todo/>
          <br/><br/>
          <div className="prize">
            {this.bricks(i)}
          </div>
          <div className="begin__btn" onClick={() => this.handleBegin()}>
            Start
          </div>
        </Card>
        <br/>
        </div>
      )

    }
    return cards
  }


  render() {
    return (
      <div className='App'>
      <Layout>
        <Content>        
          <Row type="flex" justify="center" align="middle">
            <Col span={2}>
              <Icon type="question-circle" 
                theme="twoTone" 
                twoToneColor="#eb2f96"
                className='icon'/>
              </Col>
            <Col offset={1}>
              <h1 className='title'> Group Maker </h1>
            </Col>
          </Row>         
        </Content>

      <Card className='card' bordered={false}>
        <Cascader addonBefore={<Icon type="usergroup-add" size='large'/>} 
                  placeholder="Select Class"
                  options={this.state.options}
                  size='large'/>
      <Fire handleSetData={this.setNewData} />
      </Card>
      <br/>

      <Card className='card' bordered={false}>
        <Row type="flex" justify="center" align="middle">
          <Col> 
            <label style={{fontSize: 14}}>Members Per Group:</label>
          </Col>
          <Col offset={1}>
            <InputNumber min={2} 
                    max={10} 
                    step={1} 
                    defaultValue = '2'
                    size='large'
                    id='perGroup'/>
          </Col>
        </Row>
      </Card>
      <br/>

      <div>
        <Button type='primary' className="button"
        onClick={this.groupMaker}> 
        Make Groups
        </Button>
      </div>
      <br/>

      <Card className='card' bordered={false}>
        <h1 className='resultTitle'>Results</h1>
        <div>
          <ResultList dataSource={this.state} handleSelectedResult={this.setSelectedResult}/>
        </div> 
      </Card>
      <br/>

      {this.cardMaker()}

      </Layout>

      </div>
    );
  }
}

export default App;