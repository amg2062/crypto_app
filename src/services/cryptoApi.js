import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders={
    'X-RapidAPI-Key': '24e4cea5d3mshd7fd0c208289ee7p1f00cfjsn9ade499adae2',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl= 'https://coinranking1.p.rapidapi.com/';

const createRequest=(url)=>({url,headers:cryptoApiHeaders})

export const cryptoApi=createApi(
    {
        reducePath:'cryptoApi',
        baseQuery:fetchBaseQuery({baseUrl}),
        endpoints:(builder)=>({
            getCryptos:builder.query({
                query:(count)=>createRequest(`/coins?limit=${count}`),
            }),
            getCryptoDetails:builder.query({
                query:(coinId)=>createRequest(`/coins/${coinId}`),
            })
        })
    }   
);

export const{ useGetCryptosQuery,useGetCryptoDetailsQuery }=cryptoApi;

