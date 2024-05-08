import React from "react";
import { fetchStocks } from "../../../action";

const MarketTableList = async () => {
  const data = await fetchStocks()

  return (
    <>
      <div className="grid grid-cols-5 w-full border-b py-6 text-muted-foreground">
        <p className=" font-medium text-sm antialiased ">
          Company
        </p>
        <p className=" font-medium text-sm antialiased">Net Change</p>
        <p className=" font-medium text-sm antialiased ">
          Change %
        </p>
        <p className=" font-medium text-sm antialiased ">
         Last Price
        </p>
         <p className=" font-medium text-sm antialiased ">
          Market Cap
        </p>
      </div>
        {data && data.body.map((item) => (
      <div className="grid grid-cols-5 border-b py-6 hover:bg-accent text-lg font-normal gap-x-6">
     
       <p className="text-sm">{item.name} <sup className="text-xs font-medium text-muted-foreground">{item.symbol}</sup></p>
        <p>{item.netchange}</p>
        <p>{item.pctchange}</p>
        <p>{item.lastsale}</p>
        <p>{item.marketCap}</p>        
        </div>
        ))}
    
     
    </>
  );
};

export default MarketTableList;
