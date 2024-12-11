import { _decorator, Component, Node } from "cc";
import { ViewMgr } from "./ViewMgr";
const { ccclass, property } = _decorator;

@ccclass("View")
export class View extends Component {
    mgr: ViewMgr;

    start() { }

    update(deltaTime: number) { }

    onShown() { }

    onHidden() { }

    show() {
        this.mgr.show(this.constructor as any);
    }

    hide() {
        this.node.active = false;
        this.onHidden();
        if (this.mgr.blackMask)
            this.mgr.blackMask.active = false;
    }
}
