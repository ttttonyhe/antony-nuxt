<template>
  <div class="tags-div" style="margin: 20px 0px;">
    <!-- 滑动左侧 -->
    <a
      v-if="translateX > 0"
      class="tags-scroll-right scroll-left"
      @click="scrollTags('left')"
    >
      <i class="ri-arrow-left-line"></i>
    </a>
    <!-- 滑动左侧 -->

    <ul :class="'post_tags ' + (cookie ? 'post_tags_noscroll' : '')">
      <li class="cat-real" v-for="(tag,index) in tages" :key="index">
        <nuxt-link :to="'/tag/' + tag.id">#{{ tag.name }}</nuxt-link>
      </li>
    </ul>

    <!-- 滑动右侧 -->
    <a class="tags-scroll-right" @click="scrollTags('right')">
      <i class="ri-arrow-right-line"></i>
    </a>
    <!-- 滑动右侧 -->
  </div>
</template>

<script>
export default {
  name: 'topInsideTag',
  props: {
    tages: Array
  },
  data() {
    return {
      translateX: 0
    }
  },
  methods: {
    // 标签横向滑动
    scrollTags(direction) {
      if (direction == 'right') {
        if (this.translateX >= 0 && this.translateX < 360) {
          this.translateX += 60
        }
      } else {
        if (this.translateX - 60 >= 0) {
          this.translateX -= 60
        } else {
          this.translateX = 0
        }
      }
      let k = document.getElementsByClassName('post_tags')[0].children
      for (let i = 0; i < k.length; ++i) {
        k[i].setAttribute(
          'style',
          'transform:translateX(-' + this.translateX + 'px)'
        )
      }
    }
  }
}
</script>