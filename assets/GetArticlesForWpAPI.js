const GetArticles = (fetchedArticles, tags) => {
  const articles = []

  for (let i = 0; i < fetchedArticles.length; i++) {
    const article = fetchedArticles[i]

    // カバー画像がない場合の画像URLをセット
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
  return articles
}

export default GetArticles
