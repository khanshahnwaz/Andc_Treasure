import {useFormik} from 'formik'
import { Link,useNavigate } from "react-router-dom";
import {Auth} from 'two-step-auth';
const ForgotPassword=()=>{

    const navigate=useNavigate();
    const navigateToHome=()=>{
        navigate('/');
     }
    const formik=useFormik({
        initialValues:{
            email:'',
        },
        validate:values=>{
            const errors={};
           
            if(!values.email){
                errors.email='*Required'
            }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = '*Invalid email';
            }
           
           
            return errors;
        },
        onSubmit: async values=>{
            const data={
                
                Email:values.email,
               
               
            }
            const auth=await Auth(email,'Andc_treasure')
            console.log("mail id",auth.mail)
            console.log("sent otp",auth.otp)
            // console.log("sent data",JSON.stringify(data))
            // const response =await fetch('http://localhost:3001/home/faculty/login',{
            //     method:'POST',
            //     headers:{
            //         'Content-Type':"application/json"
            //       },
            //     body:JSON.stringify(data)
            // })
            // const result=await response.json();
            // console.log(result.Message)
            // // result.status===200?localStorage.setItem({token:result.token}):null
            // if(result.status===200){
            //     localStorage.setItem('token',result.token)
            //     context.setSuccessMessage(result.Message)
            // }else {
            //     context.setErrorMessage(result.Message)
            // }
            // // navigateToHome();
        }
    })
    return(
        <>
        <div className="fixed  z-30 w-screen h-screen inset-0 bg-gray-700 bg-opacity-60"></div>
    
    <div id='container'  className=" flex fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-40  bg-white rounded-lg shadow-2xl p-10 w-[60%]  "> 
    <img src={remove} alt='remove' className='float-right fixed -traslate-x-1/2 -translate-y-1/2 -right-5 -top-2 hover:opacity-10' onClick={navigateToHome}/>
        {/* left division */}
        <div className="h-[700px] bg-gradient-to-br from-[#7e22ce] to-[#a26bcd] w-[350px] border-white rounded-lg shadow-lg ">
            <p className="text-left text-base font-bold text-white pl-10 mt-4">Andc_Treasure</p>
            <p className="text-4xl tracking-wider text-left mt-10 p-10 text-white font-bold">Resume your <br/> journey with us</p>
            <p className="text-sm mt-2 text-left px-10 text-gray-200">Discover world best community of freelancers and business owners.</p>
            <div className=" mt-44  py-5 px-5 pb-4 mx-10 bg-[#5c1e7e] text-base font-bold  text-left text-gray-200 h-32 rounded-lg shadow-lg">Simply unbelievable! I am absolutely satisfied with my business. This is absolutely wonderful.</div>
        </div>
        {/* right division */}
        <div className="bg-white h-[700px] w-[500px] ">
            <div className='mt-5 p-10 mb-0'><p className='text-left text-4xl font-bold tracking-wide text-[#7e22ce]'>Forgot Password</p>
            <p className='mt-2 text-sm tracking-wide text-left font-semibold'>Don't have an account?<Link to='/signUp'><span className="text-[#7e22c3]">Register</span></Link></p>
            
            </div>
            <div className='-mt-8 p-10 w-full'>
                {/* Form section  */}
               
                <form onSubmit={formik.handleSubmit}>
           
            
             <label htmlFor='email' className='float-left text-[#7e22ce] font-bold' >Email</label><br/>
             <input type='text' className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' name='email' onBlur={formik.handleBlur}onChange={formik.handleChange} value={formik.values.email} ></input>{formik.errors.email && formik.touched.email?<span className='text-red-400 text-left'>{formik.errors.email}</span>:null}
             
           
            
             <br/><br/>

             <button type='submit' className=' font-bold float-left cursor-pointer bg-[#7e22c3] text-white py-2 px-5 rounded '>Submit</button>
             </form>
             
            </div>
        </div>
    </div>
        </>
    );
}
export default ForgotPassword;