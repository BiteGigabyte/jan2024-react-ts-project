import axios from "axios";

import {baseURL} from "../constants/urls";

const apiService = axios.create({baseURL});

apiService.interceptors.request.use(req => {
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTJmMDc1NDRmNDc1YzMyN2M2NTBlNTU2MWVmZDZmMyIsInN1YiI6IjY2NzA0OGMxNGNmYzM0NWE2N2E2NTdiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y0thpRdZbh0PmdokCbCjM_utr5P6VC-E9WljflzNmOQ';

    if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`
    }

    return req
})

export {
    apiService
}