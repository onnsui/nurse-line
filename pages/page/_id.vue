<template>
  <div class="container">
    <div>
      <article>
        <!-- {{fetchedArticle}} -->

        <h1>
          {{ article.title }}
        </h1>

        <div>日付: {{ article.date_str }}</div>
        <div>著者: {{ article.author }}</div>
        <div>アイコンURL:{{ article.author_avatar_img_96px }}</div>

        <div>
          記事内容:
          {{ article.content }}
        </div>
      </article>
    </div>

    <h2></h2>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    const fetchedArticle = await $axios.$get(
      'http://blog.igz0.net/wp-json/wp/v2/posts/' + params.id,
    )

    // ISO8601形式の日付をDate型に変換する関数
    const convIso8601DateStr = (isoDateStr) => {
      const parse = isoDateStr.match(
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/,
      )
      return new Date(
        Number(parse[1]),
        Number(parse[2]),
        Number(parse[3]),
        Number(parse[4]),
        Number(parse[5]),
        Number(parse[6]),
      )
    }

    const getArticleDateStr = (date) => {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return year + '.' + month + '.' + day
    }

    const articleDate = convIso8601DateStr(fetchedArticle.date)
    const articleDateStr = getArticleDateStr(articleDate)

    const fetchedUsers = await $axios.$get(
      'http://blog.igz0.net/wp-json/wp/v2/users',
    )

    const getAuthorUser = (userId, users) => {
      let userName = ''
      let avatarUrls = []

      for (let i = 0; i < fetchedUsers.length; i++) {
        const fetchedUser = fetchedUsers[i]
        if (userId === fetchedUser.id) {
          userName = fetchedUser.name
          avatarUrls = fetchedUser.avatar_urls
        }
      }
      const user = {
        name: userName,
        avatar_img_24px: avatarUrls['24'],
        avatar_img_48px: avatarUrls['48'],
        avatar_img_96px: avatarUrls['96'],
      }
      return user
    }

    const articleAuthorId = fetchedArticle.author
    const articleAuthor = getAuthorUser(articleAuthorId, fetchedUsers)

    const article = {
      title: fetchedArticle.title.rendered,
      date: articleDate,
      date_str: articleDateStr,
      author: articleAuthor.name,
      author_avatar_img_96px: articleAuthor.avatar_img_96px,
      content: fetchedArticle.content.rendered,
    }

    return { fetchedArticle, article, users: fetchedUsers }
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
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
