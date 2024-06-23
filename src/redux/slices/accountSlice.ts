import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {IAccount} from "../../interfaces/account.interface";
import {accountService} from "../../services/accountService";

interface IState {
    account: IAccount | null;
    error: boolean | null;
}

let initialState:IState = {
    account: null,
    error: null
};

const getAccountDetails= createAsyncThunk<IAccount, void>  (
    'accountSlice/getAccountDetails',
    async (p_, {rejectWithValue}) => {
        try {
            let {data} = await accountService.accountInfo();
            return data;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
)


let accountSlice = createSlice({
    name: 'accountSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAccountDetails.fulfilled, (state, action) => {
                if (action.payload) {
                    state.account = action.payload;
                }
            })
            .addCase(getAccountDetails.rejected, (state) => {
                state.error = true;
            })

});

const {reducer: accountReducer, actions} = accountSlice;

const accountActions = {
    ...actions,
    getAccountDetails
}

export {
    accountActions,
    accountReducer
}