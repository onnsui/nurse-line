<template>
  <div>
    <div class="container">
      <div>
        <!-- {{ article.fetched_article }} -->
        <div class="article-header">
          <div class="cover browed">
            <span :style="{ backgroundImage: 'url(' + article.cover_image + ')' }"></span>
          </div>
          <div style="position:relative; top:0;">
            <img :src="article.cover_image" style="height: 250px" />
          </div>
        </div>
        <article>
          <!-- {{fetchedArticle}} -->

          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-info">
            <img :src="article.author_avatar_img_48px" class="article-avatar-icon" />
            <div>
              <div style="font-size: 14px; font-weight: bold;">{{ article.author }}</div>
              <div style="font-size: 12px;">{{ article.date_str }}</div>
            </div>
          </div>

          <div v-html="articleHTML" class="article-content"></div>
        </article>
        <img src="http://placehold.jp/350x60.png" alt="キャリア相談をする" />
        <div class="article-tags">
          <span>#転職支援</span>
          <span>#インタビュー</span>
        </div>

        <h2>人気の記事</h2>
        <ArticleRankingItem :articles="popularArticles"></ArticleRankingItem>
      </div>
    </div>
  </div>
</template>

<script>
import GetArticlesForWpAPI from '~/assets/GetArticlesForWpAPI.js'
import AddIndexHeadingHTML from '~/assets/AddIndexHeadingHTML.js'
import ArticleRankingItem from '~/components/ArticleRankingItem'

export default {
  components: {
    ArticleRankingItem,
  },
  data() {
    return {
      popularArticles: this.popularArticles,
    }
  },
  async asyncData({ $axios, params }) {
    // WordPressからタグの一覧を取得する
    const tags = await $axios.$get('http://blog.igz0.net/wp-json/wp/v2/tags')

    // 人気記事をWordPressから取得する
    const fetchedWPPopularArticles = await $axios.$get(
      'http://blog.igz0.net/wp-json/wpp/posts',
    )
    // 人気記事を記事表示コンポーネントへ渡すデータに整形
    const popularArticles = GetArticlesForWpAPI(fetchedWPPopularArticles, tags)

    // 記事内容を取得
    const fetchedArticle = await $axios.$get(
      'http://blog.igz0.net/wp-json/wp/v2/posts/' + params.id,
    )

    // WordPress PopularPostの閲覧数をカウントアップする
    $axios.$post(
      'http://blog.igz0.net/wp-json/wordpress-popular-posts/v1/popular-posts?wpp_id=' +
        params.id,
    )

    // ISO8601形式の日付をDate型に変換する関数
    const convIso8601DateStr = (isoDateStr) => {
      const parse = isoDateStr.match(
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/,
      )
      return new Date(
        Number(parse[1]),
        Number(parse[2]),
        Number(parse[3]),
        Number(parse[4]),
        Number(parse[5]),
        Number(parse[6]),
      )
    }

    // Date型の日付を記事上の文字列(例: 2020.01.01)に変換する関数
    const getArticleDateStr = (date) => {
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      return year + '.' + month + '.' + day
    }

    const articleDate = convIso8601DateStr(fetchedArticle.date)
    const articleDateStr = getArticleDateStr(articleDate)

    const fetchedUsers = await $axios.$get(
      'http://blog.igz0.net/wp-json/wp/v2/users',
    )

    const getAuthorUser = (userId, users) => {
      let userName = ''
      let avatarUrls = []

      for (let i = 0; i < fetchedUsers.length; i++) {
        const fetchedUser = fetchedUsers[i]
        if (userId === fetchedUser.id) {
          userName = fetchedUser.name
          avatarUrls = fetchedUser.avatar_urls
        }
      }
      const user = {
        name: userName,
        avatar_img_24px: avatarUrls['24'],
        avatar_img_48px: avatarUrls['48'],
        avatar_img_96px: avatarUrls['96'],
      }
      return user
    }

    const articleAuthorId = fetchedArticle.author
    const articleAuthor = getAuthorUser(articleAuthorId, fetchedUsers)

    // デフォルトのカバー画像URLをセット
    let featuredMediaRESTUrl = ''
    const featuredMedia = fetchedArticle._links['wp:featuredmedia']

    if (featuredMedia !== undefined && featuredMedia.length > 0) {
      featuredMediaRESTUrl = featuredMedia[0].href
    }
    const featuredMediaInfo = await $axios.$get(featuredMediaRESTUrl)
    const featuredMediaURL = featuredMediaInfo.guid.rendered

    const article = {
      fetched_article: fetchedArticle,
      title: fetchedArticle.title.rendered,
      cover_image: featuredMediaURL,
      date: articleDate,
      date_str: articleDateStr,
      author: articleAuthor.name,
      author_avatar_img_48px: articleAuthor.avatar_img_48px,
      author_avatar_img_96px: articleAuthor.avatar_img_96px,
      content: fetchedArticle.content.rendered,
    }

    // WordPressの記事HTMLに目次のタグを埋め込む
    article.content = AddIndexHeadingHTML(article.content)

    return {
      fetchedArticle,
      popularArticles,
      article,
      tags,
      users: fetchedUsers,
      articleHTML: article.content,
    }
  },
  methods: {
    getTagName(id) {
      const tags = this.tags
      let tagName = ''

      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i]
        const tagId = tag.id
        if (id === tagId) {
          tagName = tag.name
        }
      }
      return tagName
    },
  },
}
</script>

