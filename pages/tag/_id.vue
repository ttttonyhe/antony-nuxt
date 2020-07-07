<template>
  <client-only>
    <div class="cates">
      <div
        class="grid grid-centered"
        style="max-width: 660px;padding: 0px 20px;margin-top: 80px"
      >
        <div class="grid-cell" id="grid-cell">
          <div id="header_info">
            <nav class="header-nav reveal cate-top">
              <div class="cate-nav">
                <div>
                  <nuxt-link
                    to="/blog"
                    class="top1 header-logo cate-name"
                    v-html="cate.name"
                  ></nuxt-link>
                </div>
                <div>
                  <nuxt-link to="/blog">
                    <b-button
                      variant="primary"
                      :class="
                        includeChinese(cate.name) ? 'cate-back' : 'cate-back-en'
                      "
                    >
                      <i class="ri-arrow-left-line"></i>
                      {{ $t('lang.cate.backHome') }}
                    </b-button>
                  </nuxt-link>
                </div>
              </div>
              <p
                class="top2 lead archive-p"
                v-html="$t('lang.cate.postCount') + ': ' + cate.count"
              ></p>
            </nav>
            <!-- 顶部标题与分类区块 -->
            <topInsideTag :tages="tags" />
            <!-- 顶部标题与分类区块 -->
          </div>
          <ul class="article-list">
            <li
              :class="
                'article-list-item reveal index-post-list ' +
                  (post.sticky ? 'sticky-one' : '')
              "
              v-for="(post, index) in posts"
              :style="post.post_categories[0].term_id | link_style"
              :key="'tagPost' + post.id"
            >
              <template
                v-if="
                  post.post_img.url == false ||
                    post.post_categories[0].term_id == 2 ||
                    post.post_categories[0].term_id == 5
                "
              >
                <em
                  class="article-list-type1 sticky-one-tag"
                  v-if="post.sticky"
                >
                  <i
                    class="czs-arrow-up-l"
                    style="font-size: 14px;font-weight: 600;"
                  ></i>
                  {{ $t('lang.index.atTop') }}
                </em>
                <em
                  v-if="post.post_categories[0].term_id == 7"
                  class="article-list-type1"
                >
                  <b>{{ post.post_categories[0].name }}</b>
                  {{
                    ' | ' +
                      (post.post_metas.tag_name
                        ? post.post_metas.tag_name.toUpperCase()
                        : $t('lang.index.noneTag'))
                  }}
                </em>
                <nuxt-link
                  v-else-if="
                    post.post_categories[0].term_id !== 2 &&
                      post.post_categories[0].term_id !== 5 &&
                      post.sticky
                  "
                  :to="'/cate/' + post.post_categories[0].term_id"
                  v-html="post.post_categories[0].name"
                  class="img-cate"
                ></nuxt-link>
                <div
                  v-if="post.post_categories[0].term_id == 2"
                  class="link-list-left"
                >
                  <img
                    :src="post.post_metas.img[0]"
                    class="link-list-img"
                    loading="lazy"
                  />
                </div>
                <div
                  class="link-list-right"
                  :style="
                    query_style_list(
                      post.post_categories[0].term_id,
                      post.sticky
                    )
                  "
                >
                  <a
                    v-if="
                      post.post_categories[0].term_id == 2 ||
                        post.post_categories[0].term_id == 5
                    "
                    :href="post.post_metas.link + '?ref=https://www.ouorz.com'"
                    style="text-decoration: none;"
                    target="_blank"
                  >
                    <h5
                      style="margin-top: 10px;"
                      v-html="post.title.rendered"
                    ></h5>
                  </a>

                  <nuxt-link
                    v-else
                    :to="'/post/' + post.id"
                    style="text-decoration: none;"
                  >
                    <h5 v-html="post.title.rendered"></h5>
                  </nuxt-link>
                  <p
                    :class="
                      post.post_categories[0].term_id == 2
                        ? 'cate-link-item-p cate-link-p'
                        : ''
                    "
                    v-html="post.post_excerpt.nine.substr(0, 80) + '...'"
                  ></p>
                  <div class="article-list-footer">
                    <span class="article-list-date"
                      >{{ post.post_categories[0].term_id | link_page
                      }}{{ post.post_date }}</span
                    >
                    <span
                      class="article-list-divider"
                      v-if="
                        post.post_categories[0].term_id !== 2 &&
                          post.post_categories[0].term_id !== 5
                      "
                      >-</span
                    >
                    <span
                      class="article-list-minutes"
                      v-if="
                        post.post_categories[0].term_id !== 2 &&
                          post.post_categories[0].term_id !== 5
                      "
                      >{{ post.post_metas.views }}&nbsp;Views</span
                    >
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="article-list-img-else">
                  <div
                    class="article-list-img"
                    :style="'background-image:url(' + post.post_img.url + ')'"
                  ></div>
                  <div class="article-list-img-right">
                    <em
                      class="article-list-type1 sticky-one-tag"
                      v-if="post.sticky"
                    >
                      <i
                        class="czs-arrow-up-l"
                        style="font-size: 14px;font-weight: 600;"
                      ></i>
                      {{ $t('lang.index.atTop') }}
                    </em>
                    <em
                      v-if="post.post_categories[0].term_id == 7"
                      class="article-list-type1"
                    >
                      <b>{{ post.post_categories[0].name }}</b>
                      {{
                        ' | ' +
                          (post.post_metas.tag_name
                            ? post.post_metas.tag_name.toUpperCase()
                            : $t('lang.index.noneTag'))
                      }}
                    </em>
                    <nuxt-link
                      v-else
                      :to="'/cate/' + post.post_categories[0].term_id"
                      v-html="post.post_categories[0].name"
                      class="img-cate"
                    ></nuxt-link>

                    <nuxt-link
                      :to="'/post/' + post.id"
                      style="text-decoration: none;"
                    >
                      <h5
                        v-html="post.title.rendered"
                        style="margin: 0px;padding: 0px;margin-top:15px"
                      ></h5>
                    </nuxt-link>
                    <p
                      v-html="post.post_excerpt.nine.substr(0, 80) + '...'"
                      :id="post.id"
                    ></p>
                    <div class="article-list-footer">
                      <span class="article-list-date">{{
                        post.post_date
                      }}</span>
                      <span class="article-list-divider">-</span>
                      <span
                        v-if="post.post_metas.views !== ''"
                        class="article-list-minutes"
                        >{{ post.post_metas.views }}&nbsp;Views</span
                      >
                      <span v-else class="article-list-minutes"
                        >0&nbsp;Views</span
                      >
                    </div>
                  </div>
                </div>
              </template>
            </li>

            <!-- 无限滚动占位内容 -->
            <mugen-scroll :handler="new_page" :should-handle="loading_first">
              <li
                class="article-list-item reveal index-post-list bottom"
                v-if="!loading_end"
              >
                <div class="skeleton">
                  <div class="skeleton-head"></div>
                  <div class="skeleton-body">
                    <div class="skeleton-title"></div>
                    <div class="skeleton-content"></div>
                  </div>
                </div>
              </li>
            </mugen-scroll>
            <!-- 无限滚动占位内容 -->
          </ul>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

