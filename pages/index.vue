<template>
  <div class="container" id="top">
    <div class="hero">
      <img src="http://placehold.jp/1000x350.png" alt="hero" />
    </div>
    <hr class="section-border" />
    <div class="main-wrapper">
      <div class="articles-content">
        <ArticleItem
          v-for="(article, index) in latestArticles"
          :key="index"
          :article="article"
        >
        </ArticleItem>
        <div class="next-article">
          <a href="#">
            <img src="http://placehold.jp/350x60.png" alt="次の10件を表示" />
          </a>
        </div>
      </div>
      <div class="sidebar">
        <a href="#">
          <img src="http://placehold.jp/250x120.png" alt="運営スタッフ募集中" />
        </a>
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
            <img
              src="http://placehold.jp/250x120.png"
              alt="看護師がサポート、転職支援"
            />
          </a>
          <p>経験豊富な看護師達が、あなたにあった働き方を真剣に考えます。</p>
          <div>
            <a href="#">
              <img src="http://placehold.jp/200x50.png" alt="SNS1" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="under-content-wrapper">
      <div class="under-content">
        <div class="vertical-separator"></div>
        <h1>キーワード</h1>
        <div class="keywords-wrapper">
          <div class="keywords-content">
            <a
              v-for="(keyword, index) in tags"
              :key="index"
              href="#"
              class="keyword-link"
            >
              #{{ keyword.name }}
            </a>
          </div>
        </div>
      </div>
      <div class="under-content">
        <div class="vertical-separator"></div>
        <h1>人気の記事</h1>
        <div class="keywords-wrapper">
          <div class="keywords-content">
            <div class="articles-content">
              <ArticleItem
                v-for="(article, index) in popularArticles"
                :key="index"
                :article="article"
              ></ArticleItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleItem from '~/components/ArticleItem'
import GetArticlesForWpAPI from '~/assets/GetArticlesForWpAPI.js'

export default {
  layout: 'top',
  components: {
    ArticleItem,
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
    // 記事表示コンポーネントへ渡すデータに整形
    const latestArticles = GetArticlesForWpAPI(fetchedWpLatestArticles, tags)

    // 人気記事をWordPressから取得する
    const fetchedWPPopularArticles = await $axios.$get(
      'http://blog.igz0.net/wp-json/wpp/posts',
    )
    // 記事表示コンポーネントへ渡すデータに整形
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
  margin: 0 10rem;
}
.hero {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.section-border {
  margin: 0 1rem;
  border: 0;
  border-top: double 4px #5f5d5d;
}
.main-wrapper {
  display: flex;
  margin-top: 2rem;
  width: 100%;
}

.next-article {
  text-align: center;
  width: 100%;
}

.sidebar {
  width: 24%;
  text-align: center;
  margin: 0;
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

.social-area {
  margin: 0.8rem 0 1rem 0;
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
  width: 76%;
}

.under-content {
  width: 100%;
  margin: 3rem 0 6rem 0;
  h1 {
    font-size: 1.35rem;
    margin-bottom: 0.8rem;
  }
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
}

.vertical-separator {
  border-left: 1px solid #5a5959;
  height: 1.5rem;
  margin: 0 auto 0.6rem auto;
  width: 1px;
}
</style>
