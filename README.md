# vanilla-autokana

[English README is here](https://github.com/ryo-utsunomiya/vanilla-autokana/blob/master/README_en.md)

フォームのフィールドに文字を入力すると、別のフィールドにかなを自動入力するライブラリです。

## 特徴

- jQueryに依存していません
- scriptタグからの読み込みとESModulesのimportに対応しています

## インストール方法

### npm

```
npm i vanilla-autokana # or yarn add vanilla-autokana
```

### npmを使わない方法

このリポジトリの `dist/autokana.js` をダウンロードし、scriptタグで読み込んでください。

## 使用方法

- `AutoKana.bind()` メソッドの第1引数にふりがな入力元のinput要素、第2引数にふりがな出力先のinput要素のidを指定します
- input要素が見つけられない場合は正常に動作できないため、DOMContentLoadedイベント内での実行を推奨します
- ライブラリ本体はDOMのライフサイクルイベントに依存しないため、ライブラリの読み込みには`defer`属性の追加を推奨します

```
<input name="name" id="name">
<input name="furigana" id="furigana">
<script src="autokana.js" defer></script>
<script>
  document.addEventListener("DOMContentLoaded", function() {
    AutoKana.bind("#name", "#furigana");
    // ↓ふりがなをカタカナで入力したい場合
    // AutoKana.bind("#name", "#furigana", { katakana: true });
  });
</script>
```

### モジュールとしてimportする

ESModulesとしてimportすることができます。

```
import * as AutoKana from 'vanilla-autokana';

AutoKana.bind('#name', '#furigana');
```

### Vue.jsと組み合わせる

`v-model`を使用している場合、input要素のvalue属性への値のセットは動作しません。
[Vue.jsでの使用例](https://github.com/ryo-utsunomiya/vanilla-autokana/blob/master/demo/vue/src/App.vue)を参考に、名前フィールドのinputイベントで、`AutoKana.getFurigana()`メソッドでふりがなを取得し、Vueのリアクティブプロパティに反映させることをおすすめします。

### React.jsと組み合わせる

[React.jsでの使用例](https://github.com/ryo-utsunomiya/vanilla-autokana/blob/master/demo/react/src/App.js)を参考にしてください。

## ライセンス

MIT

## 謝辞

このライブラリの設計・実装は jquery-autokana(https://github.com/harisenbon/autokana) に大きく影響を受けています。