<style lang="scss">
h1 {
  font-weight: normal;
}

.container {
  width: 750px;
  margin: 0 auto;
}

.article-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 0 1rem;
  text-align: left;
}

.article-info {
  display: flex;
  width: 200px;
  margin: 1.5rem 0.5rem;
  text-align: left;
  color: #454545;
}

.article-avatar-icon {
  border-radius: 50%;
  height: 32px;
  width: 32px;
  margin: 0 1em 0 0.5em;
}

.article-content {
  font-size: 1.15rem;
  line-height: 2.4rem;
  text-align: initial;
  h2 {
    margin: 1.8em 0;
  }
}

.index-heading {
  background-color: #f8f8f8;
  width: 75%;
  margin: 2rem auto;
  padding: 1.3rem 2rem 2rem 2rem;

  ol {
    padding: 0;
  }

  // 目次の項目に下線を入れる
  li {
    border-bottom: 1px solid #cecece;
    list-style: none;
  }

  // 最終行には下線を引かない
  li:last-child {
    border-bottom: 0;
  }
  a {
    color: #6e6e6e;
    font-size: 0.9rem;
    text-decoration: none;
  }
}

.wp-block-image > img {
  width: 100%;
}

.w_b_w100 {
  width: 100%;
  text-align: left;
}

.w_b_flex {
  display: -webkit-flex;
  display: flex;
}
.w_b_box {
  margin: 20px 0;
}

.w_b_flex {
  display: -webkit-flex;
  display: flex;
}

.w_b_box *,
.w_b_box *:before,
.w_b_box *:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.w_b_ava_box {
  z-index: 3;
}
.w_b_f_n {
  flex: none;
}
.w_b_relative {
  position: relative;
}

.w_b_relative {
  position: relative;
}
.w_b_box *,
.w_b_box *:before,
.w_b_box *:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.w_b_size_M {
  width: 4em;
  height: 4em;
  margin: 0 auto;
  img {
    height: 4em !important;
    width: 4em !important;
  }
}

.w_b_radius {
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.w_b_ava_effect {
  text-align: center;
}

.w_b_ava_img {
  /* height: auto; */
  width: 75px !important;
  height: 75px !important;
  min-height: 1px;
  min-width: 1px;
  max-width: 100%;
}
.w_b_w100 {
  width: 100%;
}

.w_b_ava_L {
  width: 90px;
}

.w_b_name {
  font-size: 15px;
  font-weight: bold;
  text-align: center;
}

.w_b_space {
  padding: 0 !important;
}

.cover span {
  width: 100%;
  height: 250px;
  display: block;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
  -moz-transform: scale(1.2, 1.2);
  -ms-transform: scale(1.2, 1.2);
  -webkit-transform: scale(1.2, 1.2);
  transform: scale(1.2, 1.2);
  filter: alpha(opacity=70);
  opacity: 0.7;
}
.w_b_bal_box.w_b_inclass.w_b_inview:not(.w_b_inview_solo):not(.w_b_inview_unset) {
  opacity: 1;
  transform: translate(0, 0);
  transition: all 500ms;
}
.w_b_bal_box.w_b_outview:not(.w_b_inview_solo):not(.w_b_inview_unset).w_b_direction_L {
  transform: translate(-100%, 0);
}
.w_b_bal_box.w_b_outview:not(.w_b_inview_solo):not(.w_b_inview_unset) {
  opacity: 0;
  transition: all 500ms;
  box-shadow: 0 0 rgba(0, 0, 0, 0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.w_b_w100 {
  width: 100%;
}
.w_b_relative {
  position: relative;
}

.w_b_quote {
  margin-left: 20px;
}

.w_b_box *,
.w_b_box *:before,
.w_b_box *:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.entry-content {
  line-height: 1.5;
}
.browed {
  width: 100%;
  height: 250px;
  overflow: hidden;
  position: absolute;
  left: 0;
  background: #000;
}

.cover image {
  height: 250px;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

blockquote {
  background-color: #f3f3f3;
  width: 80%;
  margin: 0 auto;
}

.wp-block-separator {
  border-width: 1px 0px 0px 0px; /* 太さ */
  border-style: solid; /* 線種 */
  border-color: #dad7d7; /* 線色 */
  margin: 30px 0;
}

@media only screen and (max-device-width: 768px) {
  div {
    width: 100%;
  }

  .article-title {
    font-size: 1.4rem;
    margin: 0 auto;
    padding: 0 1.1rem;
    width: 100%;
  }

  article {
    margin: 0 0.5rem;
  }

  .container {
    width: 100%;
  }

  /* スマホ用のCSS */
  .article-title {
    margin: 0 0.5rem;
    width: 100%;
  }
}
</style>
