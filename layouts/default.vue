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

<script>
// PC & Mobile Navigation Menu Components
import mobileNav from '~/components/headers/mobileNav'
import computerNav from '~/components/headers/computerNav'
import siteFooter from '~/components/footer'

// Import RemixIcon feature
import 'remixicon/fonts/remixicon.css'

export default {
  data() {
    return {
      mobile: false
    }
  },
  components: {
    mobileNav,
    computerNav,
    siteFooter
  },
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
  },
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

    if (process.env.NODE_ENV === 'production') {
      // Baidu analysis
      var _hmt = _hmt || []
      ;(function() {
        var hm = document.createElement('script')
        hm.src = 'https://hm.baidu.com/hm.js?20265c137ab04d39313561665f1ae7a1'
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
      })()
    }
  }
}
</script>

<style lang="scss">
[v-cloak] {
  display: none !important;
}
#nprogress .bar {
  background: #3797fe !important;
  z-index: 9999;
}
</style>