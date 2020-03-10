import Vue from 'vue';
import  { Button,Layout,Table,Menu,Icon,Input,DatePicker,Popconfirm} from 'ant-design-vue';
import App from './App';
import VeLine from 'v-charts/lib/line.common'
import router from "./router.js";
import ref from "vue-ref";

Vue.component(Layout.name, Layout);
Vue.component(Layout.Header.name, Layout.Header);
Vue.component(Layout.Content.name, Layout.Content);
Vue.component(Layout.Footer.name, Layout.Footer);
Vue.component(Layout.Sider.name, Layout.Sider);
Vue.component(Button.name, Button);
Vue.component(Table.name, Table);
Vue.component(Menu.name, Menu);
Vue.component(Menu.Item.name, Menu.Item);
Vue.component(Icon.name, Icon);
Vue.component(Input.name, Input);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Popconfirm.name, Popconfirm);
Vue.component(VeLine.name, VeLine)

Vue.use(ref, { name: "ant-ref" });

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');