import React, { Component } from "react";

import "./index.scss";
import { View } from "@tarojs/components";
export default class TopHeader extends Component {
  date() {
    const date = new Date()
    const y = date.getFullYear()
    let m = date.getMonth() + 1
    let d = date.getDate()
    m = m < 10 ? `0${m}` : m
    d = d < 10 ? `0${d}` : d
    return `${y}-${m}-${d}`
  }

  render() {
    return (
      <View class="top-header">
        <View class="title">慕课外卖数据大屏</View>
        <View class="sub-title">移动报表</View>
        <View class="date">{this.date() }</View>
      </View>
    );
  }
}
