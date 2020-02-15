<template>
  <div id="top" class="container">
    <div class="hero">
      <nuxt-link to="/">
        <img src="http://placehold.jp/1000x350.png" alt="hero" />
      </nuxt-link>
    </div>
    <div class="main-wrapper">
      <ArticleItem :articles="latestArticles"></ArticleItem>
      <div class="sidebar">
        <nuxt-link to="/event">
          <img src="http://placehold.jp/250x120.png" alt="運営スタッフ募集中" class="sidebar-banner" />
        </nuxt-link>
        <div class="sidebar-header">
          <div class="social-area">
            <h1>公式アカウント</h1>
            <p>
              最新記事やイベント情報を配信中
              <br />フォローして最新情報をGET
            </p>
            <div class="social-icon-area">
              <div>
                <a href="#">
                  <img src="http://placehold.jp/50x50.png" alt="SNS1" />
                </a>
              </div>
              <div>
                <a href="#">
                  <img src="http://placehold.jp/50x50.png" alt="SNS1" />
                </a>
              </div>
              <div>
                <a href="#">
                  <img src="http://placehold.jp/50x50.png" alt="SNS1" />
                </a>
              </div>
            </div>
          </div>
          <a href="#">
            <img src="http://placehold.jp/250x120.png" alt="看護師がサポート、転職支援" class="sidebar-banner" />
          </a>
          <p>経験豊富な看護師達が、あなたにあった働き方を真剣に考えます。</p>
          <div>
            <a href="#">
              <img src="http://placehold.jp/200x50.png" alt="SNS1" />
            </a>
          </div>
        </div>
      </div>

      <div class="under-content-wrapper">
        <div class="under-content">
                    <div class="next-article">
        <a href="#">
          <img src="http://placehold.jp/350x60.png" alt="次の10件を表示" />
        </a>
      </div>
          <div class="vertical-separator"></div>
          <h1>キーワード</h1>
          <div class="keywords-wrapper">
            <div class="keywords-content">
              <div class="keyword-content" v-for="(keyword, index) in tags" :key="index">
                <a href="#" class="keyword-link">#{{ keyword.name }}</a>
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
      latestArticles: this.latestArticles,
      popularArticles: this.popularArticles,
    }
  },
  async asyncData({ $axios }) {
    // WordPressからタグの一覧を取得する
    const tags = await $axios.$get('http://blog.igz0.net/wp-json/wp/v2/tags')

    // 最新の記事をWordPressから取得する
    const pageNum = 1
    const fetchedWpLatestArticles = await $axios.$get(
      'http://blog.igz0.net/wp-json/wp/v2/posts?_embed&page=' + pageNum,
    )
    console.log(fetchedWpLatestArticles)
    // 取得した記事を記事表示コンポーネントへ渡すデータに整形
    const latestArticles = GetArticlesForWpAPI(fetchedWpLatestArticles, tags)

    // 人気記事をWordPressから取得する
    const fetchedWPPopularArticles = await $axios.$get(
      'http://blog.igz0.net/wp-json/wpp/posts',
    )
    // 取得記事を記事表示コンポーネントへ渡すデータに整形
    const popularArticles = GetArticlesForWpAPI(fetchedWPPopularArticles, tags)

    return { latestArticles, popularArticles, tags }
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
.container {
  margin: 0 10%;
}

@media only screen and (min-device-width: 769px) {
  .hero {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    img {
      width: 100%;
    }
  }

  .section-border {
    margin: 0 1rem;
    border: 0;
    border-top: double 4px #5f5d5d;
  }
  .main-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;
    width: 100%;
  }

  .next-article {
    margin-bottom: 2rem;
    text-align: center;
    width: 100%;
  }

  .sidebar {
    width: 25%;
    text-align: center;
  }

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
  }

  .social-icon-area {
    display: flex;
    justify-content: space-evenly;
    margin: 1rem 0;
  }
  .under-content-wrapper {
    text-align: center;
    width: 75%;
  }

  .under-content {
    width: 100%;
    margin: 3rem 0 6rem 0;
    h1 {
      font-size: 1.35rem;
      margin-bottom: 0.8rem;
    }
  }
}

@media only screen and (max-device-width: 768px) {
  /* スマホ用のCSS */

  .hero img {
    height: auto;
    width: 100%;
  }

  .container {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }

  .main-wrapper {
    flex-direction: column;
    justify-content: space-around;
    margin: 0 auto;
    width: 100%;
  }

  .social-icon-area {
    display: flex;
    justify-content: space-around;
    margin: 1rem 0;
  }

  .keyword-content{
    margin: 0.5rem;
  }

  .wrapper:first-child {
    width: 100%;
  }

  .sidebar {
    order: 3;
  }

  .wrapper {
    width: 47%;
    margin: 0 auto;
  }

  .article-content {
    width: 100%;
  }
  .sidebar {
    width: 100%;
  }

  .under-content-wrapper {
    text-align: center;
    width: 100%;
  }

  .under-content {
    width: 100%;
    margin: 3rem 0 6rem 0;
    h1 {
      font-size: 1.35rem;
      margin-bottom: 0.8rem;
    }
  }

  .vertical-separator {
    border-left: 1px solid #5a5959;
    height: 1.5rem;
    margin: 0 auto 0.6rem auto;
    width: 1px;
  }
}
</style>
