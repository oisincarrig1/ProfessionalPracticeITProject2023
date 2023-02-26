import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresInToken] = useState()


    useEffect(() => {
        axios.post('http://localhost:3001/login', {
            code,
        })
            .then(res => {
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
                setExpiresInToken(res.data.expiresIn)
            
                window.history.pushState({}, null, '/')
            })
            //.catch(() => {
               // window.location = '/'
           // })
    }, [code])

    useEffect(() => {
        if(!refreshToken || !expiresIn) return

        axios.post('http://localhost:3001/refresh', {
            refreshToken,
        })
            .then(res => {
                setAccessToken(res.data.accessToken)
                setExpiresInToken(res.data.expiresIn)
            })
            .catch(() => {
               window.location = '/'
           })

    },[refreshToken, expiresIn])

    return accessToken


}