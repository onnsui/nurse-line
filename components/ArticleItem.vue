<template>
  <div class="articles-wrapper">
    <div v-for="(article, index) in articles" :key="index" class="article-wrapper">
      <div class="article-thumbnail">
        <a v-bind:href="article.url">
          <img :src="article.image_url" alt="article-thumbnail" />
        </a>
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
    width: 75%;

    a {
      color: #454545;
      text-decoration: none;
      width: 100%;
      margin: 0;
    }

    .article-wrapper {
      margin-right: 0.5rem;
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
          top: -1.85rem;
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
}

@media only screen and (max-device-width: 768px) {
  /* スマホ用のCSS */

  .articles-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    a {
      color: #454545;
      text-decoration: none;
      width: 100%;
      margin: 0;
    }

    .article-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 0;
      padding: 0;
      height: 16em;
      width: 50%;
      margin: 0;

      &:first-child {
        height: 100%;
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
          top: -1.3rem !important;
          left: -0.5rem !important;
        }
      }

      .article-title {
        font-size: 0.9rem;
        text-align: left;
        overflow: hidden;
        width: 100%;
        padding: 0.2em 0.4em;

        p {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }

      .article-keywords-wrapper {
        top: -1.7em;
        left: 0rem;
      }
      .article-keywords {
        font-size: 0.8rem;

        &:first-child {
          margin-left: 0;
        }
      }

      .article-thumbnail {
        width: 10rem;
        height: 7.3rem;
        text-align: center;
        vertical-align: bottom;
        img {
          height: 7rem;
          width: 10rem;
          object-fit: cover;
        }
        .article-keywords-wrapper {
          display: flex;
          position: relative;
          width: 100%;
          top: -1.6rem;
          left: -0.5rem;
        }

        .article-keywords {
          padding: 0.1em 0.3em;
          margin-left: 0.5rem;
          background-color: #61b5a7;
          font-size: 0.75rem;
          color: #fff;
        }
      }
      .article-read-button {
        align-self: flex-end;
      }
    }
  }
}
</style>
