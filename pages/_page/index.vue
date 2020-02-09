<template>
  <div class="container">
    <div class="hero">
      <img src="http://placehold.jp/1200x150.png" alt="hero" />
    </div>
    <hr class="section-border" />
    <div class="main-wrapper">
      <div class="main-content">
        <ArticleItem
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
        >
        </ArticleItem>
      </div>
      <div class="sub-content">
        <h1>キーワード</h1>
        <div class="keywords-wrapper">
          <div class="keywords-content">
            <p v-for="(keyword, index) in keywords" :key="index">
              {{ keyword.name }}
            </p>
          </div>
        </div>
        <h1>人気の記事</h1>
        <div class="keywords-wrapper">
          <div class="keywords-content">
            <p v-for="(keyword, index) in keywords" :key="index">
              {{ keyword.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleItem from '~/components/ArticleItem'
// import SampleArticle from '~/assets/SampleArticle.js'

export default {
  components: {
    ArticleItem,
  },
  data() {
    return {
      articles: this.articles,
    }
  },
  async asyncData({ $axios }) {
    const pageNum = 1
    const fetchedArticle = await $axios.$get(
      'http://blog.igz0.net/wp-json/wp/v2/posts?_embed&page=' + pageNum,
    )
    const articles = []
    for (let i = 0; i < fetchedArticle.length; i++) {
      const article = fetchedArticle[i]

      let coverImage = 'http://placehold.jp/200x150.png'
      const featuredMedia = article._embedded['wp:featuredmedia']

      if (featuredMedia !== undefined && featuredMedia.length > 0) {
        coverImage = featuredMedia[0].source_url
      }

      articles.push({
        url: '/' + article.id,
        content: article.title.rendered,
        image_url: coverImage,
        keywords: article.tags,
      })
    }

    const keywords = await $axios.$get(
      'http://blog.igz0.net/wp-json/wp/v2/tags',
    )
    return { articles, keywords }
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
}
.section-border {
  width: 100%;
  margin: 0 1rem;
  border: 0;
  border-top: double 4px #5f5d5d;
}
.main-wrapper {
  margin-top: 3rem;
}
.main-content {
  width: 72%;
  margin-right: 2.25rem;
  display: flex;
  flex-wrap: wrap;
}
.sub-content {
  width: 28%;
}
</style>
