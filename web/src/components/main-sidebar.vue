<template>
  <article class="sidebar">
    <div class="sidebar-box" v-if="advertiseList && advertiseList.length > 0">
      <div class="sidebar-header">
        <div class="sidebar-header-title">
          <Icon type="ios-apps" class="icon" size="18"/>
          广告
        </div>
      </div>
      <div class="sidebar-box-content">
        <ul>
          <li class="sidebar-box-content-item"
              v-for="ad in advertiseList"
              :key="ad.id">
            <a :href="ad.link" target="_blank">
              <h1>{{ad.title}}</h1>
            </a>
            <span></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="sidebar-box">
      <div class="sidebar-header">
        <div class="sidebar-header-title">
          <Icon class="icon" type="ios-link" size="18"/>
          链接
        </div>
      </div>
      <div class="sidebar-box-content">
        <ul>
          <li class="sidebar-box-content-item">
            <a href="https://github.com/liangfengbo" target="_blank">
              <div>
                <Icon class="icon" type="logo-github"/>
                Github
              </div>
            </a>
            <span></span>
          </li>
          <li class="sidebar-box-content-item">
            <a href="https://www.boblog.com" target="_blank">
              <div style="color: #2d8cf0;">
                <Icon type="md-ionic" />
                波波博客
              </div>
            </a>
            <span></span>
          </li>
        </ul>
      </div>
    </div>

  </article>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'main-sidebar',
    computed: {
      ...mapState({
        advertiseList: state => state.advertise.advertiseList
      })
    },
    created() {
      this.fetchData()
    },
    methods: {
      ...mapActions({
        getAdvertiseList: 'advertise/list'
      }),
      // 获取数据
      async fetchData() {
        await this.getAdvertiseList()
      }
    }
  }
</script>

<style scoped lang="less">
  .sidebar {
    width: 350px;
  }

  @media screen and (min-width: 200px) and (max-width: 750px) {
    .sidebar {
      display: none;
    }
  }

  .sidebar-box {
    margin-bottom: 32px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 1px 2px 3px #f0f0f0;
    background: #fff;
  }

  .sidebar-box-content {
    padding: 0 32px;
  }

  .sidebar-box-content-item {
    cursor: pointer;
    display: flex;
    margin: 24px 0;
    align-items: center;
    justify-content: space-between;
    color: #657180;

    &:hover {
      color: #2d8cf0;
    }
  }

  .sidebar-box-content-item h1 {
    font-size: 16px;
    font-weight: 400;
  }

  .sidebar-box-content-item a {
    flex: 1;
    color: #657180;
    margin-right: 10px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;

    &:hover {
      color: #2d8cf0;
    }
  }

  .sidebar-box-content-item span {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-top: 1px solid #D9D9D9;
    border-right: 1px solid #D9D9D9;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  .icon {
    margin-right: 10px;
  }
</style>
