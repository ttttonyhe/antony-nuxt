<template>
  <div>
    <header class="tony-header-fixed" id="header-div">
      <div class="header-div1-1" style="flex-basis:100%">
        <nuxt-link to="/" class="mob-header-text">TonyHe</nuxt-link>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class mobileNav extends Vue {}
</script>