// import jquery features
import $ from 'jquery'

// import header-top-inside
import topInsideTag from '~/components/topInsideTag.vue'

// import infinite loading feature
import MugenScroll from 'vue-mugen-scroll'

@Component({
  components: {
    topInsideTag,
    MugenScroll
  },
  filters: {
    link_page: function(cate_id: number): string {
      if (cate_id == 2) {
        return '添加于 '
      } else if (cate_id == 5) {
        return '创造于 '
      } else {
        return ''
      }
    },
    link_style: function(cate_id: number): string {
      if (cate_id == 2 || cate_id == 5) {
        return 'display: flex;'
      } else {
        return ''
      }
    }
  }
})
export default class Cates extends Vue {
  async asyncData(
    context: any
  ): Promise<{ cate: any[]; posts: any[]; tags: any[] }> {
    let res1: any[] = await Promise.all([
      context.$axios
        .get(
          'https://blog.ouorz.com/wp-json/wp/v2/tags/' + context.route.params.id
        )
        .then((response: { data: any }) => {
          return response.data
        })
    ])
    let res2: any[] = await Promise.all([
      context.$axios
        .get(
          'https://blog.ouorz.com/wp-json/wp/v2/posts?sticky=1&tags=' +
            context.route.params.id
        )
        .then((sticky_posts: { data: any }) => {
          return sticky_posts.data
        })
    ])
    let res3: any[] = await Promise.all([
      context.$axios
        .get(
          'https://blog.ouorz.com/wp-json/wp/v2/tags?orderby=count&order=desc&per_page=15'
        )
        .then((tag_posts: { data: any }) => {
          return tag_posts.data
        })
    ])
    return {
      cate: res1[0],
      posts: res2[0],
      tags: res3[0]
    }
  }

