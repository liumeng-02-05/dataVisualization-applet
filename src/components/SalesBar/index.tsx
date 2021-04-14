import React, { Component } from "react";
import F2 from "@antv/f2";
import F2Canvas from "../F2Canvas/F2Canvas";
import { View } from "@tarojs/components";

import "./index.scss";
export default class Bar extends Component {
  onInit = config => {
    // 平台流量 platform 外部流量 external
    const changeValue = data => {
      if (data === "platform") {
        return "平台流量";
      }
      return "外部流量";
    };
    const data = [
      {
        name: "external",
        地区: "南京",
        流量: 49325
      },
      {
        name: "external",
        地区: "深圳",
        流量: 53438
      },
      {
        name: "external",
        地区: "杭州",
        流量: 61000
      },
      {
        name: "external",
        地区: "上海",
        流量: 221594
      },
      {
        name: "external",
        地区: "北京",
        流量: 234141
      },
      {
        name: "external",
        地区: "全国",
        流量: 681807
      },
      {
        name: "platform",
        地区: "南京",
        流量: 68203
      },
      {
        name: "platform",
        地区: "深圳",
        流量: 73489
      },
      {
        name: "platform",
        地区: "杭州",
        流量: 79034
      },
      {
        name: "platform",
        地区: "上海",
        流量: 204970
      },
      {
        name: "platform",
        地区: "北京",
        流量: 231744
      },
      {
        name: "platform",
        地区: "全国",
        流量: 630230
      }
    ];
    const chart = new F2.Chart(config);
    chart.guide().text({
      top: true, // 指定 guide 是否绘制在 canvas 最上层，默认为 true, 即绘制在最上层
      position: ["max", "min"], // 文本的起始位置，值为原始数据值，支持 callback
      content: "今日销售额：253,089.10元", // 显示的文本内容
      style: {
        fill: "#fff", // 文本颜色
        fontSize: "12", // 文本大小
        fontWeight: 'bold' // 文本粗细
      }, // 文本的图形样式属性
      offsetX: 40,
      offsetY: -20,
      limitInPlot: false // 是否将 guide 元素限制在绘图区域图，默认为 false
    });
    chart.coord({
      transposed: true
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
      alwaysShow: true,
      snap: true,
      layout: "vertical",
      offsetX: 10,
      offsetY: 140, // 只能生硬的改变位置
      showTooltipMarker: false,
      showCrosshairs: true,
      crosshairsType: "x",
      crosshairsStyle: {
        stroke: "rgba(0, 0, 0, 0.25)",
        lineWidth: 25
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
        items[0].value =
          changeValue(items[0].origin.name) + ": " + items[0].value;
        items[1].name = null;
        items[1].value =
          changeValue(items[1].origin.name) + ": " + items[1].value;
      }
    });
    chart.axis("地区", {
      line: null,
      grid: null,
      label: {
        stroke: "#fff",
        fontSize: "12", // 文本大小
        opacity: 0.9,
        fontWeight: 'lighter' // 文本粗细
      }
    });
    chart.axis("流量", {
      line: null,
      label: null,
      grid: (text, index, total) => {
        if (index === 0) {
          // 0％ 处的栅格线着重显示
          return {
            stroke: ""
          };
        }
        return {
          stroke: "#FFFFFF",
          lineWidth: 1,
          opacity: 0.1,
          lineDash: null // 设置直线
        };
      }
    });
    chart
      .interval()
      .adjust({
        type: "dodge",
        marginRatio: 0.3 // 设置分组间柱子的间距
      })
      .color("name", type => {
        if (type === "external") {
          return "#008CD9";
        }
        return "red";
      })
      .position("地区*流量");
    chart.render();
    return chart; // required
  };

  render() {
    return (
      <View className="bar-chart">
        <F2Canvas className="my_canvas" onInit={this.onInit.bind(this)}  />
      </View>
    );
  }
}
