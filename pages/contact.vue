<template>
  <div id="top">
    <div class="container">
      <article>
        <h1 class="article-title">お問い合わせ</h1>

        <form @submit.prevent method="post" class="wpcf7-form" novalidate="novalidate">
          <div style="display: none;">
            <input type="hidden" name="_wpcf7" value="5" />
            <input type="hidden" name="_wpcf7_version" value="5.1.7" />
            <input type="hidden" name="_wpcf7_locale" value="ja" />
            <input type="hidden" name="_wpcf7_unit_tag" value="wpcf7-f117-o1" />
            <input type="hidden" name="_wpcf7_container_post" value="0" />
          </div>
          <p>
            <label>
              お名前 (必須)
              <br />
              <span class="wpcf7-form-control-wrap your-name">
                <input
                  type="text"
                  name="your-name"
                  v-model="form.your_name"
                  size="40"
                  class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                  aria-required="true"
                  aria-invalid="false"
                />
              </span>
            </label>
          </p>
          <p>
            <label>
              フリガナ (必須)
              <br />
              <span class="wpcf7-form-control-wrap your-name-ruby">
                <input
                  type="text"
                  v-model="form.your_name_ruby"
                  name="your-name-ruby"
                  size="40"
                  class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                  aria-required="true"
                  aria-invalid="false"
                />
              </span>
            </label>
          </p>
          <p>
            <label>
              メールアドレス (必須)
              <br />
              <span class="wpcf7-form-control-wrap your-email">
                <input
                  type="email"
                  v-model="form.your_email"
                  name="your-email"
                  size="40"
                  class="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email"
                  aria-required="true"
                />
              </span>
            </label>
          </p>
          <p>
            <label>
              題名
              <br />
              <span class="wpcf7-form-control-wrap your-subject">
                <input
                  type="text"
                  name="your-subject"
                  v-model="form.subject"
                  size="40"
                  class="wpcf7-form-control wpcf7-text"
                  aria-invalid="false"
                />
              </span>
            </label>
          </p>
          <p>
            <label>
              メッセージ本文
              <br />
              <span class="wpcf7-form-control-wrap your-message">
                <textarea
                  name="your-message"
                  v-model="form.your_message"
                  cols="40"
                  rows="10"
                  class="wpcf7-form-control wpcf7-textarea"
                  aria-invalid="false"
                ></textarea>
              </span>
            </label>
          </p>
          <template v-if="!finished">
            <p>
              <input
                type="submit"
                @click="handleSubmit"
                value="送信"
                class="wpcf7-form-control wpcf7-submit"
              />
            </p>
          </template>
          <template v-else>
            <p v-text="'お問い合わせ頂きありがとうございました。'" />
          </template>
          <div class="wpcf7-response-output wpcf7-display-none"></div>
        </form>
      </article>
    </div>
  </div>
</template>

<script>
import GetArticlesForWpAPI from '~/assets/GetArticlesForWpAPI.js'

export default {
  head() {
    return {
      title: 'お問い合わせ',
    }
  },
  data() {
    return {
      slugName: 'contact',
      finished: false,
      form: {
        your_name: '',
        your_name_ruby: '',
        your_email: '',
        your_subject: '',
        your_message: '',
      },
    }
  },
  methods: {
    getcategoryName(id) {
      const categories = this.categories
      let categoryName = ''

      for (let i = 0; i < categories.length; i++) {
        const category = categories[i]
        const categoryId = category.id
        if (id === categoryId) {
          categoryName = category.name
        }
      }
      return categoryName
    },
    encode(data) {
      return Object.keys(data)
        .map(
          (key) =>
            `${encodeURIComponent(
              key.split('_').join('-'),
            )}=${encodeURIComponent(data[key])}`,
        )
        .join('&')
    },
    async handleSubmit() {
      const axiosConfig = {
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
      const test = await this.$axios.$post(
        '/wp-json/contact-form-7/v1/contact-forms/5/feedback',
        this.encode({
          ...this.form,
        }),
        axiosConfig,
      )
      this.finished = true
    },
  },
}
</script>

<style lang="scss">
.container {
  article {
    padding: 0 5% 3rem 5%;

    h1 {
      margin: 2rem 0;
    }

    h2 {
      font-size: 1.5rem;
      margin: 1rem 0;
    }

    h3 {
      margin: 1rem 0;
    }

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

/*---------------------------------

  PC対応のスタイル

---------------------------------*/
@media only screen and (min-device-width: 769px) {
  .container {
    margin: 0 15.5rem;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    text-align: center;

    form {
      font-size: 1.15rem;
      line-height: 2.4rem;
      text-align: initial;

      h1 {
        font-weight: normal;
      }

      h2 {
        margin: 1.8em 0;
      }

      blockquote {
        background-color: #f3f3f3;
        width: 80%;
        margin: 0 auto;
      }

      label,
      input,
      textarea {
        font-size: 1rem;
      }
      input {
        padding: 15px 10px;
        margin-top: 10px;
        margin-bottom: 10px;
        width: 450px;
      }

      textarea {
        width: 775px;
        max-width: 100%;
        height: 200px;
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 7px;
        padding-top: 7px;
        line-height: 2.14286;
      }

      .wpcf7-submit {
        display: block;
        color: white;
        cursor: pointer;
        max-width: 22rem;
        margin: 2rem auto 3rem auto;
        font-weight: bold;
        padding: 1rem 3rem 1rem 3rem;
        background: rgb(38, 47, 64);
        background: linear-gradient(
          149deg,
          rgba(38, 47, 64, 1) 0%,
          rgba(139, 142, 157, 1) 66%,
          rgba(152, 149, 170, 1) 100%
        );

        &:hover {
          cursor: default;
          background: linear-gradient(
            149deg,
            rgb(77, 87, 105) 0%,
            rgb(166, 168, 182) 66%,
            rgb(181, 177, 201) 100%
          );
        }
      }
    }
  }
}

@media only screen and (max-device-width: 768px) {
  /*---------------------------------

  スマホ・タブレット対応のスタイル

---------------------------------*/

  .container {
    input,
    textarea {
      border: 1px solid #ddd;
      width: 100% !important;
    }

    label,
    input,
    textarea {
      font-size: 0.9rem;
    }
    input {
      padding: 10px 10px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    textarea {
      max-width: 100%;
      height: 200px;
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 7px;
      padding-top: 7px;
      line-height: 2.14286;
    }

    .article-title {
      text-align: center;
    }

    .wpcf7-submit {
      display: block;
      color: white;
      cursor: pointer;
      max-width: 22rem;
      margin: 2rem auto 3rem auto;
      font-weight: bold;
      padding: 1rem 3rem 1rem 3rem;
      background: rgb(38, 47, 64);
      background: linear-gradient(
        149deg,
        rgba(38, 47, 64, 1) 0%,
        rgba(139, 142, 157, 1) 66%,
        rgba(152, 149, 170, 1) 100%
      );

      &:hover {
        cursor: default;
        background: linear-gradient(
          149deg,
          rgb(77, 87, 105) 0%,
          rgb(166, 168, 182) 66%,
          rgb(181, 177, 201) 100%
        );
      }
    }
  }
}
</style>
