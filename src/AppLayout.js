import { Layout, Menu, Icon, Switch } from "antd";
import React from "react";
import PopularCities from "./modules/PopularCities";

const { Header, Sider, Content } = Layout;

class AppLayout extends React.Component {
  state = {
    collapsed: false,
    isMetric: false,
    text: "<"
  };

  toggle = () => {  //Sider
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  unitChange = checked => {  // Sıcaklık turu
    console.log("checked", checked);
    this.setState({ isMetric: checked });
  };
  

  onCollapse = collapsed => { //Sider acma kapama
    console.log(collapsed);
    this.setState({ collapsed, text: collapsed ? ">" : "<" });
  };

  render() {
    const { isMetric } = this.state;
    return (
      <Layout style={{ height: "100%" }}>
        <Sider trigger={this.state.text} collapsible collapsed={this.state.collapsed} onCollapse = {this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Icon style={{ fontSize: "20px" }} type="ant-cloud" />
              <span>Popular Cities</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon style={{ fontSize: "20px"}} type="pie-chart" />
              <span>Countries</span>
            </Menu.Item>
            <Menu.Item key="3">
            <Icon style={{ fontSize: "20px"}} type="bar-chart" />
              <span>Continents</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <p
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                padding: "10px"
              }}
            >
              <Switch
                onChange={this.unitChange}
                style={{ minWidth: "75px" }}
                checkedChildren="Metric"
                unCheckedChildren="Imperial"
              />
            </p>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >

            
            <PopularCities isMetric={isMetric} />

          </Content>
        </Layout>
       
      </Layout>
      
    );
  }
}

export default AppLayout;
