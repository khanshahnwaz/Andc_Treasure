import {useNavigate } from "react-router-dom";
import remove   from '../Assets/remove.png'
import {useFormik} from 'formik';

const Contact=()=>{
    const navigate=useNavigate();
    const navigateToHome=()=>{
        navigate('/');
     }
    document.addEventListener('mouseup', function(e) {
        var container = document.getElementById('container');
        if (!container.contains(e.target)) {
            // container.style.display = 'none';
            navigate('/')
        }
        
    });

    const formik=useFormik({
       initialValues:{
        email:'',
        message:''
       },
       validate:values=>{
        const errors={}
        if(!values.email){
            errors.email='*Required'
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = '*Invalid email';
        }
        if(!values.message){
            errors.message='*Required'
        }
        return errors;
       }
    })
    return (
        <>

         
        {/* <!-- Overlay element --> */}
     <div className="fixed  z-30 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60"></div>


        <div id='container' className="flex fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-40  bg-white rounded-lg shadow-2xl p-10 md:w-[50%] w-[92%]">

        <img src={remove} alt='remove' className='float-right fixed -traslate-x-1/2 -translate-y-1/2 -right-1 -top-2 hover:opacity-10' onClick={navigateToHome}/>
            {/* left division */}
            <div className="h-max bg-gradient-to-br from-[#7e22ce] to-[#a26bcd]  border-white rounded-lg shadow-lg w-[350px] hidden md:block">
                <p className="text-left text-base font-bold text-white pl-10 mt-4">Andc_Treasure</p>
                <p className="text-4xl tracking-wider text-left mt-10 p-10 text-white font-bold">Thanks <br/> to reach to us.</p>
                <p className="text-sm mt-2 text-left px-10 text-gray-200">Our team will resolve your all issue within 24 to 48 hours.</p>
                <div className=" mt-44  py-5 px-5 pb-4 mx-10 bg-[#5c1e7e] text-base font-bold  text-left text-gray-200 h-32 rounded-lg shadow-lg">Andc_Treasure support team respects your opinions and solve your queries.</div>
            </div>
            {/* right division */}
            <div className="bg-white h-full w-[100%] md:w-[50%]  ">
                <div className='mt-5 p-5 md:p-10 mb-0'><p className='text-left text-4xl font-bold tracking-wide text-[#7e22ce]'>Contact Us</p>
                <p className='mt-2 text-sm tracking-wide text-left font-semibold'>Your complaint will be resolved on high priority.</p></div>
              
                <div className='-mt-8 p-10 '>

                    {/* Form section  */}
                    <form onSubmit={formik.handleSubmit}>
                
                 <label htmlFor='email' className='float-left text-[#7e22ce] font-bold' >Email</label><br/>
                 <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange}></input>
                 {formik.errors.email && formik.touched.email?<span className='text-red-400 text-left'>{formik.errors.email}</span>:null}
                 <br/><br/>
                 <label htmlFor='password' className='float-left text-[#7e22ce] font-bold' >Message</label><br/>
                 <input type='text' className='border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full' name='message' value={formik.values.message} onBlur={formik.handleBlur} onChange={formik.handleChange}></input>
                 {formik.errors.message && formik.touched.message?<span className='text-red-400 text-left'>{formik.errors.email}</span>:null}
                 <br/><br/>
                
                 <button type='submit' className=' font-bold float-left cursor-pointer bg-[#7e22c3] text-white py-2 px-5 my-2 rounded '>Submit</button>
                 </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default Contact;