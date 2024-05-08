"use client"
import React, { useEffect } from 'react'
import SideNav from './dashboard/_components/SideNav'
import DashboardHeader from './dashboard/_components/DashboardHeader'
import { db } from '../../utils/dbConfig'
import { Budgets } from '../../utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'

function DashboardLayout({children}) {

  const {user}=useUser();
  const router=useRouter();
  useEffect(()=>{
    user&&checkUserBudgets();
  },[user])
  
  const checkUserBudgets=async()=>{
    const result=await db.select()
    .from(Budgets)
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    console.log(result);
    if(result?.length==0)
    {
      router.replace('/budgets')
    }
  }
  return (
    <>
        <SideNav/>
        <DashboardHeader/>
        <div className="ml-72 h-full md:px-12 lg:px-16">
        {children}
        </div>
        </>
  )
}

export default DashboardLayout