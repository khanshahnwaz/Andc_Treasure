import search from './search.png'
import Book from '../Publications/Publication';
import Left from './Left';
import Right from './Right';
import Center from './Center';

const About=()=>{
    return (
       <div className="border-8 border-black rounded-xl m-2 flex">
        {/* left box  */}
        <Left/>

        {/* second box  */}
        <Center/>
        {/* Right box  */}
       <Right/>
       </div> 
    );
}
export default About;