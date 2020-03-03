<template>
  <div id="page">
    <div class="grid grid-centered">
      <div class="grid-cell" id="grid-cell">
        <article class="article reveal comment-article">
          <div id="load">
            <header class="article-header comment-header">
              <h2 class="single-h2 page-title" v-html="page.title"></h2>
              <div class="article-list-footer page-footer">
                <span class="article-list-date">{{ page.date }}</span>
                <span class="article-list-divider">/</span>
                <span class="article-list-minutes">{{ page.views }}&nbsp;Views</span>
              </div>
              <div class="single-line"></div>
            </header>
            <div class="article-content" v-html="page.content"></div>
            <div class="article-comments" id="article-comments">
              <iframe
                :src="'https://blog.ouorz.com/wp-content/themes/peg/comm/index.html?id=' + $route.params.id"
                style="width: 100%;min-height: 100vh;"
                frameborder="0"
              ></iframe>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page',
  async asyncData(context) {
    let res = await Promise.all([
      context.$axios
        .get(
          'https://blog.ouorz.com/wp-json/wp/v2/pages/' +
            context.route.params.id
        )
        .then(response => {
          return response.data
        })
    ])

    return {
      posts: res[0],
      page: {
        title: res[0].title.rendered,
        content: res[0].page_content,
        views: res[0].post_metas.views,
        date: res[0].post_date
      }
    }
  },
  data() {
    return {
      posts: null,
      errored: true,
      page: {
        title: '',
        content: '',
        views: '',
        date: ''
      }
    }
  },
  mounted() {
    // 手动访问一遍以增加访问量 2333
    this.$axios.get('https://blog.ouorz.com/comment.html')
  }
}
</script>