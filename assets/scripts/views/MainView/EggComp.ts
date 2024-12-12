import { _decorator, Component, Label, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EggComp')
export class EggComp extends Component {
    @property(Label) numberLabel: Label = null;
    @property(Sprite) image: Sprite = null;
    
    start() {

    }

    update(deltaTime: number) {
        
    }
}


