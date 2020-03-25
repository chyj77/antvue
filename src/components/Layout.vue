<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout style="min-height: 100vh">
      <a-layout-sider
        :trigger="null"
        collapsible
        v-model="collapsed"
        width="180px"
        breakpoint="lg"
        collapsedWidth="0"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
      >
        <SiderMenu :theme="navTheme" :collapsed="collapsed" />
      </a-layout-sider>
      <a-layout>
        <!--<a-layout-header :style="{ background: '#fff', padding: 0 }" />-->
        <a-layout-content style="margin: 24px 24px 0; overflow-x: scroll;">
          <router-view :key="key"></router-view>
        </a-layout-content>
        <a-layout-footer style="textAlign: center">股票涨停数据 ©2020 Created by 陈永进</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import SiderMenu from "./SiderMenu";

export default {
  name: "layout",
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
  },
  components: {
    SiderMenu
  },
  computed: {
    key() {
      // 只要保证 key 唯一性就可以了，保证不同页面的 key 不相同
      return this.$route.path;
    }
  }
};
</script>

<style scoped lang="less">
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
  &:hover {
    background: #eeeeee;
  }
}
.logo {
  position: relative;
  height: 64px;
  padding-left: 24px;
  overflow: hidden;
  line-height: 64px;
  background: #002140;
  svg {
    width: 32px;
    height: 32px;
    display: inline-block;
    vertical-align: middle;
  }
  h1 {
    display: inline-block;
    margin: 0 0 0 12px;
    font-size: 20px;
    font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
    font-weight: 600;
    vertical-align: middle;
  }
}
.nav-theme-dark {
  /deep/ .logo {
    h1 {
      color: #ffffff;
    }
  }
}
</style>
