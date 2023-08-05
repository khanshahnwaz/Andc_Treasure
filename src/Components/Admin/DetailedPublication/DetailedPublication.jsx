import React from 'react'
// import Table from '../example.json'
import { useState } from 'react'
import { useContext } from 'react'
import { PublicationContext } from '../../../Context/PublicationState'
const DetailedBook = (props) => {
  const context=useContext(PublicationContext)
  const item=context.detailedPublication;
    let headers=Object.keys(item);
    const data=Object.values(item).map((it,ind)=>{
            return <tr className='even:bg-gray-200 h-12 rounded-md border-gray-200 border-2' key={ind}>
                <th className='text-left'>{headers[ind]}</th>
                <td className='text-right'>{it}</td>
            </tr>
        })
    
    
  return (
    <div className={`w-4/5 m-auto min-h-screen `}>
      <div className='w-full min-h-1/2 border-2 border-gray-300 rounded-lg'>
         <table className='w-full justify-between '>
          <tbody>
           {data}
           </tbody>
         </table>
      </div>
    </div>
  )
}

export default DetailedBook;