import { useContext, useState, useEffect } from "react";
import { PublicationContext } from "../../Context/PublicationState";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import remove from '../Assets/remove.png'
import Confirmtion from "../Modals/Confirmtion";

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
const EditConference=(props)=>{
    // state to store already existing details of requested publication
    const[visiTitle,setVisiTitle]=useState(false)
    const[visiPlace,setVisiPlace]=useState(false)
    const[visiCoAuthors,setVisiCoAuthors]=useState(false)
    const context=useContext(PublicationContext); 
    const navigateToHome=()=>{
       context.setCallEditConference(false);
    }
    const[section,setSection]=useState(0)
    // console.log("EditForm called for data: ",context.editData)
    const formik=useFormik({
        initialValues:context.editData,
        validate:values=>{
            
            const errors={};
            if(!values.CoAuthors){
                errors.CoAuthors='Required!'
            }
          
          
           if(!values.PaperTitle){
            errors.Title='Required!'
           }else if(values.PaperTitle.length<3){
            errors.Title='Atleast 3 characters required!'
        }
           
          
            if(!values.Place){
                errors.Place='Required'
            }else if(values.Place.length<3){
                errors.Place='Atleast 3 characters required!'
            }
          

          
            return errors;
        },
        onSubmit: async values=>{
           
             context.setEditData({
                ISSN:context.targetId,
                PaperTitle:context.targetPublication,
                NewTitle:values.PaperTitle,
                Place:values.Place,
                CoAuthors:values.CoAuthors
               
                
            })
            setSection(1)

            
        }
    })
    useEffect(() => {
        if (formik.errors.Title && formik.touched.Title) {
            setVisiTitle(true);
        } else {
            setVisiTitle(false);
        }
       
        if (formik.errors.CoAuthors && formik.touched.CoAuthors) {
            setVisiCoAuthors(true);
        } else {
            setVisiCoAuthors(false);
        }
    
        if (formik.errors.Place && formik.touched.Place) {
            setVisiPlace(true);
        } else {
            setVisiPlace(false);
        }
    
        
    }, [formik]);
    const formik2=useFormik({
        initialValues:context.editData,
        onSubmit: async values=>{
           
            console.log("Now warning message is",context.warningMessage)
            console.log("Target PaperTitle is",context.targetPublication)

            context.setEditData({...context.editData,
               
                CorrespondingAuthor:values.CorrespondingAuthor,
                FirstAuthor:values.FirstAuthor,
                National:values.National,
                Presented:values.Presented,
              
               
                
            })
            context.setWarningMessage('edit')
        }
    })
    useEffect(()=>{
        formik.setValues(context.editData)
    },[context.editData])
    
    if(context.callEditConference==false){
        // console.log("Editsignal is",editSignal)
     return null;
    }else return (
        <>
        {console.log("Already existing edit Data is :",context.editData)}
        {console.log("Initial values ",formik.values)}
        {/* backUrl contains the url that will render the bookDetails page. */}
        <Confirmtion message={context.warningMessage} url={props.backUrl} editUrl='conference/updateConference' />
            {/* <!-- Overlay element --> */}
    <div className="fixed  z-30 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60"></div>
    
        <div id='container'  className=" flex fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-40  bg-white rounded-lg shadow-2xl p-10 md:w-[50%] w-[92%]  "> 
\            {/* {  console.log("Hello I am EditConference")} */}
<img src={remove} alt='remove' className='float-right fixed -traslate-x-1/2 -translate-y-1/2 -right-1 -top-2 hover:opacity-10' onClick={navigateToHome}/>
            {/* left division */}
            <div className="h-max bg-gradient-to-br from-[#7e22ce] to-[#a26bcd]  border-white rounded-lg shadow-lg w-[350px] hidden md:block ">
                <p className="text-left text-base font-bold text-white pl-10 mt-4">Andc_Treasure</p>
                <p className="text-4xl tracking-wider text-left mt-10 p-10 text-white font-bold">Share your <br/> updated journal with us</p>
                <p className="text-sm mt-2 text-left px-10 text-gray-200">Discover world best community of freelancers and business owners.</p>
                <div className=" mt-44  py-5 px-5 pb-4 mx-10 bg-[#5c1e7e] text-base font-bold  text-left text-gray-200 h-32 rounded-lg shadow-lg">Simply unbelievable! I am absolutely satisfied with my business. This is absolutely wonderful.</div>
            </div>
            {/* right division */}
            <div className="bg-white h-full w-[100%] md:w-[50%] ">
          

                <div className='mt-5 p-10 mb-0'><p className='text-left text-4xl font-bold tracking-wide text-[#7e22ce]'>Edit Conference</p>
                <p className='mt-2 text-sm tracking-wide text-left font-semibold text-red-500'>If you see an empty form then please reopen it to display the existing data!</p>
                
                </div>
                
                <div className='-mt-8 md:px-10 md:py-5 py-3 px-5'>
                    {/* Form section  */}
                   {section==0?(
                    <form onSubmit={formik.handleSubmit}>
                    <div className='wrapperDiv grid gap-2'>
                
                <div>
                 <label htmlFor='PaperTitle' className='float-left text-[#7e22ce] font-bold' >PaperTitle</label><br/>
                 <Tippy
                 visible={visiTitle}
                 placement='right'
                 content={formik.errors.Title}
                >
                 <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='PaperTitle' onBlur={formik.handleBlur}onChange={formik.handleChange} value={formik.values.PaperTitle} ></input></Tippy>
             </div>
               
<div>
                 <label htmlFor='Place' className='float-left text-[#7e22ce] font-bold' >Place</label><br/>
                 <Tippy
                 visible={visiPlace}
                 placement='right'
                 content={formik.errors.Place}
                >
                 <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='Place' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Place} ></input></Tippy>
         </div>
<div>
                 <label htmlFor='coAuthors' className='float-left text-[#7e22ce] font-bold' >CoAuthors</label><br/>
                 <Tippy
                 visible={visiCoAuthors}
                 placement='right'
                 content={formik.errors.CoAuthors}
                >
                 <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='CoAuthors' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.CoAuthors} ></input></Tippy>
       </div>
                 <button type='submit' className=' font-bold float-left cursor-pointer bg-[#7e22c3] text-white py-2 px-5 rounded my-2 hover:opacity-50'>Next</button>

                 </div>
                 </form>
                   ):
                        <form onSubmit={formik2.handleSubmit}>
                      <label htmlFor='FirstAuthor' className='float-left text-[#7e22ce] font-bold' >FirstAuthor</label><br/>
                   
                   <select className='bg-white border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='FirstAuthor' onBlur={formik2.handleBlur} onChange={formik2.handleChange} value={formik2.values.FirstAuthor} >
                   <option selected value="YES">Yes</option>
                      <option value="NO">No</option>
                   </select>
                    <br/><br/>

                    <label htmlFor='CorrespondingAuthor' className='float-left text-[#7e22ce] font-bold' >CorrespondingAuthor</label><br/>
                    
                    <select name='CorrespondingAuthor' className='bg-white border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full'  onBlur={formik2.handleBlur} onChange={formik2.handleChange} value={formik2.values.CorrespondingAuthor} >
                        <option selected  value="YES">Yes</option>
                       <option value="NO">No</option>
                    </select>
                    <br/><br/>

                    <label htmlFor='Presented' className='float-left text-[#7e22ce] font-bold' >Presented</label><br/>
                  
                    <select  className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full bg-white' name='Presented' onBlur={formik2.handleBlur} onChange={formik2.handleChange} value={formik2.values.Presented} >
                    <option selected  value="YES">Yes</option>
                       <option value="NO">No</option>
                    </select>
                 
                    <br/><br/>

                    <label htmlFor='National' className='float-left text-[#7e22ce] font-bold' >National</label><br/>
                    
                    <select  className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full bg-white' name='National' onBlur={formik2.handleBlur} onChange={formik2.handleChange} value={formik2.values.National} >
                    <option selected  value="YES">Yes</option>
                       <option value="NO">No</option>
                    </select>
                  
                   <br/><br/>

                   <div className='grid grid-cols-2 gap-x-2 w-[70%]'>
                   <button type='button' className=' font-bold float-left cursor-pointer bg-[#7e22c3] text-white py-2 my-2 px-5 rounded ' onClick={()=>setSection(0)}>Back</button>
                    <button type='submit' className=' font-bold float-left cursor-pointer bg-[#7e22c3] text-white py-2 my-2 px-5 rounded '>Submit</button>
                    </div> 
                        </form>
                  
}
                 
                </div>
            </div>
        </div>
        </>
    )
}
export default EditConference;