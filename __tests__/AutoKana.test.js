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
