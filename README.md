# vanilla-autokana

:warning: This library is now beta. You should not use this in production.

A JavaScript library to complete Furigana automatically.

- No dependencies to jQuery
- UMD compatible

This library is inspired by jquery-autokana(https://github.com/harisenbon/autokana).

## Usage

### ES.Next

```
import * as AutoKana from 'autoKana';

AutoKana.bind('#name', '#furigana');
```

### ES5

```
<script src="autoKana.js"></script>
<script>
  AutoKana.bind('#name', '#furigana');
</srcipt>
```
