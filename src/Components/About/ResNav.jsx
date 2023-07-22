import React, { useEffect } from 'react';
import './RestNav.css';
const ResNav =()=> {
    
    useEffect(()=>{
        let burger = document.getElementById('burger'),
          nav    = document.getElementById('main-nav'),
        slowmo = document.getElementById('slowmo');
   
   burger.addEventListener('click', function(e){
    // console.log("hfghf") 

       this.classList.toggle('is-open');
       nav.classList.toggle('is-open');
   });
   
//    slowmo.addEventListener('click', function(e){
//        this.classList.toggle('is-slowmo');
//    });
   
//    /* Onload demo - dirty timeout */
//    let clickEvent = new Event('click');
   
//    window.addEventListener('load', function(e) {
//        slowmo.dispatchEvent(clickEvent);
//        burger.dispatchEvent(clickEvent);
       
//        setTimeout(function(){
//            burger.dispatchEvent(clickEvent);
           
//            setTimeout(function(){
//                slowmo.dispatchEvent(clickEvent);
//            }, 3500);
//        }, 5500);
//    });
    })
      
  return (
    <div className='block md:hidden'> 
        {/* <button id="slowmo"> */}
            {/* Slow motion <span>mode</span> */}
            {/* </button>  */}

<div className="device"> 
	<div className="container">
		<button id="burger" className="open-main-nav">
			<span className="burger"></span>
			<span className="burger-text">Menu</span>  
		</button>      
		<nav className={`main-nav before:bg-black`} id="main-nav">     
			<ul>   
				<li className=''>
					<a href="">Home</a>
				</li>
				<li>
					<a href="">Recents</a>
				</li>
				<li>
					<a href="">Recycle bin</a> 
				</li>
				<li>
					<a href="">Contacts</a>
				</li> 
				<li>
					<a href="">Setting</a>
				</li>
                <li>
					<a href="">Contact Us</a>
				</li>
			</ul>
		</nav> 
		{/* <p className="notice">Design Copyright <strong>Stéphanie Walter</strong><br/><a href="https://stephaniewalter.design/" target="_blank">StephanieWalter.Design</a></p> */}
	</div>
</div></div> 
  )
}

export default ResNav;