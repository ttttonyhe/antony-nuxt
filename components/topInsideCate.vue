<template>
<!-- 英文版长内容展示不同样式 -->
<div :class="
      'index-cates cate-cates ' + ($i18n.locale == 'en-US' ? 'index-long' : '')
    ">
    <template v-if="loading">
        <li class="cat-item cat-item-4 loading-line" style="display: inline-block;width: 98%;height: 35px;box-shadow: none;border-radius: 0px;background: rgb(236, 237, 239);"></li>
    </template>
    <template v-else>
        <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
            <nuxt-link to="/friends" title="和伙伴们交换网站链接，再高兴不过的事!">
                <div class="header-item-icon-div">
                    <i class="ri-user-5-line"></i>
                </div>
                {{ $t('lang.top.friend') }}
            </nuxt-link>
        </li>
        <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
            <nuxt-link to="/cate/4" title="一些...小玩意儿">
                <div class="header-item-icon-div">
                    <i class="ri-dvd-line"></i>
                </div>
                {{ $t('lang.top.rec') }}
            </nuxt-link>
        </li>
        <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
            <nuxt-link to="/cate/5" title="每一个在地球上留下独特的痕迹的项目">
                <div class="header-item-icon-div">
                    <i class="ri-product-hunt-line"></i>
                </div>
                {{ $t('lang.top.product') }}
            </nuxt-link>
        </li>
        <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
            <nuxt-link to="/cate/7" title="To make the world a better place">
                <div class="header-item-icon-div">
                    <i class="ri-code-box-line"></i>
                </div>
                {{ $t('lang.top.code') }}
            </nuxt-link>
        </li>
        <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
            <nuxt-link to="/page/765" title="Ask me anything">
                <div class="header-item-icon-div">
                    <i class="ri-chat-smile-2-line"></i>
                </div>
                {{ $t('lang.top.bb') }}
            </nuxt-link>
        </li>
        <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
            <a href="https://dev.ouorz.com" title="学习与开发日志">
                <div class="header-item-icon-div">
                    <i class="ri-file-paper-line"></i>
                </div>
                {{ $t('lang.top.dev') }}
            </a>
        </li>
    </template>
</div>
</template>

<script lang="ts">
import {
    Component,
    Prop,
    Vue
} from 'nuxt-property-decorator'

@Component({})
export default class topInsideCate extends Vue {
    @Prop()
    loading!: boolean
}
</script>
