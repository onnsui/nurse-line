<template>
  <div id="top" class="container">
    <div class="main-wrapper">
      <div class="main-contents">
        <ArticleItem :articles="latestArticles"></ArticleItem>
        <div class="under-content-wrapper">
          <div class="under-content">
            <div class="vertical-separator"></div>

            <h1>キーワード</h1>

            <div class="keywords-wrapper">
              <a
                v-for="(tag, index) in tags"
                :key="index"
                v-bind:href="'/keyword/'+tag.name"
                class="keyword-link"
              >#{{ tag.name }}</a>
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
              <div class="vertical-separator sp"></div>
              <h1>公式アカウント</h1>
              <p>
                最新記事やイベント情報を配信中
                <br />フォローして最新情報をGET
              </p>

              <client-only>
                <social-sharing inline-template>
                  <div class="social-icon-area">
                    <div class="sns-line">
                      <network network="line">
                        <img src="/line.png" alt="SNS1" loading="lazy" />
                      </network>
                    </div>
                    <div class="sns-twitter">
                      <network network="twitter">
                        <img src="/twitter.png" alt="SNS1" loading="lazy" />
                      </network>
                    </div>
                    <a href="https://instagr.am/">
                      <div class="sns-instagram">
                        <img src="/instagram.png" alt="SNS1" loading="lazy" />
                      </div>
                    </a>
                  </div>
                </social-sharing>
              </client-only>
            </div>

            <a href="#">
              <img src="/youtube.png" alt="看護師がサポート、転職支援" class="sidebar-banner" loading="lazy" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="separater"></div>
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
      title: 'NURSE LINE',
      titleTemplate: '',
    }
  },
  data() {
    return {
      latestArticles: this.latestArticles,
      popularArticles: this.popularArticles,
    }
  },
  async asyncData({ $axios, error }) {
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
      // WordPressからカテゴリーの一覧を取得する
      categories = await $axios.$get('/wp-json/wp/v2/categories')
    } catch (e) {
      return error({
        statusCode: e.response.status,
        message: e.response.message,
      })
    }
    // 最新の記事をWordPressから取得する
    const pageNum = 1

    let fetchedWpLatestArticles = null
    try {
      fetchedWpLatestArticles = await $axios.$get(
        '/wp-json/wp/v2/posts?_embed&page=' + pageNum,
      )
    } catch (e) {
      return error({
        statusCode: e.response.status,
        message: e.response.message,
      })
    }
    // 取得した記事を記事表示コンポーネントへ渡すデータに整形
    const latestArticles = GetArticlesForWpAPI(
      fetchedWpLatestArticles,
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

    return { latestArticles, popularArticles, categories, tags }
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
  .sp {
    display: none;
  }
  .container {
    margin: 0 10%;

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
        img {
          width: 100%;
        }

        .sidebar-header {
          margin: 0 auto;
          width: 100%;
          img {
            width: 100%;
          }
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

        /deep/ .social-area {
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
              cursor: pointer;
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
              cursor: pointer;
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
              cursor: pointer;
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

        .next-article-button {
          margin-bottom: 2rem;
          text-align: center;
          width: 100%;
        }
      }
    }
  }
  .separater {
    border: solid #333;
    border-width: 1px 0 1px 0;
    height: 5px;
    width: 95%;
    margin: 50px auto 0 auto;
  }
}

@media only screen and (max-device-width: 768px) {
  /*---------------------------------

  スマホ・タブレット対応のスタイル

---------------------------------*/
  .pc {
    display: none;
  }
  .container {
    width: 100%;
    margin: 0 auto;
    text-align: center;

    .main-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin: 0 auto;
      width: 100%;
      padding: 0 1vw 0 1vw;

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
        /deep/ .social-area {
          letter-spacing: 0.25rem;
          margin-bottom: 2rem;
          h1 {
            margin-bottom: 1rem;
            font-size: 1.25rem;
          }
          p {
            font-size: 0.875rem;
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
              cursor: pointer;
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
              cursor: pointer;
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
        /deep/ .recruit-text {
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
          margin: 2.25rem 0 4rem 0;
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
              padding: 0.2rem 0.9rem;
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
  .separater {
    width: 60%;
  }
}
</style>
