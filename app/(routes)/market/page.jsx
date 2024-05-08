import React from "react";
import MarketTableList from "./_components/MarketTableList";
import TradingViewWidget from "./_components/TradingViewWidget";

const MarketPage = () => {
  return (
    <div className="mt-12">
      <div className="flex flex-col space-y-4 pb-6">
        <h1 className="text-3xl font-medium">All Stocks</h1>
        <p className="text-sm font-normal text-muted-foreground antialiased">
          Stocks are fungible financial instruments, representing ownership in a
          company.
        </p>
        <hr />
      </div>
      <MarketTableList />
      <div className="py-16">
      <TradingViewWidget/>
      </div>
    </div>
  );
};

export default MarketPage;
