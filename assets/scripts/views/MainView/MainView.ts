import { _decorator, assetManager, instantiate, Label, loader, Node, Sprite, SpriteFrame } from 'cc';
import { api, setJwtToken } from '../../api/api';
import { View } from '../../components/view/View';
import { ViewMgr } from '../../components/view/ViewMgr';
import { FeedGooseView } from '../FeedGooseView';
import { HatchEggView } from '../HatchEggView';
import { ShopView } from '../ShopView';
import { user } from '../../domain/user';
import { AccountComp } from './AccountComp';
import { GooseComp } from './GooseComp';
import { EggComp } from './EggComp';

const { ccclass, property } = _decorator;

@ccclass('MainView')
export class MainView extends View {
    @property([Node]) tabs: Node[] = [];
    @property([Node]) tabPanels: Node[] = [];
    @property(Node) selectedTabBg: Node = null;
    @property(Sprite) goldIcon: Sprite = null;
    @property(Label) goldNumber: Label = null;
    @property([Node]) bottomBtns: Node[] = [];
    @property(SpriteFrame) bottomBtnSelected: SpriteFrame = null;
    @property(SpriteFrame) bottomBtnUnselected: SpriteFrame = null;
    @property(Node) accountPanel: Node = null;
    @property(Node) gooseContainer: Node = null;
    @property(Node) gooseTemplate: Node = null;
    @property(Node) eggContainer: Node = null;
    @property(Node) eggTemplate: Node = null;


    start() {
        let login = async () => {
            let ret = await api.login({ wallet_address: "0x94119d39ae7021e1951c15796b2bf64fcd1a6825", signature: "123456" });
            if (ret.code !== 0) {
                console.log("login failed: " + ret.message);
                return;
            }


            user.loginResult = ret.data;
            setJwtToken(user.loginResult.jwt);

            let ret2 = await api.getTokenInfo({});
            user.tokenInfos = ret2.data;
            let ret3 = await api.getBalance({});
            user.balance = ret3.data;
            let ret4 = await api.getNftMeta({ collection: "egg" });
            user.ntfMetas = ret4.data;
            let ret5 = await api.getNftMeta({ collection: "goose" });
            user.ntfMetas = user.ntfMetas.concat(ret5.data);
            let ret6 = await api.getNftList();
            user.ntfs = ret6.data;
            let ret7 = await api.getPropsMeta({});
            user.propsMetas = ret7.data;
            let ret8 = await api.getPropsList();
            user.props = ret8.data;

            console.log(user);

            this.refreshView();
        };

        login();
    }

    update(deltaTime: number) {

    }

    refreshView() {
        // let goldTokenInfo = user.tokenInfos.find(t => t.token === "usdt")
        // if (!goldTokenInfo) {
        //     return;
        // }

        // assetManager.loadRemote<SpriteFrame>(goldTokenInfo.image, {}, (err, spriteFrame) => {
        //     this.goldIcon.spriteFrame = spriteFrame;
        // })
        // this.goldIcon.spriteFrame = user.tokenInfos[0].image;
        this.goldNumber.string = user.balance["gold"]

        // refresh account panel
        let accountComp = this.accountPanel.getComponent(AccountComp);
        accountComp.accountNameLable.string = user.loginResult.identifier;
        accountComp.uidLable.string = `UID: ${user.loginResult.user_id.toString()}`;
        accountComp.goldNumberLabel.string = user.balance["gold"];
        accountComp.usdtNumberLabel.string = user.balance["usdt"];
        accountComp.walletAddrLabel.string = user.loginResult.wallet_address;

        // refresh goose panel
        let gooseMetas = user.ntfMetas.filter((n) => n.collection === "goose")
        for (const g of gooseMetas) {
            let newGooseNode = instantiate(this.gooseTemplate)
            newGooseNode.active = true
            newGooseNode.parent = this.gooseContainer;
            let gooseComp = newGooseNode.getComponent(GooseComp)
            let gooses = user.ntfs.gooses.filter((n) => n.level === g.level)
            if (gooses.length !== 0) {
                gooseComp.numberLabel.node.active = true;
                gooseComp.numberLabel.string = `× ${gooses.length}`
            } else {
                gooseComp.numberLabel.node.active = false;
            }
            // gooseComp.image.spriteFrame
        }

        // refresh eggs panel
        let eggMetas = user.ntfMetas.filter((n) => n.collection === "egg")
        for (const g of eggMetas) {
            let neweggNode = instantiate(this.eggTemplate)
            neweggNode.active = true
            neweggNode.parent = this.eggContainer;
            let eggComp = neweggNode.getComponent(EggComp)
            let eggs = user.ntfs.eggs.filter((n) => n.level === g.level)
            if (eggs.length !== 0) {
                eggComp.numberLabel.node.active = true;
                eggComp.numberLabel.string = `× ${eggs.length}`
            } else {
                eggComp.numberLabel.node.active = false;
            }
        }

    }

    changeTab(event: Event, customEventData: string) {
        for (const t of this.tabPanels) {
            t.active = false;
        }

        if (customEventData === "0") {
            this.tabPanels[0].active = true;
            this.selectedTabBg.position = this.tabs[0].position;
        } else if (customEventData === "1") {
            this.tabPanels[1].active = true;
            this.selectedTabBg.position = this.tabs[1].position;
        }
    }

    onBottomBtnClicked(event: Event, customEventData: string) {
        for (const btnNode of this.bottomBtns) {
            btnNode.getComponent(Sprite).spriteFrame = this.bottomBtnUnselected;
        }

        if (customEventData === "0") {
            this.bottomBtns[0].getComponent(Sprite).spriteFrame = this.bottomBtnSelected;
            ViewMgr.instance.show(ShopView);
        } else if (customEventData === "1") {
            this.bottomBtns[1].getComponent(Sprite).spriteFrame = this.bottomBtnSelected;
            ViewMgr.instance.show(HatchEggView);
        } else if (customEventData === "2") {
            this.bottomBtns[2].getComponent(Sprite).spriteFrame = this.bottomBtnSelected;
            ViewMgr.instance.show(FeedGooseView);
        }
    }

    onAccountBtnClicked(event: Event, customEventData: string) {
        this.accountPanel.active = !this.accountPanel.active
    }
}


