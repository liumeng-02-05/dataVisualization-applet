import React, { Component } from "react";
import F2 from "@antv/f2";
import F2Canvas from "../F2Canvas/F2Canvas";
import Taro from '@tarojs/taro'
import DataSet from '@antv/data-set';

import { View } from "@tarojs/components";

import "./index.scss";

// const DataSet = window.DataSet;
export default class Map extends Component {
  scaleLine = config => {
    Taro.request({
      url:"https://gw.alipayobjects.com/os/antvdemo/assets/data/china-provinces.geo.json"
    }
    )
      .then(GeoJSON => {
        const geoDv = new DataSet.View().source(GeoJSON.data, {
          type: "GeoJSON"
        });

        const chart = new F2.Chart(config);
        chart.legend(false);
        chart.axis(false);
        chart.tooltip(false);

        chart.source(geoDv.rows);
        chart
          .polygon()
          .position("longitude*latitude")
          .color("grey")
          .style({
            // opacity: 0.3
          });

        chart.render();
      });
  };

  render() {
    return (
      <View class="sales-map">
        <View class="sales-map-inner">
          <View id="map_container">
            <F2Canvas
              id="Map"
              className="my_canvas"
              onInit={this.scaleLine.bind(this)}
            />
          </View>
        </View>
      </View>
    );
  }
}
