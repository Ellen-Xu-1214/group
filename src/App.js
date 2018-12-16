import React, { Component } from 'react';
import { Layout, Icon, Row, Col, Cascader, Card, InputNumber} from 'antd';
import { Button } from 'antd';
import './App.css';
import firebase from 'firebase';
import {firebase_config} from './firebase_config.js'
import ResultList from './Components/ResultList.js';
import RowItem from './Components/RowItem';
import Task from './Components/Todo';
import Fire from './Components/Input';

firebase.initializeApp(firebase_config);
const database = firebase.database();

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      num:'0', 
      results: [],
      groups: [],
      member:[],
      perGroup: '2',
      
      list: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      redBrick: '',
      selectedNum: null,
      times: 0,
      actTimes: 0,
      // Whether rolling
      isRolling: false,

      selectedResult: null,

      options : [
        {
        value: 'Class 1',
        label: 'EAP Class',
        number: '',
        class1: [],
        },
        {
        value: 'Class 2',
        label: 'GPS Class',
        number: '',
        class2: [''],
        },
        {
          value: 'Class 3',
          label: 'Elective Class',
          number: '',
          class2: [''],
          }
      ],
      
    };
  }

  reFresh(){
    document.location.reload();
  }
  
  
  setSelectedResult=(selectedResult)=>{
    console.log(selectedResult.slice(1,));
    const selectedCard = document.getElementById(selectedResult.slice(1,));
    selectedCard.style.display = 'block';}
  
  setDataOnDB(){
    let reference = database.ref("data");
    reference.set({});
    document.location.reload();
    alert('Reset Successful !');
  }

  setNewData(path,data){
    let reference = database.ref(path);
    var nwePostRef = reference.push();
    console.log('setNewData function is called!')
    nwePostRef.set(data);
  }

  clearInput(){
    document.getElementById("output").value='';
  }

  componentDidMount(){
    //console.log("Mounted");
    let reference = database.ref("data");
    reference.on("child_added", (newData) => {
    //console.log(newData.val())
    //alert("database has new content");
    let temp = this.state.options;
    //console.log(temp[0].class1);
    var newupdate = temp[0].class1.concat([newData.val()]);
    //console.log(newupdate);
    temp[0].class1=newupdate;

    this.setState({
      options: temp
    })
    console.log(this.state.options[0].class1);
    })
  }
  
  // show the selected class
  handleChange = (value) => {
    console.log(value);
  }
  
  handleBegin() {
    // Start to draw when this.state.isRolling is false
    if (!this.state.isRolling) {
      // After click, back to default
      this.setState({
        redBrick: '',
        selectedNum: null,
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
      // console.log(prize)
    this.setState({
      selectedNum: prize,
      redBrick: 0
    })
    
    let times = this.state.list.length * Math.floor(Math.random() * 3 )
    this.setState({
      times: times
    })
    // Drawing
    this.begin = setInterval(() => {
      let num;

      if (this.state.redBrick === this.state.selectedNum && this.state.actTimes > this.state.times) {
        clearInterval(this.begin)
        this.setState({
          isRolling: false
        })
        return
      }

      if (this.state.redBrick === '') {
        num = 0
        this.setState({
          redBrick: num
        })
      } else {
        num = this.state.redBrick
        if (num === 20) {
          num = 0
          this.setState({
            redBrick: num
          })
        } else {
          num = num + 1
          this.setState({
            redBrick: num
          })
        }
      }

      this.setState({
        actTimes: this.state.actTimes + 1
      })
    }, 100)
  }


  groupMaker = (list,num) => {

    this.setState({num:'0', 
      results: [],
      groups: [],
      member:[],
      perGroup: '2',
    })

    list=this.state.options[0].class1;
    num=list.length/document.getElementById("perGroupNum").value;
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
      perGroup: document.getElementById("perGroupNum").value,
    });
    console.log(list2,list3);
  }


  bricks = (i) => {
    
    let bricks = [];
    let num=400/this.state.num;

    for(let j = 1; j <= num; j++){
      if(this.state.groups[i][j-1] !== undefined){
      bricks.push(
        <RowItem show={this.state.groups[i][j-1]} content={this.state.list[j-1]} redBrick={this.state.redBrick}/>
        )
      }
    }
      return bricks;
  }


  cardMaker = () => {

    let cards = [];
    let groups = this.state.groups;

    for(let i=0; i<groups.length; i++){
      cards.push(
        <div>
        <Card className='switchCard' bordered={false} id={i}>
          <Task/>
          <br/>
          <p className='pink' style={{fontSize: 14}}>
          What if no one is up to the task?
          </p>
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

          <Row type="flex" justify="center" align="middle" className='groupRow'>
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
                  size='large'
                  onChange={this.handleChange}/>
      <Fire handleSetData={this.setNewData}/>
      <Button className='reset' type= 'danger' onClick={this.setDataOnDB}>Refresh</Button>
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
                    id='perGroupNum'/>
          </Col>
        </Row>
      </Card>
      <br/>

      <div>
        <Button type='primary' ghost size='large' className="button"
        onClick={this.groupMaker}> 
        Make Groups
        </Button>
      </div>
      
      <div>
        <Button type='danger' ghost size='large' className="button"
        onClick={this.reFresh}> 
        Reset
        </Button>
      </div>
      
      <Card className='card' bordered={false}>
        <h1 className='resultTitle'>Results</h1>
        <div>
          <ResultList dataSource={this.state} 
          handleSelectedResult={this.setSelectedResult}/>
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