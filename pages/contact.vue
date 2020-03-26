<template>
  <div id="top">
    <div class="container">
      <article>
        <h1 class="article-title">お問い合わせ</h1>

        <form @submit.prevent method="post" class="wpcf7-form" novalidate="novalidate">
          <div style="display: none;">
            <input type="hidden" name="_wpcf7" value="117" />
            <input type="hidden" name="_wpcf7_version" value="5.1.7" />
            <input type="hidden" name="_wpcf7_locale" value="ja" />
            <input type="hidden" name="_wpcf7_unit_tag" value="wpcf7-f117-o1" />
            <input type="hidden" name="_wpcf7_container_post" value="0" />
          </div>
          <p>
            <label>
              お名前 (必須)
              <br />
              <span class="wpcf7-form-control-wrap your-name">
                <input
                  type="text"
                  name="your-name"
                  v-model="form.your_name"
                  size="40"
                  class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                  aria-required="true"
                  aria-invalid="false"
                />
              </span>
            </label>
          </p>
          <p>
            <label>
              フリガナ (必須)
              <br />
              <span class="wpcf7-form-control-wrap your-name-ruby">
                <input
                  type="text"
                  v-model="form.your_name_ruby"
                  name="your-name-ruby"
                  size="40"
                  class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                  aria-required="true"
                  aria-invalid="false"
                />
              </span>
            </label>
          </p>
          <p>
            <label>
              メールアドレス (必須)
              <br />
              <span class="wpcf7-form-control-wrap your-email">
                <input
                  type="email"
                  v-model="form.your_email"
                  name="your-email"
                  size="40"
                  class="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email"
                  aria-required="true"
                />
              </span>
            </label>
          </p>
          <p>
            <label>
              題名
              <br />
              <span class="wpcf7-form-control-wrap your-subject">
                <input
                  type="text"
                  name="your-subject"
                  v-model="form.subject"
                  size="40"
                  class="wpcf7-form-control wpcf7-text"
                  aria-invalid="false"
                />
              </span>
            </label>
          </p>
          <p>
            <label>
              メッセージ本文
              <br />
              <span class="wpcf7-form-control-wrap your-message">
                <textarea
                  name="your-message"
                  v-model="form.your_message"
                  cols="40"
                  rows="10"
                  class="wpcf7-form-control wpcf7-textarea"
                  aria-invalid="false"
                ></textarea>
              </span>
            </label>
          </p>
          <template v-if="!finished">
            <p>
              <input
                type="submit"
                @click="handleSubmit"
                value="送信"
                class="wpcf7-form-control wpcf7-submit"
              />
            </p>
          </template>
          <template v-else>
            <p v-text="'お問い合わせ頂きありがとうございました。'" />
          </template>
          <div class="wpcf7-response-output wpcf7-display-none"></div>
        </form>
      </article>

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
      finished: false,
      form: {
        your_name: '',
        your_name_ruby: '',
        your_email: '',
        your_subject: '',
        your_message: '',
      },
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
    const slugName = 'contact'

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

    const article = {
      fetched_article: fetchedArticle,
      title: fetchedArticle.title.rendered,
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
    encode(data) {
      return Object.keys(data)
        .map(
          (key) =>
            `${encodeURIComponent(
              key.split('_').join('-'),
            )}=${encodeURIComponent(data[key])}`,
        )
        .join('&')
    },
    async handleSubmit() {
      const axiosConfig = {
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
      const test = await this.$axios.$post(
        '/wp-json/contact-form-7/v1/contact-forms/117/feedback',
        this.encode({
          ...this.form,
        }),
        axiosConfig,
      )

      console.log(test)
      this.finished = true
    },
  },
}
</script>

<style lang="scss">
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

    .article-title {
      font-size: 2rem;
      font-weight: bold;
      text-align: left;
    }

    form {
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

      label,
      input,
      textarea {
        font-size: 1rem;
      }
      input {
        padding: 15px 10px;
        margin-top: 10px;
        margin-bottom: 10px;
        width: 450px;
      }

      textarea {
        width: 775px;
        max-width: 100%;
        height: 200px;
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 7px;
        padding-top: 7px;
        line-height: 2.14286;
      }

      .wpcf7-submit {
        display: block;
        color: white;
        cursor: pointer;
        max-width: 22rem;
        margin: 2rem auto 3rem auto;
        font-weight: bold;
        padding: 1rem 3rem 1rem 3rem;
        background: rgb(38, 47, 64);
        background: linear-gradient(
          149deg,
          rgba(38, 47, 64, 1) 0%,
          rgba(139, 142, 157, 1) 66%,
          rgba(152, 149, 170, 1) 100%
        );

        &:hover {
          cursor: default;
          background: linear-gradient(
            149deg,
            rgb(77, 87, 105) 0%,
            rgb(166, 168, 182) 66%,
            rgb(181, 177, 201) 100%
          );
        }
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
      line-height: 2rem;
      text-align: initial;
      letter-spacing: 0;
      margin: 0 0.3rem;

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
      margin-top: 2rem;
      padding: 0 0.8rem;
    }

    .article-title {
      width: 100%;
    }

    .article-content {
      font-size: 1.08rem;
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
