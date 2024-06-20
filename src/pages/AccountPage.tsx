import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {accountActions} from "../redux/slices/accountSlice";

const AccountPage = () => {

    let {account} = useAppSelector(state => state.account);

    let dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(accountActions.getAccountDetails)
    }, []);


    return (
        <div>
            {account && (
                <div>
                    <p>id: {account.id}</p>
                    <p>user name: {account.username}</p>
                </div>
            )}
        </div>
    );

};

export {AccountPage};