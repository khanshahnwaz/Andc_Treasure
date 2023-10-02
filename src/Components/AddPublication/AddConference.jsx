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

const Add=()=>{
    
    const context=useContext(PublicationContext)
    
    // hooks to track the visibility of tooltips
    const[visiName,setVisiName]=useState(false)
    const[visiYear,setVisiYear]=useState(false)
    const[visiPublisher,setVisiPublisher]=useState(false)
    const[visiISBN,setVisiISBN]=useState(false)
    const[visiTitle,setVisiTitle]=useState(false)
    const[visiPresented,setVisiPresented]=useState(false)
    const[visiCorrespondingAuthor,setVisiCorrespondingAuthor]=useState(false)
    const[visiFirstAuthor,setVisiFirstAuthor]=useState(false)
    const[visiCoAuthors,setVisiCoAuthors]=useState(false)
    const[visiNational,setVisiNational]=useState(false)
    const[visiPlace,setVisiPlace]=useState(false)
   
   
//    hook to keep track of form section
const[section,setSection]=useState(0);

const navigateToHome=()=>{
    //    navigate('/bookDetails');
       context.setAddConference(false)
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
        console.log('First form data ',data)
        setSection(1);
    }
})

// second form section
const formik2=useFormik({
    initialValues:{
        National:'YES',
        Presented:'YES',
        FirstAuthor:'YES',
        CorrespondingAuthor:'YES'
    },
    validate:values=>{
        setData({...data,...values})
    },
    onSubmit:values=>{
        setData({...data,...values})
        console.log('Second form data ',data)
        setSection(2);
    }
})
    // Formik library
    const formik=useFormik({
        initialValues:{
           Title:'',
           Place:'',
           CoAuthors:''
        },
        validate:values=>{
            const errors={};
            if(!values.CoAuthors){
                errors.CoAuthors='Required!'
            }else if(values.CoAuthors.length<3){
                errors.CoAuthors='Atleast 3 characters required!'
            }
            else setData({...data,...values})
         
           if(!values.Title){
            errors.Title='Required!'
           }else if(values.Title.length<3){
            errors.Title='Atleast 3 characters required!'
        }
            else setData({...data,...values})
          
            if(!values.Place){
                errors.Place='Required'
            }else if(values.Place.length<3){
                errors.Place='Atleast 3 characters required!'
            }
            else setData({...data,...values})

          
            return errors;
        },
        onSubmit: async values=>{
            console.log("Submitted total data ",data)
        //     const data={
               
        //         CoAuthors:values.CoAuthors,
        //         ISBN:values.ISBN,
        //         Publisher:values.Publisher,
        //         FirstAuthor:values.FirstAuthor
        //     }
            console.log("sent data",JSON.stringify(data))
            const response =await fetch(`${process.env.REACT_APP_BASE_URL}home/faculty/conference/addConference`,{
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
useEffect(()=>{
    if (formik2.errors.CorrespondingAuthor && formik2.touched.CorrespondingAuthor) {
        setVisiCorrespondingAuthor(true);
    } else {
        setVisiCorrespondingAuthor(false);
    }
       

    if (formik2.errors.FirstAuthor && formik2.touched.FirstAuthor) {
        setVisiFirstAuthor(true);
    } else {
        setVisiFirstAuthor(false);
    }

    if (formik2.errors.Presented && formik2.touched.Presented) {
      
    setVisiPresented(true);
} else {
    setVisiPresented(false);
}

    if (formik2.errors.National && formik2.touched.National) {
        setVisiNational(true);
    } else {
        setVisiNational(false);
    }

},[formik2])
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

    // diaglog box 
    if(context.addConference==true){
    return (
        <div>
            
<Error url='/conferenceDetails'/>
<Successful url='/profile'/>
       {/* <!-- Overlay element --> */}
    <div className="fixed  z-30 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60"></div>

    <div id='container'  className=" flex fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-40  bg-white rounded-lg shadow-2xl p-10 md:w-[50%] w-[92%]  "> 
   
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
                <div className='mt-5 p-10 mb-0'><p className='text-left text-4xl font-bold tracking-wide text-[#7e22ce]'>Add Conferences</p>
                <p className='mt-2 text-sm tracking-wide text-left font-semibold'>Already added conference?<Link to='/conferenceDetails'><span className="text-[#7e22c3]">Return</span></Link></p>
                
                </div>
                <div className='-mt-8 p-10 '>
                    {/* Form section  */}
                   {
                    section==0?(
                        <form onSubmit={formik1.handleSubmit}>
                             <label htmlFor='Name' className='float-left text-[#7e22ce] font-bold' >Name</label><br/>
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
                 <button type='submit' className=' font-bold float-left cursor-pointer bg-[#7e22c3] text-white my-2 py-2 px-5 rounded ' >Next</button>
                        </form>
                    ): ( section==1?(
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
                    <button type='submit' className=' font-bold float-left cursor-pointer bg-[#7e22c3] text-white py-2 my-2 px-5 rounded '>Next</button>
                    </div> 
                        </form>
                    ):
                        <form onSubmit={formik.handleSubmit}>
                    
                   
                   
                   
                    <label htmlFor='Title' className='float-left text-[#7e22ce] font-bold' >Title</label><br/>
                    <Tippy
                 visible={visiTitle}
                 placement='right'
                 content={formik.errors.Title}
                >
                    <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='Title' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Title} ></input>
                  </Tippy>
                    <br/><br/>

                   
                  
                  

                   

                    <label htmlFor='CoAuthors' className='float-left text-[#7e22ce] font-bold' >CoAuthors</label><br/>
                    <Tippy
                 visible={visiCoAuthors}
                 placement='right'
                 content={formik.errors.CoAuthors}
                >
                    <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='CoAuthors' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.CoAuthors} ></input>
                   </Tippy>
                    <br/><br/>


                    <label htmlFor='Place' className='float-left text-[#7e22ce] font-bold' >Place</label><br/>
                    <Tippy
                 visible={visiPlace}
                 placement='right'
                 content={formik.errors.Place}
                >
                    <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='Place' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Place} ></input>
                   </Tippy>
                    <br/><br/>

                 
                   <div className='grid grid-cols-2 gap-x-2 '>
                   <button type='button' className=' font-bold float-left cursor-pointer bg-[#7e22c3] text-white my-2 py-2 px-5 rounded w-full' onClick={()=>setSection(0)}>Back</button>
                    <button type='submit' className=' font-bold float-left cursor-pointer bg-[#7e22c3] text-white my-2 py-2 px-5 rounded w-full'>Submit</button>
                    </div> 
                    </form>)
                    
                   }
                    
                </div>
            </div>
        </div>
        </div>
    );}else return null;
}

export default Add;