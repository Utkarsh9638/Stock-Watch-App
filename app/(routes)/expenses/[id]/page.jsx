"use client"
import { db } from '../../../../utils/dbConfig';
import { Budgets, Expenses } from '../../../../utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../../expenses/_components/AddExpense';
import ExpenseListTable from '../_components/ExpenseListTable';
import { Button } from '../../../../components/ui/button';
import { ArrowLeft, Pen, PenBox, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditBudget from '../_components/EditBudget';
import { Icons } from '../../../../components/Icons';

function ExpensesScreen({params}) {
    const {user}=useUser();
    const [budgetInfo,setbudgetInfo]=useState();
    const [expensesList,setExpensesList]=useState([]);
    const route=useRouter();
    useEffect(()=>{
        
        user&&getBudgetInfo();
       
    },[user]);

    /**
     * Get Budget Information
     */
    const getBudgetInfo=async()=>{
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql `count(${Expenses.id})`.mapWith(Number)
          }).from(Budgets)
          .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
          .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
          .where(eq(Budgets.id,params.id))
          .groupBy(Budgets.id)

          setbudgetInfo(result[0]);
          getExpensesList();
    }

    /**
     * Get Latest Expenses
     */
    const getExpensesList=async()=>{
      const result=await db.select().from(Expenses)
      .where(eq(Expenses.budgetId,params.id))
      .orderBy(desc(Expenses.id));
      setExpensesList(result);
      console.log(result)
    }

    /**
     * Used to Delete budget
     */
    const deleteBudget=async()=>{

      const deleteExpenseResult=await db.delete(Expenses)
      .where(eq(Expenses.budgetId,params.id))
      .returning()

      if(deleteExpenseResult)
      {
        const result=await db.delete(Budgets)
        .where(eq(Budgets.id,params.id))
        .returning();
      }
      toast('Stock Deleted !');
      route.replace('/budgets');
  

  
    }
   
  return (
    <div className='p-10'>
        <h2 className='text-2xl font-bold gap-2 flex justify-between items-center border-b pb-6'>
        <Button onClick={()=>route.back()} variant="ghost" className='flex gap-2 items-center text-lg'> 
        <Icons.arrow_left className='cursor-pointer size-5'/>
          My Share
          </Button> 
        <div className='flex gap-3 items-center'>
         <EditBudget budgetInfo={budgetInfo}
         refreshData={()=>getBudgetInfo()}  />
        
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2.5 text-red-500 border-red-500 hover:text-red-500 hover:bg-red-50" variant="outline"> 
            <Icons.delete className="size-5 text-red-500" /> Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your current stock along with shares
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>deleteBudget()}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          </div>

       </h2>
        <div className='grid grid-cols-1 
        md:grid-cols-2 mt-12 gap-8'>
           {budgetInfo? <BudgetItem
            budget={budgetInfo}
            />:
            <div className='h-[150px] w-full bg-slate-200 
            rounded-lg animate-pulse'>
            </div>}
            <AddExpense budgetId={params.id}
            user={user}
            refreshData={()=>getBudgetInfo()}
            />
        </div>
        <div className='mt-4'>
        
          <ExpenseListTable expensesList={expensesList}
          refreshData={()=>getBudgetInfo()} budgetInfo={budgetInfo} />
        </div>
    </div>
  )
}

export default ExpensesScreen