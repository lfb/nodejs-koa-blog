<template>
  <div class="footer">
    <div class="site">
      <span>© 波波博客 - BoBlog.com</span>
      <span>itbo@163.com</span>
    </div>
    <div class="copyright">
      <a
        class="copyright-link"
        href="https://beian.miit.gov.cn"
        target="_blank"
      >
        粤ICP备2020120493号
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped lang="scss">
.footer {
  width: 1280px;
  display: flex;
  justify-content: space-between;
  margin: 120px auto 64px;
}
.site {
  font-size: 14px;
  color: #666666;
}
.site span {
  margin-right: 24px;
}
.copyright {
  &-link {
    font-size: 14px;
    color: #666666;
    text-decoration: none;
  }
}
</style>
