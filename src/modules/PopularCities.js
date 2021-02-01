import { Card, Row, Col, Menu, Typography, Spin } from "antd";
import React from "react";
import axios from "axios";

// flags
import tr from "../assets/flags/tr.png";
import eng from "../assets/flags/eng.png";
import fr from "../assets/flags/fr.png";
import tha from "../assets/flags/tha.png";
import uae from "../assets/flags/uae.png";
import sgp from "../assets/flags/sgp.png";
import usa from "../assets/flags/usa.png";
import kr from "../assets/flags/kr.png";
import jpn from "../assets/flags/jpn.png";
import mys from "../assets/flags/mys.png";
import nl from "../assets/flags/nl.png";
import ru from "../assets/flags/ru.png";
import ita from "../assets/flags/ita.png";

// weather
import clear from "../assets/weather/clear.png";
import cloudy from "../assets/weather/cloudy.png";
import lightning from "../assets/weather/lightning.png";
import rainy from "../assets/weather/rainy.png";
import snow from "../assets/weather/snow.png";
import suncloud from "../assets/weather/suncloud.png";

class popularCities extends React.Component {
  state = {
    current: null,
    weather: null,
    loadingCard: false,
    currentCity: null
  };

  componentWillReceiveProps(nextProps) {
    const { currentCity } = this.state;
    if (currentCity) {
      const unit = this.getUnit(nextProps.isMetric);
      this.getWeather(currentCity, unit);
    }
  }

  getWeather = async (city, unit) => {
    await this.setState({
      loadingCard: true,
      currentCity: city
    });
    let response = await axios.get(
      "https://community-open-weather-map.p.rapidapi.com/find",
      {
        headers: {
          "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
          "X-RapidAPI-Key": "2cba0db4fdmsh19108a1ce761078p11aec4jsn340983280af2"
        },
        params: {
          q: city,
          units: unit ? unit : this.getUnit()
        }
      }
    );
    await this.setState({
      loadingCard: false
    });
    return response.data.list[0];
  };

  getUnit = () => {
    const { isMetric } = this.props;

    if (isMetric) {
      return "metric";
    } else {
      return "imperial";
    }
  };

  handleMenuClick = async e => {
    let weather = await this.getWeather(e.key);

    this.setState({
      current: e.key,
      weather
    });
  };

