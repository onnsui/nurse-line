<template>
  <div id="top" class="container">
    <h1 class="keyword-name">{{ WpCategoryName }}</h1>

    <div class="main-wrapper">
      <div class="main-contents">
        <ArticleItem :articles="categoryArticles"></ArticleItem>
        <div class="under-content-wrapper">
          <div class="under-content">
            <div class="vertical-separator"></div>

            <h1>キーワード</h1>

            <div class="keywords-wrapper">
              <div class="keywords-content">
                <div class="keyword-content" v-for="(keyword, index) in categories" :key="index">
                  <a v-bind:href="'/keyword/'+keyword.name" class="keyword-link">#{{ keyword.name }}</a>
                </div>
              </div>
            </div>
          </div>

          <div class="under-content">
            <div class="vertical-separator"></div>

            <h1>人気の記事</h1>

            <ArticleRankingItem :articles="popularArticles"></ArticleRankingItem>
          </div>
        </div>
      </div>
      <div class="sub-contents">
        <div class="sidebar">
          <nuxt-link to="/event">
            <img src="/event.png" alt="運営スタッフ募集中" class="sidebar-banner" loading="lazy" />
          </nuxt-link>
          <div class="sidebar-header">
            <div class="social-area">
              <h1>公式アカウント</h1>
              <p>
                最新記事やイベント情報を配信中
                <br />フォローして最新情報をGET
              </p>
              <div class="social-icon-area">
                <div class="sns-line">
                  <a href="http://line.me/ti/p/%40182ksrsv" target="_blank">
                    <img src="/line.png" alt="SNS1" loading="lazy" />
                  </a>
                </div>
                <div class="sns-twitter">
                  <a href="https://twitter.com/jRrLZVUB09QHuFj" target="_blank">
                    <img src="/twitter.png" alt="SNS1" loading="lazy" />
                  </a>
                </div>
                <div class="sns-instagram">
                  <a href="https://www.instagram.com/_nurseline_/?hl=ja" target="_blank">
                    <img src="/instagram.png" alt="SNS1" loading="lazy" />
                  </a>
                </div>
              </div>
            </div>
            <a
              href="https://www.youtube.com/channel/UC4H23NwI17SQ7tebs9d6JQQ?disable_polymer=true"
              target="_blank"
            >
              <img src="/youtube.png" alt="看護師がサポート、転職支援" class="sidebar-banner" loading="lazy" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleItem from '~/components/ArticleItem'
import ArticleRankingItem from '~/components/ArticleRankingItem'
import GetArticlesForWpAPI from '~/assets/GetArticlesForWpAPI.js'

