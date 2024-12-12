import { _decorator, Component, instantiate, Label, Node } from 'cc';
import { View } from '../../components/view/View';
import { user } from '../../domain/user';
import { CommodityComp } from './CommodityComp';
import { PopupMgr } from '../../components/popup/PopupMgr';
import { PaymentPopup } from '../../popups/PaymentPopup';
const { ccclass, property } = _decorator;

@ccclass('ShopView')
export class ShopView extends View {
    @property(Label) usdtNumber: Label = null;
    @property(Node) commodityContainer: Node = null;
    @property(Node) commodityTemplate: Node = null;

    start() {

    }

    update(deltaTime: number) {

    }

    refresh() {
        this.usdtNumber.string = user.balance["usdt"].toString();

        // refresh commodities
        this.commodityContainer.removeAllChildren();
        this.commodityContainer.addChild(this.commodityTemplate);

        let eggs = user.ntfMetas.filter(n => n.collection === "egg")
        for (const egg of eggs) {
            let newCommodityNode = instantiate(this.commodityTemplate)
            newCommodityNode.active = true
            newCommodityNode.parent = this.commodityContainer;
            let commodityComp = newCommodityNode.getComponent(CommodityComp)
            commodityComp.id = egg.id;
            commodityComp.priceLabel.string = egg.price_amount.toString();
            // commodityComp.priceUnit.spriteFrame
            commodityComp.onBuyBtnClickedCb = () => {
                let popup = PopupMgr.instance.show(PaymentPopup)
                popup.refresh(egg.id);
            }
        }
    }
}


