<template>
  <client-only>
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
                  <span class="article-list-minutes"
                    >{{ page.views }}&nbsp;Views</span
                  >
                </div>
                <div class="single-line"></div>
              </header>
              <div class="article-content" v-html="page.content"></div>
              <div class="article-comments" id="article-comments">
                <nexment-container
                  :config="{
                    pageKey: $route.params.id,
                    enableLinkInput: true,
                    leancloud: {
                      appId: 'NM8cdTVi8wqCmbeLPmiKCu79-gzGzoHsz',
                      appKey: 'p31o8YmzTfjBY68W2Y9gH3kb',
                      serverURL: 'https://ouorz-nexment.ouorz.com'
                    },
                    admin: {
                      name: 'TonyHe',
                      email: 'he@holptech.com'
                    }
                  }"
                ></nexment-container>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import $ from 'jquery'

interface pageData {
  posts: any[]
  page: {
    title: string
    content: string
    views: number
    date: string
  }
}

@Component({})
export default class Page extends Vue {
  async asyncData(context: any): Promise<pageData> {
    let res = await Promise.all([
      context.$axios
        .get(
          'https://blog.ouorz.com/wp-json/wp/v2/pages/' +
            context.route.params.id
        )
        .then((response: { data: any }) => {
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
  }

  head() {
    return {
      title: 'TonyHe - ' + this.page.title
    }
  }

  posts: any = []
  errored: boolean = true
  page = {
    title: '',
    content: '',
    views: 0,
    date: ''
  } as {
    title: string
    content: string
    views: number
    date: string
  }
  scrollAble: boolean = false
  scrollAbleHtml: string = '加载全部评论 <i class="ri-play-line"></i>'

  mounted() {
    // 手动访问一遍以增加访问量 2333
    this.$axios.get('https://blog.ouorz.com/comment.html' + '?from=front')
  }
  controlScroll(): void {
    this.scrollAble = this.scrollAble ? false : true
    this.scrollAbleHtml = this.scrollAble
      ? '关闭列表滑动 <i class="ri-pause-line"></i>'
      : '加载全部评论 <i class="ri-play-line"></i>'
  }
}
</script>
