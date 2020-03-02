<template>
  <div id="app" v-cloak>
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
import mobileNav from "~/components/headers/mobileNav";
import computerNav from "~/components/headers/computerNav";
import siteFooter from "~/components/footer";

// Import RemixIcon feature
import 'remixicon/fonts/remixicon.css'

export default {
  data() {
    return {
      mobile: false
    };
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
      }
    }
  },
  mounted() {
    // Detect Mobile or PC using UserAgent
    let flag = navigator.userAgent.match(
      /(Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    if (flag) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }
};
</script>

<style lang="scss">
[v-cloak] {
  display: none !important;
}
#nprogress .bar{
  background: #3797fe !important;
  z-index: 9999;
}
</style>