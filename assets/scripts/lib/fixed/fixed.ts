/**
 * 简易定点数库，使用统一的精度
 */

// 缩放的比例
const ratio = 1000;
// 保留小数的位数
const decimals = 3;

export type FixedNumber = number;

class FixedChain {
    private value: FixedNumber = 0;
    float() {
        return Fixed.float(this.value);
    }
    fx() {
        return this.value;
    }
    setFx(value: FixedNumber) {
        this.value = value;
        return this;
    }
    add(b: FixedNumber) {
        this.value = Fixed.add(this.value, b);
        return this;
    }
    sub(b: FixedNumber) {
        this.value = Fixed.sub(this.value, b);
        return this;
    }
    mul(b: FixedNumber) {
        this.value = Fixed.mul(this.value, b);
        return this;
    }
    div(b: FixedNumber) {
        this.value = Fixed.div(this.value, b);
        return this;
    }
    rem(b: FixedNumber) {
        this.value = Fixed.rem(this.value, b);
        return this;
    }
    pow(b: FixedNumber) {
        this.value = Fixed.pow(this.value, b);
        return this;
    }
    sqrt() {
        this.value = Fixed.sqrt(this.value);
        return this;
    }
    floor() {
        this.value = Fixed.floor(this.value);
        return this;
    }
    ceil() {
        this.value = Fixed.ceil(this.value);
        return this;
    }

    round() {
        this.value = Fixed.round(this.value);
        return this;
    }
    sin() {
        this.value = Fixed.sin(this.value);
        return this;
    }
    cos() {
        this.value = Fixed.cos(this.value);
        return this;
    }
    tan() {
        this.value = Fixed.tan(this.value);
        return this;
    }
    asin() {
        this.value = Fixed.asin(this.value);
        return this;
    }
    acos() {
        this.value = Fixed.acos(this.value);
        return this;
    }
    atan() {
        this.value = Fixed.atan(this.value);
        return this;
    }
}

const fixedChain = new FixedChain();
export function chain(fixed: FixedNumber) {
    return fixedChain.setFx(fixed);
}

export const Fixed = {
    float(fixed: FixedNumber): number {
        return fixed / ratio;
    },
    fx(float: number): FixedNumber {
        return Math.floor(float * ratio);
    },
    add(a: FixedNumber, b: FixedNumber): FixedNumber {
        return a + b;
    },
    sub(a: FixedNumber, b: FixedNumber): FixedNumber {
        return a - b;
    },
    mul(a: FixedNumber, b: FixedNumber): FixedNumber {
        return Math.floor((a * b) / ratio);
    },
    div(a: FixedNumber, b: FixedNumber): FixedNumber {
        return Math.floor((a * ratio) / b);
    },
    rem(a: FixedNumber, b: FixedNumber): FixedNumber {
        return a % b;
    },
    pow(a: FixedNumber, b: FixedNumber): FixedNumber {
        return Math.floor(Math.pow(a / ratio, b / ratio) * ratio);
    },
    sqrt(a: FixedNumber): FixedNumber {
        return Math.floor(Math.sqrt(a / ratio) * ratio);
    },
    floor(a: FixedNumber): FixedNumber {
        return Math.floor(a / ratio) * ratio;
    },
    ceil(a: FixedNumber): FixedNumber {
        return Math.ceil(a / ratio) * ratio;
    },
    round(a: FixedNumber): FixedNumber {
        return Math.round(a / ratio) * ratio;
    },
    sin(a: FixedNumber): FixedNumber {
        return Math.floor(Math.sin(a / ratio) * ratio);
    },
    cos(a: FixedNumber): FixedNumber {
        return Math.floor(Math.cos(a / ratio) * ratio);
    },
    tan(a: FixedNumber): FixedNumber {
        return Math.floor(Math.tan(a / ratio) * ratio);
    },
    atan(a: FixedNumber): FixedNumber {
        return Math.floor(Math.atan(a / ratio) * ratio);
    },
    acos(a: FixedNumber): FixedNumber {
        return Math.floor(Math.acos(a / ratio) * ratio);
    },
    asin(a: FixedNumber): FixedNumber {
        return Math.floor(Math.asin(a / ratio) * ratio);
    },
};

export const float = Fixed.float;
export const fx = Fixed.fx;
export const add = Fixed.add;
export const sub = Fixed.sub;
export const mul = Fixed.mul;
export const div = Fixed.div;
export const rem = Fixed.rem;
export const pow = Fixed.pow;
export const sqrt = Fixed.sqrt;
export const floor = Fixed.floor;
export const ceil = Fixed.ceil;
export const round = Fixed.round;
export const sin = Fixed.sin;
export const cos = Fixed.cos;
export const tan = Fixed.tan;
export const atan = Fixed.atan;
export const acos = Fixed.acos;
export const asin = Fixed.asin;
