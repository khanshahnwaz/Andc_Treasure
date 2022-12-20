import React from 'react'
import { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {PublicationContext} from '../../Context/PublicationState';
import EditBook from '../EditPublication/EditBook';
import Successful from './Successful';
import Error from './Error';
const Confirmtion = (props) => {
    const context=useContext(PublicationContext);
    console.log("In confirmation box warninh message is",context.warningMessage)
    const navigate=useNavigate();
    // function that will navigate user on the same page if NO delete/edit option is selected
    const navigation=()=>{
        navigate(props.url)
        context.setWarningMessage(null);
        context.setCallDeleteBook(false);
            context.setCallDeleteJournal(false);
            context.setCallDeleteConference(false);

    }


    // perform desired operation after positive confirmation
    const operation=async ()=>{ 
        context.setWarningMessage(null)


        // Case 1: User is ediiting some any publication
        if(props.message=='edit'){
            console.log("Now I am editing with data",context.editData)
            const response =await fetch(`http://localhost:3001/home/faculty/${props.editUrl}`,{
                method:'PUT',
                headers:{
                    'Content-Type':"application/json",
                    'auth-token':localStorage.getItem('token')
                  },
                body:JSON.stringify(context.editData)
            })
            // console.log("Hello am I running.")
            const result=await response.json();
            if(result.status==200){
                context.setSuccessMessage(result.Message)
                console.log("Updated")
            }else 
        {context.setErrorMessage(result.Message)
            console.log("not updated due to",result.Message)
                
            }


        }// case 2: user is logging out
        else if(props.message=='logOut'){
            localStorage.removeItem('token')
            navigation()
        }
// case 3: User is trying to delete any publication
        else if(props.message=='delete'){
            context.setCallDeleteBook(false);
            context.setCallDeleteJournal(false);
            context.setCallDeleteConference(false);

            // SET THE DELETE DATA      
            console.log("Now I am deleting the data data",context.targetId,context.targetPublication)
            const deleteData={}
            deleteData[props.id]=context.targetId;
            deleteData[props.pub]=context.targetPublication
            const response =await fetch(`http://localhost:3001/home/faculty/${props.delUrl}`,{
                method:'DELETE',
                headers:{
                    'Content-Type':"application/json",
                    'auth-token':localStorage.getItem('token')
                  },
                //   reusing editData state to send delete data
                body:JSON.stringify({deleteData})
            })
            // console.log("Hello am I running.")
            const result=await response.json();
            if(result.status==200){
                context.setSuccessMessage(result.Message)
                console.log("Deleted")
            }else 
        {context.setErrorMessage(result.Message)
            console.log("not deleted due to",result.Message)
                
            }


        }

    }

    // if confirmation message for delete/edit is yes
    // state to call editComponent 
    
    if(context.warningMessage!=null){
        // console.log("Hello I am outside",props.url)
  return (
<div>

    {/* <!-- Overlay element --> */}
    <div id="overlay" className="fixed  z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60"></div>
    {/* <!-- The dialog --> */}
    <div id="dialog" 
        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-md px-8 py-6 space-y-5 drop-shadow-lg" >
        <h1 className="text-2xl font-semibold text-yellow-500">Warning</h1>
        <div className="py-5 border-t border-b border-gray-300">
            <p>Are you sure want to {props.message} ?</p>
        </div>
        <div className="flex justify-between">
            {/* this button is used to proceed with the operation */}
            <button id="close" className="px-5 py-2 bg-indigo-500 hover:bg-red-700 text-white cursor-pointer rounded-md" onClick={operation} >
                Yes</button>
            {/* <!-- This button is used to close the dialog --> */}
            <button id="close" className="px-5 py-2 bg-indigo-500 hover:bg-green-700 text-white cursor-pointer rounded-md" onClick={navigation}>
                No</button>
        </div>
    </div>
    </div>
  )
}else return null
    // <>
    // <Successful url='/profile'/>
    // <Error url='/bookDetails'/></>

}

export default Confirmtion;