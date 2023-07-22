import React, { useContext } from 'react'
import { PublicationContext } from '../../Context/PublicationState'
import Confirmtion from '../Modals/Confirmtion'

const DeleteChapter = (props) => {
  const context=useContext(PublicationContext)
  
  if(context.callDeleteChapter!=false){
    console.log("I am in callDeleteChapter component.")
    // context.setEditData({
    //   ISBN:context.targetId,
    //   Edition:context.targetPublication
    // })
    context.setWarningMessage('delete')
  return (
    <Confirmtion url={props.backUrl} delUrl='BookChapter/deleteChapter' message='delete' id='ISBN' pub='Title'/>
  )
}else return null;
}

export default DeleteChapter;