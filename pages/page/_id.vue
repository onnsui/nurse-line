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
  head() {
    return {
      style: [
        {
          innerHTML: this.speechStyleTag.innerHTML,
        },
      ],
      // styleタグのエスケープを無効にする
      __dangerouslyDisableSanitizers: ['style'],
    }
  },
  data() {
    return {
      popularArticles: this.popularArticles,
      speechStyleTag: this.speechStyleTag,
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

    // 会話の発言者名・アイコン名をスタイルシートのテキストとして取得する
    const speechStyleTag = await $axios.$get(
      'http://blog.igz0.net/wp-json/wp/v2/liquid-speech-baloon/style-tag',
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
      speechStyleTag,
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

.liquid-speech-balloon-wrap {
  margin: 2rem auto;
  flex-direction: row;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
}
.liquid-speech-balloon-text {
  position: relative;
  z-index: 1;
  width: 100%;
  margin-left: 2rem;
}
.liquid-speech-balloon-text p {
  margin: 0 !important;
  padding: 0 !important;
}
.liquid-speech-balloon-text p a {
  color: inherit !important;
  text-decoration: underline;
}
.liquid-speech-balloon-arrow {
  display: none;
}
.liquid-speech-balloon-wrap:not(.liquid-speech-balloon-vertical)
  .liquid-speech-balloon-arrow {
  border-top: 7px solid transparent !important;
  border-bottom: 7px solid transparent !important;
  border-right: 10px solid rgba(0, 0, 0, 0.2);
}

.liquid-speech-balloon-avatar {
  background-image: url('http://placehold.jp/80x80');
  position: relative;
  width: 5rem;
  height: 5rem;
  line-height: 1;
  flex-shrink: 0;
  background-position: left top;
  background-repeat: no-repeat;
  -webkit-background-size: 100% auto;
  -moz-background-size: 100% auto;
  -ms-background-size: 100% auto;
  -o-background-size: 100% auto;
  background-size: 100% auto;
}
.liquid-speech-balloon-avatar::after {
  position: absolute;
  content: '';
  display: block;
  width: 100%;
  left: 0;
  top: 6rem;
  font-size: 0.9rem;
  text-align: center;
  font-weight: bold;
}

.liquid-speech-balloon-bubble .liquid-speech-balloon-arrow {
  display: none;
}
.liquid-speech-balloon-bubble .liquid-speech-balloon-text::before {
  content: '.';
  color: transparent;
  position: absolute;
  display: block;
  border-radius: 50%;
  border: inherit;
  background-color: inherit;
  left: -15px;
  width: 15px;
  height: 15px;
  top: 20px;
}
.liquid-speech-balloon-bubble .liquid-speech-balloon-text::after {
  content: '.';
  color: transparent;
  position: absolute;
  display: block;
  border-radius: 50%;
  border: inherit;
  background-color: inherit;
  left: -20px;
  top: 10px;
  width: 10px;
  height: 10px;
}

.liquid-speech-balloon-right {
  flex-direction: row-reverse;
}
.liquid-speech-balloon-right .liquid-speech-balloon-text {
  margin-left: 0;
  margin-right: 20px;
}
.liquid-speech-balloon-right .liquid-speech-balloon-arrow {
  left: auto;
  right: -18px;
  border-right: 7px solid transparent !important;
  border-left: 10px solid rgba(0, 0, 0, 0.2);
}

.liquid-speech-balloon-right.liquid-speech-balloon-bubble
  .liquid-speech-balloon-text::before {
  left: auto;
  right: -15px;
}
.liquid-speech-balloon-right.liquid-speech-balloon-bubble
  .liquid-speech-balloon-text::after {
  left: auto;
  right: -20px;
}

.liquid-speech-balloon-square .liquid-speech-balloon-text {
  border-radius: 0;
  border: 2px solid rgba(0, 0, 0, 0.2);
}

.liquid-speech-balloon-dashed .liquid-speech-balloon-text {
  border: 2px dashed rgba(0, 0, 0, 0.2) !important;
}

.liquid-speech-balloon-shadow .liquid-speech-balloon-text {
  border-radius: 0;
  box-shadow: 3px 3px 0 1px rgba(0, 0, 0, 0.1);
}

.liquid-speech-balloon-borderless .liquid-speech-balloon-text {
  border: 0 none;
  padding: 10px 5px;
}
.liquid-speech-balloon-borderless
  .liquid-speech-balloon-text
  .liquid-speech-balloon-arrow {
  display: none;
}

.liquid-speech-balloon-small .liquid-speech-balloon-text,
.liquid-speech-balloon-small .liquid-speech-balloon-text p {
  font-size: 13px;
  padding: 10px 15px;
}
.liquid-speech-balloon-small .liquid-speech-balloon-avatar {
  width: 32px;
  height: 32px;
}
.liquid-speech-balloon-small .liquid-speech-balloon-arrow {
  top: 7px;
}
.liquid-speech-balloon-small .liquid-speech-balloon-avatar::after {
  display: none;
}

.liquid-speech-balloon-large .liquid-speech-balloon-text,
.liquid-speech-balloon-large .liquid-speech-balloon-text p {
  font-size: 36px;
}

.liquid-speech-balloon-short .liquid-speech-balloon-text {
  width: auto;
}

.liquid-speech-balloon-vertical {
  flex-direction: column-reverse;
}
.liquid-speech-balloon-vertical .liquid-speech-balloon-text {
  margin: 0 0 1rem 0;
}
.liquid-speech-balloon-vertical .liquid-speech-balloon-arrow {
  top: auto;
  bottom: -11px;
  left: 11px !important;
  border-top: 10px solid rgba(0, 0, 0, 0.2);
  border-left: 7px solid transparent !important;
  border-right: 7px solid transparent !important;
}
.liquid-speech-balloon-vertical .liquid-speech-balloon-text::before {
  left: 15px !important;
  top: auto;
  bottom: -15px;
}
.liquid-speech-balloon-vertical .liquid-speech-balloon-text::after {
  left: 20px !important;
  top: auto;
  bottom: -22px;
}

@media only screen and (max-device-width: 768px) {
  /* スマホ用のCSS */
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
    margin: 0 0.8rem;
  }

  .cover browed {
    display: none;
  }

  .container {
    color: #222;
    width: 100%;
  }

  .article-title {
    margin: 0 0.5rem;
    width: 100%;
  }

  .article-content {
    font-size: 1.08rem;
  }

  .article-keywords {
    width: auto;
    left: 2rem;
  }

  .article-keywords:first-child {
    margin-left: 1.5rem !important;
  }

  .w_b_size_M {
    width: 2.8rem;
    height: 2.8rem;
    margin: 0 auto;
    img {
      height: 2.8rem !important;
      width: 2.8rem !important;
    }
  }

  .w_b_quote {
    margin: 0;
  }
}
</style>
