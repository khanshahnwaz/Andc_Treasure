import React,{useState} from 'react'
import { useFormik } from 'formik';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useEffect,useContext } from 'react';
import { PublicationContext } from '../../Context/PublicationState';
import { useNavigate } from 'react-router-dom';
import Error from '../Modals/Error';
import Successful from '../Modals/Successful';
const Signup2 = (props) => {
    console.log("i entered in second form.")
    const [data,setData]=useState(props.values)
    useEffect(()=>{
        console.log("values submitted in both the form", data)
    },[data])
    const context=useContext(PublicationContext)
    const navigate=useNavigate();
    const navigateToHome=()=>{
       navigate('/');
    }
    // states to manage the error tooltip for each input box 
    const[visiName,setVisiName]=useState(false)
    const[visiDesignation,setVisiDesignation]=useState(false);
    const[visiDepartment,setVisiDepartment]=useState(false);
    const form=useFormik({
        initialValues:{
            name:"",
            designation:"",
            department:""
        },
        validate:(values)=>{
            const errors={};
            if(!values.name){
                errors.name='Required'
            }else if(values.name.length<2){
                errors.name='At least 2 characters'
            }

            if(!values.designation){
                errors.designation='Required'
            }

            if(!values.department){
                errors.department='Required'
            }
            return errors;

        },
        onSubmit:async values=>{
            const temp={...data,...values};
            props.setLoader(true);
          
            const response =await fetch('http://localhost:3001/home/faculty/signUp',{
                method:'POST',
                headers:{
                    'Content-Type':"application/json"
                  },
                body:JSON.stringify(temp)
            })
            props.setLoader(false);
            const result=await response.json();
            console.log(result.Message)
            // result.status===200?localStorage.setItem({token:result.token}):null
            if(result.status===201){
                context.setCurrentUser(result.data)
                localStorage.setItem('token',result.token)
                localStorage.setItem('data',JSON.stringify(result.data))
                context.setSuccessMessage(result.Message)
                context.setLoggedInName(result.name)
            }else{
                context.setErrorMessage(result.Message)
            }
            // navigateToHome();
        }
    })
    useEffect(()=>{
       form.errors.name && form.touched.name?(
        setVisiName(true)
       ):setVisiName(false)

       form.errors.department && form.touched.department?(
        setVisiDepartment(true)
       ):setVisiDepartment(false)

       form.errors.designation && form.touched.designation?(
        setVisiDesignation(true)
       ):setVisiDesignation(false)


    },[form])
  return (
    <>
    
    <form onSubmit={form.handleSubmit}>
    <div className='wrapperDiv grid gap-3'>
            <div>
        {/* name input */}
        <label htmlFor='name' className='float-left text-[#7e22ce] font-bold' >Name</label>
                <Tippy visible={visiName} content={form.errors.name} placement='top-end'>
                 <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='name' onChange={form.handleChange} value={form.values.name} onBlur={form.handleBlur}></input>
                 </Tippy>
                 </div>

             <div>
                {/* department input  */}
                <label htmlFor='department' className='float-left text-[#7e22ce] font-bold' >Department</label><br/>
                <Tippy visible={visiDepartment} content={form.errors.department} placement='top-end'>
                 <select name="department" className='bg-white border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full md:text-base text-sm' onBlur={form.handleBlur} onChange={form.handleChange} value={form.values.department}  >
                 <option value="">Select</option>

  <option value="Computer Science">Computer Science</option>
  <option value="Mathematics">Mathematics</option>
  <option value="Physics">Physics</option>
  <option value="Biology">Biology</option>
  <option value="Chemistry">Chemistry</option>
  <option value="Zoology">Zoology</option>
  <option value="Botany">Botany</option>
  <option value="Electronics">Electronics</option>
</select>
</Tippy>
</div>
 {/* designation */}
 <div>
                 <label htmlFor='designation' className='float-left text-[#7e22ce] font-bold' >Designation</label></div>
<div className='flex gap-x-3'>
                
                 <div className='flex gap-x-2 rounded border-2 border-[#7e22c3] float-left  h-max w-full py-2 justify-center'>
                 <input type="radio" id="Professor" name="designation" className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-3 ' onBlur={form.handleBlur} onChange={form.handleChange} value='Professor' />
                
<label htmlFor="professor" className='float-left md:mr-2 text-[#7e22ce] font-bold'>Professor</label>
                 </div>

              
<Tippy visible={visiDesignation} content={form.errors.designation} placement='right'>
<div className='flex w-full gap-x-2 rounded border-2 border-[#7e22c3] float-left h-max py-2 justify-center'>
<input type="radio" id="As. Professor" name="designation"  className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2' onBlur={form.handleBlur} onChange={form.handleChange} value='As.Prfessor' />
<label htmlFor="asProfessor" className='float-left text-[#7e22ce] font-bold'>As. Professor</label></div></Tippy>


</div>
</div>
<button type='submit' className='mt-3 font-bold float-left cursor-pointer bg-[#7e22c3] text-white py-2 px-5 rounded '>Create Account</button>
    </form>
    </>
  )
}

export default Signup2