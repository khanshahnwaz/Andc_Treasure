import remove   from '../Assets/remove.png'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useFormik} from 'formik'
import Successful from '../Modals/Successful';
import Error from '../Modals/Error';
import { useContext, useState } from 'react';
import { PublicationContext } from '../../Context/PublicationState';
import Signup2 from './Signup2';
import Icon from 'react-icons-kit'
import {chevronLeft} from 'react-icons-kit/feather/chevronLeft'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useEffect } from 'react';
const SignUp=()=>{
    const context=useContext(PublicationContext)
    const navigate=useNavigate();
    const navigateToHome=()=>{
       navigate('/');
    }
    // document.addEventListener('mouseup', function(e) {
    //     var container = document.getElementById('container');
    //     if (!container.contains(e.target)) {
    //         // container.style.display = 'none';
    //         navigate('/')
    //     }
        
    // });


    // state to manage the error tooltip for every input box 
    const[visiEmail,setVisiEmail]=useState(false);
    const[visiPhone,setVisiPhone]=useState(false);
    const[visiPassword,setVisiPassword]=useState(false);
    const[visiConPassword,setVisiConPassword]=useState(false);
    // state to manage the steps of the form
    const[level,setLevel]=useState(0)
    // Formik library
    const formik=useFormik({
        initialValues:{
            email:'',
            phone:'',
            password:'',
            confirmPassword:''
        },
        validate:values=>{
            const errors={};
            if(!values.phone ){
                errors.phone='Required'
            }
            if(!values.email){
                errors.email='Required'
            }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email';
              }

            if(!values.password){
                errors.password='Required'
            }
            if(!values.confirmPassword){
                errors.confirmPassword='Required'
            }else if(!values.confirmPassword.match(values.password
                )){
                    errors.confirmPassword='Passwords do not match.'
                }
            return errors;
        },
        onSubmit: async values=>{
            setLevel(1)
           
        }
    })

    useEffect(()=>{
       console.log("touched",formik.touched)
       console.log("errors",formik.errors)
        if(formik.errors.email && formik.touched.email){
            setVisiEmail(true)
        }else setVisiEmail(false)
        if(formik.errors.phone && formik.touched.phone){
            setVisiPhone(true)
        }else setVisiPhone(false)
        if(formik.errors.password && formik.touched.password){
            setVisiPassword(true)
        }else setVisiPassword(false)
        if(formik.errors.confirmPassword && formik.touched.confirmPassword){
            setVisiConPassword(true)
        }else setVisiConPassword(false)
    },[formik])
    // console.log("Visited fields",formik.touched)
    return (
        <>
        
        {/* <!-- Overlay element --> */}
     <div className="fixed  z-30 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60"></div>
     
     <div id='container'  className=" flex fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-40  bg-white rounded-lg shadow-2xl p-10 md:w-[50%] w-[92%] "> 
     {level==1?(
        
        <Icon onClick={()=>setLevel(0)} size={30} icon={chevronLeft} className='absolute cursor-pointer top-0' />
     ):null}
     <img src={remove} alt='remove' className='float-right fixed -traslate-x-1/2 -translate-y-1/2 -right-1 -top-2 hover:opacity-10' onClick={navigateToHome}/>
            {/* left division */}
            <div className="h-max bg-gradient-to-br from-[#7e22ce] to-[#a26bcd]  border-white rounded-lg shadow-lg w-[350px] hidden md:block">
                <p className="text-left text-base font-bold text-white pl-10 mt-4">Andc_Treasure</p>
                <p className="text-4xl tracking-wider text-left mt-10 p-10 text-white font-bold">Start your <br/> journey with us</p>
                <p className="text-sm mt-2 text-left px-10 text-gray-200">Discover world best community of freelancers and business owners.</p>
                <div className=" mt-44  py-5 px-5 pb-4 mx-10 bg-[#5c1e7e] text-base font-bold  text-left text-gray-200 h-32 rounded-lg shadow-lg">Simply unbelievable! I am absolutely satisfied with my business. This is absolutely wonderful.</div>
            </div>
            {/* right division */}
            <div className="bg-white h-full w-[100%] md:w-[50%] ">
                <div className='mt-5 p-5 md:p-10 mb-0'><p className='text-left text-4xl font-bold tracking-wide text-[#7e22ce]'>Sign Up</p>
                <p className='mt-2 text-sm tracking-wide text-left font-semibold'>Have an account?<Link to='/login'><span className="text-[#7e22c3]">Login</span></Link></p>
                
                </div>
                <div className='-mt-8 md:px-10 md:py-5 py-3 px-5 '>
                    {/* Form section  */}
                   {level==0?
                    (<form onSubmit={formik.handleSubmit}>
            <div className='wrapperDiv grid gap-2'>
            <div>
                 <label htmlFor='email' className='float-left text-[#7e22ce] font-bold' >Email</label>
                 
                 <Tippy visible={visiEmail} content={formik.errors.email} placement='top-end'>
                 <input type='email' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='email' onBlur={formik.handleBlur}onChange={formik.handleChange} value={formik.values.email} ></input>
                 </Tippy>
                 </div>
                 <div>
                 <label htmlFor='phone' className='float-left text-[#7e22ce] font-bold' >Phone</label><br/>
                 <Tippy visible={visiPhone} content={formik.errors.phone} placement='top-end'>
                 <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='phone' onBlur={formik.handleBlur}onChange={formik.handleChange} value={formik.values.phone} ></input>
                 </Tippy>
                 </div>
                 <div>
                 <label htmlFor='password' className='float-left text-[#7e22ce] font-bold' >Password</label><br/>
                 <Tippy visible={visiPassword} content={formik.errors.password} placement='top-end'>
                 <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} ></input>
                 </Tippy>
                 </div>
                 <div>
                 <label htmlFor='confirmPassword' className='float-left text-[#7e22ce] font-bold' >Confirm Password</label>
                
                 <Tippy visible={visiConPassword} content={formik.errors.confirmPassword} placement='top-end'>
                 <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='confirmPassword' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.confirmPassword} ></input>
                 </Tippy>
                 </div>
                 </div>
                 
                 <button type='submit' className=' font-bold float-left cursor-pointer bg-[#7e22c3] text-white py-2 px-5 rounded my-2'>Next</button>
                 </form>
):<Signup2 values={formik.values} />}
                </div>
            </div>
        </div>
        </>
    );
}

export default SignUp;