export default {
  layout: 'top',
  components: {
    ArticleItem,
    ArticleRankingItem,
  },

  head() {
    return {
      title: this.meta.title,
    }
  },
  data() {
    return {
      keywordArticles: this.keywordArticles,
      popularArticles: this.popularArticles,
      WpCategoryName: this.WpCategoryName,
    }
  },
  async asyncData({ $axios, params, error }) {
    const categoryName = params.categoryName

    // WordPressから各種記事情報取得する
    let result = null
    try {
      result = await Promise.all([
        $axios.$get('/wp-json/wp/v2/categories'),
        $axios.$get('/wp-json/wpp/posts'),
      ])
    } catch (e) {
      return error({
        statusCode: e.response.status,
        message: e.response.message,
      })
    }
    const categories = result[0]
    const fetchedWPPopularArticles = result[1]

    // キーワード名からWordPressでのタグIDを取得する関数
    const getCategoryId = (categoryName, categories) => {
      let WpCategoryId = null
      let WpCategoryName = null

      for (let i = 0; i < categories.length; i++) {
        const category = categories[i]

        // WordPressのカテゴリーのスラッグ名とカテゴリー名を比較する
        if (categoryName === category.slug) {
          WpCategoryId = category.id
          WpCategoryName = category.name
        }
      }
      return { WpCategoryId, WpCategoryName }
    }

    const { WpCategoryId, WpCategoryName } = getCategoryId(
      categoryName,
      categories,
    )

    let fetchedWpCategoryArticles = null
    try {
      // 最新の記事をWordPressから取得する
      fetchedWpCategoryArticles = await $axios.$get(
        '/wp-json/wp/v2/posts?_embed&categories=' + WpCategoryId,
      )
    } catch (e) {
      return error({
        statusCode: e.response.status,
        message: e.response.message,
      })
    }

    // 取得した記事を記事表示コンポーネントへ渡すデータに整形
    const categoryArticles = GetArticlesForWpAPI(
      fetchedWpCategoryArticles,
      categories,
    )

    // 取得した人気記事を記事表示コンポーネントへ渡すデータに整形
    const popularArticles = GetArticlesForWpAPI(
      fetchedWPPopularArticles,
      categories,
    )

    return {
      categoryArticles,
      popularArticles,
      categories,
      WpCategoryName,
      meta: {
        title: WpCategoryName,
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
a {
  text-decoration: none;
}
.detail-button {
  font-weight: bold;
  margin: 0 auto;
  max-width: 13.5rem;
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
@media only screen and (min-device-width: 769px) {
  .sp {
    display: none;
  }
  .container {
    margin: 0 10%;

    .keyword-name {
      font-size: 1.5rem;
      margin: 0.5rem 0 0.5rem 0.5rem;
      text-align: left;
    }

    .main-wrapper {
      display: flex;
      margin-top: 2rem;
      width: 100%;
      .main-contents {
        margin-right: 2rem;
        width: 75%;
      }
      .sub-contents {
        width: 25%;
      }

      .sidebar {
        text-align: center;

        .sidebar-header {
          margin: 0 auto;
          width: 100%;
          p {
            font-size: 0.9rem;
            letter-spacing: 0.05rem;
            margin: 0.4rem 0;
          }
        }

        .sidebar-banner {
          height: auto;
          width: 100%;
        }

        .social-area {
          margin: 0.8rem auto 1rem auto;
          width: 100%;
          h1 {
            font-size: 1.3rem;
            letter-spacing: 0.3rem;
          }

          .social-icon-area {
            display: flex;
            justify-content: space-evenly;
            margin: 1rem 0;
            .sns-line {
              background-color: #262f40;
              border-radius: 50%;
              width: 46px;
              height: 46px;
              img {
                width: 100%;
                padding: 1.1rem 0.7rem 1rem 0.7rem;
              }
            }
            .sns-twitter {
              background-color: #262f40;
              border-radius: 50%;
              width: 46px;
              height: 46px;
              img {
                width: 100%;
                padding: 0.8rem 0.7rem 1rem 0.7rem;
              }
            }
            .sns-instagram {
              background-color: #262f40;
              border-radius: 50%;
              width: 46px;
              height: 46px;
              img {
                width: 100%;
                padding: 0.7rem 0.7rem 1rem 0.7rem;
              }
            }
          }
        }
      }

      .under-content-wrapper {
        text-align: center;

        .under-content {
          width: 100%;
          margin: 3rem 0 6rem 0;
          h1 {
            font-size: 1.35rem;
            margin-bottom: 0.8rem;
          }

          .keywords-content {
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
              margin: 0.2rem 0.5rem;
              padding: 0.5rem 0.9rem;
              width: auto !important;
            }
          }
        }

        .next-article-button {
          margin-bottom: 2rem;
          text-align: center;
          width: 100%;
        }
      }
    }
  }
}

@media only screen and (max-device-width: 768px) {
  /* スマホ用のCSS */
  .pc {
    display: none;
  }
  .container {
    width: 100%;
    margin: 0 auto;
    text-align: center;

    .keyword-name {
      font-size: 1.5rem;
      margin: 0 auto;
      text-align: center;
    }

    .main-wrapper {
      flex-direction: column;
      justify-content: space-around;
      margin: 1.5rem auto 1rem auto;
      width: 100%;
      .sidebar {
        order: 3;
        width: 100%;
        img {
          max-width: 25rem;
          width: 100%;
        }
        .sidebar-header {
          margin-top: 2rem;
          .detail-button {
            max-width: 15.125rem;
            margin: 0 auto;
          }
        }
        .social-area {
          letter-spacing: 0.25rem;
          margin-bottom: 2rem;
          h1 {
            margin-bottom: 1rem;
            font-size: 1.25rem;
          }
          p {
            font-size: 0.875rem;
          }
        }
        .social-icon-area {
          display: flex;
          justify-content: space-around;
          width: 50%;
          max-width: 10.5rem;
          margin: 1rem auto;
          .sns-line {
            background-color: #262f40;
            border-radius: 50%;
            width: 46px;
            height: 46px;
            img {
              width: 100%;
              padding: 1.1rem 0.7rem 1rem 0.7rem;
            }
          }
          .sns-twitter {
            background-color: #262f40;
            border-radius: 50%;
            width: 46px;
            height: 46px;
            img {
              width: 100%;
              padding: 0.8rem 0.7rem 1rem 0.7rem;
            }
          }
          .sns-instagram {
            background-color: #262f40;
            border-radius: 50%;
            width: 46px;
            height: 46px;
            img {
              width: 100%;
              padding: 0.7rem 0.7rem 1rem 0.7rem;
            }
          }
        }
        .recruit-text {
          margin: 1rem 0 2rem 0;
          font-size: 0.875rem;
          text-align: center;
        }
      }

      .under-content-wrapper {
        text-align: center;
        width: 100%;

        .under-content {
          width: 100%;
          margin: 3rem 0 6rem 0;
          h1 {
            font-size: 1.35rem;
            margin-bottom: 0.8rem;
          }
          .keywords-content {
            display: flex;
            flex-wrap: wrap;
            margin: 0.5rem;
            width: initial;
          }
          .keyword-content {
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

        .vertical-separator {
          border-left: 1px solid #5a5959;
          height: 1.5rem;
          margin: 0 auto 0.6rem auto;
          width: 1px;
        }
      }
    }
  }
}
</style>
