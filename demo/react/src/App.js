import React, { Component } from 'react';
import * as AutoKana from 'vanilla-autokana';
import './App.css';

let autokana;

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      furigana: '',
    };
    this.handleNameInput = this.handleNameInput.bind(this);
  }
  componentDidMount() {
    autokana = AutoKana.bind('#name', '#furigana');
  }
  handleNameInput(ev) {
    this.setState({
      name: ev.target.value,
      furigana: autokana.getFurigana(),
    });
  }
  render() {
    return (
      <div className="App">
        <div>
          <label htmlFor="name">名前</label>
          <input name="name" id="name" value={this.state.name} onInput={this.handleNameInput} />
        </div>
        <div>
          <label htmlFor="furigana">ふりがな</label>
          <input name="furigana" id="furigana" value={this.state.furigana} />
        </div>
        <h2>入力内容の確認</h2>
        <p>名前: { this.state.name }</p>
        <p>ふりがな: { this.state.furigana }</p>
      </div>
    );
  }
}

export default App;
