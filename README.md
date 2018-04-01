# vanilla-autokana

[English README is here](https://github.com/ryo-utsunomiya/vanilla-autokana/blob/master/README_en.md)

:warning: このライブラリはベータ版です。本番環境では使用しないでください。

フォームのフィールドに文字を入力すると、別のフィールドにかなを自動入力するライブラリです。

## 特徴

- jQueryに依存していません
- UMD形式で書き出されており、scriptタグからの読み込みとモジュールのimportに対応しています

## インストール方法

### ES.Next

Coming soon(npm installできるようにします)

### ES5

このリポジトリの dist/autokana.js をダウンロードし、scriptタグで読み込んでください。


## 使用方法

### ES5

`AutoKana.bind()` メソッドの第1引数にふりがな入力元のinput要素、第2引数にふりがな出力先のinput要素のidを指定します。
input要素が見つけられない場合は正常に動作できないため、DOMContentLoadedイベント内での実行を推奨します。
また、ライブラリ本体はDOMのライフサイクルイベントに依存しないため、ライブラリの読み込みには`defer`属性の追加を推奨します。

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

### ES.Next

ESModulesとしてimportすることができます。使用方法はES5と同様です。

```
import * as AutoKana from 'autokana';

AutoKana.bind('#name', '#furigana');
```

## ライセンス

MIT

## 謝辞

このライブラリの設計・実装は jquery-autokana(https://github.com/harisenbon/autokana) に大きく影響を受けています。
