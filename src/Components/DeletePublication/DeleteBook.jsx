import React, { useContext } from 'react'
import { PublicationContext } from '../../Context/PublicationState'
import Confirmtion from '../Modals/Confirmtion'

const DeleteBook = (props) => {
  const context=useContext(PublicationContext)
  
  if(context.callDeleteBook!=false){
    console.log("I am in callDeleteBook component.")
    // context.setEditData({
    //   ISBN:context.targetId,
    //   Edition:context.targetPublication
    // })
    context.setWarningMessage('delete')
  return (
    <Confirmtion url={props.backUrl} delUrl='book/deleteBook' message='delete' id='ISBN' pub='Edition'/>
  )
}else return null;
}

export default DeleteBook;