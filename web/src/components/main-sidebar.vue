<template>
  <article class="sidebar">
    <div class="sidebar-box">
      <div class="sidebar-header">
        <div class="sidebar-header-title">
          <Icon type="ios-apps" class="icon" size="20"/>
          推荐
        </div>
      </div>
      <div class="sidebar-box-content">
        <ul>
          <li class="sidebar-box-content-item" v-for="(item, index) in 5" :key="index">
            <h1>数据结构与算法</h1>
            <span></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="sidebar-box">
      <div class="sidebar-header">
        <div class="sidebar-header-title">
          <Icon type="ios-apps" class="icon" size="20"/>
          分类
        </div>
      </div>
      <div class="sidebar-box-content">
        <ul>
          <li class="sidebar-box-content-item">
            <div>
              <p>
                <Icon class="icon" style="color: #e34c24;" type="logo-html5"/>
                html（ 10 ）
              </p>
            </div>
          </li>
          <li class="sidebar-box-content-item">
            <div>
              <p>
                <Icon class="icon" style="color: #006fba;" type="logo-css3"/>
                css（ 15 ）
              </p>
            </div>
          </li>
          <li>
          <li class="sidebar-box-content-item">
            <div>
              <p>
                <Icon class="icon" style="color: #f0da4e;" type="logo-javascript"/>
                javascript（ 32 ）
              </p>
            </div>
          </li>
          <li class="sidebar-box-content-item">
            <div>
              <p>
                <Icon class="icon" style="color: #8cc84b" type="logo-nodejs"/>
                Node.js
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="sidebar-box">
      <div class="sidebar-header">
        <div class="sidebar-header-title">
          <Icon class="icon" type="ios-link" size="20"/>
          链接
        </div>
      </div>
      <div class="sidebar-box-content">
        <ul>
          <li class="sidebar-box-content-item">
            <div>
              <Icon class="icon" type="logo-github"/>
              Github
            </div>
          </li>
          <li class="sidebar-box-content-item">
            慕课网
          </li>
          <li class="sidebar-box-content-item">
            coding.net
          </li>
        </ul>
      </div>
    </div>

  </article>
</template>

<script>
  export default {
    name: 'main-sidebar'
  }
</script>

<style scoped lang="less">
  .sidebar {
    width: 350px;
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

  .sidebar-box-content-item span {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-top: 1px solid #D9D9D9;
    border-right: 1px solid #D9D9D9;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
</style>
