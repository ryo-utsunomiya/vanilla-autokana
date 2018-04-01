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

### ES.Next

```
import * as AutoKana from 'autokana';

AutoKana.bind('#name', '#furigana');
```

### ES5


```
<script src="autokana.js" defer></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    AutoKana.bind('#name', '#furigana');
  });
</srcipt>
```

## ライセンス

MIT

## 謝辞

このライブラリの設計・実装は jquery-autokana(https://github.com/harisenbon/autokana) に大きく影響を受けています。
