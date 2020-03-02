<template>
  <div>
    <ul class="post_tags tags-inside">
      <li class="cat-real" v-for="(tag,index) in tages" :key="index">
        <nuxt-link :to="'/tag/' + tag.id">#{{ tag.name }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'topInsideTag',
  props: {
    tages: Array
  }
}
</script>