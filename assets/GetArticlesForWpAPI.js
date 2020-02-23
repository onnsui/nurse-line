// WordPressから取得した記事を記事表示コンポーネントへ渡すデータに整形する関数
const GetArticles = (fetchedArticles, tags) => {
  const articles = []

  for (let i = 0; i < fetchedArticles.length; i++) {
    const article = fetchedArticles[i]

    // 記事にアイキャッチ画像が設定されていない場合の画像URLをセットする。
    let coverImage = 'http://placehold.jp/200x150.png'

    // アイキャッチ画像のURLが記事中にあった場合、変数にセットする。
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
      title: article.title.rendered,
      image_url: coverImage,
      keywords: tagNames,
    })
  }
  return articles
}

export default GetArticles
