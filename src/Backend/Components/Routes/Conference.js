const conference = require('../Collections/Conference/conference');
const conferencePublication= require('../Collections/Conference/ConferencePublication')
const app = require('express');
const router = app.Router();

const checkUser = require('../LoginMiddleware/checkUser');

// Route 1 : Add conference 
router.post('/addConference', checkUser, async (req, res) => {
    console.log("Requested body is",req.body)
    const { Name, Year, CoAuthors, Organizer, CID, Proceedings,PaperTitle } = req.body;
    const FID = req.user.id;
    
    try {

        //   Check if this conference Id is present in the database 
        let flag=true; //check if the conference is new or not 

        let checkCid=await conference.findOne({CID:CID});
        if(!checkCid){
            const conferenceData=await conference.create({
                Name:Name,
                CID:CID,
                Organizer:Organizer
            })
        }
     checkCid=await conference.findOne({CID:CID});

        // Add publication details 
        // FID and Proceedings altogether should be unqiuely identify each row 
        const checkPublication = await conferencePublication.findOne({FID:FID,Proceedings:Proceedings});
        if(checkPublication && flag){
            return res.status(400).json({Message:"Duplicate entry detected.Please check If you have already entered these details."})
        }
        const conferenceData=await conferencePublication.create({
            FID:FID,
            CID:checkCid._id,
            Year:new Date(`${Year}`),
            CoAuthors:CoAuthors.split(" "),
            Proceedings:Proceedings,
            PaperTitle:PaperTitle
        })
        return res.status(200).json({Message:"Conference added.",status:201});
    } catch (err) {
       return res.status(400).json({ Message: "Internal server error.", err });
    }
})

// Route 2: READ 
router.get('/readConferences',checkUser,async (req,res)=>{
    // First I need to fetch conference Id written by the faculty from conferencePublication
    
    const FID=req.user.id; 
    const CID=await conferencePublication.find({FID:FID}).select('CID');
    // console.log(BID);
    // Find conferences from conference table with the fetched id 
    const Conference=await conferencePublication.find({FID:FID}).populate('CID').populate('FID');
    // console.log(conference)

    // Extract required data 
    const result = Conference.map((value,index)=>{
        return {
            Name:Conference[index].CID.Name,
            ID:Conference[index].CID.CID,
            Publisher:Conference[index].CID.Organizer,
            CoAuthors:Conference[index].CoAuthors,
            // for display purpose, proceeding is sent as edition
            Edition:Conference[index].Proceedings,
            Paper_Title:Conference[index].PaperTitle,
            Year:Conference[index].Year.getFullYear()
        };
    })
    return res.json(result);
})

// Route 3 : Delete conference 
router.delete('/deleteConference', checkUser, async (req, res) => {
    // TO delete any conference, we need to check if that bid is pointing to some other Proceeding in Publication table which is not intented to delete. In this case, delete the Proceeding only not the conference from the conference table. If the conference has only one Proceeding then delete the conference as well if it's only Proceeding is being deleted.
    //   console.log("This is me.")
    const { CID, Proceeding } = req.body.deleteData;
    const C_ID=await conference.findOne({CID:CID}).select('_id')
    const FID = req.user.id;
    //    check if this conference is there in publications
    const publication = await conferencePublication.findOne({ CID: C_ID, Proceeding: Proceeding })
    if (!publication) {
        return res.json({ Message: "Conference not found." })
    }

    // check if the requested user has wriiten this publication
    if (publication.FID != FID) {
        return res.status(400).json({ Message: "Unauthorized." })
    }
    // check if another Proceeding of this conference is in database or not
    // if not then delete it's details from conference table as well 
    //  else delete from conferencePublication only.
    const countBid = await conferencePublication.find({ CID: C_ID });
    if (countBid.length == 1) {
        console.log("No another copy of this conference is found.");
        try{
        await conferencePublication.deleteOne({Proceedings:Proceeding})
        await conference.deleteOne({CID:CID})
        }catch(err){
            console.log("Error while deleting the conference",err)
            return res.json({Message:"Internal server error."})
        }
        
    }else{
        try{
            await conferencePublication.deleteOne({Proceedings:Proceeding})
        }catch(err){
            console.log("Error while deleting the conference",err)
            return res.json({Message:"Internal server error."}) 
        }
    }
    return res.json({ Message:"Publication deleted successfully.",status:200 })

})


// Route 4:Update the Conference Publicaiton
router.put('/editConference', checkUser, async (req, res) => {
    try {
        const newData = req.body;
        console.log(newData)
        // first fetch the bookId from the conference collection
        const CID = await conference.findOne({CID: newData.Cid }).select('_id')
        if (!CID) {
            return res.status(204).json({ Message: "Not found.", status: 204 })
        }
        console.log("Requested journal is", CID)
        console.log("Requested faculty is", req.user.id)
        console.log("Requested Proceeding is", newData.OldProceeding)
        console.log("updated year is", newData.Year)
        // now upate the requested publication by matching the old Proceeding
        const result = await conferencePublication.updateOne({ CID: CID._id, Proceedings: newData.OldProceeding, FID: req.user.id }, {
            Year: new Date(`${newData.Year}`),
            Proceedings: newData.Proceeding,
            CoAuthors: newData.CoAuthors,
            PaperTitle:newData.PaperTitle
        });
        console.log(result)
        if (result.modifiedCount != 0)
            return res.status(200).json({ Message: "Edited Successfully", status: 200 })
        else return res.json({ Message: "Couldn't find the requested publication." })
    } catch (err) {
        console.log("Error is ",err)
        return res.status(400).json({ Message: "Internal server error.", err, status: 400 });
    }

})
module.exports = router;