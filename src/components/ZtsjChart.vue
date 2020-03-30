<template>
  <ve-line :data="chartData" :settings="chartSettings" :extend="extend"></ve-line>
</template>

<script>
import reqwest from "reqwest";
import global from "../global.js";

var Rows = [];

export default {
  name: "ztsjChart",
  mounted() {
    this.fetch();
  },
  methods: {
    fetch(params = {}) {
      console.log("fetch");
      this.loading = true;
      reqwest({
        url: global.host + "ztsj/index",
        method: "get",
        data: {
          pageSize: 50,
          pageIndex: 0,
          ...params
        },
        type: "json"
      }).then(data => {
        //   pagination.total = 200;
        this.loading = false;
        this.chartData = {
          columns: [
            "rq",
            "mrztgs",
            "fyzbgs",
            "dbcrgkl",
            "spcgl",
            "bzsl",
            "bzl"
          ],
          rows: this.rever(data.data)
        };
      });
    },
    rever(jsonObj) {
      var returnJson = [];
      var index = 0;
      for (var i = jsonObj.length - 1; i > -1; i--) {
        returnJson[index] = jsonObj[i];
        index++;
      }
      return returnJson;
    }
  },
  data() {
    this.extend = {
      series: {
        label: {
          normal: {
            show: true
          }
        }
      }
    };
    return {
      chartSettings: {
        axisSite: { right: ['dbcrgkl','spcgl','bzl'] },
        yAxisType: ['normal', 'percent'],
        yAxisName: ['数值', '比率'],
        metrics: ["mrztgs", "fyzbgs", "dbcrgkl", "spcgl", "bzsl", "bzl"],
        dimension: ["rq"],
        labelMap: {
          rq: "日期",
          mrztgs: "每日涨停数量",
          fyzbgs: "非一字板个数",
          dbcrgkl: "打板次日高开率",
          spcgl: "收盘成功率",
          bzsl: "被砸数量",
          bzl: "被砸率"
        }
      },
      chartData: {
        columns: ["rq", "mrztgs", "fyzbgs", "dbcrgkl", "spcgl", "bzsl", "bzl"],
        rows: Rows
      }
    };
  }
};
</script>