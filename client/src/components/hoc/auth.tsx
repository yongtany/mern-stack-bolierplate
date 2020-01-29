import React, { useEffect } from 'react';
import { authUser } from '../../redux/modules/user';
import { RootState } from '../../redux/configure';

import { useSelector, useDispatch } from "react-redux";

// export type ReduxDispatch = ThunkDispatch<any, any, Action>;
// export function useReduxDispatch(): ReduxDispatch {
//   return useDispatch<ReduxDispatch>();
// }



export default function (ComposedClass: any, reload: any, adminRoute = null) {
    function AuthenticationCheck(props: any) {

        let user = useSelector((state: RootState) => state.user);
        const dispatch: AppDispatch = useDispatch();

        useEffect(() => {

          dispatch(authUser()).then(async (response: any) => {
            
                if (!response.payload.isAuth) {
                    if (reload) {
                        props.history.push('/login')
                    }
                } else {
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    }
                    else {
                        if (reload === false) {
                            props.history.push('/')
                        }
                    }
                }
            })   
        }, [dispatch, props.history])

        return (
            <ComposedClass {...props} user={user} />
        )
    }
    return AuthenticationCheck
}