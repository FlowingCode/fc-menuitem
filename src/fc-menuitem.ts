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
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
 
import "@polymer/iron-icon/iron-icon";

import { customElement, html, property, PropertyValues } from 'lit-element';
import { ThemableElement } from '@vaadin/themable-element/themable-element.js'
import "@polymer/paper-item/paper-icon-item";
import "@polymer/iron-iconset-svg/iron-iconset-svg";
import "./iron-collapse-button";
import { PaperIconItemElement } from "@polymer/paper-item/paper-icon-item";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('fc-menuitem')
export class FcMenuItemElement extends ThemableElement {
	static get is() { return 'fc-menuitem'; }

	render() {
		return html`
		<style>
			:host {
				cursor: pointer;
				display: block;
				--paper-item-disabled-color: var(--lumo-disabled-text-color);
			}
			:host(.iron-selected) #item {
				font-weight: var(--paper-item-selected-weight, bold);
			}
			:host #item {
				width: 100%;
				display: flex;
			}
			:host > iron-collapse-button {
				background: inherit;
			}
			:host #label {
				flex-grow: 1
			}
			:host a#label {
				color: inherit;
				text-decoration: none
			}
		</style>
	         	
	    <iron-iconset-svg name="fc-menuitem-icons" size="24">
			<svg><defs>
			<g id="empty"></g>
			</defs></svg>
		</iron-iconset-svg>
	
		<iron-collapse-button>
			<paper-icon-item id="item" slot="collapse-trigger" role="option" ?disabled="${this.disabled}">
        <iron-icon src="${this.src}" icon="${this.icon}" slot="item-icon"></iron-icon>
        ${this.href ?
				html`
          <a router-link href="${this.href}" id="label" onclick="getRootNode().host.__closeDrawer()">${this.label}</a>
        `:
				html`
          <span id="label">${this.label}</span>
        `}
				<slot></slot>
			</paper-icon-item>
			<div slot="collapse-content" class="sub-menu">
				<slot name="menu-item"></slot>
			</div>
		</iron-collapse-button>
	`;
	}

	@property({ type: String })
	key = "";

	@property({ type: String })
	label = "";

	@property({ type: String })
	href = "";

	@property({ type: String, reflect: true })
	src = "";

	@property({ type: String, reflect: true })
	icon = "";

	@property({ type: Boolean })
	disabled = false;

	@property({ type: Boolean, reflect: true })
	hasIcon = false;

	@property({ type: Boolean, reflect: true })
	isSubmenu = false;

	@property({ type: String, reflect: true })
	onMenuItemClicked = "";


	__hasIconChanged(hasIcon: boolean) {
		let item = this.shadowRoot?.querySelector("#item") as PaperIconItemElement;
		let contentIcon = item.shadowRoot?.querySelector("#contentIcon") as HTMLElement;
		contentIcon.style.display = hasIcon ? 'flex' : 'none';
	}
	__hasIcon() {
		return !!(this.src || this.icon);
	}

	updated(changedProps: PropertyValues) {
		if (changedProps.has('hasIcon')) {
			this.__hasIconChanged(changedProps.get('hasIcon') as boolean);
		}
	}

	__closeDrawer() {
		// let container = this.closest('[fc-menuitem-container]'); 
		// if (container) container.close();
	}

	constructor() {
		super();
		// var listener = () => {
		// 	let iron = this.shadowRoot?.querySelector("iron-collapse-button");
		// 	if (iron) iron.$.trigger.children[0].assignedNodes()[0].focus();
		// };
		// this.addEventListener('focus', listener);
		// this.addEventListener('click', listener);
		this.addEventListener('click', (event) => {
		let myEvent = new CustomEvent('menuitem-clicked-event', { 
			detail: { message: 'Menu item clicked.' },
			bubbles: true, 
			composed: true });
		this.dispatchEvent(myEvent);
		eval( this.onMenuItemClicked );
		if (this.href && event.composedPath() && (event.composedPath()[0] as HTMLElement).id != "label") {
				let anchor = this.shadowRoot?.querySelector("a#label") as HTMLElement;
				anchor.click();
			}
		});
		this.addEventListener('mousedown', (event) => {
			if (event.button == 1) {
				event.preventDefault();
				return false;
			}
			return true;
		});
		this.addEventListener('mouseup', (event) => {
			event.preventDefault();
			return false;
		});
		this.addEventListener('contextmenu', event => {
			event.preventDefault();
		});
	}

	connectedCallback() {
		super.connectedCallback();
	}

	firstUpdated() {
		var slot = this.shadowRoot?.querySelector("slot[name='menu-item']");
		var handler = this.__bindSubmenu.bind(this);
		slot?.addEventListener('slotchange', handler);
		handler();
		this.__hasIconChanged(this.hasIcon);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	__bindSubmenu() {
		var slot = this.shadowRoot?.querySelector("slot[name='menu-item']") as HTMLSlotElement;
		this.isSubmenu = slot && slot.assignedNodes().length > 0;
		var iron = this.shadowRoot?.querySelector("iron-collapse-button");
		if (this.isSubmenu) {
			iron?.removeAttribute('noIcons');
		} else {
			iron?.setAttribute('noIcons', 'true');
		}
	}
}


