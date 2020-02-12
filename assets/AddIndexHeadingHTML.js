// WordPressの記事HTMLを加工し、目次用のHTMLを返却する。
const AddIndexHeadingHTML = (wpHTML) => {
    let count = 0
    let indexHeadings = []

    // 正規表現でマッチしたH2タグに目次のIDを付与する
    const tagReplacer = (match, p1, offset, string) => {
        let indexHeading = p1;

        // H2タグ内のHTMLタグを除去
        indexHeading = indexHeading.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')

        const replacedTag = `<h2 id="index-heading-${count}">${indexHeading}</h2>`

        indexHeadings.push(indexHeading)

        count += 1
        return replacedTag
    }

    const h2TagReg = /<h2>(.+?)<\/h2>/g
    let outputHTML = wpHTML.replace(h2TagReg, tagReplacer);

    // 目次のHTMLを生成する
    let indexHeadingHTML = ''
    for (let i = 0; i < indexHeadings.length; i++) {
        const indexHeading = indexHeadings[i];
        indexHeadingHTML += `<li><a href="#index-heading-${i}">${indexHeading}</a></li>`
    }
    indexHeadingHTML = `<nav class="index-heading"><h4 class="index-heading-title">もくじ</h4></b><ol>${indexHeadingHTML}</ol></nav>`

    // 目次のHTMLを最初のH2タグの直前に挿入する
    outputHTML = outputHTML.replace('<h2', indexHeadingHTML + '\n<h2')
    return outputHTML
}

export default AddIndexHeadingHTML