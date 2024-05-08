"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../../../components/ui/dialog";
  import { Icons } from "../../../../components/Icons";
import EmojiPicker from 'emoji-picker-react'
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { db } from '../../../../utils/dbConfig.jsx';
import { Budgets } from '../../../../utils/schema';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
  
function CreateBudget({refreshData}) {

    const [emojiIcon,setEmojiIcon]=useState('😀');
    const [openEmojiPicker,setOpenEmojiPicker]=useState(false);

    const [name,setName]=useState();
    const [amount,setAmount]=useState();

    const {user}=useUser();

    /**
     * Used to Create New Budget
     */
    const onCreateBudget=async()=>{
        const result=await db.insert(Budgets)
        .values({
            name:name,
            amount:amount,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            icon:emojiIcon
        }).returning({insertedId:Budgets.id})

        if(result)
        {
            refreshData()
            toast('New Stock Added!')
        }
    }
  return (
    <div>
       
        <Dialog>
            <DialogTrigger asChild>
                 <div className="flex cursor-pointer flex-col items-center space-y-3 rounded-lg bg-accent  px-6 py-12 transition hover:shadow-md">
            <Icons.create className="size-6" />
            <p className="text-sm font-medium">Add New Stock</p>
          </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add New Stock</DialogTitle>
                <DialogDescription>
                     <div className="mt-5">
                <Button
                  variant="outline"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div className="absolute mt-2 z-50">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
              </div>

                        
         <div className="mt-5 space-y-2.5">
                <h2 className="font-medium text-black">Company Name</h2>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Apple Inc"
                  className="text-black"
                />
              </div>

              <div className="mt-5 space-y-2.5">
                <h2 className="font-medium text-black">Total Shares</h2>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 500"
                  className="text-black"
                />
              </div>

                      
                    </div>
                </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                    <Button 
                            disabled={!(name&&amount)}
                            onClick={()=>onCreateBudget()}
                        className="mt-5">Save</Button>
                    </DialogClose>
                    </DialogFooter>
            </DialogContent>
            </Dialog>

    </div>
  )
}

export default CreateBudget