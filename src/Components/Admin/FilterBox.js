import React from 'react'
import { FiSearch } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { FiBookOpen } from "react-icons/fi";

import { FiCreditCard} from "react-icons/fi";
const FilterBox = (props) => {
  const{search,setSearch,fromYear,setFromYear,toYear,setToYear,department,setDepartment,designation,setDesignation}=props;

  // remove flters 
  const removeFilters=()=>{
    setSearch('');
    setDepartment('');
    setFromYear(0);
    setToYear(new Date().getFullYear());
    setDesignation('');
  }
  return (
    <div className=''>
      <div className='flex justify-between py-2 rounded-md border-2 border-gray-200 my-2 gap-x-2 '>
        <div className='px-5 py-1 flex bg-white rounded-md'>  
        <FiSearch className='m-auto '/>   
    <input placeholder='Search by any publication parameter' className='w-full px-4 py-1 rounded outline-none' value={search} onChange={(e)=>props.setSearch(e.target.value)}/>
    </div>

    <div className='flex gap-x-2 '>
      <div className='m-auto px-5 py-1 flex bg-white rounded-md'>
      <input type='number'  className='outline-none' placeholder='From YYYY' value={fromYear} onChange={(e)=>props.setFromYear(e.target.value)}/>
      <FiCalendar className='m-auto'/>

      </div>

      <div className='m-auto px-5 py-1 flex bg-white rounded-md'>
        <input type='number' className='outline-none' placeholder='To YYYY' value={toYear} onChange={(e)=>props.setToYear(e.target.value)}/>
        <FiCalendar className='m-auto'/>

      </div>
    </div>
    <div className='px-4 py-1 rounded-md bg-white flex  gap-x-2'>
      <FiCreditCard className='m-auto'/>
        <select className='bg-white' name="Department" id="Department" placeholder='Department' value={department} onChange={(e)=>props.setDepartment(e.target.value)}>
            <option value="">Department</option>
  <option value="Computer Science">Computer Science</option>
  <option value="Physics">Physics</option>
  <option value="Mathematics">Mathematics</option>
  <option value="Chemistry">Chemistry</option>
</select>
</div>

<div className='px-4 py-1   rounded-md bg-white flex gap-x-2'>
  <FiBookOpen className='m-auto'/>
        <select className='bg-white' name="Designation" id="Designation" placeholder='Designation' value={designation} onChange={(e)=>props.setDesignation(e.target.value)}>
            <option value="">Designation</option>
  <option value="Professor">Professor</option>
  <option value="Assistant Professor">Assistant Professor</option>
  <option value="Associate Professor">Associate Professor</option>
</select>
</div>


{/* <div>
  <button className='hover:bg-[#7e22ce] hover:text-white text-black bg-white  px-2 rounded py-1 cursor-pointer '>Remove filter</button>
</div> */}
<div>
  <button className='bg-[#7e22ce] text-white px-2 rounded py-1 cursor-pointer hover:opacity-50 m-auto' onClick={removeFilters}>Remove filter</button>
</div>
</div>
</div>
  )
}

export default FilterBox