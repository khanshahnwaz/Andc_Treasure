import React from 'react'
import { CSVLink , CSVDownload} from 'react-csv';

const Header = (props) => {
  return (
    <div className='flex justify-between'>
        <div className='font-bold text-xl'>{props.publication}</div>
        <div className='flex justify-around  space-x-5 font-bold text-lg'>
            {/* <div className='bg-white px-6 cursor-pointer hover:bg-[#7e22ce] hover:text-white py-1 rounded-md transition-all ease-in duration-300'>Print</div> */}
           <CSVLink data={props.data} filename='andc_treasure.xlsx'> <div className='bg-white px-6 cursor-pointer hover:bg-[#7e22ce] hover:text-white py-1 rounded-md transition-all ease-in duration-300'>Export CSV</div></CSVLink>
            {/* <div className='bg-[#7e22ce] text-white px-2 rounded py-1 cursor-pointer hover:opacity-50'>Create Order +</div> */}
        </div>
    </div>
  )
}

export default Header