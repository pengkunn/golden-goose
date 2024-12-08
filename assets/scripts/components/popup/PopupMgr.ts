import { _decorator, Component, Node, instantiate } from "cc";
import _ from "lodash-es";
import { Popup } from "./Popup";
const { ccclass, property } = _decorator;

@ccclass("PopupMgr")
export class PopupMgr extends Component {
    @property(Node) blackBg: Node = null;
    @property([Popup]) popupTemplates: Popup[] = [];

    popups: Popup[] = [];

    start() {}

    update(deltaTime: number) {}

    show<T extends Popup>(classConstructor: new (...args: any[]) => T): T {
        let popup: T;
        for (const pt of this.popupTemplates) {
            popup = pt.getComponent(classConstructor);
            if (popup) {
                break;
            }
        }
        if (!popup) {
            throw new Error("not found popup template");
        }

        const newPopupNode = instantiate(popup.node);
        this.popups.push(popup);
        newPopupNode.active = true;
        newPopupNode.parent = this.node;

        this.blackBg.active = true;
        this.blackBg.setSiblingIndex(popup.node.getSiblingIndex() - 1);

        return popup;
    }

    hide<T extends Popup>(classConstructor: new (...args: any[]) => T): T {
        let popup: T;
        for (let i = this.popups.length - 1; i >= 0; i--) {
            const p = this.popups[i];
            const comp = p.getComponent(classConstructor);
            if (comp) {
                popup = comp;
                break;
            }
        }

        if (popup) {
            popup.node.removeFromParent();
            _.pull(this.popups, popup);
        }

        this.blackBg.active = this.popups.length > 0;
        if (this.popups.length) {
            this.blackBg.setSiblingIndex(
                this.popups[this.popups.length - 1].node.getSiblingIndex() - 1
            );
        }

        return popup;
    }
}
