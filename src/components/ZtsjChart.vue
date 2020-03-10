<template>
  <ve-line :data="chartData" :settings="chartSettings" :extend="extend"></ve-line>
</template>

<script>
 import reqwest from 'reqwest';
 import global from '../global.js'
 
  var Rows= [];

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
          url: global.host+'ztsj/index',
          method: 'get',
          data: {
            results: 10,
            ...params,
          },
          type: 'json',
        }).then(data => {
        //   pagination.total = 200;
          this.loading = false;
          this.chartData = {
          columns: ["rq", "mrztgs", "fyzbgs", "dbcrgkl", "spcgl"], 
          rows: data.Rows
        }
        });
      },
    },     
    data () {
      this.extend = {
        series: {
          label: {
            normal: {
              show: true
            }
          }
        }
      }
      return {
        chartSettings : {
        metrics: ['mrztgs', 'fyzbgs'],
        dimension: ['rq'],
        labelMap: {
          'rq': '日期',
          'mrztgs': '每日涨停数量',
          'fyzbgs': '非一字板个数',
        },
      },
        chartData: {
          columns: ['rq','mrztgs', 'fyzbgs'],
          rows: Rows
        }
      }
    },    
  }
</script>