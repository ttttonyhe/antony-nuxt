<template>
  <div class="index-div">
    <div class="single-index">
      <h4>
        <i class="ri-list-check-2"></i>
        {{ $t('lang.post.index') }}
      </h4>
    </div>
    <ul id="article-index" class="index-ul"></ul>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  mounted() {
    /* 文章目录 */
    let h = 0
    let pf = 23
    let i = 0
    $('#article-index').html('')
    let count_in, count_ar, count_sc, count_e
    let count_ti = (count_in = count_ar = count_sc = count_e = 1)
    let offset = new Array()
    let min = 0
    let c = 0
    let icon = ''

    //获取最高级别h标签
    $('.article-content>:header').each(function() {
      h = $(this)
        .eq(0)
        .prop('tagName')
        .replace('H', '')
      if (c == 0) {
        min = h
        c++
      } else {
        if (h <= min) {
          min = h
        }
      }
    })

    //获取h标签内容
    $('.article-content>:header').each(function() {
      h = $(this)
        .eq(0)
        .prop('tagName')
        .replace('H', '') //标签级别
      let addCount = Math.abs(h - min)
      for (i = 0; i < addCount; ++i) {
        //偏移程度
        pf += 10
      }
      if (pf !== 23) {
        //图标
        icon = 'ri-stop-line'
      } else {
        icon = 'ri-checkbox-blank-circle-line'
      }

      $('#article-index').html(
        $('#article-index').html() +
          '<li id="ti' +
          count_ti++ +
          '" style="padding-left:' +
          pf +
          'px"><a><i class="' +
          icon +
          '"></i>&nbsp;&nbsp;' +
          $(this)
            .eq(0)
            .text()
            .replace(/[ ]/g, '') +
          '</a></li>'
      ) //创建目录
      $(this)
        .eq(0)
        .attr('id', 'in' + count_in++) //添加id
      offset[0] = 0
      offset[count_ar++] = $(this)
        .eq(0)
        .offset().top //位置存入数组
      count_e++
      pf = 23 //设置初始偏移值
      i = 0 //设置循环开始
    })

    //跳转对应位置事件
    $('#article-index li').click(function() {
      $('html,body').animate(
        {
          scrollTop:
            $(
              '#in' +
                $(this)
                  .eq(0)
                  .attr('id')
                  .replace('ti', '')
            ).offset().top - 100
        },
        500
      )
    })

    if (count_e !== 1) {
      //若存在h3标签
      $(window).unbind('scroll')
      $(window).scroll(function indexScroll() {
        
        //仅在文章页监听
        if (window.location.pathname.split('/')[1] == 'post') {
          //滑动窗口时
          var scroH = $(this).scrollTop() + 130
          var navH = offset[count_sc] //从1开始获取当前h3位置
          var navH_prev = offset[count_sc - 1] //获取上一个h3位置(以备回滑)
          if (scroH >= navH) {
            //滑过当前h3位置
            $('#ti' + (count_sc - 1)).attr('class', '')
            $('#ti' + count_sc).attr('class', 'active')
            $('#article-index').animate(
              {
                scrollTop: $('#article-index>#ti' + count_sc)[0].offsetTop - 50
              },
              100
            )
            count_sc++ //调至下一个h3位置
          }

          if (scroH <= navH_prev && count_sc - 2 !== 0) {
            //滑回上一个h3位置,调至上一个h3位置
            $('#ti' + (count_sc - 2)).attr('class', 'active')
            $('#article-index').animate(
              {
                scrollTop:
                  $('#article-index>#ti' + (count_sc - 2))[0].offsetTop - 50
              },
              100
            )
            count_sc--
            $('#ti' + count_sc).attr('class', '')
          }
          if (scroH <= navH_prev && count_sc - 2 == 0) {
            //首个标题直接滑动至顶部
            $('#ti1').attr('class', 'active')
            $('#article-index').scrollTop(0)
          }
        }

        //顶部菜单重新监听，unbind 后会取消所有监听
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
      this.$emit('exist_index', true)
    } else {
      $('.index-div').css('display', 'none')
      this.$emit('exist_index', false)
    }
    /* 文章目录 */
  }
}
</script>