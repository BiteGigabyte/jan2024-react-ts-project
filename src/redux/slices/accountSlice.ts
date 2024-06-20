import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IPagination} from "../../interfaces/paginationInterface";
import {IMovie} from "../../interfaces/movies.interface";
import {movieService} from "../../services/movieService";
import {IGenres} from "../../interfaces/genres.interface";
import {IAccount} from "../../interfaces/account.interface";
import {accountService} from "../../services/accountService";

interface IState {
    account: IAccount | null;
    error: string | null;
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
            .addCase(getAccountDetails.rejected, (state, action) => {
                // state.error = 'erroro';
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