// WordPressから取得した記事を記事表示コンポーネントへ渡すデータに整形する関数
const GetArticles = (fetchedArticles, categories) => {
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
    const getcategoryName = (id, categories) => {
      let categoryName = ''

      for (let i = 0; i < categories.length; i++) {
        const category = categories[i]
        const categoryId = category.id
        if (id === categoryId) {
          categoryName = category.name
        }
      }
      return categoryName
    }

    // 記事のタグID一覧を取得し、タグ名のリストを作成する。
    const categoryNames = []
    const articlecategoryIds = article.categories
    for (let i = 0; i < articlecategoryIds.length; i++) {
      const categoryId = articlecategoryIds[i]
      const categoryName = getcategoryName(categoryId, categories)
      categoryNames.push(categoryName)
    }

    articles.push({
      url: '/page/' + article.id,
      title: article.title.rendered,
      image_url: coverImage,
      keywords: categoryNames,
    })
  }
  return articles
}

export default GetArticles
