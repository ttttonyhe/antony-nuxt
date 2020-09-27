<template>
<div id="header_info" class="index-top">
    <nav class="header-nav reveal">
        <img class="header-avatar-top" src="https://static.ouorz.com/t.jpg" loading="lazy" alt="TonyHe's Avatar" />
        <a style="text-decoration:none;" href="/" class="header-logo" title="TonyHe">TonyHe</a>

        <p class="lead" style="margin-top: 0px;margin-left:5px">
            Just A Poor Lifesinger
        </p>
    </nav>
    <!-- 英文版长内容展示不同样式 -->
    <div :class="'index-cates ' + ($i18n.locale == 'en-US' ? 'index-long' : '')">
        <template v-if="loading_cates">
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
    <div class="tags-div">
        <!-- 滑动左侧 -->
        <a v-if="translateX > 0" class="tags-scroll-right scroll-left" @click="scrollTags('left')">
            <i class="ri-arrow-left-line"></i>
        </a>
        <!-- 滑动左侧 -->

        <ul :class="'post_tags ' + (cookie ? 'post_tags_noscroll' : '')">
            <li class="cat-real" v-for="(tag, index) in tages" :key="'topCat' + tag.id">
                <nuxt-link :to="'/tag/' + tag.id">#{{ tag.name }}</nuxt-link>
            </li>
            <li class="loading-line" style="background: rgb(236, 237, 238);height: 25px;width: 100%;" v-if="loading_tages"></li>
        </ul>

        <!-- 滑动右侧 -->
        <a v-if="!loading_tages" class="tags-scroll-right" @click="scrollTags('right')">
            <i class="ri-arrow-right-line"></i>
        </a>
        <!-- 滑动右侧 -->
    </div>
</div>
</template>

<script lang="ts">
import {
    Component,
    Prop,
    Vue
} from 'nuxt-property-decorator'

@Component({})
export default class headerTop extends Vue {
    // 获取参数
    @Prop()
    loading_cates!: boolean
    @Prop()
    loading_tages!: boolean
    @Prop()
    tages!: any[]
    @Prop()
    cookie!: boolean

    // 定义数据
    translateX: number = 0

    // 标签横向滑动
    scrollTags(direction: string): void {
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
</script>
