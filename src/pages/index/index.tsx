import React, { Component } from "react";
import { View } from "@tarojs/components";
import ScalesBar from "../../components/SalesBar/index";
import ScalesLine from "../../components/SalesLine/index";
import ScalesPie from "../../components/SalesPie";
import ScalesMap from "../../components/SalesMap";
import ScalesSun from "../../components/SalesSun";
import ScalesRadar from "../../components/SalesRadar";
import TopHeader from "../../components/TopHeader/index";

import "./index.scss";
export default class Index extends Component {
  render() {
    return (
      <View className="home">
        <View className="data-wrapper">
          <TopHeader />
          <ScalesBar />
          <ScalesLine />
          <ScalesPie />
          <ScalesMap />
          <ScalesSun />
          <ScalesRadar />
        </View>
      </View>
    );
  }
}
