<template>
  <div id="top">
    <div class="container">
      <div>
        <div class="article-cover">
          <div class="cover-browed">
            <span :style="{ backgroundImage: 'url(' + article.cover_image + ')' }"></span>
          </div>

          <div class="cover-image">
            <img :src="article.cover_image" loading="lazy" />
          </div>
        </div>

        <article>
          <h1 class="article-title">{{ article.title }}</h1>

          <div class="article-info">
            <img :src="article.author_avatar_img_48px" class="article-avatar-icon" loading="lazy" />
            <div>
              <div class="article-author">{{ article.author }}</div>
              <div class="article-date">{{ article.date_str }}</div>
            </div>
          </div>

          <div v-html="articleHTML" class="article-content"></div>
        </article>

        <a href="#">
          <div class="detail-button">
            <a href="#">
              <span>キャリア相談をする</span>
            </a>
          </div>
        </a>

        <div class="keywords-wrapper">
          <a
            v-for="(keyword, index) in article.keywords"
            :key="index"
            v-bind:href="'/keyword/'+keyword"
            class="keyword-link"
          >#{{ keyword }}</a>
        </div>

        <h2 class="popular-header">人気の記事</h2>
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
      title: this.meta.title,
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
  async asyncData({ $axios, params, error }) {
    const pageId = params.pageId

    let tags = null
    try {
      // WordPressから記事のタグのリストを取得する
      tags = await $axios.$get('/wp-json/wp/v2/tags')
    } catch (e) {
      return error({
        statusCode: e.response.status,
        message: e.response.message,
      })
    }

    let categories = null
    try {
      // WordPressからカテゴリーのリストを取得する
      categories = await $axios.$get('/wp-json/wp/v2/categories')
    } catch (e) {
      return error({
        statusCode: e.response.status,
        message: e.response.message,
      })
    }

    let fetchedWPPopularArticles = null
    try {
      // 人気記事をWordPressから取得する
      fetchedWPPopularArticles = await $axios.$get('/wp-json/wpp/posts')
    } catch (e) {
      return error({
        statusCode: e.response.status,
        message: e.response.message,
      })
    }

    // 人気記事を記事表示コンポーネントへ渡すデータに整形
    const popularArticles = GetArticlesForWpAPI(
      fetchedWPPopularArticles,
      categories,
    )

    let fetchedArticle = null
    try {
      // 記事内容を取得
      fetchedArticle = await $axios.$get('/wp-json/wp/v2/posts/' + pageId)
    } catch (e) {
      return error({
        statusCode: e.response.status,
        message: e.response.message,
      })
    }
    // 会話の発言者名・アイコン名をスタイルシートのテキストとして取得する

    let speechStyleTag = null
    try {
      speechStyleTag = await $axios.$get(
        '/wp-json/wp/v2/liquid-speech-baloon/style-tag',
      )
    } catch (e) {
      return error({
        statusCode: e.response.status,
        message: e.response.message,
      })
    }

    try {
      // WordPress Popular Postプラグインでの閲覧数をカウントアップする
      $axios.$post(
        '/wp-json/wordpress-popular-posts/v1/popular-posts?wpp_id=' + pageId,
      )
    } catch (e) {
      return error({
        statusCode: e.response.status,
        message: e.response.message,
      })
    }

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

    // 記事の日付フォーマット(例: 2020.01.01)でタグを取得する
    const articleDate = convIso8601DateStr(fetchedArticle.date)
    const articleDateStr = getArticleDateStr(articleDate)

    // WordPressのタグIDからタグ名を取得する関数
    const getTagName = (id, tags) => {
      let tagName = ''

      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i]
        const tagId = tag.id
        if (id === tagId) {
          tagName = tag.name
        }
      }
      return tagName
    }

    // 記事のタグID一覧を取得し、タグ名のリストを作成する。
    const tagNames = []
    const articleTagIds = fetchedArticle.tags
    for (let i = 0; i < articleTagIds.length; i++) {
      const tagId = articleTagIds[i]
      const tagName = getTagName(tagId, tags)
      tagNames.push(tagName)
    }

    let fetchedUsers = null
    try {
      // WordPressのユーザー一覧を取得
      fetchedUsers = await $axios.$get('/wp-json/wp/v2/users')
    } catch (e) {
      return error({
        statusCode: e.response.status,
        message: e.response.message,
      })
    }
    // 記事の著者情報をWordPressの情報から取得する
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

    let featuredMediaInfo = null
    try {
      featuredMediaInfo = await $axios.$get(featuredMediaRESTUrl)
    } catch (e) {
      return error({
        statusCode: e.response.status,
        message: e.response.message,
      })
    }
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
      keywords: tagNames,
    }

    // WordPressの記事(HTML)を加工し、目次のHTMLタグを埋め込む。
    article.content = AddIndexHeadingHTML(article.content)

    return {
      fetchedArticle,
      popularArticles,
      article,
      categories,
      tags,
      speechStyleTag,
      users: fetchedUsers,
      articleHTML: article.content,
      meta: {
        title: article.title,
      },
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

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.detail-button {
  max-width: 22rem;
  margin: 2rem auto 3rem auto;
  font-weight: bold;
  padding: 1rem 4rem 1rem 4rem;
  background: rgb(38, 47, 64);
  background: linear-gradient(
    149deg,
    rgba(38, 47, 64, 1) 0%,
    rgba(139, 142, 157, 1) 66%,
    rgba(152, 149, 170, 1) 100%
  );
  span {
    color: white;
  }
}
/*---------------------------------

  PC対応のスタイル

---------------------------------*/
@media only screen and (min-device-width: 769px) {
  .container {
    margin: 0 15.5rem;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    text-align: center;

    // 記事のヘッダー(サムネイル部分)のスタイルを定義
    .article-cover {
      .cover-browed {
        height: 250px;

        width: 100%;
        overflow: hidden;
        position: absolute;
        left: 0;
        background: #000;

        span {
          display: block;
          height: 250px;
          width: 100%;
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
      }

      .cover-image {
        position: relative;
        top: 0;

        img {
          width: 750px;
          height: 250px;
          object-fit: cover;
        }
      }
    }

    article {
      .article-title {
        font-size: 2rem;
        font-weight: bold;
        text-align: left;
      }

      .article-info {
        display: flex;
        width: 200px;
        margin: 1.5rem 0.5rem;
        text-align: left;
        color: #454545;

        .article-avatar-icon {
          border-radius: 50%;
          height: 32px;
          width: 32px;
          margin: 0 1rem 0 0.4rem;
        }
        .article-author {
          font-size: 14px;
          font-weight: bold;
        }
        .article-date {
          font-size: 12px;
        }
      }

      .article-content {
        font-size: 1.15rem;
        line-height: 2.4rem;
        text-align: initial;

        /deep/ h1 {
          font-weight: normal;
        }

        /deep/ h2 {
          margin: 1.8em 0;
        }

        /deep/ blockquote {
          background-color: #f3f3f3;
          width: 80%;
          margin: 0 auto;
        }

        // 記事の目次部分のスタイル定義
        /deep/ .index-heading {
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
            // 最終行には下線を引かない
            &:last-child {
              border-bottom: 0;
            }
          }

          a {
            color: #6e6e6e;
            font-size: 0.9rem;
            text-decoration: none;
          }
        }

        // WordPressから投稿された画像は全幅に
        /deep/ .wp-block-image > img {
          width: 100%;
        }

        /*---------------------------------

  PC版の吹き出し部分のスタイルを定義

---------------------------------*/

        /deep/ .liquid-speech-balloon-wrap {
          margin: 2rem auto;
          flex-direction: row;
          display: -webkit-flex;
          display: -moz-flex;
          display: -ms-flex;
          display: -o-flex;
          display: flex;

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

          .liquid-speech-balloon-avatar {
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

            &::after {
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
          }

          .liquid-speech-balloon-text {
            position: relative;
            z-index: 1;
            width: 100%;
            margin-left: 2rem;
          }
        }
      }
    }

    .entry-content {
      line-height: 1.5;
    }

    .title {
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

    .wp-block-separator {
      border-width: 1px 0px 0px 0px; /* 太さ */
      border-style: solid; /* 線種 */
      border-color: #dad7d7; /* 線色 */
      margin: 30px 0;
    }

    .popular-header {
      margin: 1rem 0;
    }

    .keywords-wrapper {
      display: flex;
      flex-wrap: wrap;
      margin: 0.5rem;
      width: initial;

      .keyword-link {
        border: 1px solid #b4b2b2;
        border-radius: 4px;
        color: #454545;
        font-size: 0.9rem;
        font-weight: bold;
        text-decoration: none;
        margin: 0.6rem 0.5rem;
        padding: 0.3rem 0.9rem;
        width: auto !important;
      }
    }
  }
}

@media only screen and (max-device-width: 768px) {
  /*---------------------------------

  スマホ・タブレット対応のスタイル

---------------------------------*/

  .container {
    width: 100%;
    margin: 0 auto;
    color: #222;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    .article-cover {
      .cover-browed {
        display: none;

        span {
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
      }

      .cover-image {
        position: relative;
        top: 0;

        img {
          width: 100%;
        }
      }
    }

    .article-title {
      font-weight: bold;
      text-align: left;
      font-size: 1.4rem;
      margin: 0 auto;
      padding: 0 0.5rem;
      width: 100%;
    }

    .article-info {
      display: flex;
      width: 200px;
      margin: 1.5rem 0.5rem;
      text-align: left;
      color: #454545;

      .article-avatar-icon {
        border-radius: 50%;
        height: 32px;
        width: 32px;
        margin: 0 1em 0 0.5em;
      }
      .article-author {
        font-size: 14px;
        font-weight: bold;
      }
      .article-date {
        font-size: 12px;
      }
    }

    .article-content {
      font-size: 1.08rem;
      line-height: 2rem;
      text-align: initial;
      letter-spacing: 0;
      margin: 0 0.3rem;

      /deep/ h1 {
        font-weight: normal;
      }
      /deep/ h2 {
        margin: 1.8em 0;
        font-size: 1.3rem;
        letter-spacing: 0.05rem;
      }

      /deep/ .index-heading {
        background-color: #f8f8f8;
        margin: 2rem auto;
        padding: 1.3rem 2rem 2rem 2rem;

        ol {
          padding: 0;
        }

        // 目次の項目に下線を入れる
        li {
          border-bottom: 1px solid #cecece;
          list-style: none;
          // 最終行には下線を引かない
          &:last-child {
            border-bottom: 0;
          }
        }

        a {
          color: #6e6e6e;
          font-size: 0.9rem;
          text-decoration: none;
        }
      }

      /deep/ .index-heading-title {
        font-size: 0.9rem;
      }

      /deep/ .wp-block-image > img {
        width: 100%;
      }

      /deep/ .entry-content {
        line-height: 1.5;
      }

      /deep/ .title {
        font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
          BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
          sans-serif;
        display: block;
        font-weight: 300;
        font-size: 100px;
        color: #35495e;
        letter-spacing: 1px;
      }

      /deep/ .subtitle {
        font-weight: 300;
        font-size: 42px;
        color: #526488;
        word-spacing: 5px;
        padding-bottom: 15px;
      }

      /deep/ .links {
        padding-top: 15px;
      }

      /deep/ blockquote {
        background-color: #f3f3f3;
        width: 80%;
        margin: 0 auto;
      }

      /deep/ .wp-block-separator {
        border-width: 1px 0px 0px 0px; /* 太さ */
        border-style: solid; /* 線種 */
        border-color: #dad7d7; /* 線色 */
        margin: 30px 0;
      }

      /deep/ .liquid-speech-balloon-wrap {
        margin: 2rem auto;
        flex-direction: row;
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flex;
        display: -o-flex;
        display: flex;

        .liquid-speech-balloon-avatar {
          position: relative;
          top: 0.5rem;
          width: 2.5rem;
          height: 2.5rem;
          line-height: 1;
          flex-shrink: 0;
          background-position: left top;
          background-repeat: no-repeat;
          -webkit-background-size: 100% auto;
          -moz-background-size: 100% auto;
          -ms-background-size: 100% auto;
          -o-background-size: 100% auto;
          background-size: 100% auto;

          &:after {
            position: absolute;
            display: block;
            width: 100%;
            left: 0;
            top: 3.5rem;
            font-size: 0.8rem;
            text-align: center;
            font-weight: bold;
          }
        }

        .liquid-speech-balloon-text {
          position: relative;
          z-index: 1;
          width: 100%;
          margin-left: 1rem;

          p {
            margin: 0 !important;
            padding: 0 !important;
            a {
              color: inherit !important;
              text-decoration: underline;
            }
          }

          &::before {
            left: 15px !important;
            top: auto;
            bottom: -15px;
          }
          &::after {
            left: 20px !important;
            top: auto;
            bottom: -22px;
          }
        }

        .liquid-speech-balloon-bubble {
          &::before {
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
          &::after {
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
        }

        .liquid-speech-balloon-right.liquid-speech-balloon-bubble {
          &::before {
            left: auto;
            right: -15px;
          }
          &::after {
            left: auto;
            right: -20px;
          }
        }

        .liquid-speech-balloon-square {
          border-radius: 0;
          border: 2px solid rgba(0, 0, 0, 0.2);
        }

        .liquid-speech-balloon-dashed {
          border: 2px dashed rgba(0, 0, 0, 0.2) !important;
        }

        .liquid-speech-balloon-shadow {
          border-radius: 0;
          box-shadow: 3px 3px 0 1px rgba(0, 0, 0, 0.1);
        }

        .liquid-speech-balloon-borderless {
          border: 0 none;
          padding: 10px 5px;
        }
        .liquid-speech-balloon-borderless .liquid-speech-balloon-arrow {
          display: none;
        }

        .liquid-speech-balloon-small p {
          font-size: 13px;
          padding: 10px 15px;
        }

        .liquid-speech-balloon-large,
        .liquid-speech-balloon-largep {
          font-size: 36px;
        }

        .liquid-speech-balloon-short {
          width: auto;
        }
      }

      /deep/ .liquid-speech-balloon-arrow {
        display: none;
      }
      /deep/
        .liquid-speech-balloon-wrap:not(.liquid-speech-balloon-vertical)
        .liquid-speech-balloon-arrow {
        border-top: 7px solid transparent !important;
        border-bottom: 7px solid transparent !important;
        border-right: 10px solid rgba(0, 0, 0, 0.2);
      }

      /deep/ .liquid-speech-balloon-bubble .liquid-speech-balloon-arrow {
        display: none;
      }

      /deep/ .liquid-speech-balloon-right {
        flex-direction: row-reverse;
        .liquid-speech-balloon-text {
          margin-left: 0;
          margin-right: 20px;
        }
        .liquid-speech-balloon-arrow {
          left: auto;
          right: -18px;
          border-right: 7px solid transparent !important;
          border-left: 10px solid rgba(0, 0, 0, 0.2);
        }
      }

      /deep/ .liquid-speech-balloon-small .liquid-speech-balloon-avatar {
        width: 32px;
        height: 32px;
        &::after {
          display: none;
        }
      }
      /deep/ .liquid-speech-balloon-small .liquid-speech-balloon-arrow {
        top: 7px;
      }

      /deep/ .liquid-speech-balloon-vertical {
        flex-direction: column-reverse;

        .liquid-speech-balloon-text {
          margin: 0 0 1rem 0;
        }

        .liquid-speech-balloon-arrow {
          top: auto;
          bottom: -11px;
          left: 11px !important;
          border-top: 10px solid rgba(0, 0, 0, 0.2);
          border-left: 7px solid transparent !important;
          border-right: 7px solid transparent !important;
        }
      }
    }

    .popular-header {
      margin: 1rem 0;
    }

    article {
      margin-top: 2rem;
      padding: 0 0.8rem;
    }

    .keywords-wrapper {
      display: flex;
      flex-wrap: wrap;
      margin: 0.5rem;
      width: initial;

      .keyword-link {
        border: 1px solid #b4b2b2;
        border-radius: 4px;
        color: #454545;
        font-size: 0.9rem;
        font-weight: bold;
        text-decoration: none;
        margin: 0.6rem 0.5rem;
        padding: 0.3rem 0.9rem;
        width: auto !important;
      }
    }

    .article-keywords {
      width: auto;
      left: 2rem;

      &:first-child {
        margin-left: 1.5rem !important;
      }
    }
  }
}
</style>
