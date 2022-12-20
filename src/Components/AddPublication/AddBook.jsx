import remove   from '../Assets/remove.png'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useFormik} from 'formik'
import Successful from '../Modals/Successful';
import Error from '../Modals/Error';
import { useContext } from 'react';
import { PublicationContext } from '../../Context/PublicationState';
const Add=()=>{
    // context.setAddBook(false)
    
    const context=useContext(PublicationContext)
    const navigate=useNavigate();
    const navigateToHome=()=>{
    //    navigate('/bookDetails');
       context.setAddBook(false)
    }
   
   

    // Formik library
    const formik=useFormik({
        initialValues:{
            name:'',
            year:'',
            coAuthors:'',
            isbn:'',
            publisher:'',
            edition:''
        },
        validate:values=>{
            const errors={};
            if(!values.name ){
                errors.name='*Required'
            }
            if(!values.year){
                errors.year='*Required'
            }
            if(!values.coAuthors){
                errors.coAuthors='*Required'
            }
            if(!values.isbn){
                errors.isbn='*Required'
            }
            if(!values.publisher){
                errors.publisher='*Required'
            }
            if(!values.edition){
                errors.edition='*Required'
            }
            return errors;
        },
        onSubmit: async values=>{
            const data={
                Name:values.name,
                Year:values.year,
                CoAuthors:values.coAuthors,
                ISBN:values.isbn,
                Publisher:values.publisher,
                Edition:values.edition
            }
            // console.log("sent data",JSON.stringify(data))
            const response =await fetch('http://localhost:3001/home/faculty/book/addBook',{
                method:'POST',
                headers:{
                    'Content-Type':"application/json",
                    'auth-token':localStorage.getItem('token')
                  },
                body:JSON.stringify(data)
            })
            const result=await response.json();
            console.log(result)
           
            if(result.status===200){
               
                context.setSuccessMessage(result.Message)
               
            }else if(result.status===400) {
                console.log("I am here.")
               context.setErrorMessage(result.Message)
            }
        }
    })
    // console.log("Visited fields",formik.touched)

    // diaglog box 
    if(context.addBook==true){
    return (
        <div>
            
<Error url='/bookDetails'/>
<Successful url='/profile'/>
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
                <div className='mt-5 p-10 mb-0'><p className='text-left text-4xl font-bold tracking-wide text-[#7e22ce]'>Add Books</p>
                <p className='mt-2 text-sm tracking-wide text-left font-semibold'>Already added book?<Link to='/bookDetails'><span className="text-[#7e22c3]">Return</span></Link></p>
                
                </div>
                <div className='-mt-8 p-10 '>
                    {/* Form section  */}
                   
                    <form onSubmit={formik.handleSubmit}>
                 <label htmlFor='name' className='float-left text-[#7e22ce] font-bold' >Name</label><br/>
                 <input type='text' className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' name='name' onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur}></input>
                 {formik.errors.name && formik.touched.name?<span className='text-red-400 text-left'>{formik.errors.name}</span>:null}
                 <br/>
                 
                <br/>
                
                 <label htmlFor='year' className='float-left text-[#7e22ce] font-bold' >Year</label><br/>
                 <input type='number' className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' name='year' onBlur={formik.handleBlur}onChange={formik.handleChange} value={formik.values.year} ></input>{formik.errors.year && formik.touched.year?<span className='text-red-400 text-left'>{formik.errors.year}</span>:null}
                 
                 <br/><br/>
                 <label htmlFor='publisher' className='float-left text-[#7e22ce] font-bold' >Publisher</label><br/>
                 <input type='text' className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' name='publisher' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.publisher} ></input>
                 {formik.errors.publisher && formik.touched.publisher?<span className='text-red-400 text-left'>{formik.errors.publisher}</span>:null}
                 <br/><br/>
                 <label htmlFor='isbn' className='float-left text-[#7e22ce] font-bold' >ISBN</label><br/>
                 <input type='text' className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' name='isbn' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.isbn} ></input>
                 {formik.errors.isbn && formik.touched.isbn?<span className='text-red-400 text-left'>{formik.errors.isbn}</span>:null}
                 <br/><br/>
                 <label htmlFor='edition' className='float-left text-[#7e22ce] font-bold' >Edition</label><br/>
                 <input type='text' className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' name='edition' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.edition} ></input>
                 {formik.errors.edition && formik.touched.edition?<span className='text-red-400 text-left'>{formik.errors.edition}</span>:null}
                 <br/><br/>
                 <label htmlFor='coAuthors' className='float-left text-[#7e22ce] font-bold' >CoAuthors</label><br/>
                 <input type='text' className='rounded border-2 border-[#7e22c3] float-left mt-1 w-[70%]' name='coAuthors' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.coAuthors} ></input>
                 {formik.errors.coAuthors && formik.touched.coAuthors?<span className='text-red-400 text-left'>{formik.errors.coAuthors}</span>:null}
                 <br/><br/>
                 <button type='submit' className=' font-bold float-left cursor-pointer bg-[#7e22c3] text-white py-2 px-5 rounded '>Submit</button>
                 </form>
                 
                </div>
            </div>
        </div>
        </div>
    );}else return null;
}

export default Add;