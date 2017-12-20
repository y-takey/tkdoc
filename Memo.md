
2017/12月中旬にFacebookがリリースしたドキュメント管理ツール[Docusaurus](https://docusaurus.io/)を試してみてなかなかよかったので紹介記事を書こうと思います。

# 特徴とか機能とか

* マークダウンで書ける
* レイアウトをReactで書ける
* i18nにも対応
* バージョニング
* 検索機能
* github pagesに簡単にデプロイできる


# セットアップ

1. docusaurus-init をインストール: `yarn global add docusaurus-init` or `npm install --global docusaurus-init`
2. プロジェクトディレクトリのルートで `docusaurus-init` を実行

この段階でルートに `docs-examples-from-docusaurus` と `website` というディレクトリ(スケルトン)が作成されるが、そのままでは設定とディレクトリ名が合っていなくて動かない状態。

3. `mv docs-examples-from-docusaurus docs & mv website/blog-examples-from-docusaurus website/blog` で適切になるようにリネームする。

ここまでで以下のような状態になっているはず。

```
project
  ├─ docs (from docs-examples-from-docusaurus)
  └─ website
     └─ blog (from blog-examples-from-docusaurus)
     └─ core
     └─ i18n (後から自動生成されたかも)
     └─ node_modules
     └─ pages
     └─ static
     └─ package.json
     └─ sidebars.json
     └─ siteConfig.js
```

4. `cd website && yarn start` でローカルwebサーバを起動
5. `http://localhost:3000` を開く
自分の場合は初回アクセス時にエラーとなりましたが、リロードすると正常に表示されました。（初回にエラー返しつつ、ビルドしている？）

* 注意点

既存のmdファイルの変更は大丈夫ですが、それ以外の以下のような操作はホットに反映してくれないようです。

* 新しいmdファイルの追加
* siteConfig.jsの変更


# デプロイ

1. まずは `yarn build` でビルドします。

* `webite/build` にビルドされたファイル類が作成されるので .gitignore に指定していない場合は追加しておくといいと思います。

2. `GIT_USER=xxx yarn publish-gh-pages` でデプロイ

## 注意

* siteConfig.jsに `organizationName` と `projectName` が必要。（もしくは環境変数 `ORGANIZATION_NAME`, `PROJECT_NAME`で指定する）特に`organizationName`は初期状態だとコメントアウトされているのでコメントを解除する。

# 検索機能を有効化する

検索機能は外部API([Algolia DocSearch](https://community.algolia.com/docsearch/))を利用しているため、まずはそちらの登録＆APIキーの取得が必要。
取得APIキーをsiteConfig.jsで指定して、同じくheaderLinksに { search: true }を指定すればいい模様。（今回は試していない）


# i18nを有効化する

1. `yarn examples translations` を実行してサンプルファイル等を作成する。

`website/pages/en/help-with-translations.js` というファイルが作成されるので、リネームして既存の `website/pages/en/help.js` を置換する。

ちなみに違いは、以下のようにtranslateをrequireして翻訳部分を囲んでいるだけなので、その他のファイルも同様にできる。

```
const translate = require("../../server/translate.js").translate;

<translate>This is english</translate>
```

2. 選択可能な言語を選択

1で `website/languages.js` が作成されているはずなので、ファイルを開きサポート言語を `enable: true` にする。

3. 翻訳する

おそらく今までにサーバを起動していたら、 `website/i18n/en.json` が出来ているはずで、そこに原文が記載されているので翻訳する。
一応Docusaurusは `website/i18n/en.json` を [Crowdin](https://crowdin.com/) にアップロードして一括機械翻訳し結果をダウンロードすることを想定しているようだけど、必須ではない。
今回は `website/i18n/en.json` をコピーし `website/i18n/ja.json` を作成し自前で翻訳した。
ちなみに任意のページをロードした際に、対応するキーが辞書ファイルに存在しない場合は`website/i18n/en.json` に動的に追加されていく。

4. ヘッダーで言語切替リンクを有効にする。

siteConfig.jsのheaderLinksに以下のように追加するだけ。

```
const siteConfig = {
  headerLinks: [
    ...
    { languages: true },
    ...
  ],
```


# バージョニング

1. `yarn examples versions` を実行する。

`pages/en/versions.js` が作成される。

2. `yarn run version 1.0.0` を実行し、バージョンを作成する。(`1.0.0`の部分は自由)

`website/versioned_docs/version-1.0.0` や `website/versioned_sidebars` が作成される。
中身は現在のdocsやsidebars.jsonがコピーされている。（単純コピーではなくドキュメントID等がよしなに書き換えられている）

3. ヘッダーに表示する

```
const siteConfig = {
  headerLinks: [
    ...
    { page: "versions", label: "Version" },
    ...
  ],
```
