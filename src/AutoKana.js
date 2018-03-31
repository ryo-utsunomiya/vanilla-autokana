/**
 * @param {string} str
 * @param {string} chars
 * @returns {string}
 */
function ltrim(str, chars) {
  // eslint-disable-next-line no-param-reassign
  chars = !chars ? ' \\s\u00A0' : chars.replace(/([[\]().?/*{}+$^:])/g, '$1');

  const re = new RegExp(`^[${chars}]+`, 'g');
  return str.replace(re, '');
}

// eslint-disable-next-line no-irregular-whitespace
const kanaExtractionPattern = /[^ 　ぁあ-んー]/g;
const kanaCompactingPattern = /[ぁぃぅぇぉっゃゅょ]/g;

export default class AutoKana {
  /**
   * @param {string} name
   * @param {string} furigana
   * @param {object} option
   */
  constructor(name, furigana, option = {}) {
    const elName = document.getElementById(ltrim(name, '#'));
    const elFurigana = document.getElementById(ltrim(furigana, '#'));

    if (!elName) throw new Error(`Element not found: ${name}`);
    if (!elFurigana) throw new Error(`Element not found: ${furigana}`);

    this.elName = elName;
    this.elFurigana = elFurigana;
    this.option = Object.assign(
      {
        katakana: false,
        checkInterval: 30, // msec
      },
      option
    );
    this.active = true;
    this.timer = null;
    this.initializeValues();
    this.registerEvents();
  }

  initializeValues() {
    this.baseKana = '';
    this.isConverting = false;
    this.ignoreString = '';
    this.input = '';
    this.values = [];
  }

  registerEvents() {
    this.elName.addEventListener('blur', () => {
      this.clearInterval();
    });
    this.elName.addEventListener('focus', () => {
      this.onInput();
      this.setInterval();
    });
    this.elName.addEventListener('keydown', () => {
      if (this.isConverting) {
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
    if (!this.isConverting) {
      if (newValues) {
        this.values = newValues;
      }
      if (this.active) {
        this.elFurigana.value = this.toKatakana(
          this.baseKana + this.values.join('')
        );
      }
    }
  }

  removeString(newInput) {
    if (newInput.indexOf(this.ignoreString) !== -1) {
      return newInput.replace(this.ignoreString, '');
    }
    const ignoreArray = this.ignoreString.split('');
    const inputArray = newInput.split('');
    for (let i = 0; i < ignoreArray.length; i += 1) {
      if (ignoreArray[i] === inputArray[i]) {
        inputArray[i] = '';
      }
    }
    return inputArray;
  }

  checkConvert(newValues) {
    if (!this.isConverting) {
      if (Math.abs(this.values.length - newValues.length) > 1) {
        const tmpValues = newValues
          .join('')
          .replace(kanaCompactingPattern, '')
          .split('');
        if (Math.abs(this.values.length - tmpValues.length) > 1) {
          this.onConvert();
        }
      } else if (
        this.values.length === this.input.length &&
        this.values.join('') !== this.input
      ) {
        if (this.input.match(kanaExtractionPattern)) {
          this.onConvert();
        }
      }
    }
  }

  checkValue() {
    let newInput;
    newInput = this.elName.value;

    if (newInput === '') {
      this.initializeValues();
      this.setKana();
    } else {
      newInput = this.removeString(newInput);

      if (this.input === newInput) return;

      this.input = newInput;

      if (!this.isConverting) {
        const newValues = newInput.replace(kanaExtractionPattern, '').split('');
        this.checkConvert(newValues);
        this.setKana(newValues);
      }
    }
  }

  setInterval() {
    this.timer = setInterval(
      this.checkValue.bind(this),
      this.option.checkInterval
    );
  }

  onInput() {
    this.baseKana = this.elFurigana.value;
    this.isConverting = false;
    this.ignoreString = this.elName.value;
  }

  onConvert() {
    this.baseKana = this.baseKana + this.values.join('');
    this.isConverting = true;
    this.values = [];
  }
}
