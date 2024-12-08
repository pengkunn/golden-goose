import { api } from "./api";
export let secretKey3 = "nRLzPe-L"
class JwtTokenMgr {
    private token: string;
    private tokenExpireAt: Date;
    async getToken() {
        // let expireAtBeforeMinute = new Date(this.tokenExpireAt.getTime() - 1000 * 60);
        // if (new Date() >= expireAtBeforeMinute) {
        //     const ret = await api.game.refreshToken(this.token);
        //     this.setToken(ret.data.access_token, new Date(ret.data.expire_at));
        // }
        return this.token;
    }
    setToken(t: string, expireAt: Date) {
        this.token = t;
        this.tokenExpireAt = expireAt;
    }
    checkToken() {
        return this.token !== "" && new Date() < this.tokenExpireAt;
    }
}

export const tokenMgr = new JwtTokenMgr();