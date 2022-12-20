import React, { useContext } from 'react'
import { PublicationContext } from '../../Context/PublicationState'
import Confirmtion from '../Modals/Confirmtion'

const DeleteConference = (props) => {
  const context=useContext(PublicationContext)
  
  if(context.callDeleteConference!=false){
    // context.setEditData({
    //   CID:context.targetId,
    //   Proceeding:context.targetPublication
    // })
    context.setWarningMessage('delete')

  return (
    <Confirmtion url={props.backUrl} delUrl='conference/deleteConference' message='delete' id='CID' pub='Proceeding'/>
  )
  }else return null;
}

export default DeleteConference;