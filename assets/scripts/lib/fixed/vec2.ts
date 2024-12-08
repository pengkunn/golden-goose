import {
    acos,
    add,
    chain,
    cos,
    div,
    FixedNumber,
    fx,
    mul,
    pow,
    sin,
    sqrt,
    sub,
} from "./fixed";

export class FixedVec2 {
    static squaredDistance(a: FixedVec2, b: FixedVec2) {
        const dx = sub(a.x, b.x);
        const dy = sub(a.y, b.y);

        return add(pow(dx, fx(2)), pow(dy, fx(2)));
    }

    x: FixedNumber;
    y: FixedNumber;

    constructor(x: number, y: number) {
        this.x = fx(x);
        this.y = fx(y);
    }

    clone() {
        const f = new FixedVec2(0, 0);
        f.x = this.x;
        f.y = this.y;
        return f;
    }

    set(a: FixedVec2) {
        this.x = a.x;
        this.y = a.y;
    }

    setFloat(x: number, y: number) {
        this.x = fx(x);
        this.y = fx(y);
    }

    normalize() {
        const length = this.length();
        if (length === 0) {
            this.x = this.y = 0;
        } else {
            this.x = div(this.x, length);
            this.y = div(this.y, length);
        }

        return this;
    }

    multiplyScalar(scalar: FixedNumber) {
        this.x = mul(this.x, scalar);
        this.y = mul(this.y, scalar);
        return this;
    }

    add(other: FixedVec2): this {
        this.x = add(this.x, other.x);
        this.y = add(this.y, other.y);
        return this;
    }

    subtract(other: FixedVec2) {
        this.x = sub(this.x, other.x);
        this.y = sub(this.y, other.y);
        return this;
    }

    length() {
        return sqrt(this.lengthSqr());
    }

    lengthSqr() {
        return add(pow(this.x, fx(2)), pow(this.y, fx(2)));
    }

    /**
     * @en Calculates radian angle between two vectors
     * @zh 获取当前向量和指定向量之间的角度。
     * @param other specified vector
     * @return The angle between the current vector and the specified vector (in radians); if there are zero vectors in the current vector and the specified vector, 0 is returned.
     */
    angle(other: FixedVec2) {
        const magSqr1 = this.lengthSqr();
        const magSqr2 = other.lengthSqr();
        if (magSqr1 === 0 || magSqr2 === 0) {
            return fx(0);
        }
        const dot = chain(this.x).mul(other.x).add(mul(this.y, other.y)).fx();
        const r = div(dot, sqrt(mul(magSqr1, magSqr2)));
        return acos(r);
    }
    /**
     * @en Get angle in radian between this and vector with direction.
     * @zh 获取当前向量和指定向量之间的有符号角度。<br/>
     * 有符号角度的取值范围为 (-180, 180]，当前向量可以通过逆时针旋转有符号角度与指定向量同向。<br/>
     * @param other specified vector
     * @return The signed angle between the current vector and the specified vector (in radians); if there is a zero vector in the current vector and the specified vector, 0 is returned.
     */
    signAngle(other: FixedVec2) {
        const angle = this.angle(other);
        const crossZ = chain(this.x).mul(other.y).sub(mul(this.y, other.x)).fx();
        if (crossZ < 0) {
            return -angle;
        }
        return angle;
    }
    /**
     * @en Rotates the current vector by an angle in radian value
     * @zh 将当前向量的旋转
     * @param radians radius of rotation
     */
    rotate(radians: FixedNumber) {
        const x = this.x;
        const y = this.y;
        const s = sin(radians);
        const c = cos(radians);

        this.x = add(mul(x, c), mul(y, s));
        this.y = sub(mul(y, c), mul(x, s));
        return this;
    }
}
