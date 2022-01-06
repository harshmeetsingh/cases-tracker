import './App.css';
import React from 'react';

import axios from "axios"
import { Statistic, Layout, Row, Col, Divider, Table } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import { trasformCasesData, getStateFilter } from "./utils";

const interval = 2*60000;
const { Header, Footer, Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading : false,
      casesData : {},
      filteredInfo: null,
      sortedInfo: null,
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
  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  componentDidMount() {
    this.getData()
    this.timer = setInterval(()=> this.getData(), interval);
  }
  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null;
  }

  render(){
    const {casesData, sortedInfo, filteredInfo } = this.state
    const filterData = trasformCasesData(casesData)
    const stateFilter = filterData && getStateFilter(filterData.state)

    const columnsMeta = [{
      title: 'State Name',
      dataIndex: 'state_name',
      key: 'state_name',
      filters: stateFilter,
      filteredValue: filteredInfo?.state_name || null,
      onFilter: (value, record) => record.state_name.includes(value),
      ellipsis: true,
    },
    {
      title: 'Active',
      dataIndex: 'new_active',
      key: 'new_active',
      sorter: (a, b) => a.new_active.length - b.new_active.length,
      sortOrder: sortedInfo?.columnKey === 'new_active' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Positive',
      dataIndex: 'new_positive',
      key: 'new_positive',
      sorter: (a, b) => a.new_positive.length - b.new_positive.length,
      sortOrder: sortedInfo?.columnKey === 'new_positive' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Cured',
      dataIndex: 'new_cured',
      key: 'new_cured',
      sorter: (a, b) => a.new_cured.length - b.new_cured.length,
      sortOrder: sortedInfo?.columnKey === 'new_cured' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Death(s)',
      dataIndex: 'new_death',
      key: 'new_death',
      sorter: (a, b) => a.new_death.length - b.new_death.length,
      sortOrder: sortedInfo?.columnKey === 'new_death' && sortedInfo.order,
      ellipsis: true,
    }
  ];
 
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
          (filterData && filterData.state) ? <Table columns={columnsMeta} dataSource={filterData.state} onChange={this.handleChange} /> : ""
        }
        
      </Content>
      <Footer>
      </Footer>
    </Layout>
      
    );
  }
}

export default App;
