<template>
  <div class="wrapper">
    <div class="article-thumbnail">
      <img :src="article.image_url" alt="article-thumbnail" />
      <!-- <div class="article-keywords-wrapper">
        <div
          v-for="(keyword, index) in article.keywords"
          :key="index"
          class="article-keywords"
        >
          {{ keyword }}
        </div>
      </div>-->
    </div>
    <div class="article-title">
      <p>{{ article.content }}</p>
    </div>
    <div class="article-read-button">
      <a v-bind:href="article.url">
        <img src="~/static/read-button.png" alt="article-read-button" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      require: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin-right: 1.1rem;
  height: 17rem;
  width: 14rem;
  padding: 1rem;
  position: relative;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}
.article-thumbnail {
  width: 15rem;
  height: 9.5rem;
  text-align: center;
  img {
    height: 9rem;
    width: 12rem;
    object-fit: cover;
  }
}
.article-keywords-wrapper {
  display: flex;
}
.article-keywords {
  padding: 0.5rem 1.25rem;
  margin-left: 0.5rem;
  background-color: #61b5a7;
  font-size: 0.7rem;
  color: #fff;
}
.article-keywords:first-child {
  margin-left: 0;
}
.article-content {
  font-size: 0.9rem;
  height: 2.85rem;
  margin: 1.5rem 0 1rem 0;
  text-overflow: ellipsis;
  overflow: hidden;
}
.article-title {
  font-size: 0.9rem;
  text-align: left;
  overflow: hidden;
  width: 100%;
  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
.article-read-button {
  align-self: flex-end;
}
</style>
