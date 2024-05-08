import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Icons } from '../../../../components/Icons';

function CardInfo({budgetList}) {

    const [totalBudget,setTotalBudget]=useState(0);
    const [totalSpend,setTotalSpend]=useState(0);
   
    useEffect(()=>{
        budgetList&&CalculateCardInfo();
    },[budgetList])
    const CalculateCardInfo=()=>{
        console.log(budgetList);
        let totalBudget_=0;
        let totalSpend_=0;

        budgetList.forEach(element => {
                totalBudget_=totalBudget_+Number(element.amount)
                totalSpend_=totalSpend_+element.totalSpend
            });

            setTotalBudget(totalBudget_);
            setTotalSpend(totalSpend_);
        console.log(totalBudget_,totalSpend_)
    }
  return (
    <div>
      
   {budgetList?.length>0?  
   <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'> 
       <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
                <h2 className='text-sm font-normal pb-1.5'>Total Shares</h2>
                <h2 className='font-semibold text-2xl'>{totalBudget}</h2>
            </div>
            <Icons.piggy 
            className='bg-green-100 p-3 h-14 w-14 rounded-full text-green-500'/>
        </div>
        <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
                <h2 className='text-sm font-normal pb-1.5'>Selling Shares</h2>
                <h2 className='font-semibold text-2xl'>{totalSpend}</h2>
            </div>
            <Icons.invoice
            className='bg-red-100 p-3 h-14 w-14 rounded-full text-red-500'/>
        </div>
        <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
                <h2 className='text-sm font-normal pb-1.5'>No. of Stocks</h2>
                <h2 className='font-semibold text-2xl'>{budgetList?.length}</h2>
            </div>
            <Icons.wallet 
            className='bg-blue-100 p-3 h-14 w-14 rounded-full text-blue-500'/>
        </div>
        </div>
    :
    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
       { [1,2,3].map((item,index)=>(
            <div className='h-[110px] w-full bg-slate-200 animate-pulse rounded-lg'>
                
            </div>
    ))}
    </div>
    }
  
    </div>
  )
}

export default CardInfo