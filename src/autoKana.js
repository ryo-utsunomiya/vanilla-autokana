/**
 * Find element by id.
 * @param {String} id Element id.
 * @returns {HTMLElement | null}
 */
function findElement(id) {
  if (id.indexOf('#') === 0) {
    id = id.substr(1); // '#id' => 'id'
  }
  return document.getElementById(id);
}

const kanaExtractionPattern = /[^ 　ぁあ-んー]/g;
const kanaCompactingPattern = /[ぁぃぅぇぉっゃゅょ]/g;

export default class AutoKana {
  constructor(name, furigana, option = {}) {
    const elName = findElement(name);
    const elFurigana = findElement(furigana);

    if (!elName) throw new Error(`Element not found: ${name}`);
    if (!elFurigana) throw new Error(`Element not found: ${furigana}`);

    this.elName = elName;
    this.elFurigana = elFurigana;
    this.option = Object.assign({}, { katakana: false }, option);
    this.active = true;
    this.clearInputValues();
    this.timer = null;
    this.registerEvents();
  }

  registerEvents() {
    this.elName.addEventListener('blur', ev => {
      this.clearInterval();
    });
    this.elName.addEventListener('focus', ev => {
      this.onInput();
      this.setInterval();
    });
    this.elName.addEventListener('keydown', ev => {
      if (this.flagConvert) {
        this.onInput();
      }
    });
  }

  start() {
    this.active = true;
  }

  stop() {
    this.active = false;
  }

  toggle(event) {
    if (event) {
      const el = Event.element(event);
      if (el) {
        this.active = el.checked;
      }
    } else {
      this.active = !this.active;
    }
  };

  /**
   * Clear input values.
   */
  clearInputValues() {
    this.baseKana = '';
    this.flagConvert = false;
    this.ignoreString = '';
    this.input = '';
    this.values = [];
  }

  clearInterval() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  toKatakana(src) {
    if (this.option.katakana) {
      // todo: Convert to katakana
      return src;
    }
    return src;
  }

  setKana(newValues) {
    if (!this.flagConvert) {
      if (newValues) {
        this.values = newValues;
      }
      if (this.active) {
        this.elFurigana.value = this.toKatakana(this.baseKana + this.values.join(''));
      }
    }
  }

  removeString(newInput) {
    if (newInput.indexOf(this.ignoreString) !== -1) {
      return newInput.replace(this.ignoreString, '');
    } else {
      const ignoreArray = this.ignoreString.split('');
      const inputArray = newInput.split('');
      for (let i = 0; i < ignoreArray.length; i += 1) {
        if (ignoreArray[i] === inputArray[i]) {
          inputArray[i] = '';
        }
      }
      return inputArray;
    }
  }

  checkConvert(newValues) {
    if (!this.flagConvert) {
      if (Math.abs(this.values.length - newValues.length) > 1) {
        const tmpValues = newValues.join('').replace(kanaCompactingPattern, '').split('');
        if (Math.abs(this.values.length - tmpValues.length) > 1) {
          this.onConvert();
        }
      } else {
        if (this.values.length === this.input.length && this.values.join('') !== this.input) {
          if (input.match(kanaExtractionPattern)) {
            this.onConvert();
          }
        }
      }
    }
  }

  checkValue() {
    if (!this.elName) return;
    let newInput;
    newInput = this.elName.value;

    if (newInput === '') {
      this.clearInputValues();
      this.setKana();
    } else {
      newInput = this.removeString(newInput);

      if (this.input === newInput) return;

      this.input = newInput;

      if (!this.flagConvert) {
        const newValues = newInput.replace(kanaExtractionPattern, '').split('');
        this.checkConvert(newValues);
        this.setKana(newValues);
      }
    }
  }

  setInterval() {
    this.timer = setInterval(this.checkValue.bind(this), 30); // todo: interval should be option
  }

  onInput() {
    this.baseKana = this.elFurigana.value;
    this.flagConvert = false;
    this.ignoreString = this.elName.value;
  }

  onConvert() {
    this.baseKana = this.baseKana + this.values.join('');
    this.flagConvert = true;
    this.values = [];
  }
}
