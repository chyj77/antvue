<template>
<div>
<div align='left'>
  <a-button type="primary"  @click="handleAdd">增加</a-button>
</div>
  <a-table
    :columns="columns"
    :rowKey="record => record.recid"
    :dataSource="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
   <template
      v-for="col in ['rq']"
      slot="rq"
      slot-scope="text, record"
    >
      <div :key="col">
          <span v-if="record.editable">
        <a-date-picker @change="e=>onRqChange(e,record.recid)"  :defaultValue="moment(new Date(), 'YYYY-MM-DD')"></a-date-picker>
        </span>
        <span v-else>{{text}}
        </span>
      </div>
    </template>
    <template
      v-for="col in ['mrztgs', 'fyzbgs','ztzdgn','ztzdgs','dbcrgkl','spcgl','bzsl','bzl']"
      :slot="col"
      slot-scope="text, record"
    >
      <div :key="col">
        <a-input
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          @change="e => handleChange(e.target.value, record.recid, col)"
        />
        <template v-else
          >{{text}}</template
        >
      </div>
    </template>
    <template slot="operation" slot-scope="text, record">
      <div class="editable-row-operations">
        <span v-if="record.editable">
          <a @click="() => save(record.recid)">保存</a>
          <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.recid)">
            <a>取消</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a @click="() => edit(record.recid)">修改</a>
          <a @click="() => onDelete(record.recid)">删除</a>
        </span>
      </div>
    </template>
  </a-table>
</div>
</template>
<script>
  import reqwest from 'reqwest';
  import moment from 'moment';
  moment.locale('zh-cn');

  const columns = [
    {
      title: '日期',
      dataIndex: 'rq',
      sorter: true,
      width: '13%',
      scopedSlots: { customRender: 'rq' },
    },
    {
      title: '每日涨停数量',
      dataIndex: 'mrztgs',
      width: '10%',
      scopedSlots: { customRender: 'mrztgs' },
    },
    {
      title: '非一字板个数',
      dataIndex: 'fyzbgs',
      width: '10%',
      scopedSlots: { customRender: 'fyzbgs' },
    },
    {
      title: '涨停最多概念',
      dataIndex: 'ztzdgn',
      width: '10%',
      scopedSlots: { customRender: 'ztzdgn' },
    },
    {
      title: '涨停最多个数',
      dataIndex: 'ztzdgs',
      width: '10%',
      scopedSlots: { customRender: 'ztzdgs' },
    },
    {
      title: '打板次日高开率',
      dataIndex: 'dbcrgkl',
      width: '13%',
      scopedSlots: { customRender: 'dbcrgkl' },
    },
    {
      title: '收盘成功率',
      dataIndex: 'spcgl',
      width: '10%',
      scopedSlots: { customRender: 'spcgl' },
    },
    {
      title: '被砸数量',
      dataIndex: 'bzsl',
      width: '8%',
      scopedSlots: { customRender: 'bzsl' },
    },
    {
      title: '被砸率',
      dataIndex: 'bzl',
      width: '8%',
      scopedSlots: { customRender: 'bzl' },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      scopedSlots: { customRender: 'operation' },
    },
  ];
  import global from '../global.js'

  export default {
    name: "ztsj",
    mounted() {
      this.fetch();
    },
    data() {
      return {
        data: [],
        pagination: {},
        loading: false,
        columns,
        count : 0,
      };
    },
    methods: {
      moment,
      getCurrentData(rq){
          // console.log(rq);
          if(!rq){
              return new Date().toLocaleDateString(); 
          }else{
              return rq;
          }
        
      },
      handleTableChange(pagination, filters, sorter) {
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        this.fetch({
          pageSize: pagination.pageSize,
          pageIndex: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      },
      fetch(params = {}) {        
          console.log("fetch");
        this.loading = true;
        reqwest({
          url: global.host+'ztsj/index',
          method: 'get',
          data: {
            pageSize: 10,
            pageIndex: 0,
            ...params,
          },
          type: 'json',
        }).then(data => {
          const pagination = { ...this.pagination };
          // Read total count from server
          pagination.total = data.totalCounts;
        //   pagination.total = 200;
          this.loading = false;
          this.data = data.data;
          this.pagination = pagination;
          console.log(this.data)
        });
      },
      handleChange(value, key, column) {
        // console.log("value",value);
        // console.log("key",key);
        // console.log("column",column);
        const newData = [...this.data];
        const target = newData.filter(item => key === item.recid)[0];
        if (target) {
          target[column] = value;
          this.data = newData;
        }else{
          const target1 = newData[0]     
          target1[column] = value;       
        }
      },
      onDelete(key) {
          console.log('deletekey====',key)
          reqwest({
          url: global.host+'ztsj/delete',
          method: 'get',
          data: {recId:key},
          type: 'json',
          complete: function (resp) {
           console.log("resp",resp.responseText);
            }
        });        
        const dataSource = [...this.data];
        this.data = dataSource.filter(item => item.recid !== key);
      },
      edit(key) {
        // console.log("key",key);
        const newData = [...this.data];
        const target = newData.filter(item => key === item.recid)[0];
        // console.log("target",target);
        if (target) {
          target.editable = true;
          this.data = newData;
        }
      },
      cancel(key) {
        console.log("key=",key)
        const newData = [...this.data];
        const target = newData.filter(item => key === item.recid)[0];
        if (target) {   
            if(target.recid > 0){
                Object.assign(target, this.data.filter(item => key === item.recid)[0]);
                delete target.editable;
                this.data = newData;
            }else{
                var startnumber =Math.abs(this.count) - Math.abs(target.recid) - 1
                newData.splice(startnumber,1);
                this.data = newData;
            }
        }
      },
      handleAdd() {
        const {count, data } = this;        
        this.count = count -1;
        var rq = moment(new Date()).format('YYYY-MM-DD') ;
        console.log("rq==",rq);
        const newData = {
          recid:count,
          rq : rq,
          mrztgs :"",
          fyzbgs :"",
          ztzdgn :"",
          ztzdgs :"",
          dbcrgkl :"",
          spcgl :"",
          bzsl :"",
          bzl :"",
        };
        newData.editable = true;
        this.data = [newData,...data];
      },
      save(key) {
        const newData = [...this.data];
        const target = newData.filter(item => key === item.recid)[0];
        if(target.recid < 1){
            target.recid='';
        }
        const param= JSON.stringify(target)
        console.log("param:",param);
        reqwest({
          url: global.host+'ztsj/save',
          method: 'post',
          data: param,
          contentType: 'application/json',
          type: 'json',
          async: false,
          complete: function (resp) {
           console.log("resp",resp.responseText);
            }
        });        
        this.fetch();
        if (target) {
          target.editable = false;
        }
      },
      onRqChange(e, key) {       
        const newData = [...this.data];
        const target = newData.filter(item => key === item.recid)[0];
        target.rq = e.format('YYYY-MM-DD');
      },
    },
  };
</script>
<style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
</style>