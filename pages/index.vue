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
        ></ArticleItem>
      </div>
      <div class="sub-content"></div>
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
        category: article.tags,
      })
    }

    const tags = await $axios.$get('http://blog.igz0.net/wp-json/wp/v2/tags')
    return { articles, tags }
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
