<template>
  <div class="container">
    <div class="hero">
      <img src="http://placehold.jp/1200x150.png" alt="hero" />
    </div>
    <hr class="section-border" />
    <div class="main-wrapper">
      <div class="main-content">
        <ArticleItem
          v-for="(article, index) in SampleArticle"
          :key="index"
          :article="article"
        >
        </ArticleItem>
      </div>
      <div class="sub-content"></div>
    </div>
  </div>
</template>

<script>
import ArticleItem from '~/components/ArticleItem'
import SampleArticle from '~/assets/SampleArticle.js'

export default {
  components: {
    ArticleItem,
  },
  data() {
    return {
      SampleArticle,
    }
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
