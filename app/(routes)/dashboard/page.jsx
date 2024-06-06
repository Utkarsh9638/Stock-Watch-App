"use client"
import React, { useEffect, useState } from 'react'
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from './_components/CardInfo';
import { db } from '../../../utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '../../../utils/schema';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from '../budgets/_components/BudgetItem';
import ExpenseListTable from '../expenses/_components/ExpenseListTable';
function Dashboard() {
  const {user}=useUser();

  const [budgetList,setBudgetList]=useState([]);
  const [expensesList,setExpensesList]=useState([]);
  useEffect(()=>{
    user&&getBudgetList();
  },[user])
  /**
   * used to get budget List
   */
  const getBudgetList=async()=>{
    const result=await db.select({
      ...getTableColumns(Budgets),
      
      totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id))
    ;

    setBudgetList(result);
    getAllExpenses();

  }

  /**
   * Used to get All expenses belong to users
   */
  const getAllExpenses=async()=>{
    const result=await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      createdAt:Expenses.createdAt
    }).from(Budgets)
    .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(Expenses.id));
    setExpensesList(result);
   
  }

  return (
    <div className="mt-12">
       <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-medium">
          Hello, {user?.fullName}  👋
        </h1>
        <p className="text-sm font-normal text-muted-foreground antialiased">
          Here's what happenning with your stocks, Lets Manage your shares.
        </p>
        <hr />
      </div>
<div className='pt-6'>

      <CardInfo budgetList={budgetList} />
</div>

<div className='grid grid-cols-1 md:grid-cols-3 pt-12 gap-6'>
  <div className='lg:col-span-2'>
    <BarChartDashboard
         budgetList={budgetList}
   />

<div className='pt-8 pb-12'>

   <ExpenseListTable
          expensesList={expensesList}
          refreshData={()=>getBudgetList()}
          />
</div>
  </div>
  <div>
    <h2 className='font-semibold text-2xl pb-4'>Latest Stocks</h2>
              {budgetList?.length>0?budgetList.map((budget,index)=>(
                <div className='my-4'>
                  <BudgetItem budget={budget} key={index} />
                </div>
              ))
            : null
            }
  </div>
</div>



        {/* <h2 className='font-bold text-4xl'>Hi, {user?.fullName} ✌️</h2> 
        <p className='text-gray-500'>Here's what happenning with your money, Lets Manage your expense</p>

        <CardInfo budgetList={budgetList} />
        <div className='grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5'>
          <div className='lg:col-span-2'>
            <BarChartDashboard
              budgetList={budgetList}
            />
          
          <ExpenseListTable
          expensesList={expensesList}
          refreshData={()=>getBudgetList()}
          />

          </div>
          <div className='grid gap-5'>
            <h2 className='font-bold text-lg'>Latest Budgets</h2>
              {budgetList?.length>0?budgetList.map((budget,index)=>(
                <BudgetItem budget={budget} key={index} />
              ))
            :
              [1,2,3,4].map((item,index)=>(
                <div className='h-[180xp] w-full
                 bg-slate-200 rounded-lg animate-pulse'>
                </div>
              ))
              
            }
          </div>
        </div> */}
    </div>
  )
}

export default Dashboard