<template>
  <div class="container">
    <div>
      <!-- {{ article.fetched_article }} -->
      <header>
        <div class="cover browed">
          <span :style="{ backgroundImage: 'url(' + article.cover_image + ')' }"></span>
        </div>
        <div style="position:relative; top:0;">
          <img :src="article.cover_image" style="height: 250px" />
        </div>
      </header>
      <article style="width: 680px;">
        <!-- {{fetchedArticle}} -->

        <h1 style="font-size: 34px; font-weight: bold; letter-spacing: 0.01em;">{{ article.title }}</h1>

        <div style="display:flex; width: 200px; margin: 20px 0">
          <div style="width: 30px; margin: 0 20px;">
            <img :src="article.author_avatar_img_48px" style="height: 30px;" />
          </div>
          <div>
            <div style="font-size: 14px; font-weight: bold;">{{ article.author }}</div>
            <div style="font-size: 12px;">{{ article.date_str }}</div>
          </div>
        </div>

        <br />
        <br />

        <div v-html="articleHTML"></div>
      </article>
      <img src="http://placehold.jp/350x60.png" alt="キャリア相談をする" />
    </div>

    <h2></h2>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    const fetchedArticle = await $axios.$get(
      'http://blog.igz0.net/wp-json/wp/v2/posts/' + params.id,
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

    return {
      fetchedArticle,
      article,
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

<style>
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 18px;
  font-weight: normal;
  /* font-family: Hiragino Kaku Gothic ProN,Hiragino Sans,ヒラギノ角ゴ ProN W3,Arial,メイリオ,Meiryo,sans-serif !important; */
}

h1 {
  font-weight: normal;
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
  width: 96px;
  height: 96px;
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
*,
*::before,
*::after {
  box-sizing: inherit;
  -webkit-font-smoothing: antialiased;
  word-break: break-word;
  word-wrap: break-word;
}
user agent stylesheet div {
  display: block;
}
@media (min-width: 700px) .entry-content {
  font-size: 2.1rem;
}

.entry-content {
  line-height: 1.5;
}
.browed {
  width: 100%;
  height: 250px;
  overflow: hidden;
  position: absolute;
  top: 0;
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
}

.wp-block-separator {
  border-width: 1px 0px 0px 0px; /* 太さ */
  border-style: solid; /* 線種 */
  border-color: #d3d3d3; /* 線色 */
  margin: 30px 0;
}
</style>
