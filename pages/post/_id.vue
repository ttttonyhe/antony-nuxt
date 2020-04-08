<template>
  <div id="posts">
    <div class="grid grid-centered">
      <div class="grid-cell" id="grid-cell">
        <!-- 左侧区块 -->
        <div class="single-left" :style="(exist_index ? '' : 'margin-top:-15px')" v-if="!loading">
          <articleIndex @exist_index="existIndex"></articleIndex>
          <div>
            <div
              class="index-div-next"
              v-if="(!!post_prenext.prev && post_prenext.prev[0] !== null && post_prenext.prev[2] !== 2 && post_prenext.prev[2] !== 5 && post_prenext.prev[2] !== 58)"
            >
              <h4>
                <i class="czs-hande-vertical"></i>
                {{ $t('lang.post.prev') }}
              </h4>
              <p>
                <a :href="'/post/' + post_prenext.prev[0]" v-html="post_prenext.prev[1]"></a>
              </p>
            </div>
            <div
              class="index-div-next"
              v-if="(!!post_prenext.next && post_prenext.next[0] !== null && post_prenext.next[2] !== 2 && post_prenext.next[2] !== 5 && post_prenext.next[2] !== 58)"
            >
              <h4>
                <i class="czs-hand-horizontal"></i>
                {{ $t('lang.post.next') }}
              </h4>
              <p>
                <a :href="'/post/' + post_prenext.next[0]" v-html="post_prenext.next[1]"></a>
              </p>
            </div>
            <div
              class="index-div-next single-donate"
              v-else-if="!!post_prenext.next && post_prenext.next[0] !== null && post_prenext.next[2] !== 74"
            >
              <nuxt-link class="single-donate-a" to="/donation">
                {{ $t('lang.post.donation') }}
                <i class="ri-hand-heart-line"></i>
              </nuxt-link>
            </div>
          </div>
        </div>
        <!-- 左侧区块 -->

        <!-- 文章主体 -->

        <!-- 阅读进度条 -->
        <div class="reading-bar"></div>
        <!-- 阅读进度条 -->

        <article class="article reveal">
          <div id="load">
            <!-- 文章顶部 -->
            <div class="article-header">
              <span class="badge badge-pill badge-danger single-badge">
                <nuxt-link to="/" style="text-decoration:none">
                  <i class="ri-article-line"></i>
                  {{ $t('lang.post.des') }}
                </nuxt-link>
              </span>
              <span class="badge badge-pill badge-danger single-badge" style="margin-left: 10px;">
                <nuxt-link
                  :to="cate_url"
                  class="post-header"
                  v-html="cate"
                >{{ $t('lang.post.cate') }}</nuxt-link>
              </span>
              <span
                class="badge badge-pill badge-danger single-badge"
                style="margin-left: 10px;"
                v-b-tooltip.hover
                :title="$t('lang.post.estimate')"
              >
                <nuxt-link
                  :to="cate_url"
                  class="post-header"
                  v-html="posts.post_metas.reading.time_required + ' mins'"
                >{{ $t('lang.post.readingTime') }}</nuxt-link>
              </span>
              <!-- 文章标题 -->
              <h2 class="single-h2" v-html="posts.post_metas.title"></h2>
              <!-- 文章标题 -->

              <!-- 底部信息 -->
              <div class="article-list-footer">
                <span class="article-list-date">{{ posts.post_date }}</span>
                <span class="article-list-divider">/</span>
                <span class="article-list-minutes">{{ posts.post_metas.views }}&nbsp;Views</span>
                <span class="article-list-divider">/</span>
                <span
                  class="article-list-minutes"
                >{{ posts.post_metas.reading.word_count}} &nbsp;Words</span>
              </div>
              <!-- 底部信息 -->

              <div class="single-line"></div>
            </div>
            <!-- 文章顶部 -->

            <!-- 文章内容 -->
            <div class="article-content" v-html="posts.content.rendered"></div>
            <!-- 文章内容 -->

            <template v-if="posts.post_categories[0].term_id == 4 && posts.post_metas.fineTool">
              <div>
                <div class="buy-list-item" style="margin: 60px 10px -35px 10px;">
                  <div
                    :class="posts.post_metas.fineTool.itemImgBorder == 'border' ? 'buy-left-img' : 'buy-left-img-noborder'"
                  >
                    <img :src="posts.post_img.url" />
                  </div>
                  <div class="buy-right-info">
                    <div>
                      <h3 v-html="posts.post_metas.fineTool.itemName"></h3>
                      <p v-html="posts.post_metas.fineTool.itemDes"></p>
                    </div>
                    <div>
                      <a
                        :href="posts.post_metas.fineTool.itemLink"
                        v-html="posts.post_metas.fineTool.itemLinkName"
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <!-- 文章标签 -->
            <div
              style="text-align: left;margin: 60px 0px 40px 8px;border-radius: 6px;"
              v-if="post_tags.length"
            >
              <ul
                class="post_tags"
                style="margin: 0;padding: 0px;width: 100%;padding-bottom: 15px;"
              >
                <li
                  class="cat-real"
                  style="display: inline-block;color: rgb(102, 102, 102);font-size: 1.1rem;font-weight: 600;margin: 0px;letter-spacing: 1px;"
                >
                  <a
                    style="background-color: #e7f3ff;color: #2f94fe;padding: 1px 12px 1px;border-radius: 4px;font-size: .9rem;"
                  >{{ $t('lang.post.tag') }}</a>
                </li>
                <li
                  class="cat-real"
                  style="display: inline-block;"
                  v-for="(tag,index) in post_tags"
                  :key="'postTag' + tag.id"
                >
                  <nuxt-link
                    :to="'/tag/' + tag.id"
                    v-html="tag.name"
                    style="font-size: .9rem;border-radius: 4px;padding: 1px 12px 1px;"
                  ></nuxt-link>
                </li>
              </ul>
            </div>
            <!-- 文章标签 -->
            <!-- 文章评论 -->
            <div class="article-comments" id="article-comments" style="margin-top:50px">
              <div class="comments-scroll" @click="controlScroll()" v-html="scrollAbleHtml"></div>
              <iframe
                id="article-comments-iframe"
                :src="'https://blog.ouorz.com/wp-content/themes/peg/comm/index.html?id=' + this.$route.params.id"
                style="width: 100%;"
                frameborder="0"
                :scrolling="scrollAble ? 'yes' : 'no'"
              ></iframe>
            </div>
            <!-- 文章评论 -->
          </div>
        </article>
        <!-- 文章主体 -->
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
// imort hightlight.js feature and stylesheet
import hljs from 'highlight.js'
import 'highlight.js/styles/rainbow.css'

