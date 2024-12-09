import { _decorator, assetManager, Label, loader, Node, Sprite, SpriteFrame } from 'cc';
import { api, setJwtToken } from '../api/api';
import { View } from '../components/view/View';
import { ViewMgr } from '../components/view/ViewMgr';
import { FeedGooseView } from './FeedGooseView';
import { HatchEggView } from './HatchEggView';
import { ShopView } from './ShopView';
import { user } from '../domain/user';

const { ccclass, property } = _decorator;

@ccclass('MainView')
export class MainView extends View {
    @property([Node]) tabs: Node[] = [];
    @property(Sprite) goldIcon: Sprite = null;
    @property(Label) goldNumber: Label = null;

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
        let goldTokenInfo = user.tokenInfos.find(t => t.token === "usdt")
        if (!goldTokenInfo) {
            return;
        }

        assetManager.loadRemote<SpriteFrame>(goldTokenInfo.image, {}, (err, spriteFrame) => {
            this.goldIcon.spriteFrame = spriteFrame;
        })
        // this.goldIcon.spriteFrame = user.tokenInfos[0].image;
        this.goldNumber.string = user.balance["gold"]
    }

    changeTab(event: Event, customEventData: string) {
        for (const t of this.tabs) {
            t.active = false;
        }

        if (customEventData === "0") {
            this.tabs[0].active = true;
        } else if (customEventData === "1") {
            this.tabs[1].active = true;
        }
    }

    onBottomBtnClicked(event: Event, customEventData: string) {
        if (customEventData === "0") {
            ViewMgr.instance.show(ShopView);
        } else if (customEventData === "1") {
            ViewMgr.instance.show(HatchEggView);
        } else if (customEventData === "2") {
            ViewMgr.instance.show(FeedGooseView);
        }
    }
}


