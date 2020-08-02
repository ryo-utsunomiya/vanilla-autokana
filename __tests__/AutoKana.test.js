/* global test expect document */
import AutoKana from '../src/AutoKana';

test('init', () => {
  document.body.innerHTML = `
<input name="name" id="name">
<input name="furigana" id="furigana">
`;
  const autokana = new AutoKana('name', 'furigana');
  autokana.start();
  expect(autokana.isActive).toBe(true);
});

test('init with pass elements', () => {
  document.body.innerHTML = `
<input name="name">
<input name="furigana">
`;
  const name = document.querySelector('[name=name]')
  const furigana = document.querySelector('[name=furigana]')
  const autokana = new AutoKana(name, furigana);
  autokana.start();
  expect(autokana.isActive).toBe(true);
});
