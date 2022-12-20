import { useEffect, useState ,useReducer} from "react";
import edit from '../Assets/edit.png'
import del from '../Assets/delete.png';
import view from '../Assets/view.png';
import { useContext } from "react";
import { PublicationContext } from "../../Context/PublicationState";
import EditBook from "../EditPublication/EditBook";
import EditJournal from "../EditPublication/EditJournal";
import EditConference from "../EditPublication/EditConference";
import AddJournal from "../AddPublication/AddJournal";
import AddConference from "../AddPublication/AddConference";
import AddBook from '../AddPublication/AddBook'
import DeleteBook from "../DeletePublication/DeleteBook";
import DeleteJournal from "../DeletePublication/DeleteJournal";
import DeleteConference from "../DeletePublication/DeleteConference";
import { Link } from "react-router-dom";
import Successful from "../Modals/Successful";
import Error from "../Modals/Error";
import DetailedPublication from '../Modals/DetailedPublication'
const Book = (props) => {
    console.log("I am here again.")
    const context=useContext(PublicationContext)

    // state to keep the data fetched from the database
    const [data, setData] = useState([]);
// state to keep detailed data to print detailed card
const [detailedData,setDetailedData]=useState({})
    const addPublication=()=>{
        const publication=props.name;
        if(publication=='Books'){
            // console.log("Display book form.")
            context.setAddBook(true)
        }else if(publication=='Journals'){
            console.log("Journal form.")
            context.setAddJournal(true)
        }else if(publication=='Conferences'){
            context.setAddConference(true)
        }
    }
    let localUrl=`http://localhost:3001/home/faculty/${props.url}`
    const fetchData = async () => {
        const data = await fetch(localUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        const result = await data.json();
        // console.log(result)
        setData(result)
        
    }
    useEffect(() => { fetchData() },[]);
    

    const element = data.map((item,i) => {
        return (

        <tr  className="p-2 font-semibold border-2 border-black h-10 odd:bg-[#7e22ce] odd:text-white" key={i}>
           

            <td className="border-2 border-black">{item.Name}</td>
            <td className="border-2 border-black">{item.Publisher}</td>
            <td className="border-2 border-black">{item.ID}</td>
            <td className="border-2 border-black">{item.Edition}</td>
            <td className="border-2 border-black">{item.Year}</td>
            <td className="border-2 border-black"><img src={del} className=' hover:opacity-50 inline hover:cursor-pointer' alt='deletePublication' name='delete'/> <img src={edit} className='inline hover:cursor-pointer hover:opacity-50' alt='editPublication' name='edit'/> 
            <img src={view} className='inline hover:cursor-pointer hover:opacity-50 px-1' alt='editPublication' name='view'/></td>

        </tr>)
    })
    

    // function to delete or update the publication,according to user click
    

    const deleteOrUpdate=(event)=>{

// third children contains the ISBN data
    context.setTargetId(event.target.parentElement.parentElement.children[2].innerText)
    context.setTargetPublication(event.target.parentElement.parentElement.children[3].innerText)
 console.log(event.target.parentElement.parentElement.children[3].innerText)


        if(event.target.name=='delete'){
            if(props.name=='Books')
             context.setCallDeleteBook(true)
            else if(props.name=='Journals')
             context.setCallDeleteJournal(true)
            else if(props.name=='Conferences')
               context.setCallDeleteConference(true)
            
        }
        else if(event.target.name=='edit'){
            console.log("Editbook Called.")
            if(props.name=='Books')
             context.setCallEditBook(true)
            else if(props.name=='Journals')
             context.setCallEditJournal(true)
            else if(props.name=='Conferences')
               context.setCallEditConference(true)
        } else if(event.target.name=='view'){
              console.log("Hello I am view clicked")
              console.log("Target publiation editon is",context.targetPublication)
              const pub=data.filter((item)=>{
                console.log(item.Edition)
                   if(item.Edition==context.targetPublication){
                      setDetailedData(item)
                      context.setCallDetailedPublication(true);
                    return item;
                   }else console.log("invalid publication.")
              })
              
              console.log("Detailed data of the publication is",detailedData)
              
        }else console.log("Unable to fetch target name.")
        
    }
    
    return (
        <div className="mt-10 px-10 w-[60%]">
            {/* <DetailedPublication/> */}
            <DetailedPublication data={detailedData} editUrl={props.editUrl}/>
            {/* Add publication */}
            <AddBook/>
            <AddJournal/>
            <AddConference/>
             
             {/* Edit Publication */}
             <EditBook backUrl={props.backUrl}/>
             <EditJournal backUrl={props.backUrl}/>
             <EditConference backUrl={props.backUrl}/>

             {/* Delete Publication */}
             <DeleteBook backUrl={props.backUrl}/>
             <DeleteJournal backUrl={props.backUrl}/>
             <DeleteConference backUrl={props.backUrl}/>

             {/* Feedback */}
             <Error url={props.backUrl}/>
             <Successful url='/profile'/>
            
            {/* backUrl contains the url that will render the bookDetails page.
            <Confirmtion message={context.warningMessage} url={props.backUrl} editUrl='book/editBook'/> */}
            <div className="flex justify-between">
                <div>
                    <p className="text-3xl font-bold tracking-wide text-left">{props.name}</p>
                    <p className="text-sm  text-left">{element.length} {props.name}</p>
                </div>
                <div>
                    <button className='bg-[#7e22ce] text-white text-sm sm:text-base rounded-2xl py-1 sm:px-3 px-2  hover:opacity-50' onClick={addPublication}>Add {props.name}+</button>
                </div>
            </div>
        
            <div className="mt-8 mx-2"><input type='text' placeholder='Search your file' className='border-2 px-4 py-2 rounded-xl w-full text-left active:border-black active:shadow-md float-left'></input></div>
            <Link to='/profile'><button className='bg-[#7e22ce] text-white text-sm sm:text-base rounded-2xl py-1 sm:px-3 px-2  hover:opacity-50 float-left mt-2' >Back</button></Link>
            <div className="my-5 ">
                <table className="w-full shadow-xl text-center mx-2 relative top-12 h-32 " onClick={(event)=>deleteOrUpdate(event)}>
                    <thead className="border-2 border-black  ">
                       <tr>
                        <th>{props.name} Name</th>
                        <th>{props.publisher}</th>
                        <th>{props.id}</th>
                        <th>{props.edition}</th>
                        <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                    {element}
                    </tbody>
                    
                </table>
            </div>
        </div>
    );
}
export default Book;