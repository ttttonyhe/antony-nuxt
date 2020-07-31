<template>
  <div id="header">
    <header class="tony-header-fixed" id="header-div">
      <!-- Content Menu -->
      <div class="header-div1" v-if="($route.path).match(routeDetect)">
        <nuxt-link to="/" style="display: inline-block;">
          <img src="https://static.ouorz.com/t.jpg" loading="lazy" />
        </nuxt-link>
        <a href="https://blog.ouorz.com/feed">
          <b-button variant="light">{{ $t('lang.header.rss') }}</b-button>
        </a>
        <a>
          <b-button variant="light" @click="openSearch">{{ $t('lang.header.search') }}</b-button>
        </a>
      </div>
      <!-- Content Menu -->
      <!-- Index Menu -->
      <div class="header-div1-1" v-else>
        <nuxt-link to="/" style="display: inline-block;">
          <img src="https://static.ouorz.com/t.jpg" />
        </nuxt-link>
        <a>
          <b-button variant="light" @click="openSearch">{{ $t('lang.header.search') }}</b-button>
        </a>
        <a>
          <b-button variant="light" @click="switchLang">{{ $t('lang.header.lang') }}</b-button>
        </a>
      </div>
      <!-- Index Menu -->

      <!-- Menu Items -->
      <div class="header-div2">
        <nuxt-link to="/">
          <b-button variant="light">{{ $t('lang.header.index') }}</b-button>
        </nuxt-link>
        <nuxt-link to="/archive">
          <b-button variant="light">{{ $t('lang.header.archive') }}</b-button>
        </nuxt-link>
        <nuxt-link to="/page/249">
          <b-button variant="light">{{ $t('lang.header.comment') }}</b-button>
        </nuxt-link>
        <nuxt-link to="/donation">
          <b-button variant="light">{{ $t('lang.header.donation') }}</b-button>
        </nuxt-link>

        <!-- Contact Dropdown -->
        <b-dropdown
          variant="primary"
          split
          :split-href="lang === 'zh-CN' ? '/post/126' : '/bio'"
          :html="$t('lang.header.aboutme')"
        >
          <b-dropdown-item href="/comments">Comments</b-dropdown-item>
          <b-dropdown-item href="/cate/74">English Posts</b-dropdown-item>
          <div class="dropdown-divider"></div>
          <b-dropdown-item href="https://github.com/HelipengTony">Github</b-dropdown-item>
          <b-dropdown-item
            href="http://wpa.qq.com/msgrd?v=3&amp;uin=36624065&amp;site=qq&amp;menu=yes"
          >QQ</b-dropdown-item>
          <b-dropdown-item href="mailto:he@holptech.com">Email</b-dropdown-item>
          <b-dropdown-item href="https://music.163.com/#/user/home?id=79907497">Netease</b-dropdown-item>
          <b-dropdown-item href="https://weibo.com/HLPYSYLW">Weibo</b-dropdown-item>
          <b-dropdown-item href="https://twitter.com/iamtonyhe">Twitter</b-dropdown-item>
          <b-dropdown-item href="https://www.facebook.com/he.tony.351">Facebook</b-dropdown-item>
          <b-dropdown-item href="https://www.instagram.com/iamtonyhe">Instagram</b-dropdown-item>
        </b-dropdown>

        <!-- Contact Dropdown -->
      </div>
      <!-- Menu Items -->
      <div class="search-bg-b" v-if="searchDisplay"></div>
      <!-- Search -->
      <div class="search_form_play" v-if="searchDisplay">
        <div class="search-bg">
          <div class="search-div1">
            <h3>
              {{ $t('lang.header.searchDiv.title') }}
              <button
                type="button"
                class="btn btn-primary"
                style="font-weight: 600;padding: 4px 14px;font-size: .9rem;margin-top: 6px;margin-left: 10px;float: right;"
                @click="closeSearch"
              >{{ $t('lang.header.searchDiv.close') }}</button>
            </h3>
            <p>{{ $t('lang.header.searchDiv.des') }}</p>
            <input
              class="uk-input"
              type="text"
              :placeholder="$t('lang.header.searchDiv.placeholder')"
              v-on:keyup.enter="searchQuery"
              v-model.trim="search_key"
            />
          </div>
          <div class="search-div2">
            <ul v-if="search_loading">
              <template v-if="search_content.length !== 0">
                <li v-for="(search,index) in search_content" :key="index">
                  <a :href="'/post/' + search.id">
                    <h4 v-html="search.title.rendered"></h4>
                    <p v-html="search.post_excerpt.four"></p>
                  </a>
                </li>
              </template>
              <template v-else>
                <li>
                  <h4 style="color:#777">{{ $t('lang.header.searchDiv.noresult') }}</h4>
                  <p>{{ $t('lang.header.searchDiv.noresultDes') }}</p>
                </li>
              </template>
            </ul>
            <ul v-if="loading_ph">
              <div class="skeleton" style="padding:0px">
                <div class="skeleton-body" style="margin: 0px;">
                  <div class="skeleton-title" style="width:100%"></div>
                  <div class="skeleton-content"></div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <!-- Search -->
    </header>
    <div id="view-div" class="center-info" style="display:none" v-if="!($route.path).match(listTextDetect)">
      <p
        style="font-weight: 600;font-size: 1.2rem;color: #555;"
        id="view-text"
      >-&nbsp;{{ $t('lang.header.postlist') }}&nbsp;-</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

