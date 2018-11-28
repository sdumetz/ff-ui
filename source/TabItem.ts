/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import CustomElement, { customElement, html, property, PropertyValues } from "./CustomElement";

////////////////////////////////////////////////////////////////////////////////

@customElement
export default class TabItem extends CustomElement
{
    static readonly tagName: string = "ff-tab-item";

    @property({ type: Boolean, reflect: true })
    active = false;

    @property({ type: String })
    text = "";

    @property({ type: String })
    icon = "";

    header: TabHeader = null;

    constructor()
    {
        super();

        this.setStyle({
            flex: " 1 1 auto"
        });
    }

    protected update(changedProperties: PropertyValues)
    {
        super.update(changedProperties);

        if (changedProperties.has("active")) {
            this.style.display = this.active ? "flex" : "none";
        }

        if (this.header) {
            this.header.requestUpdate();
        }
    }
}

@customElement
export class TabHeader extends CustomElement
{
    static readonly tagName: string = "ff-tab-header";

    @property({ type: Boolean, reflect: true })
    active = false;

    readonly item: TabItem;

    constructor(item: TabItem)
    {
        super();

        this.item = item;

        this.setStyle({
            flex: "0 0 auto",
            cursor: "pointer",
            userSelect: "none"
        });
    }

    protected update(changedProperties: PropertyValues)
    {
        super.update(changedProperties);
        
        if (changedProperties.has("active")) {
            this.item.active = this.active;
        }
    }

    protected render()
    {
        const item = this.item;

        const textElement = item.text ? html`<label class="ff-text">${item.text}</label>` : null;
        const iconElement = item.icon ? html`<span class=${"ff-icon " + item.icon}></span>` : null;

        return html`${textElement}${iconElement}`;
    }
}