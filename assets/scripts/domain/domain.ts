import { api } from "../api/api";
import { User } from "./user";

export let user: User = null;

export async function login() {
    let ret = await api.login({ wallet_address: "0x94119d39ae7021e1951c15796b2bf64fcd1a6825", signature: "123456" });
    user = ret.data;
}

export async function setSpendingPassword() {
    let ret = await api.createPassword({ data: "" });
}