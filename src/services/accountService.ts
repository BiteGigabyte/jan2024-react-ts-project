import {IRes} from "../types/resType";
import {IAccount} from "../interfaces/account.interface";
import {apiService} from "./api.service";
import {urls} from "../constants/urls";

const accountService = {
    accountInfo: ():IRes<IAccount> => {
        return apiService.get(urls.account.base);
}
}

export {
    accountService
}