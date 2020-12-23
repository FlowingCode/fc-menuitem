import {FcMenuItemElement} from '../fc-menuitem.js';
import {fixture, html} from '@open-wc/testing';

const assert = chai.assert;

suite('fc-menuitem', () => {
  test('is defined', () => {
    const el = document.createElement('fc-menuitem');
    assert.instanceOf(el, FcMenuItemElement);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<fc-menuitem></fc-menuitem>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('renders with a set title', async () => {
    const el = await fixture(html`<fc-menuitem title="Test"></fc-menuitem>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, Test!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

});
