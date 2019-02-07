import React, { Component } from 'react';
import logo from './logo.svg';
import "antd/dist/antd.css";
import './App.css';
import { Table, Row, Col, Layout, Input, Button, Modal, Select } from "antd";

const Option = Select.Option;
const { Header, Sider, Content } = Layout;
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Subject',
  dataIndex: 'subject',
  key: 'subject',
  filters: [{
    text: 'English',
    value: 'English',
  },
  {
    text: 'Hindi',
    value: 'Hindi',
  },
  {
    text: 'Maths',
    value: 'Maths',
  },
  {
    text: 'Social',
    value: 'Social',
  },
  {
    text: 'Science',
    value: 'Science',
  },
  {
    text: 'Sanskrit',
    value: 'Sanskrit',
  }],
  filterMultiple: false,
  onFilter: (value, record) => record.subject.indexOf(value) === 0,
  sorter: (a, b) => a.subject.length - b.subject.length,
  sortDirections: ['descend', 'ascend'],
}, {
  title: 'Score',
  dataIndex: 'score',
  key: 'score',
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.age - b.age,
}];

const data = [{
  key: '1',
  name: 'Priya',
  subject: 'Science',
  score: 85,
}, {
  key: '2',
  name: 'Rahul',
  subject: 'Maths',
  score: 67,
}, {
  key: '3',
  name: 'Puja',
  subject: 'English',
  score: 96,
}];

 

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      name: "",
      subject: "",
      score: ""
    }
  }
  // Opens the Modal to enter details
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  //setting the state when user clicks on send
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  //Setting the state when user clicks on cancel
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  studentName = e => {
    console.log(e);
    this.name =e.target.value;
  }

  subjectName = e => {
    this.subject = e;
  }

  subjectScore = e => {
    console.log(e);
    this.score = e.target.value;
  }

  onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  }

  // Add the score if the student with same name and subject exists
  addData = () => {
    for (var i = 0; i < data.length; i++) {
      if ((data[i].name == this.name) && (data[i].subject == this.subject)) {
        data[i].score = data[i].score + parseInt(this.score);
        this.flag = true;
      }
    }
    if (!this.flag) {
      data.push({
        name:this.name,
        subject:this.subject,
        score:parseInt(this.score)
      })
    }

  }

  render() {
    var name ;
    var subject ;
    var score ;
    var flag = false;
    return [
      <div className="mainPage">
        <Layout className="dashboardLayout">
          <Header className="fixed-header-content">
            <h1 style={{ color: "white" , marginLeft:20+'px'}}><b><i>Tailwebs</i></b></h1>
          </Header>
          <Layout className="sider-content">
            <Sider> 
              <ul> </ul>
            </Sider>
          </Layout>
          <Content>
            <div className="main-content">
              <h1 style={{textAlign:'center'}}>Students Marks List</h1>
              <h3>Add details</h3>
              <Table columns={columns} dataSource={data}  onChange={this.onChange}/>
              <Button type="primary" onClick={() => {this.showModal(); this.flag = false}}>Add</Button>
            </div>
          </Content>
        </Layout>
      </div>,
      <Modal
        title="Add Data"
        visible={this.state.visible}
        onOk={() => { this.addData(); this.handleOk(); this.setState({ name: "", score: "", subject: "" }) }}
        okText="Add"
        onCancel={this.handleCancel}
      >
        <Row>
          <Col span={18} offset={3} >
            <label>Name:</label>
            <Input className="name" style={{ width: 100 + "%", paddingLeft: 0 + 'px' }} value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }); this.studentName(e) }} />
          </Col>

          <Col span={18} offset={3} style={{ marginTop: 10 + 'px' }}>
            <label>Subject:</label>
            <Select className="subject" style={{ width: 100 + "%", paddingLeft: 0 + 'px' }} value={this.state.subject} onChange={(e) => { this.setState({ subject: e }); this.subjectName(e) }}>
              <Option value=" " disabled>Select Subject</Option>
              <Option value="English">English</Option>
              <Option value="Hindi">Hindi</Option>
              <Option value="Maths">Maths</Option>
              <Option value="Science">Science</Option>
              <Option value="Social">Social</Option>
              <Option value="Sanskrit">Sanskrit</Option>
            </Select>
          </Col>
          <Col span={18} offset={3} style={{ marginTop: 10 + 'px' }}>
            <label>Score:</label>
            <Input className="score" style={{ width: 100 + "%", paddingLeft: 0 + 'px' }} value={this.state.score} onChange={(e) => { this.setState({ score: e.target.value }); this.subjectScore(e) }} />
          </Col>
        </Row>
      </Modal>
    ]
  }
}

export default App;
