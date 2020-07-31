<template>
  <div class="intro">
    <section class="intro-header">
      <div class="intro-background">
        <div class="intro-title">
          <div>
            <img src="https://static.ouorz.com/t.jpg" />
          </div>
          <div>
            <h1>TonyHe</h1>
            <p>Just A Poor Lifesinger</p>
          </div>
        </div>
      </div>
    </section>
    <section class="intro-menu">
      <ul>
        <nuxt-link to="/"><li>Blog</li></nuxt-link>
        <nuxt-link to="/post/126"><li>About</li></nuxt-link>
        <nuxt-link to="/donation"><li>Support</li></nuxt-link>
        <a href="https://drive.google.com/file/d/1rdfeRdaJCauEMtEggO5cT1-mZpeYQKfI" target="_blank"><li>CV<i class="ri-external-link-line"></i></li></a>
      </ul>
    </section>
    <section class="intro-content">
      <section class="intro-content-follow">
        <div class="section-title">
          <p><i class="ri-heart-add-fill"></i>Follow along</p>
        </div>
        <div>
          <ul>
            <li>
              <a href="https://twitter.com/iamtonyhe" target="_blank">
                <div>
                  <div><i class="ri-twitter-fill"></i></div>
                </div>
                <div><p>@iamtonyhe</p></div>
              </a>
            </li>
            <li>
              <a href="https://t.me/TonyHLP" target="_blank">
                <div class="fb">
                  <div><i class="ri-telegram-line"></i></div>
                </div>
                <div><p>@TonyHLP</p></div>
              </a>
            </li>
            <li>
              <a href="http://wpa.qq.com/msgrd?v=3&uin=36624065&site=qq&menu=yes" target="_blank">
                <div class="ins">
                  <div><i class="ri-qq-line"></i></div>
                </div>
                <div><p>@36624065</p></div>
              </a>
            </li>
            <li>
              <a
                href="https://www.zhihu.com/people/helipengtony"
                target="_blank"
              >
                <div>
                  <div><i class="ri-zhihu-line"></i></div>
                </div>
                <div><p>@helipengtony</p></div>
              </a>
            </li>
            <li>
              <a href="https://steamcommunity.com/id/helipeng" target="_blank">
                <div class="steam">
                  <div><i class="ri-steam-fill"></i></div>
                </div>
                <div><p>@helipeng</p></div>
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section class="intro-content-timeline">
        <div class="section-title">
          <p><i class="ri-flag-line"></i>Highlights</p>
        </div>
        <div>
          <p>
            Hi there, here's a few pieces of information that will help you getting to know about me. Talk to me if you have any questions or suggestions.
          </p>
          <ul>
            <li>
              A high school graduate from
              <a href="http://cdshishi.net" target="_blank"
                >SHISHI High School</a
              >, Chengdu, Sichuan, China
            </li>
            <li>
              Prospective student at the 🏫
              <a href="https://uwaterloo.ca" target="_blank"
                >University of Waterloo</a
              >, 2020 entry,
              <a
                href="https://uwaterloo.ca/future-students/programs/mathematics"
                target="_blank"
                >Mathematics Honours</a
              >
            </li>
            <li>
              Interested in changing the world, currently digging in the field
              of 🖥 <b>Computer Science</b>
            </li>
            <li>
              Addicted to "Dope Tech" including Digital products, Algorithms,
              Electric cars, Rockets, Spaceships and Robots
            </li>
          </ul>
        </div>
      </section>
      <section class="intro-content-github">
        <div class="section-title">
          <p><i class="ri-github-fill"></i>Projects</p>
        </div>
        <div>
          <p>
            Most of my projects are open-srouce, check them out through the
            following link. File an issue whenever needed, pull requests are
            always welcomed.
          </p>
        </div>
        <div class="section-card">
          <div>
            <a href="https://github.com/helipengtony" target="_blank"
              ><p>Github.com/HelipengTony</p></a
            >
          </div>
          <div><i class="ri-arrow-right-circle-fill"></i></div>
        </div>
      </section>
      <section class="intro-content-formal">
        <div class="section-title">
          <p><i class="ri-briefcase-3-fill"></i>Contact me</p>
        </div>
        <div>
          <p>
            If you want to have a formal talk or have some serious issues that
            must be discussed, please contact me through the following ways
          </p>
          <ul>
            <li><b>Email:</b> tony.hlp@hotmail.com</li>
            <li><b>Wechat:</b> helipeng_tony</li>
          </ul>
        </div>
      </section>
      <section class="intro-footer">
        <p>
          &copy;2018-2020 TonyHe · <a href="http://www.gnu.org/licenses/gpl-3.0.html" target="_blank">GPL-v3.0</a> · Powered by
          <a href="https://nuxtjs.org" target="_blank">Nuxt.js</a>
        </p>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue } from 'nuxt-property-decorator'

export default class Index extends Vue {
  head() {
    return {
      title: 'TonyHe - Just A Poor Lifesinger',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Just A Poor Lifesinger'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            '贺莉朋,Tony,TonyHe,博客,个人博客,Personal Blog,blog,wordpress,wordpress theme,wordpress theme tony,tony,tonyhe,snapaper,eugrade,snapaper.com,eugrade.com,zeo.im'
        }
      ]
    }
  }
}
</script>