  posts: any[] = []
  posts_id_sticky: string = '0'
  cate = {
    name: '文章标签'
  } as {
    name: string
  }
  tags: any[] = []
  loading: boolean = true
  loading_cate: boolean = true
  errored: boolean = true
  loading_first: boolean = false
  loading_end: boolean = false
  paged: number = 1
  pagedLoading: boolean = false
  listLoading: any = {}

  mounted() {
    this.posts_id_sticky = '0'
    this.loading = true
    this.loading_cate = true
    this.errored = true
    this.loading_first = false
    this.loading_end = false
    this.paged = 1
    this.pagedLoading = false
    this.listLoading = {}
    //获取顶置文章 IDs 以在获取其余文章时排除
    let postsLength: number = this.posts.length
    if (postsLength) {
      for (var s = 0; s < postsLength; ++s) {
        this.posts_id_sticky += ',' + this.posts[s].id
      }
    }
    this.$axios
      .get(
        'https://blog.ouorz.com/wp-json/wp/v2/posts?sticky=0&tags=' +
          this.$route.params.id +
          '&exclude=' +
          this.posts_id_sticky +
          '&per_page=10&page=' +
          this.paged
      )
      .then((res_normal: { data: any }) => {
        this.loading_cate = false
        //拼接其余文章
        this.posts = this.posts.concat(res_normal.data)
        this.loading = false
        this.loading_first = true
        this.paged = 2 //加载完1页后累加页数
      })
  }

  head() {
    return {
      title: 'TonyHe - ' + this.cate.name
    }
  }

  // 判断分类目录名称是否包含中文调整「返回主页」按钮位置
  includeChinese(str: string): boolean {
    if (escape(str).indexOf('%u') < 0) {
      return false
    } else {
      return true
    }
  }

  //定义方法
  query_style_list(cate: number, sticky: boolean): string | void {
    if (cate == 5) {
      return 'flex-basis: 100%;'
    } else if (cate !== 7 && cate !== 2 && !sticky) {
      return 'margin-top: -10px;'
    }
  }

  //加载下一页文章列表
  new_page(): void {
    //语言包匹配
    if (this.$i18n.locale == 'zh-CN') {
      this.listLoading = {
        loading: '加载中',
        list: '文章列表',
        all: '全部文章'
      }
    } else {
      this.listLoading = {
        loading: 'Loading',
        list: 'Posts List',
        all: 'All Posts'
      }
    }
    if (!this.pagedLoading) {
      this.pagedLoading = true
      $('#view-text').html('-&nbsp;' + this.listLoading.loading + '&nbsp;-')
      this.$axios
        .get(
          'https://blog.ouorz.com/wp-json/wp/v2/posts?sticky=0&exclude=' +
            this.posts_id_sticky +
            '&per_page=10&page=' +
            this.paged +
            '&tags=' +
            this.$route.params.id
        )
        .then((response: { data: any }) => {
          if (response.data.length !== 0) {
            //判断是否最后一页
            $('#view-text').html('-&nbsp;' + this.listLoading.list + '&nbsp;-')
            this.posts = this.posts.concat(response.data) //拼接在上一页之后
            this.paged += 1
          } else {
            $('#view-text').html('-&nbsp;' + this.listLoading.list + '&nbsp;-')
            this.loading_first = false
            this.loading_end = true
          }
          this.pagedLoading = false
        })
        .catch((): void => {
          $('#view-text').html('-&nbsp;' + this.listLoading.all + '&nbsp;-')
          this.paged = 1
          this.loading_first = false
          this.loading_end = true
          this.pagedLoading = true
        })
    }
  }
}
</script>
