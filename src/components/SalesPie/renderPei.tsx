import React, { Component } from "react";
import F2 from "@antv/f2/lib/index";
require('@antv/f2/lib/component/guide/html'); // 只加载 Guide.Html 组件
import F2Canvas from "../F2Canvas/F2Canvas";
require("@antv/f2/lib/interaction/pie-select"); // 引入饼图选中交互

import "./index.scss";
export default class RenderPie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peiData: null
    };
  }
  scalePie = config => {
    const data = [
      {
        x: this.peiData.name,
        value: this.peiData.value,
        y: this.peiData.y
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
      content: this.peiData.name, // 显示的文本内容
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
      // alwaysShow: true,
      snap: true,
      layout: "layout",
      // offsetX: 140,
      // offsetY: 140, // 只能生硬的改变位置
      showCrosshairs: false,
      showTooltipMarker: false,
      showItemMarker: false,
      // itemMarkerStyle: {
      //   radius: 5,
      //   symbol: "circle",
      //   lineWidth: null
      // }, // 每条记录项前面的 marker 的样式配置
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
        // textBaseline: "middle"
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
      content: this.peiData.y + '%',
      style: {
        fontSize: "12",
        fill: "#FFF",
        fontWeight: "bold" // 文本粗细
      }
    });
    // F2 上可以修改环形图中数据内容在小程序上报错 暂时使用text代替
    // chart.guide().html({
    //   position: ["50%", "50%"],
    //   html:
    //     '<div id="number">111</div>'
    // });
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
      },
      onEnd: function onEnd(ev) {
        // F2 修改环形图中间数据的方法
        // var shape = ev.shape,
        //   data = ev.data,
        //   shapeInfo = ev.shapeInfo,
        //   selected = ev.selected;
        // console.log(data, shapeInfo, selected);
        // if (shape) {
        //   if (selected) {
        //     document.querySelector("#number").css("color", shapeInfo.color);
        //     // $('#number').text(data.percent * 100 + '%');
        //     // $('#name').text(data.name);
        //   } else {
        //     document.querySelector("#number").text("");
        //     // $('#name').text('');
        //   }
        // }
      }
    });
    return chart; // required
  };
  componentWillMount() {
    this.peiData = this.props.pie1;
  }
  render() {
    return (
      <F2Canvas
        id={this.props.pie1.id}
        className="my_canvas"
        onInit={this.scalePie.bind(this)}
      />
    );
  }
}
