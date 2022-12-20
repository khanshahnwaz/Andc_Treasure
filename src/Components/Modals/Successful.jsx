import React from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicationContext } from '../../Context/PublicationState';
const Successful = (props) => {
   const context=useContext(PublicationContext)
  const navigate=useNavigate();
  const navigateToDetails=()=>{
    context.setAddBook(false)
    context.setAddJournal(false)
    context.setAddConference(false)
    console.log(props.url)
    context.setSuccessMessage(null)
    context.setCallEditBook(false)
    context.setCallEditJournal(false)
    context.setCallEditConference(false)

      navigate(props.url)
  }
  if(context.successMessage!=null){
  return (
    <div>
   
    {/* <!-- Overlay element --> */}
    <div id="overlay" className="fixed  z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60"></div>

    {/* <!-- The dialog --> */}
    <div id="dialog"
        className=" fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-md px-8 py-6 space-y-5 drop-shadow-lg">
        <h1 className="text-2xl font-semibold text-green-500">Success</h1>
        <div className="py-5 border-t border-b border-gray-300">
            <p>{context.successMessage}</p>
        </div>
        <div className="flex justify-end">
            {/* <!-- This button is used to close the dialog --> */}
            <button id="close" className="px-5 py-2 bg-indigo-500 hover:bg-indigo-700 text-white cursor-pointer rounded-md" onClick={navigateToDetails}>
                Ok</button>
        </div>
    </div>
    </div>
  )}else return null;
}

export default Successful