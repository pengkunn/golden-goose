import { add, FixedNumber, fx } from "./fixed";

export class FixedRect {
    /**
     * @en The minimum x value.
     * @zh 矩形最小点的 x 坐标。
     */
    x: FixedNumber;
    /**
     * @en The minimum y value.
     * @zh 矩形最小点的 y 坐标。
     */
    y: FixedNumber;
    /**
     * @en The width of the Rect.
     * @zh 矩形的宽度。
     */
    width: FixedNumber;
    /**
     * @en The height of the Rect.
     * @zh 矩形的高度。
     */
    height: FixedNumber;

    get xMin() {
        return this.x;
    }
    get xMax() {
        return add(this.x, this.width);
    }
    get yMin() {
        return this.y;
    }
    get yMax() {
        return add(this.y, this.height);
    }

    constructor(x: number, y: number, width: number, height: number) {
        this.x = fx(x);
        this.y = fx(y);
        this.width = fx(width);
        this.height = fx(height);
    }

    intersects(b: FixedRect) {
        const a = this;
        return !(a.xMax < b.xMin || b.xMax < a.xMin || a.yMax < b.yMin || b.yMax < a.yMin);
    }
}
