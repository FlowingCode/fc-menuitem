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

import {html, LitElement, PropertyValues} from 'lit';
import {property} from 'lit/decorators/property.js';
import {customElement} from 'lit/decorators/custom-element.js';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin';
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
export class FcMenuItemElement extends ThemableMixin(LitElement) {
	static get is() { return 'fc-menuitem'; }

	override render() {
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
			::slotted(fc-menuitem) {
				background-color: var(--lumo-primary-color-10pct);
			}
		</style>
	         	
	    <iron-iconset-svg name="fc-menuitem-icons" size="24">
			<svg><defs>
			<g id="empty"></g>
			</defs></svg>
		</iron-iconset-svg>
	
		<iron-collapse-button id="iron-collapse-button" ?opened="${this.opened}">
			<paper-icon-item id="item" slot="collapse-trigger" role="option" ?disabled="${this.disabled}">
        <iron-icon src="${this.src}" icon="${this.icon}" slot="item-icon"></iron-icon>
        ${this.href ?
				html`
          <a router-link href="${this.href}" id="label">${this.label}</a>
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
	isSubmenu = false;

	@property({ type: Boolean, reflect: true  })
	opened = false;

	@property({ type: String, reflect: true })
	onMenuItemClicked = "";

	__hasIconChanged(hasIcon: boolean) {
		let item = this.shadowRoot?.querySelector("#item") as PaperIconItemElement;
		let contentIcon = item.shadowRoot?.querySelector("#contentIcon") as HTMLElement;
		contentIcon.style.display = hasIcon ? 'flex' : 'none';
	}
	get hasIcon() {
		return !!(this.src || this.icon);
	}

	override updated(changedProps: PropertyValues) {
		if (changedProps.has('hasIcon')) {
			this.__hasIconChanged(changedProps.get('hasIcon') as boolean);
		}
	}

	constructor() {
		super();
		this.addEventListener('menuitem-expanded-event', (event) => {
			this.classList.add("expanded");
			event.stopPropagation();
		});
		this.addEventListener('menuitem-collapsed-event', (event) => {
			this.classList.remove("expanded");
			event.stopPropagation();
		});
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

	override connectedCallback() {
		super.connectedCallback();
	}

	override firstUpdated() {
		var slot = this.shadowRoot?.querySelector("slot[name='menu-item']");
		var handler = this.__bindSubmenu.bind(this);
		slot?.addEventListener('slotchange', handler);
		handler();
		this.__hasIconChanged(this.hasIcon);
	}

	override disconnectedCallback() {
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


