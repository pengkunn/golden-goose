import { _decorator, Component, Node } from "cc";
import { View } from "./View";
const { ccclass, property } = _decorator;


@ccclass("ViewMgr")
export class ViewMgr extends Component {
    public static instance: ViewMgr = null;

    @property([View]) views: View[] = [];
    @property(Node) blackMask: Node = null;

    currentView: View;

    start() {
        ViewMgr.instance = this;
        for (const v of this.views) {
            v.mgr = this;
        }
    }

    update(deltaTime: number) { }

    onlyShow<T extends View>(classConstructor: new (...args: any[]) => T): T {
        let findView = this.getView(classConstructor);
        if (!findView) {
            throw new Error("view not found");
        }

        findView.node.active = true;
        findView.onShown();
        this.currentView = findView;
        return findView;
    }

    show<T extends View>(classConstructor: new (...args: any[]) => T): T {
        let findView = this.getView(classConstructor);
        if (!findView) {
            throw new Error("view not found");
        }

        for (const v of this.views) {
            if (findView === v) {
                if (!v.node.active) {
                    v.node.active = true;
                    v.onShown();
                    this.currentView = v;
                }
            } else {
                if (v.node.active) {
                    v.node.active = false;
                    v.onHidden();
                }
            }
        }
        
        if (this.blackMask)
            this.blackMask.active = true;
        return findView;
    }

    getView<T extends View>(classConstructor: new (...args: any[]) => T): T {
        let findView: T;
        for (const v of this.views) {
            const comp = v.getComponent(classConstructor);
            if (comp) {
                findView = comp;
                break;
            }
        }
        return findView;
    }

    hideAll() {
        for (const v of this.views) {
            if (v.node.active) {
                v.node.active = false;
                v.onHidden();
            } else {
                v.node.active = false;
            }
        }
        this.currentView = null;

        if (this.blackMask)
            this.blackMask.active = false;
    }
}
