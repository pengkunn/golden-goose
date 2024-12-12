import { _decorator, Component, Label, Node } from 'cc';
import { Popup } from '../components/popup/Popup';
import { PopupMgr } from '../components/popup/PopupMgr';
import { user } from '../domain/user';
const { ccclass, property } = _decorator;

@ccclass('PaymentPopup')
export class PaymentPopup extends Popup {
    @property(Label) usdtNumber: Label = null;
    @property(Label) priceNumber: Label = null;
    @property(Node) ConfirmTextNode: Node = null;
    @property(Node) AddFundTextNode: Node = null;
    @property(Node) AddFundDescription1Node: Node = null;
    @property(Node) AddFundDescription2Node: Node = null;

    start() {

    }

    update(deltaTime: number) {

    }

    refresh(commodityId: number) {
        this.usdtNumber.string = user.balance["usdt"].toString();

        let commodity = user.ntfMetas.find(n => n.id === commodityId);
        if (!commodity)
            return;

        if (Number(user.balance["usdt"]) >= commodity.price_amount) {
            this.ConfirmTextNode.active = true;
            this.AddFundTextNode.active = false;
            this.AddFundDescription1Node.active = false;
            this.AddFundDescription2Node.active = false;
        } else {
            this.ConfirmTextNode.active = false;
            this.AddFundTextNode.active = true;
            this.AddFundDescription1Node.active = true;
            this.AddFundDescription2Node.active = true;
        }

    }

    onCloseBtnClicked() {
        this.node.active = false;
    }
}


