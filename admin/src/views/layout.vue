<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="80" v-model="isCollapsed" style="overflow-y: auto">
        <div class="layout-logo-left" :style="isCollapsed ? 'font-size:12px': ''">boblog.com</div>
        <Menu
          :accordion="true"
          width="auto"
          :class="menuitemClasses"
          @on-select="goLink"
          :active-name="$route.meta.module"
          :open-names="[$route.meta.group]"
          theme="dark"
          v-if="menus"
        >
          <div class="" v-for="(item, index) in menus" :key="index">
            <Submenu :name="item.path" v-if="item.children && item.children.length > 0">
              <template slot="title">
                <Icon class="layout-icon" :type="item.icon"></Icon>
                <span class="layout-text">{{ item.name }}</span>
              </template>
              <Menu-item :name="child.path" style="padding-left: 20px;" v-for="(child, ind) in item.children"
                         :key="ind">
                <Icon :type="child.icon" class="layout-icon"></Icon>
                <span class="layout-text">{{ child.name }}</span>
              </Menu-item>
            </Submenu>

            <Menu-item :name="item.path" v-else style="padding: 14px 14px;">
              <Icon class="layout-icon" :type="item.icon"></Icon>
              <span class="layout-text">{{ item.name }}</span>
            </Menu-item>
          </div>
        </Menu>
      </Sider>
      <Layout>
        <div class="fixed-box">
          <Header :style="{padding: 0}" class="layout-header-bar">
            <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu"
                  size="24"></Icon>
            <Button type="text" @click="$router.go(-1)">
              <Icon type="ios-undo"/>
              返回
            </Button>
            <div style="float: right;margin-right: 20px" v-if="adminAuth">
              <Dropdown transfer trigger="click" @on-click="exitAccount">
                <a href="javascript:void(0)">
                  <span class="main-user-name">{{adminAuth.email}}</span>
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

          </Header>
        </div>

        <Content class="content-wrapper">
          <div class="layout-content">

            <div class="layout-content-main">
              <br>
              <Spin class="layout-loading" size="large" fix v-if="mainLoading"></Spin>
              <keep-alive>
                <router-view
                  v-if="$route.meta.keep || ($route.meta.keep instanceof Array && $route.meta.keep.length > 0)"/>
              </keep-alive>
              <router-view
                v-if="!$route.meta.keep || ($route.meta.keep instanceof Array && $route.meta.keep.length === 0)"/>
            </div>
          </div>
          <div class="layout-copy">
            2019 &copy; boblog.com
          </div>
        </Content>
      </Layout>
    </Layout>
    <Modal v-model="pictureModal.modal" width="800" title="Image">
      <img :src="pictureModal.picture" alt="" style="width: 100%;">
    </Modal>
  </div>
</template>
<script>
  import {mapState, mapActions, mapMutations} from 'vuex'
  import {menus} from './menus'
  import Vue from 'vue'

  export default {
    components: {},
    data() {
      return {
        isCollapsed: false,
        menus: menus
      }
    },
    computed: {
      ...mapState({
        adminAuth: state => state.admin.adminAuth,
        mainLoading: state => state.main_loading,
        pictureModal: state => state.picture_modal,
      }),
      rotateIcon() {
        return [
          'menu-icon',
          this.isCollapsed ? 'rotate-icon' : ''
        ];
      },
      menuitemClasses() {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      }

    },
    mounted() {
      // this.fetchUser();
    },
    methods: {
      ...mapMutations([]),
      ...mapActions(['setMainLoading']),


      // 退出登陆
      exitAccount() {
        Vue.ls.remove("token");
        this.$router.replace({
          path: '/login'
        });
      },

      goLink(name) {
        this.$router.push({
          path: name
        });
      },

      collapsedSider() {
        this.$refs.side1.toggleCollapse();
      }
    }
  }
</script>
<style>
  .ivu-menu-submenu-title {
    padding: 14px 14px !important;
  }
</style>
<style scoped>
  .layout {
    height: 100%;
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
  }

  .layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .ivu-layout-header {
    height: 48px;
    line-height: 48px;
  }

  .layout-logo-left {
    width: 90%;
    height: 44px;
    margin: 10px auto;
    color: #fff;
    font-size: 16px;
    text-align: center;
    line-height: 44px;
  }

  .layout-icon {
    font-size: 14px;
    width: 18px;
    text-align: center;
  }

  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 100px;
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }

  .menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
  }

  .collapsed-menu span {
    width: 0px;
    transition: width .2s ease;
  }

  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }

  .layout-content {
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }

  .layout-content-main {
    position: relative;
    padding: 0px 10px;
    min-height: 400px;
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }

  .layout-text {
    width: 100px;
    text-overflow: clip !important;
  }

  .ivu-layout.ivu-layout-has-sider {
    height: 100% !important;
  }


  .fixed-box {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 100;
  }

</style>
