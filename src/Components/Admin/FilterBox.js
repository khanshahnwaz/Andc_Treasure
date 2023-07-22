import React from 'react'

const FilterBox = () => {
  return (
    <div className='flex justify-between py-2 rounded-md border-2 border-gray-200 my-2'>
        <div className='px-4 py-1'>     
    <input placeholder='Search by any publication parameter' className='w-full px-4 py-1 rounded'/>
    </div>
    <div className='px-4 py-1'>
        <select className='px-4 py-1 rounded-md bg-white' name="Department" id="Department" placeholder='Department'>
            <option value="">Department</option>
  <option value="Computer Science">Computer Science</option>
  <option value="Physics">Physics</option>
  <option value="Mathematics">Mathematics</option>
  <option value="Chemistry">Chemistry</option>
</select>
</div>
<div className='px-4 py-1'>
<input type='date' placeholder='Date Range'/>
</div>
</div>
  )
}

export default FilterBox