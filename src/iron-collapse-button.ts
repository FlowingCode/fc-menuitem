/**
@license Apache-2.0

Copyright (C) 2019 - 2021 Flowing Code

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
 
      http://www.apache.org/licenses/LICENSE-2.0
 
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
@license MIT

Copyright (c) 2017 Jacob Phillips

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import {html, LitElement} from 'lit';
import {property} from 'lit/decorators/property.js';
import {customElement} from 'lit/decorators/custom-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import "@polymer/iron-iconset-svg/iron-iconset-svg";
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-collapse/iron-collapse.js';

/**
 * Iron Collapse Button
 *
 */
@customElement('iron-collapse-button')
export class IronCollapseButtonElement extends LitElement {

  static get is() { return 'iron-collapse-button'; }

	override render() {
		return html`
    <style>
      :host {
        display: block;
      }
      .triggerClass {
        justify-content: center;
        align-items: center;
        flex-direction: row;
        display: flex;
      }
      .ironIconClass {
        position: absolute;
        right: 10px;
      }
    </style>

	<iron-iconset-svg name="iron-collapse-button-icons" size="24">
	<svg><defs>
	<g id="expand-less"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></g>
	<g id="expand-more"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></g>
	</defs></svg>
	</iron-iconset-svg>

    <div id="trigger" class="triggerClass" @click=${this.toggle}>
      <slot name="collapse-trigger"></slot>
      <iron-icon class="ironIconClass" icon="${this._toggle(this.opened, this.collapseIcon, this.expandIcon)}" ?hidden="${this.noIcons}"></iron-icon>
    </div>
    <iron-collapse id="collapse" ?horizontal="${this.horizontal}" data-no-animation="${this.noAnimation}" ?opened="${this.opened}">
      <slot name="collapse-content"></slot>
    </iron-collapse>
        `;}

    @property({ type: Boolean })
    horizontal = false;

    @property({ type: Boolean })
    noAnimation = false;

    @property({ type: Boolean })
    opened = false;

    @property({ type: String })
    expandIcon = 'iron-collapse-button-icons:expand-more';

    @property({ type: String })
    collapseIcon = 'iron-collapse-button-icons:expand-less';

    @property({ type: Boolean })
    noIcons = false;

    show() {
        this.open();
    }
    hide() {
        this.close();
    }
    open() {
        this.opened = true;
    }
    close() {
        this.opened = false;
    }
    toggle() {
        if (this.opened) {
          this.opened = false;
          let myEvent = new CustomEvent('menuitem-collapsed-event', { 
            bubbles: true, 
            composed: true });
          this.dispatchEvent(myEvent);
        } else {
          this.opened = true;
          let myEvent = new CustomEvent('menuitem-expanded-event', { 
            bubbles: true, 
            composed: true });
          this.dispatchEvent(myEvent);
        }
    }
    _toggle(cond: boolean, t: string, f: string) {
        return cond ? t : f;
    }

}