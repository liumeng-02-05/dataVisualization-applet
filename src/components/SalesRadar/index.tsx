import React, { Component } from "react";
import F2 from "@antv/f2";
import F2Canvas from "../F2Canvas/F2Canvas";

import "./index.scss";
import { View } from "@tarojs/components";
export default class Radar extends Component {
  scaleLine = config => {
    const data = [
      {
        item: "订单量",
        user: "预期",
        score: 4300
      },
      {
        item: "订单量",
        user: "实际",
        score: 5000
      },
      {
        item: "热度",
        user: "预期",
        score: 19000
      },
      {
        item: "热度",
        user: "实际",
        score: 21000
      },
      {
        item: "配送",
        user: "预期",
        score: 50000
      },
      {
        item: "配送",
        user: "实际",
        score: 42000
      },
      {
        item: "客服",
        user: "预期",
        score: 35000
      },
      {
        item: "客服",
        user: "实际",
        score: 31000
      },
      {
        item: "访问量",
        user: "预期",
        score: 28000
      },
      {
        item: "访问量",
        user: "实际",
        score: 28000
      },
      {
        item: "骑手量",
        user: "预期",
        score: 10000
      },
      {
        item: "骑手量",
        user: "实际",
        score: 14000
      }
    ];
    const chart = new F2.Chart(config);
    chart.coord("polar");
    chart.source(data, {
      score: {
        ticks: null,
        min: 4000,
        max: 60000,
        // nice: false,
        tickCount: 6
      }
    });
    chart.axis('item',{
      label:{
        stroke: "#fff",
        fontSize: "10", // 文本大小
        opacity: 0.9,
        fontWeight: 'lighter' // 文本粗细
      },
      line: null,
      grid: {
        lineWidth: 2,
        stroke: '#fff',
        opacity: 0.8,
        lineDash: null,
      }
    })
    chart.axis('score',{
      label:null,
      line:null,
      grid: (text, index, total) => {
        if ((index % 2) === 0) {
          return {
            lineWidth: 2,
            stroke: '#FFF',
            fill:'green',
            opacity: 0.3,
            lineDash: null,
          };
        }
          return {
        lineWidth: 2,
        stroke: '#fff',
        fill:'blue',
        opacity: 0.3,
        lineDash: null,
          }
      }
    })
    chart.legend(false);
    chart.tooltip({
      triggerOn: "touchstart",
      showTitle: true,
      snap: true,
      layout: "layout",
      offsetX: 10,
      offsetY: 180, // 只能生硬的改变位
      showCrosshairs: false,
      showTooltipMarker: false,
      showItemMarker: false,
      itemMarkerStyle: {
        radius: 5,
        symbol: "circle",
        lineWidth: null
      }, // 每条记录项前面的 marker 的样式配置
      background: {
        padding: [6, 10]
      },
      titleStyle: {
        fontSize: 14,
        fill: "#fff",
        textAlign: "start",
        textBaseline: "top"
      },
      nameStyle: {
        fontSize: 14,
        fill: "#fff",
        textAlign: "start",
        textBaseline: "middle"
      }, // tooltip name 项的文本样式配置
      valueStyle: {
        fontSize: 14,
        fill: "#fff",
        textAlign: "start",
        textBaseline: "middle"
      }, // tooltip value 项的文本样式配置
      onShow(ev) {
        const { items } = ev;
        // items[0].name = items.origin;
        items[0].value =items[0].value;
        // items[2].name =null;
        // items[2].value =null;
      }
    });
    chart
      .line()
      .position("item*score")
      .color('user',type => {
        if(type ==='预期'){
          return 'red'
        }
        return '#000'
      })
    chart
      .point()
      .position("item*score")
      .color("user")
      .style({
        fill: "#fff",
        lineWidth: 1,
        top: true
      })
    chart.render();
    return chart; // required
  };


  render() {
    return (
      <View class="sales-radar">
        <View class="sales-radar-inner">
          <F2Canvas
            id="Radar"
            className="my_canvas"
            onInit={this.scaleLine.bind(this)}
          />
        </View>
      </View>
    );
  }
}
