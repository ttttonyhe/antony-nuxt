<template>
  <div id="header_info">
    <nav class="header-nav reveal error-page">
      <nuxt-link
        to="/"
        style="text-decoration:none;"
        class="header-logo"
        title="404 Not Found"
      >404 :)</nuxt-link>
      <p class="lead" style="margin-top: 0px;display:block">抱歉，你请求的内容消失嘞</p>
      <nuxt-link to="/">
        <b-button variant="primary" class="back-home">Back to Home | 返回首页</b-button>
      </nuxt-link>
    </nav>
  </div>
</template>
<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class Error extends Vue{
  head() {
    return {
      title: 'TonyHe - 404 Not Found',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '404 Not Found Page'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: '贺莉朋,Tony,TonyHe,博客,个人博客,404,错误页'
        }
      ]
    }
  }
}
</script>