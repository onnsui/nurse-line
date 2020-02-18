<template>
  <div>
    <div class="container">
      <div>
        <div class="article-cover">
          <div class="cover-browed">
            <span :style="{ backgroundImage: 'url(' + article.cover_image + ')' }"></span>
          </div>

          <div class="cover-image">
            <img :src="article.cover_image" />
          </div>
        </div>

        <article>
          <h1 class="article-title">{{ article.title }}</h1>

          <div class="article-info">
            <img :src="article.author_avatar_img_48px" class="article-avatar-icon" />
            <div>
              <div class="article-author">{{ article.author }}</div>
              <div class="article-date">{{ article.date_str }}</div>
            </div>
          </div>

          <div v-html="articleHTML" class="article-content"></div>
        </article>

        <a href="#">
          <img src="http://placehold.jp/350x60.png" alt="キャリア相談をする" style="margin: 2rem 0;" />
        </a>

        <div class="keywords-wrapper">
          <div class="keyword-container" v-for="(keyword, index) in article.keywords" :key="index">
            <a v-bind:href="'/keyword/'+keyword" class="keyword-link">#{{ keyword }}</a>
          </div>
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
    // WordPressから記事のタグのリストを取得する
    const tags = await $axios.$get('http://blog.igz0.net/wp-json/wp/v2/tags')

    // 人気記事をWordPressから取得する
    const fetchedWPPopularArticles = await $axios.$get(
      'http://blog.igz0.net/wp-json/wpp/posts',
    )
    // 人気記事を記事表示コンポーネントへ渡すデータに整形
    const popularArticles = GetArticlesForWpAPI(fetchedWPPopularArticles, tags)

    // 記事内容を取得
    const fetchedArticle = await $axios.$get(
      'http://blog.igz0.net/wp-json/wp/v2/posts/' + params.pageId,
    )

    // 会話の発言者名・アイコン名をスタイルシートのテキストとして取得する
    const speechStyleTag = await $axios.$get(
      'http://blog.igz0.net/wp-json/wp/v2/liquid-speech-baloon/style-tag',
    )

    // WordPress Popular Postプラグインでの閲覧数をカウントアップする
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

    // WordPressのユーザー一覧を取得
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
      keywords: tagNames,
    }

    // WordPressの記事(HTML)を加工し、目次のHTMLタグを埋め込む。
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
      margin: 2rem 1rem 0 1rem;
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

      .keyword-container {
        display: flex;
        flex-wrap: wrap;
        margin: 0.5rem;

        .keyword-link {
          border: 1px solid #b4b2b2;
          border-radius: 4px;
          color: #454545;
          font-size: 0.9rem;
          font-weight: bold;
          text-decoration: none;
          margin: 0.2rem 0.5rem;
          padding: 0.5rem 0.9rem;
          width: auto !important;
        }
      }
    }
    /*---------------------------------

  PC版の吹き出し部分のスタイルを定義

---------------------------------*/

    .liquid-speech-balloon-wrap {
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

@media only screen and (max-device-width: 768px) {
  /* スマホ用のCSS */

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
      font-size: 1.15rem;
      line-height: 1.5rem;
      text-align: initial;
      letter-spacing: 0;

      h1 {
        font-weight: normal;
      }
      h2 {
        margin: 1.8em 0;
        font-size: 1.3rem;
        letter-spacing: 0.05rem;
      }
    }

    .index-heading {
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

    .index-heading-title {
      font-size: 0.9rem;
    }

    .wp-block-image > img {
      width: 100%;
    }

    .entry-content {
      line-height: 1.5;
    }

    .title {
      font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
        BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        sans-serif;
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

    .popular-header {
      margin: 1rem 0;
    }

    article {
      padding: 0 0.8rem;
    }

    .article-title {
      margin: 0 0.5rem;
      width: 100%;
    }

    .article-content {
      font-size: 1.08rem;
    }

    .keywords-wrapper {
      display: flex;

      .keyword-container {
        display: flex;
        flex-wrap: wrap;
        margin: 0.5rem;
        width: 100%;

        .keyword-link {
          border: 1px solid #b4b2b2;
          border-radius: 4px;
          color: #454545;
          font-size: 0.9rem;
          font-weight: bold;
          text-decoration: none;
          margin: 0.2rem 0.5rem;
          padding: 0.5rem 0.9rem;
          width: auto !important;
        }
      }
    }

    .article-keywords {
      width: auto;
      left: 2rem;

      &:first-child {
        margin-left: 1.5rem !important;
      }
    }

    .liquid-speech-balloon-wrap {
      margin: 2rem auto;
      flex-direction: row;
      display: -webkit-flex;
      display: -moz-flex;
      display: -ms-flex;
      display: -o-flex;
      display: flex;

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

    .liquid-speech-balloon-right {
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

    .liquid-speech-balloon-small .liquid-speech-balloon-avatar {
      width: 32px;
      height: 32px;
      &::after {
        display: none;
      }
    }
    .liquid-speech-balloon-small .liquid-speech-balloon-arrow {
      top: 7px;
    }

    .liquid-speech-balloon-vertical {
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

      .liquid-speech-balloon-avatar {
        position: relative;
        top: 0.5rem;
        width: 3rem;
        height: 3rem;
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
          top: 4rem;
          font-size: 0.9rem;
          text-align: center;
          font-weight: bold;
        }
      }
    }
  }
}
</style>