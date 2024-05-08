import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { db } from '../../../../utils/dbConfig';
import { Budgets, Expenses } from '../../../../utils/schema';
import { Loader } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react'
import { toast } from 'sonner';

function AddExpense({ budgetId, user, refreshData }) {

    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const [loading, setLoading] = useState(false);
    /**
     * Used to Add New Expense
     */
    const addNewExpense = async () => {
        setLoading(true)
        const result = await db.insert(Expenses).values({
            name: name,
            amount: amount,
            budgetId: budgetId,
            createdAt: moment().format('DD/MM/yyy')
        }).returning({ insertedId: Budgets.id });

        setAmount('');
        setName('');
        if (result) {
            setLoading(false)
            refreshData()
            toast('Share Details Added!')
        }
        setLoading(false);
    }
    return (
        <div className='border p-6 rounded-lg'>
            <h2 className='font-medium text-xl'> Details</h2>
            <div className='mt-5'>
                <h2 className='text-black font-medium my-1 text-sm pb-2'>Company Name</h2>
                <Input type="text" placeholder="e.g. TATA"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='mt-5'>
                <h2 className='text-black font-medium my-1 text-sm pb-2'>Sold Shares</h2>
                <Input type="number" placeholder="e.g. 100"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} />
            </div>
            <Button disabled={!(name && amount)||loading}
                onClick={() => addNewExpense()}
                className="mt-5 w-full">
                {loading ?
                    <Loader className="animate-spin" /> : "Save"
                }
            </Button>
        </div>
    )
}

export default AddExpense