// import jqeury feature
import $ from 'jquery'

@Component({})
export default class computerNav extends Vue {
  routeDetect: any = RegExp(/post/)
  listTextDetect: any = RegExp(/post|page|donation|friends|archive|comments/)
  search_content: string = ''
  search_key: string = ''
  search_loading: boolean = false
  loading_ph: boolean = false
  search_open: boolean = false
  lang: string = 'zh-CN'
  searchDisplay: boolean = false
  mounted() {
    // add event listener which changes class for the nav when scrolling
    $(window).scroll(function() {
      var a = $(document).scrollTop()
      if (a <= 0) {
        $('#header-div').attr('class', 'tony-header-fixed')
        $('#view-div').css('display', 'none')
        $('#header-div').hover(
          function() {
            $('#header-div').attr('class', 'tony-header-scoll')
          },
          function() {
            $('#header-div').attr('class', 'tony-header-fixed')
          }
        )
      } else {
        $('#header-div').attr('class', 'tony-header-scoll')
        $('#view-div').css('display', 'block')
        $('#header-div').hover(
          function() {
            $('#header-div').attr('class', 'tony-header-scoll')
          },
          function() {
            $('#header-div').attr('class', 'tony-header-scoll')
          }
        )
      }
    })
  }

  // 显示搜索区域
  openSearch(): void {
    this.searchDisplay = true
  }

  // 请求搜索
  searchQuery(): void {
    this.search_loading = false
    this.loading_ph = true
    var s = this.search_key
    this.$axios
      .get('https://blog.ouorz.com/wp-json/wp/v2/posts?search=' + s)
      .then((response: { data: any }) => {
        this.search_content = response.data
        this.loading_ph = false
        this.search_loading = true
      })
      .catch(error => {
        console.log(error)
      })
  }

  // 关闭搜索区域
  closeSearch(): void {
    this.searchDisplay = false
    this.loading_ph = false
    this.search_content = ''
    this.search_loading = false
    this.search_key = ''
  }

  // i18n 切换语言包
  switchLang() {
    if (this.lang === 'zh-CN') {
      this.lang = 'en-US'
      this.$i18n.locale = this.lang
    } else {
      this.lang = 'zh-CN'
      this.$i18n.locale = this.lang
    }
  }
  
}
</script>

<style lang="scss">
@import './nav.scss';
</style>