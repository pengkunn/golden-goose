import { ILoginResult, INft, INftMeta, IProps, IPropsMeta, ITokenInfo } from "../api/api";

export class User {
    loginResult: ILoginResult;
    tokenInfos: ITokenInfo[];
    ntfMetas: INftMeta[];
    propsMetas: IPropsMeta[];

    balance: { [key: string]: string }
    ntfs: { eggs: INft[], gooses: INft[] };
    props: IProps[];
}

export let user = new User();