<template>
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
                <nuxt-link to="/" class="top1 header-logo cate-name">{{
                  $t('lang.cate.friends')
                }}</nuxt-link>
              </div>
              <div>
                <nuxt-link to="/">
                  <b-button
                    variant="primary"
                    :class="
                      includeChinese($t('lang.cate.friends'))
                        ? 'cate-back'
                        : 'cate-back-en'
                    "
                  >
                    <i class="ri-arrow-left-line"></i>
                    {{ $t('lang.cate.backHome') }}
                  </b-button>
                </nuxt-link>
              </div>
            </div>
            <p class="top2 lead archive-p">{{ $t('lang.cate.friendsDes') }}</p>
          </nav>
          <!-- 顶部标题与分类区块 -->
          <template v-if="!loading_stop">
            <topInsideCate :loading="loading_stop" />
          </template>
          <template v-else>
            <topInsideCate :loading="!loading_stop" />
          </template>
          <!-- 顶部标题与分类区块 -->
        </div>

        <ul class="article-list" style="margin-bottom:10px">
          <!-- 友情链接交换提示 -->
          <li class="article-list-item reveal index-post-list notice-list">
            <div>{{ $t('lang.index.friendsLink') }}</div>
            <nuxt-link to="/page/249">{{
              $t('lang.index.goFriendsLink')
            }}</nuxt-link>
          </li>
          <!-- 友情链接交换提示 -->
        </ul>
        <ul class="article-list friends-table">
          <li
            class="article-list-item reveal index-post-list friends-li"
            v-for="(post, index) in posts"
            style="display: flex;"
            :key="'friendPost' + post.id"
          >
            <div class="link-list-left">
              <img
                :src="post.post_metas.img[0]"
                :class="
                  'link-list-img friends-img ' +
                    (post.post_metas.linkImg == 'none' ? 'img-none-line' : '')
                "
              />
            </div>
            <div class="link-list-right friends-right">
              <a
                :href="post.post_metas.link + '?ref=https://www.ouorz.com'"
                style="text-decoration: none;"
                target="_blank"
              >
                <h5 class="friends-h5" v-html="post.title.rendered"></h5>
              </a>
              <p
                class="cate-link-item-p cate-link-p friends-p"
                v-html="post.post_excerpt.nine.substr(0, 80)"
              ></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from 'nuxt-property-decorator'
// import header-top-inside
import topInsideCate from '~/components/topInsideCate.vue'

@Component({
  components: {
    topInsideCate
  }
})
export default class Friends extends Vue {
  posts: any[] = []
  loading: boolean = true
  loading_cate: boolean = true
  errored: boolean = true
  loading_stop: boolean = false
  loading_end: boolean = false
  paged: number = 1
  pagedLoading: boolean = false

  async asyncData(context: any): Promise<{ posts: [] }> {
    let res: any[] = await Promise.all([
      context.$axios
        .get(
          'https://blog.ouorz.com/wp-json/wp/v2/posts?&per_page=100&categories=2'
        )
        .then((response: any) => {
          return response.data
        })
    ])
    // Fisher-Yates Shuffle 洗牌随机排序
    for (let i = res[0].length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let t = res[0][i]
      res[0][i] = res[0][j]
      res[0][j] = t
    }
    return {
      posts: res[0]
    }
  }

  mounted() {
    this.loading_stop = true
    this.loading = false
  }

  head() {
    return {
      title: 'TonyHe - 伙伴链接'
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
}
</script>
