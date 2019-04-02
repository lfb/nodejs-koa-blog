<template>
  <section class="layout">
    <!--侧边栏-->
    <Sider v-if="routerList" :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <Menu :active-name="activeName" theme="dark" width="auto" :open-names="[openNames]">
        <div class="layout-logo">
          <p class="layout-logo-img">
            <img src="http://images.boblog.com/BOBLOG-02.png" alt="LOGO">
          </p>
        </div>
        <Submenu v-for="(item, key) in routerList" :key="key" :name="Number(key) + 1">
          <template slot="title" class="menu-item">
            <Icon :type="item.icon"></Icon>
            <span>{{item.title}}</span>
          </template>
          <MenuItem
            v-if="item.children"
            v-for="(child, index) in item.children"
            :name="(Number(key) + 1) + '-' + (Number(index) + 1)"
            :key="index"
            @click.native="routerLink(child.path)">
            <Icon :type="child.icon"/>
            {{child.name}}
          </MenuItem>
        </Submenu>
      </Menu>
    </Sider>

    <!--左侧-->
    <Layout :style="{marginLeft: '200px'}">
      <!--头部-->
      <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
        <div class="header-user" v-if="userInfo">
          <Dropdown style="margin-left: 20px">
            <Button type="primary">
              <Icon type="md-person"></Icon>
              {{userInfo.username}}
              <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem @click.native="logout">退出登录</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Header>

      <!--内容-->
      <Content :style="{padding: '0 16px 16px'}">
        <Breadcrumb :style="{margin: '16px 0'}" v-if="routerMetaName">
          <BreadcrumbItem>
            <Icon :type="routerMetaName.icon"></Icon>
            {{routerMetaName.name}}
          </BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <div>
            <router-view/>
          </div>
        </Card>
      </Content>
    </Layout>
  </section>
</template>
<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    computed: {
      ...mapState({
        userInfo: state => state.users.userInfo,
        routerMetaName: state => state.common.routerMetaName
      })
    },
    data() {
      return {
        isCollapsed: false,
        // 导航高亮
        activeName: '',
        openNames: '',
        // 路由列表
        routerList: [
          {
            // 管理员管理
            title: "管理员",
            icon: 'md-person',
            children: [
              {
                name: '首页',
                path: '/user/index',
                icon: 'md-list'
              },
              {
                name: '权限分配',
                path: '/user/lock',
                icon: 'md-lock'
              }
            ]
          },
          {
            // 文章管理
            title: "文章管理",
            icon: 'md-list-box',
            children: [
              {
                name: '文章列表',
                path: '/article/list',
                icon: 'md-list'
              },
              {
                name: '新增文章',
                path: '/article/create',
                icon: 'md-add'
              }
            ]
          },
          {
            // 分类管理
            title: "分类管理",
            icon: 'md-pricetag',
            children: [
              {
                name: '分类列表',
                path: '/category/list',
                icon: 'md-list'
              },
              {
                name: '新增分类',
                path: '/category/create',
                icon: 'md-add'
              }
            ]
          },
        ]
      }
    },
    created() {
      // 处理侧边栏导航高亮
      this.handleSidebarNavActive();
    },
    methods: {

      // 处理侧边栏导航高亮
      handleSidebarNavActive() {
        let path = this.$route.path;
        this.routerList.forEach((item, key) => {
          item.children.forEach((child, index) => {
            if (child.path === path) {
              this.activeName = (Number(key) + 1) + '-' + (Number(index) + 1);
              this.openNames = Number(key) + 1;
            }
          });
        });
      },

      // 退出登录
      logout() {
        this.$ls.remove('BOBLOG_ADMIN_TOKEN');
        const BOBLOG_ADMIN_TOKEN = this.$ls.get("BOBLOG_ADMIN_TOKEN");
        if (!BOBLOG_ADMIN_TOKEN) {
          window.location.href = '/login';
        }
      },

      // 路跳跳转
      routerLink(path) {
        this.$router.push(path);
      }
    }
  }
</script>
<style scoped lang="scss">
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .header-user {
    display: flex;
    justify-content: flex-end;
  }

  .layout-logo {
    display: flex;
    overflow: hidden;
    width: 100%;
    height: 100px;
    justify-content: center;
    align-items: center;
  }

  .layout-logo-img {
    width: 100%;
    text-align: center;
  }

  .layout-logo-img img {
    width: 90%;
  }
</style>
