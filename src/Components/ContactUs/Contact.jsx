import {useNavigate } from "react-router-dom";
import remove   from '../Assets/remove.png'
import {useFormik} from 'formik'
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
        <div id='container' className="flex absolute top-[100px] left-[18%]  bg-white rounded-lg shadow-2xl p-10 w-[60%] z-50">
            {/* left division */}
            <div className="h-[700px] bg-gradient-to-br from-[#7e22ce] to-[#a26bcd] w-[350px] border-white rounded-lg shadow-lg ">
                <p className="text-left text-base font-bold text-white pl-10 mt-4">Andc_Treasure</p>
                <p className="text-4xl tracking-wider text-left mt-10 p-10 text-white font-bold">Thanks <br/> to reach to us.</p>
                <p className="text-sm mt-2 text-left px-10 text-gray-200">Our team will resolve your all issue within 24 to 48 hours.</p>
                <div className=" mt-44  py-5 px-5 pb-4 mx-10 bg-[#5c1e7e] text-base font-bold  text-left text-gray-200 h-32 rounded-lg shadow-lg">Andc_Treasure support team respects your opinions and solve your queries.</div>
            </div>
            {/* right division */}
            <div className="bg-white h-[700px] w-[500px] ">
                <div className='mt-5 p-10 mb-0'><p className='text-left text-4xl font-bold tracking-wide text-[#7e22ce]'>Contact Us</p>
                <p className='mt-2 text-sm tracking-wide text-left font-semibold'>Your complaint will be resolved on high priority.</p></div>
                <img src={remove} alt='remove' className='float-right relative -top-60 -right-32 hover:opacity-10' onClick={navigateToHome}/>
                <div className='-mt-8 p-10 '>

                    {/* Form section  */}
                    <form onSubmit={formik.handleSubmit}>
                
                 <label htmlFor='email' className='float-left text-[#7e22ce] font-bold' >Email</label><br/>
                 <input type='text' className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' name='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange}></input>
                 {formik.errors.email && formik.touched.email?<span className='text-red-400 text-left'>{formik.errors.email}</span>:null}
                 <br/><br/>
                 <label htmlFor='password' className='float-left text-[#7e22ce] font-bold' >Message</label><br/>
                 <input type='text' className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' name='message' value={formik.values.message} onBlur={formik.handleBlur} onChange={formik.handleChange}></input>
                 {formik.errors.message && formik.touched.message?<span className='text-red-400 text-left'>{formik.errors.email}</span>:null}
                 <br/><br/>
                
                 <button type='submit' className=' font-bold float-left cursor-pointer bg-[#7e22c3] text-white py-2 px-5 rounded '>Submit</button>
                 </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;