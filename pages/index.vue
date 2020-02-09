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
            <p v-for="(keyword, index) in tags" :key="index">
              #{{ keyword.name }}
            </p>
          </div>
        </div>
        <h1>人気の記事</h1>
        <div class="keywords-wrapper">
          <div class="keywords-content">
            <ArticleItem
              v-for="(article, index) in articles"
              :key="index"
              :article="article"
            >
            </ArticleItem>
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
  async asyncData({ $axios }) {
    const pageNum = 1

    const fetchedArticle = await $axios.$get(
      'http://blog.igz0.net/wp-json/wp/v2/posts?_embed&page=' + pageNum,
    )
    const articles = []

    const tags = await $axios.$get('http://blog.igz0.net/wp-json/wp/v2/tags')

    for (let i = 0; i < fetchedArticle.length; i++) {
      const article = fetchedArticle[i]

      // デフォルトのカバー画像URLをセット
      let coverImage = 'http://placehold.jp/200x150.png'
      const featuredMedia = article._embedded['wp:featuredmedia']

      if (featuredMedia !== undefined && featuredMedia.length > 0) {
        coverImage = featuredMedia[0].source_url
      }

      // WordPressのタグIDからタグ名を取得する
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
      const articleTagIds = article.tags
      for (let i = 0; i < articleTagIds.length; i++) {
        const tagId = articleTagIds[i]
        const tagName = getTagName(tagId, tags)
        tagNames.push(tagName)
      }

      articles.push({
        url: '/page/' + article.id,
        content: article.title.rendered,
        image_url: coverImage,
        keywords: tagNames,
      })
    }

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
