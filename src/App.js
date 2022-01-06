import './App.css';
import React from 'react';

import axios from "axios"
import { Statistic ,Button, DatePicker, version, Layout, Row, Col, Divider, Table, Tag, Space } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import { columnsMeta, trasformCasesData } from "./utils";

const interval = 2*60000;
const { Header, Footer, Sider, Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading : false,
      casesData : {}
    }

  }

  getData = () => {
    axios({
      method: "GET",
      url: "https://www.mohfw.gov.in/data/datanew.json"
    }).then(resp => {
      console.log(resp)
      this.setState({
          casesData: resp.data
      })
    }).catch(error => {
      console.log(error)
      
    })

  }

  componentDidMount() {
    this.getData()
    this.timer = setInterval(()=> this.getData(), interval);
  }
  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null;
  }

  render(){
    
    const {casesData} = this.state

    const filterData = trasformCasesData(casesData)

    console.log(filterData)
 
    return(
      
    <Layout>
      <Header className="pageTitle">
        Covid-19 Country Wide Cases
          
      </Header>
      <Content className="pageContent">
        {
        (filterData && filterData.country) ? <Row justify="space-around">
        <Col span={3} offset={1}><Statistic title="Active Cases" value={filterData.country.new_active} /></Col>
        <Col span={3} ><Statistic title="Discharged" value={filterData.country.new_cured} /></Col>
        <Col span={3}><Statistic title="Deaths" value={filterData.country.new_death} /></Col>          
        </Row> : ""
        }
        
        <Divider>Covid-19 State Wise Data</Divider>
        {
          (filterData && filterData.state) ? <Table columns={columnsMeta} dataSource={filterData.state} /> : ""
        }
        
      </Content>
      <Footer>
      </Footer>
    </Layout>
      
    );
  }
}

export default App;
