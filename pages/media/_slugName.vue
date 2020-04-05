<template>
  <div id="top">
    <div class="container">
      <article>
        <h1 class="article-title">{{fetchedArticle.title.rendered}}</h1>

        <div v-html="articleHTML" class="article-content"></div></article>


      <h2 class="popular-header">人気の記事</h2>
      <ArticleRankingItem :articles="popularArticles"></ArticleRankingItem>
    </div>
  </div>
</template>

<script>
import GetArticlesForWpAPI from '~/assets/GetArticlesForWpAPI.js'
import ArticleRankingItem from '~/components/ArticleRankingItem'

export default {
  components: {
    ArticleRankingItem,
  },
  head() {
    return {
      title: this.meta.title,
    }
  },
  data() {
    return {
      popularArticles: this.popularArticles,
      slugName: '',
    }
  },
  async asyncData({ $axios, params, error }) {
    let categories = null
    try {
      // WordPressから記事のタグのリストを取得する
      categories = await $axios.$get('/wp-json/wp/v2/categories')
    } catch (e) {
      return error({
        statusCode: e.response.status,
        message: e.response.message,
      })
    }
    const slugName = params.slugName

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

    let fetchedArticles = null
    try {
      // 記事内容を取得
      fetchedArticles = await $axios.$get(
        '/wp-json/wp/v2/pages?_embed&slug=' + slugName,
      )
    } catch (e) {
      return error({
        statusCode: e.response.status,
        message: e.response.message,
      })
    }

    const fetchedArticle = fetchedArticles[0]

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

    const article = {
      fetched_article: fetchedArticle,
      title: fetchedArticle.title.rendered,
      date: articleDate,
      date_str: articleDateStr,
      content: fetchedArticle.content.rendered,
    }

    return {
      fetchedArticle,
      popularArticles,
      article,
      categories,
      articleHTML: article.content,
      slugName,
      meta: {
        title: fetchedArticle.title.rendered,
      },
    }
  },
  methods: {
    getcategoryName(id) {
      const categories = this.categories
      let categoryName = ''

      for (let i = 0; i < categories.length; i++) {
        const category = categories[i]
        const categoryId = category.id
        if (id === categoryId) {
          categoryName = category.name
        }
      }
      return categoryName
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  article {
    padding: 0 5% 3rem 5%;

    h1 {
      margin: 2rem 0;
    }

    h2 {
      font-size: 1.5rem;
      margin: 1rem 0;
    }

    h3 {
      margin: 1rem 0;
    }

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.detail-button {
  text-decoration: none;
  div {
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
  }
  span {
    color: white;
  }

  a {
    text-decoration: none;
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

      h1 {
        font-weight: normal;
      }

      h2 {
        margin: 1.8em 0;
      }

      blockquote {
        background-color: #f3f3f3;
        width: 80%;
        margin: 0 auto;
      }

      // 記事の目次部分のスタイル定義
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
      .wp-block-image > img {
        width: 100%;
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

      .keyword-content {
        margin: 10px 0;
      }

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
