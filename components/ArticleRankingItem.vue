<template>
  <div class="articles-content">
    <div v-for="(article, index) in articles" :key="index" class="article-wrapper">
      <div class="article-thumbnail">
        <img :src="article.image_url" alt="article-thumbnail" />
        <div class="article-keywords-wrapper">
          <div class="article-keywords">{{ article.keywords[0] }}</div>
        </div>
      </div>
      <a v-bind:href="article.url">
        <div class="article-title">
          <p>{{ article.title }}</p>
        </div>
      </a>
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
@media only screen and (min-device-width: 769px) {
  .article-wrapper {
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    height: 17rem;
    width: 14.5rem;
    position: relative;
    align-items: center;
    margin-right: 1.1rem;
    margin-bottom: 1rem;
    padding: 1rem 1rem 0 1rem;
  }

  .articles-content {
    a {
      color: #454545;
      text-decoration: none;
      width: 100%;
      margin: 0;
    }
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
    height: 9.5rem;
    width: 15rem;
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
    top: -1.83rem;
    left: 0.3rem;
    width: 100%;
  }
  .article-keywords {
    background-color: #61b5a7;
    font-size: 0.7rem;
    color: #fff;
    padding: 0.2rem 0.7rem;
    margin-left: 0.5rem;
  }
  .article-keywords:first-child {
    margin-left: 0;
  }

  .article-title {
    font-size: 0.9rem;
    font-weight: normal;
    text-align: left;
    overflow: hidden;
    width: 100%;
    margin: 0 !important;
    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
  .article-read-button {
    align-self: flex-end;
    margin-top: 1.5rem;
  }
}

@media only screen and (max-device-width: 768px) {
  /* スマホ用のCSS */

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
    a {
      color: #454545;
      text-decoration: none;
      width: 100%;
      margin: 0;
    }
  }

  .article-content {
    font-size: 0.9rem;
    height: 2.85rem;
    width: 70%;
    margin: 1.5rem 0 1rem 0;
    text-overflow: ellipsis;
    overflow: hidden;
    a {
      color: #454545;
      text-decoration: none;
      height: 100%;
      width: 100%;
      margin: 0 0 1rem 0;
    }
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
    top: -1.83rem;
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
    display: relative;
    font-size: 0.9rem;
    text-align: left;
    overflow: hidden;
    top: -1.5rem;
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

  .articles-content {
    height: auto;
    width: 100%;
    margin: 0 auto;
  }

  .article-wrapper {
    background-color: #f8f8f8;
    border: 0;
    height: 8em;
    width: 100%;
    margin: 1em auto;
    display: flex;
    flex-direction: initial;
    .article-keywords-wrapper {
      top: -1.9em;
      left: 12rem;
      margin: 0.2em 0;
    }
    .article-keywords {
      font-size: 0.8rem;
    }
  }

  .article-thumbnail {
    width: 50%;
    height: 8em;
    img {
      height: 8rem;
      width: 11rem;
      object-fit: cover;
    }
  }

  .article-title {
    font-size: 0.9rem;
    text-align: left;
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
    display: relative;
    top: -1rem;
    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      margin: 0 auto;
      width: 90%;
    }
  }

  .article-keywords-wrapper {
    left: 1.5rem;
  }

  .article-keywords {
    padding: 0.1em 0.3em;
  }

  .article-keywords {
    padding: 0.2rem 0.7rem;
    margin-left: 0.5rem;
    background-color: #61b5a7;
    font-size: 0.7rem;
    color: #fff;
  }

  .article-read-button {
    display: none;
  }
}
</style>
