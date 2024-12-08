import { HttpClient } from "../http-client/http-client";
import { tokenMgr } from "./jwt_token";

let client = new HttpClient();
client.baseUrl = "https://api.goose.farm/v2"

interface IResult<T> {
    code: number;
    message: string;
    success: boolean;
    traceId: string;
    data: T;
}

interface ILoginResult {
    identifier: string;
    jwt: string;
    user_id: number;
    wallet_address: string;
}

interface ITokenInfo {
    token: string;
    decimal: number;
    image: string;
}

interface ISwapSpendingResult {
    base_code: string;
    base_amount: number;
    quote_code: string;
    quote_amount: number;
}

interface INftMeta {
    id: number;
    collection: string;
    level: number;
    image: string;
    price_amount: number;
    price_token: number;
}

interface INft {
    collection: number;
    nft_id: string;
    image: number;
    level: string;
    status: string;
}

interface IPropsMeta {
    id: number;
    name: string;
    image: string;
    gold_price: string;
}

interface IProps {
    props_id: number;
    props_name: string;
    image: string;
    amount: number;
}

export const api = {
    async login(params: { wallet_address: string; signature: string }) {
        return client.post<IResult<ILoginResult>>("login/eoa", { body: params })
    },
    async createPassword(params: { data: string }) {
        return client.post<IResult<string>>("spending/password/create", { body: params })
    },
    async getTokenInfo(params: { token: string }) {
        return client.get<IResult<ITokenInfo[]>>("token/info", { queryMap: params })
    },
    async getBalance(params: { token: string }) {
        return client.get<IResult<{ [k: string]: string }>>("spending/balance", { queryMap: params })
    },
    async swapSpending(params: { base_code: string; quote_code: string; quote_amount: number }) {
        return client.post<IResult<ISwapSpendingResult>>("spending/balance", { body: params })
    },
    async getNftMeta(params: { collection: string; level: string }) {
        return client.get<IResult<INftMeta[]>>("nft/meta", { queryMap: params })
    },
    async getNftList() {
        return client.get<IResult<INft[]>>("spending/nft/list", {})
    },
    async mintEgg(params: { source: string; amount: number; signature: string }) {
        return client.post<IResult<INft[]>>("egg/mint", { body: params })
    },
    async incubateEgg(params: { nft_ids: number[] }) {
        return client.post<IResult<INft[]>>("egg/incubate", { body: params })
    },
    async getPropsMeta(params: { props_id: string }) {
        return client.get<IResult<IPropsMeta[]>>("props/meta", { queryMap: params })
    },
    async getPropsList(params: { props_id: string }) {
        return client.get<IResult<IProps[]>>("spending/props", { queryMap: params })
    },
    async consumeProps(params: { nft_id: number; props_id: number; amount: number }) {
        return client.post<IResult<string>>("props/consume", { body: params })
    }
};
