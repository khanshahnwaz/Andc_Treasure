import search from './search.png'
import Book from '../Publications/Publication';
import Left from './Left';
import Right from './Right';
import Center from './Center';
import PublicationSlider from '../PublicationSlider/PublicationSlider';
import ResNav from './ResNav';
import { useState } from 'react';
import {FiUser} from "react-icons/fi";
import Setting from '../Settings/Setting';

const About=()=>{
    const [style,setStyle]=useState('opacity-0')
    const[openSetting,setOpenSetting]=useState(false);
    
    return (
        <>
        <ResNav/>
        <button className='md:hidden px-3 py-1 bg-black text-white rounded-md absolute top-14 right-2 ' onClick={()=>style=='opacity-0'?setStyle('opacity-100'):setStyle('opacity-0')}><FiUser/></button>
        <div className='relative'>
            
       <div className="border-8 border-black rounded-xl md:m-2 md:flex w-full  absolute top-20 md:static">
        {/* left box  */}
        
        <Left setOpenSetting={setOpenSetting} openSetting={openSetting}/>
       
        {/* second box  */}
        <PublicationSlider/>
        {openSetting?<Setting openSetting={openSetting} setOpenSetting={setOpenSetting}/>:<Center
        />}
        
        {/* Right box  */}
       <Right style={style}/>
       </div> 
       </div>
       </>
    );
}
export default About;