import remove   from '../Assets/remove.png'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useFormik} from 'formik'
import Successful from '../Modals/Successful';
import Error from '../Modals/Error';
import { useContext, useState,useEffect } from 'react';
import { PublicationContext } from '../../Context/PublicationState';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

const AddChapter=()=>{
    
    const context=useContext(PublicationContext)
    
    // hooks to track the visibility of tooltips
    const[visiName,setVisiName]=useState(false)
    const[visiYear,setVisiYear]=useState(false)
    const[visiPublisher,setVisiPublisher]=useState(false)
    const[visiISBN,setVisiISBN]=useState(false)
    const[visiTitle,setVisiTitle]=useState(false)
    const[visiEditor,setVisiEditor]=useState(false)
    const[visiEdition,setVisiEdition]=useState(false)
    const[visiArea,setVisiArea]=useState(false)
    const[visiChapter,setVisiChapter]=useState(false)
   
//    hook to keep track of form section
const[section,setSection]=useState(0);

const navigateToHome=()=>{
    //    navigate('/bookDetails');
       context.setAddChapter(false)
    }
    const[formData,setFormData]=useState({})
    const[data,setData]=useState({})

 
// First part of form to get data for publication type table
const formik1=useFormik({
    initialValues:{
        Name:'',
        Year:'',
        Publisher:'',
        ISBN:''
    },
    validate:values=>{
        const errors={};
        if(!values.Name){
            errors.Name='Required!'
        }else if(values.Name.length<3){
            errors.Name='Atleast 3 characters required!'
        }
        else setData({...data,...values})
        if(!values.Year){
            errors.Year='Required!'
        }else if(values.Year<1900 || values.Year>new Date().getFullYear()){
            errors.Year='Invalid year!'
        }
        else setData({...data,...values})
        if(!values.Publisher){
            errors.Publisher='Required!'
        }else if(values.Publisher.length<3){
            errors.Publisher='Atleast 3 characters required!'
        }
        else setData({...data,...values})
        if(!values.ISBN){
            errors.ISBN='Required!'
        }else if(values.ISBN.length<3){
            errors.ISBN='Atleast 3 characters required!'
        }
        else setData({...data,...values})
        // setData({values,...data})
      return errors;
    },
    onSubmit:values=>{
        // setFormData(data)
        // console.log('First form data ',data)
        setSection(1);
    }
})
    // Formik library
    const formik=useFormik({
        initialValues:{
           BookTitle:'',
           Editor:'',
           Edition:'',
           Area:'',
           ChapterTitle:''
        },
        validate:values=>{
            const errors={};
            if(!values.ChapterTitle){
                errors.ChapterTitle='Required'
            }else if(values.ChapterTitle.length<3){
                errors.ChapterTitle='Atleast 3 characters required!'
            }
            else setData({...data,...values})
           if(!values.Area){
            errors.Area='Required!'
           }else if(values.Area.length<3){
            errors.Area='Atleast 3 characters required!'
        }
           else setData({...data,...values})
           if(!values.Editor){
            errors.Editor='Required!'
           }else if(values.Editor.length<3){
            errors.Editor='Atleast 3 characters required!'
        }
           else setData({...data,...values})
           if(!values.BookTitle){
            errors.BookTitle='Required!'
           }else if(values.BookTitle.length<3){
            errors.BookTitle='Atleast 3 characters required!'
        }
           else setData({...data,...values})
            if(!values.Edition){
                errors.Edition='Required'
            }else if(values.Edition.length<3){
                errors.Edition='Atleast 3 characters required!'
            }
            else setData({...data,...values})
            return errors;
        },
        onSubmit: async values=>{
            console.log("Submitted total data ",data)
        //     const data={
               
        //         ChapterTitle:values.ChapterTitle,
        //         ISBN:values.ISBN,
        //         Publisher:values.Publisher,
        //         Edition:values.Edition
        //     }
            console.log("sent data",JSON.stringify(data))
            const response =await fetch('http://localhost:3001/home/faculty/bookChapter/addChapter',{
                method:'POST',
                headers:{
                    'Content-Type':"application/json",
                    'auth-token':localStorage.getItem('token')
                  },
                body:JSON.stringify(data)
            })
            const result=await response.json();
            console.log(result)
           
            if(result.Status==201){
               console.log("Successfull")
                context.setSuccessMessage(result.Message)
               
            }else {
                console.log("Some error occured whiled creating new book entry.")
               context.setErrorMessage(result.Message)
            }
        }
    })
    // console.log("Visited fields",formik.touched)
// control visibility of tooltips
useEffect(() => {
    if (formik1.errors.Name && formik1.touched.Name) {
        setVisiName(true);
    } else {
        setVisiName(false);
    }
    if (formik1.errors.Year && formik1.touched.Year) {
        setVisiYear(true);
    } else {
        setVisiYear(false);
    }

    if (formik1.errors.Publisher && formik1.touched.Publisher) {
        setVisiPublisher(true);
    } else {
        setVisiPublisher(false);
    }

    if (formik1.errors.ISBN && formik1.touched.ISBN) {
        setVisiISBN(true);
    } else {
        setVisiISBN(false);
    }
}, [formik1]);

useEffect(() => {
    if (formik.errors.BookTitle && formik.touched.BookTitle) {
        setVisiTitle(true);
    } else {
        setVisiTitle(false);
    }
    if (formik.errors.Editor && formik.touched.Editor) {
        setVisiEditor(true);
    } else {
        setVisiEditor(false);
    }

    if (formik.errors.Edition && formik.touched.Edition) {
        setVisiEdition(true);
    } else {
        setVisiEdition(false);
    }

    if (formik.errors.Area && formik.touched.Area) {
        setVisiArea(true);
    } else {
        setVisiArea(false);
    }

    if (formik.errors.ChapterTitle && formik.touched.ChapterTitle) {
        setVisiChapter(true);
    } else {
        setVisiChapter(false);
    }
}, [formik]);

    // diaglog box 
    if(context.addChapter==true){
    return (
        <div>
            
<Error url='/chapterDetails'/>
<Successful url='/profile'/>
       {/* <!-- Overlay element --> */}
    <div className="fixed  z-30 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60"></div>

    <div id='container'  className=" flex fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-40  bg-white rounded-lg shadow-2xl p-10 md:w-[50%] w-[92%] "> 
   
            {/* left division */}
            <div className="h-max bg-gradient-to-br from-[#7e22ce] to-[#a26bcd]  border-white rounded-lg shadow-lg w-[350px] hidden md:block ">
                <p className="text-left text-base font-bold text-white pl-10 mt-4">Andc_Treasure</p>
                <p className="text-4xl tracking-wider text-left mt-10 p-10 text-white font-bold">Start your <br/> journey with us</p>
                <p className="text-sm mt-2 text-left px-10 text-gray-200">Discover world best community of freelancers and business owners.</p>
                <div className=" mt-44  py-5 px-5 pb-4 mx-10 bg-[#5c1e7e] text-base font-bold  text-left text-gray-200 h-32 rounded-lg shadow-lg">Simply unbelievable! I am absolutely satisfied with my business. This is absolutely wonderful.</div>
            </div>
            {/* right division */}
            <div className="bg-white h-full w-[100%] md:w-[50%] ">
            <img src={remove} alt='remove' className='float-right  hover:opacity-10' onClick={navigateToHome}/>
                <div className='mt-5 p-10 mb-0'><p className='text-left text-4xl font-bold tracking-wide text-[#7e22ce]'>Add Chapters</p>
                <p className='mt-2 text-sm tracking-wide text-left font-semibold'>Already added chapter?<Link to='/bookDetails'><span className="text-[#7e22c3]">Return</span></Link></p>
                
                </div>
                <div className='-mt-8 p-10 '>
                    {/* Form section  */}
                   {
                    section==0?(
                        <form onSubmit={formik1.handleSubmit}>
                             <label htmlFor='Name' className='float-left text-[#7e22ce] font-bold' >BookName</label><br/>
                             <Tippy
                 visible={visiName}
                 placement='right'
                 content={formik1.errors.Name}
                >
                 <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='Name' onChange={formik1.handleChange} value={formik1.values.Name} onBlur={formik1.handleBlur}></input>
                </Tippy>
                 <br/><br/>
                
                 <label htmlFor='Year' className='float-left text-[#7e22ce] font-bold' >Year</label><br/>
                 <Tippy
                 visible={visiYear}
                 placement='right'
                 content={formik1.errors.Year}
                >
                 <input type='number' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='Year' onBlur={formik1.handleBlur}onChange={formik1.handleChange} value={formik1.values.Year} ></input>
                 </Tippy>
               
                 
                 <br/><br/>
                 <label htmlFor='Publisher' className='float-left text-[#7e22ce] font-bold' >Publisher</label><br/>
                 <Tippy
                 visible={visiPublisher}
                 placement='right'
                 content={formik1.errors.Publisher}
                >
                 <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='Publisher' onBlur={formik1.handleBlur} onChange={formik1.handleChange} value={formik1.values.Publisher} ></input>
                 </Tippy>

                 <br/><br/>
                 <label htmlFor='ISBN' className='float-left text-[#7e22ce] font-bold' >ISBN</label><br/>
                 <Tippy
                 visible={visiISBN}
                 placement='right'
                 content={formik1.errors.ISBN}
                >
                 <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='ISBN' onBlur={formik1.handleBlur} onChange={formik1.handleChange} value={formik1.values.ISBN} ></input>
                </Tippy>
                 <br/><br/>
                 <button type='submit' className=' font-bold float-left cursor-pointer bg-[#7e22c3] text-white py-2 px-5 my-2 rounded ' >Next</button>
                        </form>
                    ): <form onSubmit={formik.handleSubmit}>
                    
                   
                   
                   
                    <label htmlFor='BookTitle' className='float-left text-[#7e22ce] font-bold' >BookTitle</label><br/>
                    <Tippy
                 visible={visiTitle}
                 placement='right'
                 content={formik.errors.BookTitle}
                >
                    <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='BookTitle' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.BookTitle} ></input>
                  </Tippy>
                    <br/><br/>

                    <label htmlFor='Edition' className='float-left text-[#7e22ce] font-bold' >Edition</label><br/>
                    <Tippy
                 visible={visiEdition}
                 placement='right'
                 content={formik.errors.Edition}
                >
                    <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='Edition' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Edition} ></input>
                </Tippy>
                    <br/><br/>
                  
                    <label htmlFor='Editor' className='float-left text-[#7e22ce] font-bold' >Editor</label><br/>
                    <Tippy
                 visible={visiEditor}
                 placement='right'
                 content={formik.errors.Editor}
                >
                    <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='Editor' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Editor} ></input>
                   </Tippy>
                    <br/><br/>

                    <label htmlFor='Area' className='float-left text-[#7e22ce] font-bold' >Area</label><br/>
                    <Tippy
                 visible={visiArea}
                 placement='right'
                 content={formik.errors.Area}
                >
                    <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='Area' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Area} ></input>
                 </Tippy>
                    <br/><br/>

                    <label htmlFor='ChapterTitle' className='float-left text-[#7e22ce] font-bold' >ChapterTitle</label><br/>
                    <Tippy
                 visible={visiChapter}
                 placement='right'
                 content={formik.errors.ChapterTitle}
                >
                    <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='ChapterTitle' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.ChapterTitle} ></input>
                   </Tippy>
                    <br/><br/>

                   <div className='grid grid-cols-2 gap-x-2 w-[70%]'>
                   <button type='button' className=' font-bold float-left cursor-pointer bg-[#7e22c3] text-white my-2 py-2 px-5 rounded ' onClick={()=>setSection(0)}>Back</button>
                    <button type='submit' className=' font-bold float-left cursor-pointer bg-[#7e22c3] text-white my-2 py-2 px-5 rounded '>Submit</button>
                    </div> 
                    </form>
                    
                   }
                    
                </div>
            </div>
        </div>
        </div>
    );}else return null;
}

export default AddChapter;