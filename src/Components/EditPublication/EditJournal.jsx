import { useContext, useState, useEffect } from "react";
import { PublicationContext } from "../../Context/PublicationState";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import remove from '../Assets/remove.png'
import Confirmtion from "../Modals/Confirmtion";
const EditJournal=(props)=>{
    // state to store already existing details of requested publication
    const context=useContext(PublicationContext); 
    const navigateToHome=()=>{
    context.setCallEditJournal(false);
    }
    // console.log("EditForm called for data: ",context.editData)
    const formik=useFormik({
        initialValues:context.editData,
        onSubmit: async values=>{
            context.setWarningMessage('edit')
            console.log("Now warning message is",context.warningMessage)
            console.log("Target title is",context.targetPublication)
             context.setEditData({
                ISSN:context.targetId,
                CorrespondingAuthor:values.CorrespondingAuthor,
                FirstAuthor:values.FirstAuthor,
                Volume:values.Volume,
                CoAuthors:values.CoAuthors,
                Title:context.targetPublication,
                NewTitle:values.Title
            })
            
        }
    })
    useEffect(()=>{
        formik.setValues(context.editData)
    },[context.editData])
    
    if(context.callEditJournal==false){
        // console.log("Editsignal is",editSignal)
     return null;
    }else return (
        <>
        {console.log("Already existing edit Data is :",context.editData)}
        {console.log("Initial values ",formik.values)}
        {/* backUrl contains the url that will render the bookDetails page. */}
        <Confirmtion message={context.warningMessage} url={props.backUrl} editUrl='journal/updateJournal' />
            {/* <!-- Overlay element --> */}
    <div className="fixed  z-30 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60"></div>
    
        <div id='container'  className=" flex fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-40  bg-white rounded-lg shadow-2xl p-10 md:w-[50%] w-[92%]  "> 
            {/* {  console.log("Hello I am EditJournal")} */}
            <img src={remove} alt='remove' className='float-right fixed -traslate-x-1/2 -translate-y-1/2 -right-1 -top-2 hover:opacity-10' onClick={navigateToHome}/>
            {/* left division */}
            <div className="h-max bg-gradient-to-br from-[#7e22ce] to-[#a26bcd]  border-white rounded-lg shadow-lg w-[350px] hidden md:block">
                <p className="text-left text-base font-bold text-white pl-10 mt-4">Andc_Treasure</p>
                <p className="text-4xl tracking-wider text-left mt-10 p-10 text-white font-bold">Share your <br/> updated journal with us</p>
                <p className="text-sm mt-2 text-left px-10 text-gray-200">Discover world best community of freelancers and business owners.</p>
                <div className=" mt-44  py-5 px-5 pb-4 mx-10 bg-[#5c1e7e] text-base font-bold  text-left text-gray-200 h-32 rounded-lg shadow-lg">Simply unbelievable! I am absolutely satisfied with my business. This is absolutely wonderful.</div>
            </div>
            {/* right division */}
            <div className="bg-white h-full w-[100%] md:w-[50%]">
           
                <div className='mt-5 p-10 mb-0'><p className='text-left text-4xl font-bold tracking-wide text-[#7e22ce]'>Edit Journals</p>
                <p className='mt-2 text-sm tracking-wide text-left font-semibold text-red-500'>If you see an empty form then please reopen it to display the existing data!</p>
                
                </div>
                
                <div className='-mt-8 md:px-10 md:py-5 py-3 px-5'>
                    {/* Form section  */}
                   
                    <form onSubmit={formik.handleSubmit}>
                    <div className='wrapperDiv grid gap-2'>
                
                <div>
                 <label htmlFor='title' className='float-left text-[#7e22ce] font-bold' >Title</label><br/>
                 <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='Title' onBlur={formik.handleBlur}onChange={formik.handleChange} value={formik.values.Title} ></input>
                
                 </div>
            <div>
            <label htmlFor='FirstAuthor' className='float-left text-[#7e22ce] font-bold' >FirstAuthor</label><br/>
                   
                   <select className='bg-white border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='FirstAuthor' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.FirstAuthor} >
                   <option selected value="YES">Yes</option>
                      <option value="NO">No</option>
                   </select>
                
               </div>
               <div>
               <label htmlFor='CorrespondingAuthor' className='float-left text-[#7e22ce] font-bold' >CorrespondingAuthor</label><br/>
                    
                    <select name='CorrespondingAuthor' className='bg-white border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full'  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.CorrespondingAuthor} >
                        <option selected  value="YES">Yes</option>
                       <option value="NO">No</option>
                    </select>
               
                </div>
<div>
                 <label htmlFor='volume' className='float-left text-[#7e22ce] font-bold' >Volume</label><br/>
                 <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='Volume' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Volume} ></input>
                 
                </div>

<div>
                 <label htmlFor='coAuthors' className='float-left text-[#7e22ce] font-bold' >CoAuthors</label><br/>
                 <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='CoAuthors' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.CoAuthors} ></input>
               
       </div>
                 <button type='submit' className=' font-bold float-left cursor-pointer bg-[#7e22c3] text-white py-2 px-5 rounded my-2 hover:opacity-50 '>Submit</button>
                 </div>
                 </form>
                 
                </div>
            </div>
        </div>
        </>
    )
}
export default EditJournal;