// highlightjs 初始化函数
const highlightCode = () => {
  const preEl = document.querySelectorAll('pre')
  preEl.forEach(el => {
    hljs.highlightBlock(el)
  })
}

// 与 iframe 通信获取评论列表高度
var getCommentsHeight = function() {
  // 强制设置同源
  document.domain = 'ouorz.com'
  var iframe = document.getElementById('article-comments-iframe')
  var iwindow = iframe.contentWindow
  var idoc = iwindow.document
  iframe.style.height = idoc.body.offsetHeight + 'px'
}

export default {
  name: 'Posts',
  scrollToTop: true,
  async asyncData(context) {
    let res = await Promise.all([
      // 获取博客文章数据
      context.$axios
        .get(
          'https://blog.ouorz.com/wp-json/wp/v2/posts/' +
            context.route.params.id
        )
        .then(response => {
          return response.data
        })
    ])

    // 生成头部 keywords
    let tagsLength = res[0].post_tags.length
    for (let i = 0; i < tagsLength; ++i) {
      if (i == 0) {
        var post_tags_string = res[0].post_tags[i].name
      } else {
        post_tags_string += ',' + res[0].post_tags[i].name
      }
    }

    // 返回文章信息
    return {
      posts: res[0],
      post_tags_string: post_tags_string,
      post_title: res[0].post_metas.title,
      cate: res[0].post_categories[0].name,
      cate_url: '/cate/' + res[0].post_categories[0].term_id,
      post_tags: res[0].post_tags,
      post_prenext: res[0].post_prenext
    }
  },
  data() {
    return {
      posts: null,
      loading: true,
      errored: true,
      cate: '分类目录',
      cate_url: '',
      post_tags: [],
      post_prenext: [],
      exist_index: true,
      post_title: 'Loading...',
      post_tags_string: null,
      scrollAble: false,
      scrollAbleHtml: '开启滑动 <i class="ri-play-line"></i>'
    }
  },
  head() {
    return {
      title: 'TonyHe - ' + this.posts.title.rendered,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.posts.post_excerpt.nine.substr(0, 50)
        },
        { hid: 'keywords', name: 'keywords', content: this.post_tags_string }
      ]
    }
  },
  mounted() {
    // 百度主动推送
    ;(function() {
      var bp = document.createElement('script')
      var curProtocol = window.location.protocol.split(':')[0]
      if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js'
      } else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js'
      }
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(bp, s)
    })()

    this.loading = false

    $('.real').css('display', 'block')
    highlightCode()

    // 手动访问一遍以增加访问量 2333
    this.$axios.get('https://blog.ouorz.com/post/' + this.$route.params.id)
  },
  methods: {
    controlScroll: function() {
      this.scrollAble = this.scrollAble ? false : true
      this.scrollAbleHtml = this.scrollAble
        ? '关闭滑动 <i class="ri-pause-line"></i>'
        : '开启滑动 <i class="ri-play-line"></i>'
      getCommentsHeight()
    },
    createReadingBar: function() {
      // 文章阅读进度条
      var content_offtop = $('.article-content').offset().top
      var content_height = $('.article-content').innerHeight()

      document.domain = 'ouorz.com'
      var click = 0

      // 监听滑动
      $(window).scroll(function() {
        if ($(this).scrollTop() > content_offtop) {
          //滑动到内容部分
          if ($(this).scrollTop() - content_offtop <= content_height) {
            //在内容部分内滑动
            this.reading_p = Math.round(
              (($(this).scrollTop() - content_offtop) / content_height) * 100
            )
          } else {
            //滑出内容部分
            this.reading_p = 100
          }
        } else {
          //未滑到内容部分
          this.reading_p = 0
        }
        $('.reading-bar').css('width', this.reading_p + '%')

        /* 
          评论区监听事件
          mounted 中执行会被在文章目录组件中对于监听的重置污染
        */
        // 监听滑动，接近底部触发高度获取请求
        $(window).scroll(function() {
          //仅在文章页监听
          if (window.location.pathname.split('/')[1] == 'post') {
            var scrollTop = $(window).scrollTop()
            var scrollHeight = $('div.footer.reveal').offset().top - 1500
            if (scrollTop >= scrollHeight) {
              if (click == 0) {
                getCommentsHeight()
                click++
              }
            }
          }
        })
        /* 评论区监听事件 */
      })
    },
    existIndex: function(data) {
      this.exist_index = data
    }
  },
  // 监听页面变化
  updated() {
    // 页面变化时监听阅读进度条
    this.createReadingBar()
    // 页面内容变化时执行代码渲染
    highlightCode()
  },
  watch: {
    $route() {
      Object.assign(this.$data, this.$options.data())
      $(window).unbind('scroll')
    }
  }
}
</script>