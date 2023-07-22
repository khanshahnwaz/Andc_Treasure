import React from 'react'

function TableData(props) {
    console.log("Table data ",props.data)
    // const result=props.data.filter((item)=>{
    //   return item.includes('Shah')
    //   // return item.ISBN.include='B
    // })

    // console.log("Filtered data is: ",result)
    const rows=props.data.map((item,i)=>{
  
          return <td key={i} className="border-2 border-black">{item}</td>
      
        
    })
    console.log("rows in tabledata ",rows)
  return (
    <>
    {rows}
    </>
  )
}

export default TableData