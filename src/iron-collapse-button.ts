import { customElement, html, LitElement, property } from 'lit-element';
import "@polymer/paper-item/paper-icon-item";
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
	
	render() {
		return html`
    <style>
      :host {
        display: block;
      }
      #trigger {
        @apply --layout-horizontal;
        @apply --layout-center;
      }
    </style>

	<iron-iconset-svg name="iron-collapse-button-icons" size="24">
	<svg><defs>
	<g id="expand-less"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></g>
	<g id="expand-more"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></g>
	</defs></svg>
	</iron-iconset-svg>

    <div id="trigger" @click=${this.toggle}>
      <slot name="collapse-trigger"></slot>
      <iron-icon icon="${this._toggle(this.opened, this.collapseIcon, this.expandIcon)}" ?hidden="${this.noIcons}"></iron-icon>
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
        this.opened = !this.opened;
    }
    _toggle(cond: boolean, t: string, f: string) {
        return cond ? t : f;
    }

}