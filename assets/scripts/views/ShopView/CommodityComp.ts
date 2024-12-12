import { _decorator, Component, Label, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CommodityComp')
export class CommodityComp extends Component {
    @property(Label) priceLabel: Label = null;
    @property(Sprite) priceUnit: Sprite = null;
    @property(Sprite) icon: Sprite = null;

    id: number;

    onBuyBtnClickedCb: () => void;

    start() {

    }

    update(deltaTime: number) {

    }

    onBuyBtnClicked() {
        if (this.onBuyBtnClickedCb)
            this.onBuyBtnClickedCb();
    }

}


