import {Link} from 'react-router-dom';
const SignUp=()=>{
    return (
        <div className="flex relative top-[100px] left-[15%] h-[50%] bg-white rounded-lg shadow-md p-10 w-[60%]">
            {/* left division */}
            <div className="h-[700px] bg-[#7e22ce] w-[350px] border-white rounded-lg shadow-lg ">
                <p className="text-left text-base font-bold text-white pl-10 mt-4">Andc_Treasure</p>
                <p className="text-4xl tracking-wider text-left mt-10 p-10 text-white font-bold">Start your <br/> journey with us</p>
                <p className="text-sm mt-2 text-left px-10 text-gray-200">Discover world best community of freelancers and business owners.</p>
                <div className=" mt-44  py-5 px-5 pb-4 mx-10 bg-[#5c1e7e] text-base font-bold  text-left text-gray-200 h-32 rounded-lg shadow-lg">Simply unbelievable! I am absolutely satisfied with my business. This is absolutely wonderful.</div>
            </div>
            {/* right division */}
            <div className="bg-white h-[700px] w-[500px] ">
                <div className='mt-5 p-10 mb-0'><p className='text-left text-4xl font-bold tracking-wide text-[#7e22ce]'>Sign Up</p>
                <p className='mt-2 text-sm tracking-wide text-left font-semibold'>Have an account?<Link to='/login'><span className="text-[#7e22c3]">Login</span></Link></p></div>
                <div className='-mt-8 p-10 '>
                    <form>
                 <label htmlFor='name' className='float-left text-[#7e22ce] font-bold' >Name</label><br/>
                 <input type='text' className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' name='name'></input>
                 <br/><br/>
                 <label htmlFor='email' className='float-left text-[#7e22ce] font-bold' >Email</label><br/>
                 <input type='text' className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' name='email'></input>
                 <br/><br/>
                 <label htmlFor='department' className='float-left text-[#7e22ce] font-bold' >Department</label><br/>
                 <select name="department" className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' >
  <option value="Computer Science">Computer Science</option>
  <option value="Mathematics">Mathematics</option>
  <option value="Physics">Physics</option>
  <option value="Biology">Biology</option>
  <option value="Chemistry">Chemistry</option>
  <option value="Zoology">Zoology</option>
  <option value="Botany">Botany</option>
  <option value="Electronics">Electronics</option>
</select>
                 <br/><br/>
                 <label htmlFor='designation' className='float-left text-[#7e22ce] font-bold' >Designation</label><br/>
                 <div className='inline-block rounded border-2 border-[#7e22c3] float-left mt-1 py-1 px-5 mr-4'>
                 <input type="radio" id="Professor" name="designation" value="Professor" className='rounded border-2 border-[#7e22c3] float-left mt-1'/>
<label htmlFor="Professor" className='float-left mr-2 text-[#7e22ce] font-bold'>Professor</label></div>
<div className='inline-block rounded border-2 border-[#7e22c3] float-left mt-1 py-1 px-5'>
<input type="radio" id="As. Professor" name="designation" value="As. Professor" className='rounded border-4 border-[#7e22c3] float-left mt-1'/>
<label htmlFor="As. Professor" className='float-left text-[#7e22ce] font-bold'>As. Professor</label></div>

                 <br/><br/>
                 <label htmlFor='password' className='float-left text-[#7e22ce] font-bold' >Password</label><br/>
                 <input type='text' className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' name='password'></input>
                 <br/><br/>
                 <label htmlFor='confirmPassword' className='float-left text-[#7e22ce] font-bold' >Confirm Password</label><br/>
                 <input type='text' className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' name='confirmPassword'></input>
                 <br/><br/>
                 <button type='submit' className=' font-bold float-left cursor-pointer bg-[#7e22c3] text-white py-2 px-5 rounded '>Submit</button>
                 </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;