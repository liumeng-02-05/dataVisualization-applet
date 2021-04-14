import React, { Component } from "react";
import F2 from "@antv/f2/lib/index";
import F2Canvas from "../F2Canvas/F2Canvas";
require("@antv/f2/lib/interaction/pie-select"); // 引入饼图选中交互
import RenderPie from "./renderPei";
import "./index.scss";
import { View } from "@tarojs/components";
export default class Pie extends Component {
  scalePie = config => {
    const data = [
      {
        x: "转换率",
        value: 1000,
        y: 85
      }
    ];
    const chart = new F2.Chart(config);
    chart.source(data, {
      y: {
        max: 100,
        min: 0
      }
    });
    chart.axis(false);
    chart.guide().text({
      top: true, // 指定 guide 是否绘制在 canvas 最上层，默认为 true, 即绘制在最上层
      position: ["20%", "-10%"], // 文本的起始位置，值为原始数据值，支持 callback
      content: "转化率", // 显示的文本内容
      style: {
        fill: "#fff", // 文本颜色
        fontSize: "14px", // 文本大小
        fontWeight: "bold", // 文本粗细
        opacity: 0.3
      }, // 文本的图形样式属性
      limitInPlot: true // 是否将 guide 元素限制在绘图区域图，默认为 false
    });
    chart.legend(false);

    chart.tooltip({
      triggerOn: "touchstart",
      showTitle: true,
      snap: true,
      layout: "layout",
      showCrosshairs: false,
      showTooltipMarker: false,
      showItemMarker: false,
      background: {
        padding: [6, 10]
      },
      titleStyle: {
        fontSize: 10,
        fill: "#fff",
        textAlign: "start",
        textBaseline: "top"
      },
      nameStyle: {
        fontSize: 10,
        fill: "#fff",
        textAlign: "start"
      }, // tooltip name 项的文本样式配置
      valueStyle: {
        fontSize: 10,
        fill: "#fff",
        textAlign: "start",
        textBaseline: "middle"
      }, // tooltip value 项的文本样式配置
      onShow(ev) {
        const { items } = ev;
        items[0].name = "数据";
        items[0].value = items[0].origin.value + `  (${items[0].value}%)`;
      }
    });
    chart.coord("polar", {
      transposed: true,
      innerRadius: 0.95,
      radius: 1,
      stroke: "rgb(35, 69, 145)"
    });
    chart.guide().arc({
      start: [0, 0],
      end: [1, 99.98],
      top: false,
      style: {
        lineWidth: 8,
        stroke: "rgb(35, 69, 145)"
      }
    });
    chart.guide().text({
      position: ["50%", "50%"],
      content: "85%",
      style: {
        fontSize: "12",
        fill: "#FFF",
        fontWeight: "bold" // 文本粗细
      }
    });
    chart
      .interval()
      .position("x*y")
      .color("y", "#008CD9")
      .size(8)
      .animate({
        appear: {
          duration: 120,
          easing: "cubicIn"
        }
      });
    chart.render();
    chart.interaction("pie-select", {
      appendRadius: 8,
      startEvent: "touchstart",
      defaultSelected: { x: "转换率", value: 1000, y: 85 },
      style: {
        fillOpacity: 0.5
      }
      // onStart: function(ev){
      //   console.log(ev,111)
      // }
    });
    return chart; // required
  };

  render() {
    const pie1 = {
      id: 'pei1',
      name: "转换率",
      value: 1000,
      y: 86
    };
    const pie2 = {
      id: 'pei2',
      name: "退单率",
      value: 1000,
      y: 70
    };
    const pie3 = {
      id: 'pei3',
      name: "跳失率",
      value: 1000,
      y: 43
    };
    return (
      <View class="sales-pie">
        <View class="sales-pie-inner">
          <View class="pie-item">
            <View class="pie-item-inner">
              <RenderPie pie1={pie1} />
            </View>
          </View>
          <View class="pie-item">
            <View class="pie-item-inner">
            <RenderPie pie1={pie2} />
            </View>
          </View>
          <View class="pie-item">
            <View class="pie-item-inner">
            <RenderPie pie1={pie3} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
