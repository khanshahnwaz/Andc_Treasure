import { Link } from "react-router-dom";

const Login=()=>{
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
                <div className='mt-5 p-10 mb-0'><p className='text-left text-4xl font-bold tracking-wide text-[#7e22ce]'>Login</p>
                <p className='mt-2 text-sm tracking-wide text-left font-semibold'>Don't have an account? <Link to='/signUp'><span className="text-[#7e22c3]">Register</span></Link></p></div>
                <div className='-mt-8 p-10 '>
                    <form>
                
                 <label htmlFor='email' className='float-left text-[#7e22ce] font-bold' >Email</label><br/>
                 <input type='text' className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' name='email'></input>
                 <br/><br/>
                 <label htmlFor='password' className='float-left text-[#7e22ce] font-bold' >Password</label><br/>
                 <input type='text' className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' name='password'></input>
                 <br/><br/>
                
                 <button type='submit' className=' font-bold float-left cursor-pointer bg-[#7e22c3] text-white py-2 px-5 rounded '>Submit</button>
                 </form>
                </div>
            </div>
        </div>
    );
}

export default Login;