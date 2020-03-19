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
              <div class="comments-scroll" @click="controlScroll()" v-html="scrollAbleHtml"></div>
              <iframe
                id="article-comments-iframe"
                :src="'https://blog.ouorz.com/wp-content/themes/peg/comm/index.html?id=' + $route.params.id"
                style="width: 100%;"
                frameborder="0"
                :scrolling="scrollAble ? 'yes' : 'no'"
              ></iframe>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

// 与 iframe 通信获取评论列表高度
var getCommentsHeight = function() {
  document.domain = 'ouorz.com'
  var iframe = document.getElementById('article-comments-iframe')
  var iwindow = iframe.contentWindow
  var idoc = iwindow.document
  iframe.style.height = idoc.body.offsetHeight + 'px'
}

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
  head() {
    return {
      title: 'TonyHe - ' + this.page.title
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
      },
      scrollAble: false,
      scrollAbleHtml: '加载全部评论 <i class="ri-play-line"></i>'
    }
  },
  mounted() {
    // 手动访问一遍以增加访问量 2333
    this.$axios.get('https://blog.ouorz.com/comment.html')

    document.domain = 'ouorz.com'
    var click = 0 //这回真的操作 10 次确保操作成功哈哈哈哈
    // 监听滑动，接近底部触发高度获取请求
    $(window).scroll(function() {
      var scrollTop = $(window).scrollTop()
      var scrollHeight = $('div.footer.reveal').offset().top - 1500
      if (scrollTop >= scrollHeight) {
        if (click == 10) {
          getCommentsHeight()
          click++
        }
      }
    })
  },
  methods: {
    controlScroll: function() {
      this.scrollAble = this.scrollAble ? false : true
      this.scrollAbleHtml = this.scrollAble
        ? '关闭列表滑动 <i class="ri-pause-line"></i>'
        : '加载全部评论 <i class="ri-play-line"></i>'
      getCommentsHeight()
    }
  }
}
</script>