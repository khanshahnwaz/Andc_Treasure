import { useContext, useState } from "react";
import { PublicationContext } from "../../Context/PublicationState";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import remove from '../Assets/remove.png'
import Confirmtion from "../Modals/Confirmtion";
const EditBook=(props)=>{
    
    const context=useContext(PublicationContext);
    const navigateToHome=()=>{
       context.setCallEditBook(false);
    }
    // Formik library
    const formik=useFormik({
        initialValues:{
            bid:'',
            year:'',
            coAuthors:'',
            edition:''
        },
        validate:values=>{
            const errors={};
            if(!values.year){
                errors.year='*Required'
            }
            if(!values.coAuthors){
                errors.coAuthors='*Required'
            }
            if(!values.edition){
                errors.edition='*Required'
            }
            return errors;
        },
        onSubmit: async values=>{
            context.setWarningMessage('edit')
            // context.setCallEditBook(false)
            console.log("Now warning message is",context.warningMessage)
            console.log("Target ediiton is",context.targetPublication)
             context.setEditData({
                Bid:context.targetId,
                Year:values.year,
                CoAuthors:values.coAuthors,
                OldEdition:context.targetPublication,
                Edition:values.edition
            })
            // console.log("sent data",JSON.stringify(data))
        }
    })
   
    
    if(context.callEditBook==false){
        // console.log("Editsignal is",editSignal)
     return null;
    }else return (
        <>
        {/* backUrl contains the url that will render the bookDetails page. */}
        <Confirmtion message={context.warningMessage} url={props.backUrl} editUrl='book/editBook' />
            {/* <!-- Overlay element --> */}
    <div className="fixed  z-30 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60"></div>
    
        <div id='container'  className=" flex fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-40  bg-white rounded-lg shadow-2xl p-10 w-[60%]  "> 
        <img src={remove} alt='remove' className='float-right fixed -traslate-x-1/2 -translate-y-1/2 -right-5 -top-2 hover:opacity-10' onClick={navigateToHome}/>
            {/* {  console.log("Hello I am EditBook")} */}

            {/* left division */}
            <div className="h-[700px] bg-gradient-to-br from-[#7e22ce] to-[#a26bcd] w-[350px] border-white rounded-lg shadow-lg ">
                <p className="text-left text-base font-bold text-white pl-10 mt-4">Andc_Treasure</p>
                <p className="text-4xl tracking-wider text-left mt-10 p-10 text-white font-bold">Share your <br/> updated book with us</p>
                <p className="text-sm mt-2 text-left px-10 text-gray-200">Discover world best community of freelancers and business owners.</p>
                <div className=" mt-44  py-5 px-5 pb-4 mx-10 bg-[#5c1e7e] text-base font-bold  text-left text-gray-200 h-32 rounded-lg shadow-lg">Simply unbelievable! I am absolutely satisfied with my business. This is absolutely wonderful.</div>
            </div>
            {/* right division */}
            <div className="bg-white h-[700px] w-[500px] ">
                <div className='mt-5 p-10 mb-0'><p className='text-left text-4xl font-bold tracking-wide text-[#7e22ce]'>Edit Books</p>
                <p className='mt-2 text-sm tracking-wide text-left font-semibold'>Already edited book?<Link to='/bookDetails'><span className="text-[#7e22c3]">Return</span></Link></p>
                
                </div>
                
                <div className='-mt-8 p-10 '>
                    {/* Form section  */}
                   
                    <form onSubmit={formik.handleSubmit}>
                
                 <label htmlFor='year' className='float-left text-[#7e22ce] font-bold' >Year</label><br/>
                 <input type='number' className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' name='year' onBlur={formik.handleBlur}onChange={formik.handleChange} value={formik.values.year} ></input>{formik.errors.year && formik.touched.year?<span className='text-red-400 text-left'>{formik.errors.year}</span>:null}
                 
                 <br/><br/>
            
                 <label htmlFor='edition' className='float-left text-[#7e22ce] font-bold' >Edition</label><br/>
                 <input type='text' className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' name='edition' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.edition} ></input>
                 {formik.errors.edition && formik.touched.edition?<span className='text-red-400 text-left'>{formik.errors.edition}</span>:null}
                 <br/><br/>
                 <label htmlFor='coAuthors' className='float-left text-[#7e22ce] font-bold' >CoAuthors</label><br/>
                 <input type='text' className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' name='coAuthors' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.coAuthors} ></input>
                 {formik.errors.coAuthors && formik.touched.coAuthors?<span className='text-red-400 text-left'>{formik.errors.coAuthors}</span>:null}
                 <br/><br/>
                 <button type='submit' className=' font-bold float-left cursor-pointer bg-[#7e22c3] text-white py-2 px-5 rounded '>Submit</button>
                 </form>
                 
                </div>
            </div>
        </div>
        </>
    )
}
export default EditBook;