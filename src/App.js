import React, { Component } from 'react';
import { Layout, Icon, Row, Col, Cascader, Card, InputNumber} from 'antd';
import { Button, Input } from 'antd';
import './App.css';

import ResultList from './Components/ResultList.js';
import RowItem from './Components/RowItem';

const { Content } = Layout;
const { TextArea } = Input;


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      num:'6', 
      results: [],
      groups: [],
      member:[],
      perGroup: '2',

      // 九宫格内容list
      list: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      // 被选中的格子的ID
      activedId: '',
      // 中奖ID
      prizeId: null,
      // 获得prizeId之后计算出的动画次数
      times: 0,
      // 当前动画次数
      actTimes: 0,
      // 是否正在抽奖
      isRolling: false,

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


  handleBegin() {
    // this.state.isRolling为false的时候才能开始抽，不然会重复抽取，造成无法预知的后果
    if (!this.state.isRolling) {
      // 点击抽奖之后，我个人做法是将于九宫格有关的状态都还原默认
      this.setState({
        activedId: '',
        prizeId: null,
        times: 0,
        actTimes: 0,
        isRolling: true
      }, () => {
        // 状态还原之后才能开始真正的抽奖
        this.handlePlay()
      })
    }
  }
  handlePlay() {
    // 随机获取一个中奖ID
    let prize = Math.floor(Math.random() * this.state.perGroup)
    console.log(prize)
    this.setState({
      prizeId: prize,
      activedId: 0
    })
    // 随机算出一个动画执行的最小次数，这里可以随机变更数值，按自己的需求来
    let times = this.state.list.length * Math.floor(Math.random() * 3 )
    this.setState({
      times: times
    })
    // 抽奖正式开始↓↓
    this.begin = setInterval(() => {
      let num;

      if (this.state.activedId === this.state.prizeId && this.state.actTimes > this.state.times) {
        // 符合上述所有条件时才是中奖的时候，两个ID相同并且动画执行的次数大于(或等于也行)设定的最小次数
        clearInterval(this.begin)
        this.setState({
          isRolling: false
        })
        return
      }

      // 以下是动画执行时对id的判断
      if (this.state.activedId === '') {
        num = 0
        this.setState({
          activedId: num
        })
      } else {
        num = this.state.activedId
        if (num === 3) {
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
                newlist.push(list1[id]);
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


  bricks = () => {
    
    let bricks = [];
    let num=12/this.state.num;

    for(let i = 1; i <= num; i++){
      bricks.push(
        <RowItem content={this.state.list[i-1]} activedId={this.state.activedId}/>
        )
      }
      return bricks;
  }

  cardMaker = () => {
    let cards = [];
    let groups = this.state.groups;
    for(let i=0; i<groups.length; i++){
      cards.push(
        <div>
        <Card className='card' bordered={false}>
          <TextArea placeholder="Autosize height based on content lines" autosize />
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
      </Card>
      <br/>

      <Card className='card' bordered={false}>
        <Row type="flex" justify="center" align="middle">
          <Col> 
            <label style={{fontSize: 12}}>Members Per Group:</label>
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
        <Button type='primary' class="button"
        onClick={this.groupMaker}> 
        Make Groups
        </Button>
      </div>
      <br/>

      <Card className='card' bordered={false}>
        <h1 className='resultTitle'>Results</h1>
        <div>
          <ResultList dataSource={this.state}/>
        </div>
      </Card>
      <br/>

      <div>
        <Card className='card'>
        <div className="prize">
            {this.bricks()}
        </div>
        <br/><br/><br/>
        <div className="begin__btn" onClick={() => this.handleBegin()}>
            Start
        </div>
        </Card>
      </div>
      <br/>

      {this.cardMaker()}

      </Layout>

      </div>
    );
  }
}

export default App;