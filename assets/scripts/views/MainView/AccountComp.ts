import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AccountComp')
export class AccountComp extends Component {
    @property(Label) accountNameLable: Label = null;
    @property(Label) uidLable: Label = null;
    @property(Node) selectedTab: Node = null;
    @property([Node]) tabs: Node[] = [];
    @property([Node]) tabPanels: Node[] = [];
    @property(Label) goldNumberLabel: Label = null;
    @property(Label) usdtNumberLabel: Label = null;
    @property(Label) walletAddrLabel: Label = null;


    start() {

    }

    update(deltaTime: number) {

    }

    onTabClicked(event: Event, customEventData: string) {
        for (const t of this.tabPanels) {
            t.active = false;
        }

        if (customEventData === "0") {
            this.tabPanels[0].active = true;
            this.selectedTab.position = this.tabs[0].position;
        } else if (customEventData === "1") {
            this.tabPanels[1].active = true;
            this.selectedTab.position = this.tabs[1].position;
        }
    }
}


