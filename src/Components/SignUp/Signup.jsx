import remove   from '../Assets/remove.png'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useFormik} from 'formik'
import Successful from '../Modals/Successful';
import Error from '../Modals/Error';
import { useContext } from 'react';
import { PublicationContext } from '../../Context/PublicationState';
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


    // Formik library
    const formik=useFormik({
        initialValues:{
            name:'',
            email:'',
            department:'',
            designation:'',
            password:'',
            confirmPassword:''
        },
        validate:values=>{
            const errors={};
            if(!values.name ){
                errors.name='*Required'
            }
            if(!values.email){
                errors.email='*Required'
            }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = '*Invalid email';
              }
            if(!values.department){
                errors.department='*Required'
            }
            if(!values.designation){
                errors.designation='*Required'
            }
            if(!values.password){
                errors.password='*Required'
            }
            if(!values.confirmPassword){
                errors.confirmPassword='*Required'
            }else if(!values.confirmPassword.match(values.password
                )){
                    errors.confirmPassword='*Passwords do not match.'
                }
            return errors;
        },
        onSubmit: async values=>{
            const data={
                name:values.name,
                email:values.email,
                department:values.department,
                designation:values.designation,
                password:values.password
            }
            // console.log("sent data",JSON.stringify(data))
            const response =await fetch('http://localhost:3001/home/faculty/signUp',{
                method:'POST',
                headers:{
                    'Content-Type':"application/json"
                  },
                body:JSON.stringify(data)
            })
            const result=await response.json();
            console.log(result.Message)
            // result.status===200?localStorage.setItem({token:result.token}):null
            if(result.status===201){
                localStorage.setItem('token',result.token)
                context.setSuccessMessage(result.Message)
            }else{
                context.setErrorMessage(result.Message)
            }
            // navigateToHome();
        }
    })
    // console.log("Visited fields",formik.touched)
    return (
        <>
        <Error url='/signUp'/>
        <Successful url='/'/>
        {/* <!-- Overlay element --> */}
     <div className="fixed  z-30 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60"></div>
     
     <div id='container'  className=" flex fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-40  bg-white rounded-lg shadow-2xl p-10 w-[60%]  "> 
     <img src={remove} alt='remove' className='float-right fixed -traslate-x-1/2 -translate-y-1/2 -right-5 -top-2 hover:opacity-10' onClick={navigateToHome}/>
            {/* left division */}
            <div className="h-[700px] bg-gradient-to-br from-[#7e22ce] to-[#a26bcd] w-[350px] border-white rounded-lg shadow-lg ">
                <p className="text-left text-base font-bold text-white pl-10 mt-4">Andc_Treasure</p>
                <p className="text-4xl tracking-wider text-left mt-10 p-10 text-white font-bold">Start your <br/> journey with us</p>
                <p className="text-sm mt-2 text-left px-10 text-gray-200">Discover world best community of freelancers and business owners.</p>
                <div className=" mt-44  py-5 px-5 pb-4 mx-10 bg-[#5c1e7e] text-base font-bold  text-left text-gray-200 h-32 rounded-lg shadow-lg">Simply unbelievable! I am absolutely satisfied with my business. This is absolutely wonderful.</div>
            </div>
            {/* right division */}
            <div className="bg-white h-[700px] w-[500px] ">
                <div className='mt-5 p-10 mb-0'><p className='text-left text-4xl font-bold tracking-wide text-[#7e22ce]'>Sign Up</p>
                <p className='mt-2 text-sm tracking-wide text-left font-semibold'>Have an account?<Link to='/login'><span className="text-[#7e22c3]">Login</span></Link></p>
                
                </div>
                <div className='-mt-8 p-10 '>
                    {/* Form section  */}
                   
                    <form onSubmit={formik.handleSubmit}>
                 <label htmlFor='name' className='float-left text-[#7e22ce] font-bold' >Name</label><br/>
                 <input type='text' className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' name='name' onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur}></input>
                 {formik.errors.name && formik.touched.name?<span className='text-red-400 text-left'>{formik.errors.name}</span>:null}
                 <br/>
                 
                <br/>
                
                 <label htmlFor='email' className='float-left text-[#7e22ce] font-bold' >Email</label><br/>
                 <input type='text' className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' name='email' onBlur={formik.handleBlur}onChange={formik.handleChange} value={formik.values.email} ></input>{formik.errors.email && formik.touched.email?<span className='text-red-400 text-left'>{formik.errors.email}</span>:null}
                 <br/><br/>
                 <label htmlFor='department' className='float-left text-[#7e22ce] font-bold' >Department</label><br/>
                 <select name="department" className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.department}  >
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
{formik.errors.department && formik.touched.department?<span className='text-red-400 text-left'>{formik.errors.department}</span>:null}
                 <br/><br/>
                 <label htmlFor='designation' className='float-left text-[#7e22ce] font-bold' >Designation</label><br/>
                 <div className='inline-block rounded border-2 border-[#7e22c3] float-left mt-1 py-1 px-5 mr-4'>
                 <input type="radio" id="Professor" name="designation" className='rounded border-2 border-[#7e22c3] float-left mt-1' onBlur={formik.handleBlur} onChange={formik.handleChange} value='Professor' />
<label htmlFor="professor" className='float-left mr-2 text-[#7e22ce] font-bold'>Professor</label></div>
<div className='inline-block rounded border-2 border-[#7e22c3] float-left mt-1 py-1 px-5'>
<input type="radio" id="As. Professor" name="designation"  className='rounded border-4 border-[#7e22c3] float-left mt-1' onBlur={formik.handleBlur} onChange={formik.handleChange} value='As.Prfessor' />
<label htmlFor="asProfessor" className='float-left text-[#7e22ce] font-bold'>As. Professor</label></div>
{formik.errors.designation && formik.touched.designation?<span className='text-red-400 text-left'>{formik.errors.designation}</span>:null}

                 <br/><br/>
                 <label htmlFor='password' className='float-left text-[#7e22ce] font-bold' >Password</label><br/>
                 <input type='text' className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} ></input>
                 {formik.errors.password && formik.touched.password?<span className='text-red-400 text-left'>{formik.errors.password}</span>:null}
                 <br/><br/>
                 <label htmlFor='confirmPassword' className='float-left text-[#7e22ce] font-bold' >Confirm Password</label><br/>
                 <input type='text' className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' name='confirmPassword' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.confirmPassword} ></input>
                 {formik.errors.confirmPassword && formik.touched.confirmPassword?<span className='text-red-400 text-left'>{formik.errors.confirmPassword}</span>:null}

                 <br/><br/>
                 <button type='submit' className=' font-bold float-left cursor-pointer bg-[#7e22c3] text-white py-2 px-5 rounded '>Submit</button>
                 </form>
                 
                </div>
            </div>
        </div>
        </>
    );
}

export default SignUp;