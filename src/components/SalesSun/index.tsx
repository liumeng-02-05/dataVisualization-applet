import React, { Component } from "react";
import F2 from "@antv/f2";
import F2Canvas from "../F2Canvas/F2Canvas";

import "./index.scss";
import { View } from "@tarojs/components";
export default class Sun extends Component {
  scaleLine = config => {
    //访问量  Visits: [151, 532, 901, 344]
    // 成交量  Turnover: [320, 1732, 501, 334]
    // KPI  data: [900, 900, 900, 900]
    // data: ['00:00', '08:00', '16:00', '24:00'],
    const data = [
      {
        time: "00:00",
        value: 900,
        type: "KPI"
      },
      {
        time: "08:00",
        value: 900,
        type: "KPI"
      },
      {
        time: "16:00",
        value: 900,
        type: "KPI"
      },
      {
        time: "24:00",
        value: 900,
        type: "KPI"
      },
      {
        time: "00:00",
        value: 320,
        type: "成交量"
      },
      {
        time: "08:00",
        value: 1732,
        type: "成交量"
      },
      {
        time: "16:00",
        value: 501,
        type: "成交量"
      },
      {
        time: "24:00",
        value: 334,
        type: "成交量"
      },
      {
        time: "00:00",
        value: 151,
        type: "访问量"
      },
      {
        time: "08:00",
        value: 532,
        type: "访问量"
      },
      {
        time: "16:00",
        value: 901,
        type: "访问量"
      },
      {
        time: "24:00",
        value: 344,
        type: "访问量"
      }
    ];
    const chart = new F2.Chart(config);
    chart.scale({
      value: {
        tickCount: 7
      },
      time: {
        range: [0, 1],
        tickCount: 4
      }
    });
    chart.guide().text({
      top: true, // 指定 guide 是否绘制在 canvas 最上层，默认为 true, 即绘制在最上层
      position: ["min", "max"], // 文本的起始位置，值为原始数据值，支持 callback
      content: "分时访问&成交趋势图", // 显示的文本内容
      style: {
        fill: "#fff", // 文本颜色
        fontSize: "12", // 文本大小
        fontWeight: "bold" // 文本粗细
      }, // 文本的图形样式属性
      offsetX: 40,
      offsetY: -20,
      limitInPlot: true // 是否将 guide 元素限制在绘图区域图，默认为 false
    });
    chart.legend(false);
    chart.source(data, {
      sales: {
        tickCount: 5
      }
    });
    chart.tooltip({
      triggerOn: "touchstart",
      showTitle: true,
      // alwaysShow: true,
      snap: true,
      layout: "vertical",
      offsetX: 140,
      offsetY: 140, // 只能生硬的改变位置
      showCrosshairs: true,
      crosshairsType: "y",
      crosshairsStyle: {
        stroke: "#FFF",
        lineWidth: 1
      }, // 配置辅助线的样式
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
        items[0].name = null;
        items[0].value = items[0].value;
        items[1].name = null;
      }
    });
    chart.axis("time", {
      labelOffset: 8,
      line: null,
      grid: null,
      label: {
        stroke: "#FFF",
        fontSize: "12", // 文本大小
        opacity: 0.3,
        fontWeight: 100 // 文本粗细
      }
    });
    chart.axis("value", {
      labelOffset: 8,
      // textAlign: 'start',
      line: {
        lineWidth: 1,
        stroke: "#000",
        opacity: 0.5,
        top: true // 展示在最上层
      },
      label: {
        stroke: "#FFF",
        fontSize: "12", // 文本大小
        opacity: 0.3,
        fontWeight: 100 // 文本粗细
      },
      grid: (text, index, total) => {
        return {
          stroke: "#FFFFFF",
          lineWidth: 1,
          opacity: 0.1,
          lineDash: null // 设置直线
        };
      }
    });
    chart
      .line()
      .color("type", type => {
        if (type === "成交量") {
          return "yellow";
        } else if (type === "KPI") {
          return "red";
        }
        return "#00A3E9";
      })
      .position("time*value");
    chart.render();
    return chart; // required
  };

  render() {
    return (
      <View class="sales-sun">
        <View class="sales-sun-inner">
          <F2Canvas
            id="Sun"
            className="my_canvas"
            onInit={this.scaleLine.bind(this)}
          />
        </View>
      </View>
    );
  }
}
