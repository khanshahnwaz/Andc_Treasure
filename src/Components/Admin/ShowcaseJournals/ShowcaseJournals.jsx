import React, { useEffect } from 'react'
// import table from './example.json'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { PublicationContext } from '../../../Context/PublicationState'
import FilterBox from '../FilterBox'
import Header from '../Header'
const ShowCaseTable = (props) => {
  const context=useContext(PublicationContext)
  const[table,setTable]=useState([])
  // hooks to keep track of filter values
  const[search,setSearch]=useState('');
  const[fromYear,setFromYear]=useState(0);
  const[toYear,setToYear]=useState(new Date().getFullYear());
  const[department,setDepartment]=useState('');
  const[designation,setDesignation]=useState('');
    // console.log("Data is ",table, "and length is ",table.length)
    const[startIndex,setStartIndex]=useState(0);
    const[endIndex,setEndIndex]=useState(10);
    // fetch all the data from the database
    const url='http://localhost:3001/home/faculty/journal/admin/readJournals';
   const fetchData=async ()=>{
    const data= await fetch(url,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      }
    })
    const res=await data.json();
    setTable(res)
    // console.log("recieved data is ",await data.json())
  }
    useEffect( ()=>{fetchData()},[])
     
    const showCaseData=table.filter((item,i)=>{
      let failures={
        search:'pass',
        department:'pass',
        designation:'pass',
        year:'pass'
      };
      if(search){
        
       if(( item.Name.toLowerCase().includes(search.toLowerCase())  || item.Phone.toString().includes(search.toLowerCase()) || item.JournalTitle.toLowerCase().includes(search.toLowerCase()) || item.ISSN.toLowerCase().includes(search.toLowerCase())))
          // 
        failures.search='pass';
        else failures.search='fail';
      }
        if(fromYear || toYear){
          if(item.Year >= fromYear && item.Year <= toYear)
             failures.year='pass';
            else failures.year='fail';
        }
       if(department){
        if(item.Department.includes(department))
          failures.department='pass'
        else   failures.department='fail'

      }
       if(designation){
        if(item.Designation.includes(designation))
            failures.designation='pass'
          else failures.designation='fail'

      }
      if(failures.search=='pass' && failures.department=='pass' && failures.designation=='pass' && failures.year=='pass')
        return item;
      console.log("failuer object ",failures)



    }).map((item,i)=>{
      if(i>=startIndex && i<endIndex){
       return <tr key={i} className='even:bg-gray-300 border-2 border-gray-200 bg-[#e9f1fc] md:h-16 hover:bg-[#7e22ce] hover:text-white transition-all ease-in duration-300 cursor-pointer hover:opacity-80 ' onClick={()=>context.setDetailedPublication(table[i])}>
        <td>{i+1}</td>
        <td>{item.Name}</td>
        <td>{item.Phone}</td>
        <td>{item.Department}</td>
        <td>{item.Designation}</td>
        <td>{item.JournalTitle}</td>
        <td>{item.ISSN}</td>
        <td>{item.Year}</td>
       </tr>
      }
    })
  return (
    <div className='min-h-screen h-max md:w-4/5 md:my-5 mx-auto'>
      <Header publication='Book Records' data={table}/>
      <FilterBox
       search={search}
       fromYear={fromYear}
       toYear={toYear}
       department={department}
       designation={designation}
       setSearch={setSearch} 
       setToYear={setToYear}
       setFromYear={setFromYear}
       setDepartment={setDepartment}
       setDesignation={setDesignation} />
        <div className='filterbox flex justify-between  md:p-5'>
            <div>
                <p>Showing 10 out of {table.length} records</p>
               
            </div>
            {/* <div>
                    Records per page
                    <select className='m-auto px-3 ' >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                </div> */}
        </div>
        <Link to='/admin/journalDetails/detailedJournal'> 

      <table className='w-full md:py-5 '>
        <thead className='bg-gray-300  font-semibold md:text-lg border-2 border-gray-300 rounded-md h-full'>
            <tr>
                <td>Record#</td>
                <td>Name</td>
                <td>Phone#</td>
                <td>Department</td>
                <td>Designation</td>
                <td>JournalTitle</td>
                <td>ISSN</td>
                <td>Year</td>
            </tr>
        </thead>
        <tbody>
            {showCaseData}
        </tbody>
      </table>
      </Link>
      <div>
        {startIndex>0?<button className='border-2 bg-gray-300 px-4 py-1 rounded-md m-2 hover:opacity-60 ' onClick={()=>[setEndIndex(startIndex),setStartIndex(startIndex-10)]}>Prev</button>:null}
        
        {endIndex<table.length?<button className=' border-2 bg-gray-300 px-4 py-1 rounded-md m-2 hover:opacity-60 ' onClick={()=>[setStartIndex(endIndex),setEndIndex(endIndex+10)]}>Next</button>:null}
        
      </div>
    </div>
  )
}

export default ShowCaseTable