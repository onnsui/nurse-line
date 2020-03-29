<template>
  <div id="top" class="container">
    <h1 class="keyword-name">#{{ keywordName }} の記事</h1>

    <div class="main-wrapper">
      <div class="main-contents">
        <ArticleItem :articles="keywordArticles"></ArticleItem>
        <div class="under-content-wrapper">
          <div class="under-content">
            <div class="vertical-separator"></div>

            <h1>キーワード</h1>

            <div class="keywords-wrapper">
              <div class="keywords-content">
                <div class="keyword-content" v-for="(keyword, index) in tags" :key="index">
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
                  <a href="#">
                    <img src="/line.png" alt="SNS1" loading="lazy" />
                  </a>
                </div>
                <div class="sns-twitter">
                  <a href="#">
                    <img src="/twitter.png" alt="SNS1" loading="lazy" />
                  </a>
                </div>
                <div class="sns-instagram">
                  <a href="#">
                    <img src="/instagram.png" alt="SNS1" loading="lazy" />
                  </a>
                </div>
              </div>
            </div>
            <a href="#">
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
  data() {
    return {
      keywordArticles: this.keywordArticles,
      popularArticles: this.popularArticles,
      keywordName: this.keywordName,
    }
  },
  async asyncData({ $axios, params, error }) {
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

    let tags = null
    try {
      // WordPressからタグの一覧を取得する
      tags = await $axios.$get('/wp-json/wp/v2/tags')
    } catch (e) {
      return error({
        statusCode: e.response.status,
        message: e.response.message,
      })
    }

    const keywordName = params.keywordName

    // キーワード名からWordPressでのタグIDを取得する関数
    const getTagId = (keywordName, tags) => {
      let tagId = -1

      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i]
        const tagName = tag.name
        if (keywordName === tagName) {
          tagId = tag.id
        }
      }
      return tagId
    }

    const tagId = getTagId(keywordName, tags)

    let fetchedWpKeywordArticles = null
    try {
      // 最新の記事をWordPressから取得する
      fetchedWpKeywordArticles = await $axios.$get(
        '/wp-json/wp/v2/posts?_embed&tags=' + tagId,
      )
    } catch (e) {
      return error({
        statusCode: e.response.status,
        message: e.response.message,
      })
    }
    // 取得した記事を記事表示コンポーネントへ渡すデータに整形
    const keywordArticles = GetArticlesForWpAPI(
      fetchedWpKeywordArticles,
      categories,
    )

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
    // 取得した人気記事を記事表示コンポーネントへ渡すデータに整形
    const popularArticles = GetArticlesForWpAPI(
      fetchedWPPopularArticles,
      categories,
    )

    return { keywordArticles, popularArticles, tags, categories, keywordName }
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
          }

          .keywords-content {
            display: flex;
            flex-wrap: wrap;

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
      margin: 0.5rem 0 0.5rem 0.5rem;
      text-align: left;
    }

    .main-wrapper {
      flex-direction: column;
      justify-content: space-around;
      margin: 0 auto;
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

        .under-content {
          width: 100%;
          margin: 3rem 0 6rem 0;
          h1 {
            font-size: 1.35rem;
            margin-bottom: 0.8rem;
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
