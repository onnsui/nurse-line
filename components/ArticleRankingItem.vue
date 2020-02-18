<template>
  <div class="articles-wrapper">
    <div v-for="(article, index) in articles" :key="index" class="article-wrapper">
      <div class="article-thumbnail">
        <a v-bind:href="article.url">
          <img :src="article.image_url" alt="article-thumbnail" />
        </a>
        <div class="article-keywords-wrapper pc-style">
          <div class="article-keywords">{{ article.keywords[0] }}</div>
        </div>
      </div>

      <a v-bind:href="article.url">
        <div class="article-title">
          <p>{{ article.title }}</p>
        </div>
        <div class="article-keywords-wrapper mobile-style">
          <div class="article-keywords">{{ article.keywords[0] }}</div>
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
      type: Array,
      require: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@media only screen and (min-device-width: 769px) {
  .articles-wrapper {
    display: flex;
    flex-wrap: wrap;
    a {
      color: #454545;
      text-decoration: none;
      width: 100%;
      margin: 0;
    }

    .article-wrapper {
      margin-right: 1.1rem;
      height: 17rem;
      width: 14.5rem;
      padding: 1rem 1rem 0 1rem;
      position: relative;
      border: 1px solid #ccc;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 1rem;

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
        .article-keywords-wrapper {
          display: flex;
          position: relative;
          width: 100%;
          top: -1.79rem;
          left: 0.3rem;
        }
        .article-keywords {
          padding: 0.2rem 0.7rem;
          margin-left: 0.5rem;
          background-color: #61b5a7;
          font-size: 0.7rem;
          color: #fff;

          &:first-child {
            margin-left: 0;
          }
        }
      }

      // スマホ版とPC版でキーワードの位置を変える
      .article-keywords-wrapper {
        &.mobile-style {
          display: none !important;
        }
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
        margin-top: 1.5rem;
      }
    }
  }

  .article-read-button {
    align-self: flex-end;
    margin-top: 1.5rem;
  }
}

@media only screen and (max-device-width: 768px) {
  /* スマホ用のCSS */

  .articles-wrapper {
    display: flex;
    flex-wrap: wrap;

    height: auto;
    width: 100%;
    margin: 0 auto;

    a {
      color: #454545;
      text-decoration: none;
      width: 100%;
      margin: 0;
    }

    .article-wrapper {
      background-color: #f8f8f8;
      border: 0;
      height: 9.5rem;
      width: 100%;
      margin: 0.5rem 0.6rem;
      display: flex;
      flex-direction: initial;
      padding: 0 0.5rem;
      position: relative;
      align-items: center;

      .article-thumbnail {
        width: 50%;
        height: 8.5rem;
        width: 10.5rem;
        height: 9.5rem;
        text-align: center;
        vertical-align: bottom;
        img {
          height: 8.5rem;
          width: 10rem;
          object-fit: cover;
        }
      }

      .article-title {
        display: relative;
        font-size: 0.9rem;
        text-align: left;
        overflow: hidden;
        width: 100%;
        margin: 0 auto;
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
        display: flex;
        width: 100%;
        margin: 0.2rem 0 0.2rem 0.4rem;

        .article-keywords {
          margin-left: 0.5rem;
          background-color: #61b5a7;
          font-size: 0.7rem;
          color: #fff;
          padding: 0.2rem 0.3rem;
          margin-left: 0.5rem;
          background-color: #61b5a7;
          font-size: 0.7rem;
          color: #fff;
          &:first-child {
            margin-left: 0;
          }
        }

        // スマホ版とPC版でキーワードの位置を変える
        &.pc-style {
          display: none !important;
        }
      }

      .article-read-button {
        display: none;
      }
    }
  }
}
</style>
