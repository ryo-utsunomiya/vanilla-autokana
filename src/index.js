import AutoKana from './AutoKana';

/**
 * Bind elements to AutoKana.
 *
 * @param {String} name ID of name input element.
 * @param {String} furigana ID of furigana input element.
 * @param {Object} option Option.
 * @return {AutoKana} An AutoKana instance.
 */
export function bind(name, furigana, option = {}) {
  return new AutoKana(name, furigana, option);
}
