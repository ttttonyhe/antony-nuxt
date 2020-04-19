<template>
  <div id="app">
    <!-- Menu -->
    <div id="nav">
      <template v-if="mobile">
        <mobileNav />
      </template>
      <template v-else>
        <computerNav />
      </template>
    </div>
    <!-- Menu -->

    <!-- Content -->
    <nuxt />
    <!-- Content -->

    <!-- Footer -->
    <siteFooter />
    <!-- Footer -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

// PC & Mobile Navigation Menu Components
import mobileNav from '~/components/headers/mobileNav.vue'
import computerNav from '~/components/headers/computerNav.vue'
import siteFooter from '~/components/footer.vue'

// Import RemixIcon feature
import 'remixicon/fonts/remixicon.css'

@Component({
  components: {
    mobileNav,
    computerNav,
    siteFooter
  }
})
export default class layouts extends Vue {
  mobile: boolean = false
  head() {
    return {
      htmlAttrs: {
        lang: 'zh-cn'
      },
      meta: [
        {
          hid: 'msvalidate.01',
          name: 'msvalidate.01',
          content: '4D922B4BDF9F7A9398A7ECCF7B9F0365'
        },
        {
          hid: '360-site-verification',
          name: '360-site-verification',
          content: '5f2cc87b24f0b9eddfc0c3a750941bbc'
        },
        {
          hid: 'google-site-verification',
          name: 'google-site-verification',
          content: '_Q8Sk4WSzRH3ZGwwe2J1V2WUTdQFP9Pg6PSKdUKQXP4'
        }
      ]
    }
  }
  mounted() {
    // Detect Mobile or PC using UserAgent
    let flag = navigator.userAgent.match(
      /(Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
    if (flag) {
      this.mobile = true
    } else {
      this.mobile = false
    }

    /* 百度统计(已弃用)
    if (process.env.NODE_ENV === 'production') {
      // Baidu analysis
      var _hmt: any = _hmt || []
      ;(function() {
        var hm = document.createElement('script')
        hm.src = 'https://hm.baidu.com/hm.js?20265c137ab04d39313561665f1ae7a1'
        var s: any = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
      })()
    }
    */

  }
}
</script>

<style lang="scss">
#nprogress .bar {
  background: #3797fe !important;
  z-index: 9999;
}
</style>