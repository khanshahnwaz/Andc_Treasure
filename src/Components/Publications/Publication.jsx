import { useEffect, useState ,useReducer} from "react";
import edit from '../Assets/edit.png'
import del from '../Assets/delete.png';
import { useContext } from "react";
import { PublicationContext } from "../../Context/PublicationState";
import EditBook from "../EditPublication/EditBook";
import EditJournal from "../EditPublication/EditJournal";
import EditConference from "../EditPublication/EditConference";
import EditChapter from "../EditPublication/EditChapter";
import AddJournal from "../AddPublication/AddJournal";
import AddConference from "../AddPublication/AddConference";
import AddBook from '../AddPublication/AddBook';
import AddChapter from "../AddPublication/AddChapter";
import DeleteBook from "../DeletePublication/DeleteBook";
import DeleteChapter from "../DeletePublication/DeleteChapter";
import DeleteJournal from "../DeletePublication/DeleteJournal";
import DeleteConference from "../DeletePublication/DeleteConference";
import { Link } from "react-router-dom";
import Successful from "../Modals/Successful";
import Error from "../Modals/Error";
import TableData from "./TableData";
// Tippy 
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import BookCard from "./Cards/BookCard";
import ChapterCard from "./Cards/ChapterCard"
import JournalCard from "./Cards/JournalCard";
import ConferenceCard from "./Cards/ConferenceCard";
const Book = (props) => {
    console.log("I am in publication details to print ",props.url)
    const context=useContext(PublicationContext)

    // state to keep the fetched keys to display in rows
    const[dataKeys,setDataKeys]=useState([]);
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
        }else if(publication=='Chapter'){
            context.setAddChapter(true)
        }
    }
    let localUrl=`${process.env.BASE_URL}home/faculty/${props.url}`
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
        console.log("Fetched data from the database is",result)
        setData(result)
        // setDataKeys(result.check)
        
    }
    useEffect(() => { fetchData() },[]);
    
    
    let [baseIndex,setBaseIndex]=useState(0);
    let [offset,setOffset]=useState(2);
    let  [page,setPage]=useState(0);
    // useEffect(()=>{
    //     setBaseIndex(()=>baseIndex+=5)
    //     setOffset(()=>offset+=5)
    // },[page])
    const element = data.map((item,i) => {
        console.log("Item recieved is ",item)
        // <BookCard dat={item}/>
        if(props.name=='Books'){
            console.log("It is time to show book details ");
            return <BookCard data={item} i={i}/>
        }else if(props.name=='Chapter'){
            return <ChapterCard data={item} i={i}/>
        }else if(props.name=='Journals'){
            return <JournalCard data={item} i={i}/>
        }else if(props.name=='Conferences'){
            return <ConferenceCard data={item} i={i}/>
        }
  
    })
    

    // function to delete or update the publication,according to user click
    

    const deleteOrUpdate=(event)=>{
    console.log("Edit or Delete button clicked for the following data: ")
// third children contains the ISBN data
    // context.setTargetId(event.target.parentElement.parentElement.children[3].innerText)
    context.setTargetId(event.target.parentElement.getAttribute('targetisbn'))
    // console.log("ID ",event.target.parentElement.getAttribute('targetisbn'))
    // context.setTargetPublication(event.target.parentElement.parentElement.children[4].innerText)
    context.setTargetPublication(event.target.parentElement.getAttribute('targettitle'))
//  console.log("Publication ",event.target.parentElement.targettitle)


        if(event.target.name=='delete'){
            if(props.name=='Books')
             context.setCallDeleteBook(true)
            else if(props.name=='Journals')
             context.setCallDeleteJournal(true)
            else if(props.name=='Conferences')
               context.setCallDeleteConference(true)
            else if(props.name=='Chapter')
                context.setCallDeleteChapter(true)
            
        }
        else if(event.target.name=='edit'){
            console.log("Edit Publication Called.")
            if(props.name=='Books'){
                data.map((item,i)=>{
                    // console.log(item)
                    // console.log("Item 4 ",item.Title," Context targetPublication ",context.targetPublication)
                    if(item.Title==context.targetPublication && item.ISBN==context.targetId)
                    context.setEditData(item)
                    // console.log("This is the item to be updated :",item)
                })

                context.setCallEditBook(true)

            }
            else if(props.name=='Chapter'){

                data.map((item,i)=>{
                    // console.log(item)
                    // console.log("Item 4 ",item.Title," Context targetPublication ",context.targetPublication)
                    if(item.ChapterTitle==context.targetPublication && item.ISBN==context.targetId)
                    context.setEditData(item)
                    // console.log("This is the item to be updated :",item)
                })
               context.setCallEditChapter(true)
            }
        
            else if(props.name=='Journals')
            {
                data.map((item,i)=>{
                    // console.log(item)
                    // console.log("Item 4 ",item.Title," Context targetPublication ",context.targetPublication)
                    if(item.Title==context.targetPublication && item.ISSN==context.targetId)
                    context.setEditData(item)
                    // console.log("This is the item to be updated :",item)
                })
                context.setCallEditJournal(true)

            }
            else if(props.name=='Conferences')
            {
                data.map((item,i)=>{
                    // console.log(item)
                    // console.log("Item 4 ",item.Title," Context targetPublication ",context.targetPublication)
                    if(item.PaperTitle==context.targetPublication && item.ISSN==context.targetId)
                    context.setEditData(item)
                    // console.log("This is the item to be updated :",item)
                })
                context.setCallEditConference(true)

            }
        } 
        
        else console.log("Unable to fetch target name.")
        
    }
 

    // Store book details 
    // console.log("Headers are ",props.data)
    const headers=props.data.map((item,i)=>{
        return(
            <th className="border-2 border-[#7e22ce]
            " key={i}>{item}</th>
        )
    })
    
    return (
        <div className="mt-10 px-10">
            {/* <DetailedPublication/> */}
            {/* Add publication */}
            <AddBook/>
            <AddJournal/>
            <AddConference/>
            <AddChapter/>
             
             {/* Edit Publication */}
             {context.callEditBook?<EditBook backUrl={props.backUrl}/>:null}
             {context.setCallEditJournal?<EditJournal backUrl={props.backUrl}/>:null}
             <EditConference backUrl={props.backUrl}/>
             {context.setCallEditChapter?<EditChapter backUrl={props.backUrl}/>:null}
             {/* Delete Publication */}
             <DeleteBook backUrl={props.backUrl}/>
             <DeleteChapter backUrl={props.backUrl}/>
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
            <div className="text-left">
            <Link to='/profile'><button className='bg-[#7e22ce] text-white text-sm sm:text-base rounded-2xl py-1 sm:px-3 px-2  hover:opacity-50  mt-2' >Back</button></Link>
            </div>
           
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5" onClick={(event)=>deleteOrUpdate(event)}>
                {element}
                </div>
           
       </div>
    );
}
export default Book;