  getCityButtons = () => {
    const { SubMenu } = Menu;
    return (
      <Row gutter={16}>
        <Col span={4}>
          <div
            style={{
              marginTop: "5px"
            }}
          >
            <Menu
              onClick={this.handleMenuClick}
              style={{
                width: 256
              }}
              selectedKeys={[this.state.current]}
              mode="inline"
            >
              <SubMenu
                key="europe"
                title={<p style={{ fontWeight: "bold" }}>Europe</p>}
              >
                <Menu.Item key="istanbul">
                  <div>
                    <img src={tr} style={{ height: "60%" }} alt={"no flag"} />{" "}
                    {"Istanbul"}
                  </div>
                </Menu.Item>
                <Menu.Item key="antalya">
                  <div>
                    <img src={tr} style={{ height: "60%" }} alt={"no flag"} />{" "}
                    {"Antalya"}
                  </div>
                </Menu.Item>
                <Menu.Item key="amsterdam">
                  <div>
                    <img src={nl} style={{ height: "60%" }} alt={"no flag"} />{" "}
                    {"Amsterdam"}
                  </div>
                </Menu.Item>
                <Menu.Item key="london">
                  <div>
                    <img src={eng} style={{ height: "60%" }} alt={"no flag"} />{" "}
                    {"London"}
                  </div>
                </Menu.Item>
                <Menu.Item key="paris">
                  <div>
                    <img src={fr} style={{ height: "60%" }} alt={"no flag"} />{" "}
                    {"Paris"}
                  </div>
                </Menu.Item>
                <Menu.Item key="moscow">
                  <div>
                    <img src={ru} style={{ height: "60%" }} alt={"no flag"} />{" "}
                    {"Moscow"}
                  </div>
                </Menu.Item>
                <Menu.Item key="milano">
                  <div>
                    <img src={ita} style={{ height: "60%" }} alt={"no flag"} />{" "}
                    {"Milano"}
                  </div>
                </Menu.Item>
              </SubMenu>

              <SubMenu
                key="asia"
                title={<p style={{ fontWeight: "bold" }}>{"Asia"}</p>}
              >
                <Menu.Item key="bangkok">
                  <div>
                    <img src={tha} style={{ height: "60%" }} alt={"no flag"} />{" "}
                    {"Bangkok"}
                  </div>
                </Menu.Item>

                <Menu.Item key="malaysia">
                  <div>
                    <img src={mys} style={{ height: "60%" }} alt={"no flag"} />{" "}
                    {"Malaysia"}
                  </div>
                </Menu.Item>

                <Menu.Item key="japan">
                  <div>
                    <img src={jpn} style={{ height: "60%" }} alt={"no flag"} />{" "}
                    {"Japan"}
                  </div>
                </Menu.Item>

                <Menu.Item key="korea">
                  <div>
                    <img src={kr} style={{ height: "60%" }} alt={"no flag"} />{" "}
                    {"Korea"}
                  </div>
                </Menu.Item>

                <Menu.Item key="dubai">
                  <div>
                    <img src={uae} style={{ height: "60%" }} alt={"no flag"} />{" "}
                    {"Dubai"}
                  </div>
                </Menu.Item>

                <Menu.Item key="singapore ">
                  <div>
                    <img src={sgp} style={{ height: "60%" }} alt={"no flag"} />{" "}
                    {"Singapore "}
                  </div>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="africa"
                title={<p style={{ fontWeight: "bold" }}>Africa</p>}
              ></SubMenu>
              <SubMenu
                key="northAmerica"
                title={<p style={{ fontWeight: "bold" }}>{"North America"}</p>}
              >
                <Menu.Item key="new york">
                  <div>
                    <img src={usa} style={{ height: "60%" }} alt={"no flag"} />{" "}
                    {"New York"}
                  </div>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </Col>
        <Col span={20}>{this.getCard()}</Col>
      </Row>
    );
  };

  getWeatherPic = weather => {
    console.log("weather", weather);

    let weatherObj = {
      Clear: clear,
      Clouds: cloudy,
      Thunderstorm: lightning,
      Rain: rainy,
      Snow: snow,
      Suncloud: suncloud
    };
    return weatherObj[weather];
  };

  getCard = () => {
    const { weather, loadingCard } = this.state;

    if (weather) {
      console.log("weather", weather);

      return (
        <Card
          bodyStyle={{
            padding: "0px"
          }}
          hoverable
          cover={
            <div
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              <img
                style={{
                  width: "100px",
                  margin: "10px"
                }}
                alt="no pic"
                src={this.getWeatherPic(weather.weather[0].main)}
              />{" "}
            </div>
          }
        >
          <Spin spinning={loadingCard}>{this.getCardContent()}</Spin>
        </Card>
      );
    }
    return null;
  };

  getCardContent = () => {
    const { Title } = Typography;
    const { isMetric } = this.props;
    const { weather } = this.state;

    const temperature = weather.main.temp;
    const city = weather.name;
    console.log(temperature);

    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Title level={3}> {city} </Title>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <p
            style={{
              fontWeight: "bold"
            }}
          >
            {" "}
            Temperature:{" "}
          </p>
          &nbsp;
          <p>
            {temperature} {isMetric ? "C" : "F"}&#176;
          </p>
        </div>{" "}
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        ></div>
      </div>
    );
  };

  render() {
    console.log("this.state.currentCity", this.state.currentCity);
    console.log("weather", this.state.weather);
    return <div> {this.getCityButtons()} </div>;
  }
}

export default popularCities;
