<template>
  <div>
    <goToTop></goToTop>
    <div
      class="goup-container footer-github"
    >
      <a href="https://github.com/HelipengTony/antony-nuxt" target="_blank" style="text-decoration:none">
        <i class="ri-github-fill footer-github-icon"></i>
      </a>
    </div>
    <div class="footer reveal">
      <p>
        Copyright &copy; 2018-{{ new Date().getFullYear() }} · TonyHe ·
        <a
          href="http://www.beian.miit.gov.cn"
          target="_blank"
          style="text-decoration: none;color: inherit;font-size: 14px;font-weight: 500;"
        >蜀ICP备16017417号-9</a> ·
        <a
          href="https://creativecommons.org/licenses/by-nc/4.0/"
          target="_blank"
          style="text-decoration: none;color: inherit;font-size: 14px;font-weight: 500;"
        >CC BY-NC 4.0</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "siteFooter"
};
</script>