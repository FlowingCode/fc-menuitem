---
layout: page.11ty.cjs
title: <fc-menuitem> ⌲ Home
---

# &lt;fc-menuitem>

`<fc-menuitem>` is a web component that builds a responsive and flexible layout for creating web applications.

## As easy as HTML

<section class="columns">
  <div>

`<fc-menuitem>` is just an HTML element. You can it anywhere you can use HTML!

```html
<fc-menuitem></fc-menuitem>
```

  </div>
  <div>

<fc-menuitem></fc-menuitem>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<fc-menuitem>` can be configured with attributed in plain HTML.

```html
<fc-menuitem title="My App"></fc-menuitem>
```

  </div>
  <div>

<fc-menuitem title="My App"></fc-menuitem>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<fc-menuitem>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name="lit-html";

render(html`
  <h2>This is a &lt;fc-menuitem&gt;</h2>
  <fc-menuitem .title=${title}></fc-menuitem>
`, document.body);
```

  </div>
  <div>

<h2>This is a &lt;fc-menuitem&gt;</h2>
<fc-menuitem title="lit-html"></fc-menuitem>

  </div>
</section>
