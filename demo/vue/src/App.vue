<template>
  <div id="app">
    <div>
      <label for="name">名前</label>
      <input name="name" id="name" v-model="name" @input="handleNameInput">
    </div>
    <div>
      <label for="furigana">ふりがな</label>
      <input name="furigana" id="furigana" v-model="furigana">
    </div>
    <h2>入力内容の確認</h2>
    <p>名前: {{ name }}</p>
    <p>ふりがな: {{ furigana }}</p>
  </div>
</template>

<script>
import * as AutoKana from 'vanilla-autokana';

let autokana;

export default {
  name: 'App',
  data() {
    return {
      name: '',
      furigana: '',
    }
  },
  mounted() {
    autokana = AutoKana.bind('#name', '#furigana');
  },
  methods: {
    handleNameInput() {
      this.furigana = autokana.getFurigana();
    }
  }
}
</script>
