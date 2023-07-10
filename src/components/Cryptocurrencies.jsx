import React,{useState,useEffect} from 'react'
import millify from 'millify';
import {Link} from 'react-router-dom'
import {Card, Col,Row, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';


const Cryptocurrencies = ({simplified}) => {

  const count=simplified? 10: 100;
  const{data: cryptosList,isFetching}=useGetCryptosQuery(count);
  const[cryptos,setCryptos]=useState([]);
  const[searchTerm,setSearchTerm]=useState('');

  useEffect(()=>{
  

    const filterData=cryptosList?.data?.coins.filter((coins)=> coins.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filterData);
  },[cryptosList,searchTerm])
  
  
  if(isFetching) return 'Loading..';
  return (
    
    <>
      {!simplified &&(
        <div className='search-crypto'>
          <Input placeholder='Search Crypto' onChange={(e)=> setSearchTerm(e.target.value)}/>
        </div>
      )}
     
      <Row gutter={[32,32]} className='crypto-card-container'>
        {cryptos?.map((currency)=>(
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.rank}>
            <Link  to={`/crypto/${currency.rank}`}>
              <Card
              title={`${currency.rank}. ${currency.name}`}
              extra={<img className='crypto-image' src={currency.iconUrl}/>}
              hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies