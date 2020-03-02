<template>
  <div>
    <go-top-button
      :animate="true"
      :speed="70"
      :acceleration="8"
      :scrollDistance="10"
      class="goup-container footer-goup"
    >
      <i class="ri-arrow-up-s-fill footer-goup-icon"></i>
    </go-top-button>
  </div>
</template>

<script>
import GoTopButton from 'vue-go-top-button'
import 'vue-go-top-button/dist/lib/vue-go-top-button.min.css'

export default {
  components: { GoTopButton }
}
</script>