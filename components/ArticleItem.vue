<template>
  <div v-if="articles.length === 0">
    <p>記事がありません。</p>
  </div>
  <div v-else class="articles-wrapper">
    <div v-for="(article, index) in articles" :key="index" class="article-wrapper">
      <div class="article-thumbnail">
        <a v-bind:href="article.url">
          <img :src="article.image_url" alt="article-thumbnail" loading="lazy" />
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
          <img src="~/static/read-button.png" alt="article-read-button" loading="lazy" />
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
/*---------------------------------

  PC対応のスタイル

---------------------------------*/
@media only screen and (min-device-width: 768px) {
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
      display: flex;
      margin-right: 1.5%;
      height: 272px;
      width: 232px;
      padding: 16px 16px 0 16px;
      position: relative;
      border: 1px solid #ccc;
      flex-direction: column;
      align-items: center;
      margin-bottom: 1rem;

      .article-thumbnail {
        height: 144px;
        width: 232px;
        text-align: center;
        vertical-align: bottom;
        position: relative;
        margin-bottom: 8px;

        a {
          height: 144px;

          img {
            height: 144px;
            width: 200px;
            object-fit: cover;
          }
        }

        .article-keywords-wrapper {
          display: flex;
          position: absolute;
          width: 100%;
          bottom: 0;
          height: 24px;
        }

        .article-keywords {
          background-color: #61b5a7;
          font-size: 0.73rem;
          color: #fff;
          position: absolute;
          bottom: 0;
          padding: 0.2rem 0.7rem;
          margin-left: 8px;

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

/*---------------------------------

  スマホ・タブレット対応のスタイル

---------------------------------*/
@media only screen and (max-device-width: 767px) {
  .articles-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 2vh 2vw 0 2vw;

    a {
      color: #454545;
      text-decoration: none;
      width: 100%;
      margin: 0;
    }

    .article-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 30vh;
      width: 50%;
      position: relative;
      padding: 0 0.5vh 0 0.5vh;
      margin-bottom: 1rem;

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
          -webkit-line-clamp: 4;
        }
      }

      .article-thumbnail {
        height: 15vh;
        width: 100%;
        text-align: center;
        vertical-align: bottom;
        position: relative;

        a {
          height: 15vh;

          img {
            height: 15vh;
            width: 100%;
            object-fit: cover;
          }
        }

        .article-keywords-wrapper {
          display: flex;
          position: absolute;
          width: 100%;
          bottom: 0;
          left: 0;
          height: 24px;

          .article-keywords {
            background-color: #61b5a7;
            font-size: 0.7rem;
            color: #fff;
            position: absolute;
            bottom: 0;
            padding: 0.2rem 0.3rem;
            margin-left: 8px;

            &:first-child {
              margin-left: 0;
            }
          }
        }
      }
      .article-read-button {
        align-self: flex-end;
        margin-right: 3vw;
      }
    }
  }
}
</style>
