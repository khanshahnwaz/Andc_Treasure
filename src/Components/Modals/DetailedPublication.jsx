import React,{useContext} from "react";
import book from '../Assets/book.png'
import remove from '../Assets/remove.png'

import { PublicationContext } from "../../Context/PublicationState";
import { useState } from "react";
import Confirmtion from "./Confirmtion";
import Successful from "./Successful";
import Error from "./Error";
const DetailedPublication=(props)=>{
    // const[inputVal,setInputVal]=useState(null);
    const context=useContext(PublicationContext)
    const closeDetail=()=>{
        context.setCallDetailedPublication(false);
    }

    // function to edit the publication
    // const editAndSave=async (event,i)=>{
    //     const ele=event.target;
    //     const target=document.getElementById(i);
    //     if(ele.innerText=='Edit'){
    //         ele.innerText='Save';
    //         target.setAttribute('contenteditable','true');
    //         target.style.backgroundColor='white'
    //     }else{
    //         const key=target.previousSibling.previousSibling.innerText
    //         console.log("Target key is",key)
    //         // context.setWarningMessage('edit');
    //         const editData={};
    //         editData[key]=target.innerText;
    //         console.log("Edit data in detailedPublication is",editData)
    //             const response =await fetch(`http://localhost:3001/home/faculty/${props.editUrl}`,{
    //                 method:'PUT',
    //                 headers:{
    //                     'Content-Type':"application/json",
    //                     'auth-token':localStorage.getItem('token')
    //                   },
    //                 body:JSON.stringify({
    //                     [key]:target.innerText
    //                 })
    //             });
    //             console.log("response is ",response)
    //             const result=await response.json();
    //         if(result.status==200){
    //             // context.setSuccessMessage(result.Message)
    //             console.log("Updated")
    //         }else 
    //     {context.setErrorMessage(result.Message)
    //         target.innerText=context.editData[key]
    //         console.log("not updated due to",result.Message)
                
    //         }
            
    //         ele.innerText='Edit';
    //         target.removeAttribute('contenteditable');
    //         target.style.backgroundColor='#D1D5DB';

    //     }
        

    // }
    console.log("I am in detailed publication.")
    if(context.callDetailedPublication==true){

        const data=Object.keys(props.data).map((key,i)=>{
            return (
            <div className="flex justify-between my-5"  key={i}>
            {/* <Confirmtion message={context.warningMessage} url={window.location.href} editUrl={props.editUrl}/> */}
            <Error url={window.location.href}/>
             {/* {setInputVal(props.data[key])} */}
            <div  className="w-fit py-3 px-2 text-center bg-gray-300 text-black rounded-lg">
            <span className="font-bold">{key}</span><br/><div id={i} className='w-max'>{props.data[key]}</div></div>
            </div>);
        })
        console.log(Object.keys(props.data).length)
    return(
        <>
        {/* overlay division */}
        <div className="z-20 bg-gray-400 w-screen h-screen fixed opacity-20"/>

        <div className="fixed z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white drop-shadow-lg w-2/3 h-max p-10 py-1">
            <img src={remove} className='float-right bg-gray-300 hover:opacity-50 hover:cursor-pointer' onClick={closeDetail}/>
            <div className="flex justify-center my-20">
                <div className="border-2 rounded-lg rounded-r-[30%]">
                    <img src={book} alt='BookPublication' className='w-full'/></div>
                <div>
                <div className="content px-5 pl-10 w-[500px] border-2 rounded-lg rounded-l-[20%]" >


                       {data}







                </div>
                </div>
            </div>

        </div>
        </>
    )}else {
        console.log("DetailedPublication signal is false",context.callDetailedPublication)
        return null;
    }
}
export default DetailedPublication;