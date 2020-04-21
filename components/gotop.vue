<template>
  <div>
    <client-only>
      <go-top-button
        :animate="true"
        :speed="70"
        :acceleration="8"
        :scrollDistance="10"
        class="goup-container footer-goup"
      >
        <i class="ri-arrow-up-s-fill footer-goup-icon"></i>
      </go-top-button>
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import GoTopButton from 'vue-go-top-button'
import 'vue-go-top-button/dist/lib/vue-go-top-button.min.css'

@Component({ components: { GoTopButton } })
export default class goToTop extends Vue {}
</script>