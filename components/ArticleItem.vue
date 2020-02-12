<template>
  <div class="articles-content">
    <div v-for="(article, index) in articles" :key="index" class="article-wrapper">
      <div class="article-thumbnail">
        <img :src="article.image_url" alt="article-thumbnail" />
        <div class="article-keywords-wrapper">
          <div class="article-keywords">{{ article.keywords[0] }}</div>
        </div>
      </div>
      <div class="article-title">
        <p>{{ article.title }}</p>
      </div>
      <div class="article-read-button">
        <a v-bind:href="article.url">
          <img src="~/static/read-button.png" alt="article-read-button" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: {
      type: Object,
      require: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.article-wrapper {
  margin-right: 1.1rem;
  height: 17rem;
  width: 14.5rem;
  padding: 1rem;
  position: relative;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.articles-content {
  width: 75%;
}

.article-content {
  font-size: 0.9rem;
  height: 2.85rem;
  width: 70%;
  margin: 1.5rem 0 1rem 0;
  text-overflow: ellipsis;
  overflow: hidden;
}

.article-thumbnail {
  width: 15rem;
  height: 9.5rem;
  text-align: center;
  vertical-align: bottom;
  img {
    height: 9rem;
    width: 12rem;
    object-fit: cover;
  }
}
.article-keywords-wrapper {
  display: flex;
  position: relative;
  width: 100%;
  top: -1.85rem;
  left: 0.3rem;
}
.article-keywords {
  padding: 0.2rem 0.7rem;
  margin-left: 0.5rem;
  background-color: #61b5a7;
  font-size: 0.7rem;
  color: #fff;
}
.article-keywords:first-child {
  margin-left: 0;
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

@media only screen and (max-device-width: 768px) {
  /* スマホ用のCSS */

  .articles-content {
    height: auto;
    width: 100%;
    margin: 0 auto;
  }

  .article-wrapper:first-child {
    width: 100%;
    .article-thumbnail {
      text-align: center;
      height: auto;
      width: 100%;
      img {
        display: block;
        height: auto;
        width: 100%;
        margin: 0;
      }
    }
    .article-keywords-wrapper {
      top: -1.35rem;
      left: 0rem;
    }
    .article-title {
      padding: 0.2em 0.4em;
    }
  }

  .article-wrapper {
    border: 0;
    padding: 0;
    height: 16em;
    width: 45%;
    margin: 0 auto;
    .article-keywords-wrapper {
      top: -1.75em;
      left: 0rem;
    }
    .article-keywords {
      font-size: 0.8rem;
    }
  }

  .article-thumbnail {
    width: 9rem;
    height: 7.3rem;
    img {
      height: 6.5rem;
      width: 9.5rem;
      object-fit: cover;
    }
  }

  .article-keywords-wrapper {
    left: 1.7rem;
  }

  .article-keywords {
    padding: 0.1em 0.3em;
  }
}
</style>
