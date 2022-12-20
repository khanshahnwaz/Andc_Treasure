import React, { useContext } from 'react'
import { PublicationContext } from '../../Context/PublicationState'
import Confirmtion from '../Modals/Confirmtion'

const DeleteJournal = (props) => {
  const context=useContext(PublicationContext)
  
  if(context.callDeleteJournal!=false){
    // context.setEditData({
    //   ISSN:context.targetId,
    //   Volume:context.targetPublication
    // })
    context.setWarningMessage('delete')
  return (
    <Confirmtion url={props.backUrl} delUrl='journal/deleteJournal' message='delete' id='ISSN' pub='Volume'/>
  )
  }else return null;
}

export default DeleteJournal;