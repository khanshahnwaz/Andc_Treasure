const journal = require('../Collections/Journal/Journal');
const journalPublication= require('../Collections/Journal/JournalPublication')
const app = require('express');
const router = app.Router();

const checkUser = require('../LoginMiddleware/checkUser');

// Route 1 : Add Journals 
router.post('/addJournal', checkUser, async (req, res) => {
    const { Name, Year, CoAuthors, Publisher, ISSN, Volume,PaperTitle } = req.body;
    const FID = req.user.id;
    
    try {

        //   Check if this journal Id is present in the database 
        let checkJid=await journal.findOne({ISSN:ISSN});
        if(!checkJid){
            const journalData=await journal.create({
                Name:Name,
                ISSN:ISSN,
                Publisher:Publisher
            })
        }
     checkJid=await journal.findOne({ISSN:ISSN});

        // Add publication details 
        // FID and Volume together should be unqiuely identify each row 
        const checkPublication = await journalPublication.findOne({FID:FID,Volume:Volume});
        if(checkPublication){
            console.log("Duplicated journal entry.")
            return res.json({Message:"Duplicate entry detected.Please check If you have already entered these details."})
        }
        const journalData=await journalPublication.create({
            FID:FID,
            JID:checkJid._id,
            Year:new Date(`${Year}`),
            CoAuthors:CoAuthors.split(" "),
            Volume:Volume,
            PaperTitle:PaperTitle
        })
        return res.status(201).json({Message:"Journal added.",status:201});
    } catch (err) {
       return res.status(400).json({Message: "Internal server error.", err });
    }
})


// Route 2: Read Journals 
router.get('/readJournals',checkUser,async (req,res)=>{
    // First I need to fetch journal Id written by the faculty from journalPublication
    const FID=req.user.id; 
    const JID=await journalPublication.find({FID:FID}).select('JID');
    // Find journals from journal table with the fetched id 
    const Journal=await journalPublication.find({FID:FID}).populate('JID').populate('FID');
    console.log(Journal)

    // Extract required data 
    const result = Journal.map((value,index)=>{
        return {
            Name:Journal[index].JID.Name,
            ID:Journal[index].JID.ISSN,
            Publisher:Journal[index].JID.Publisher,
            CoAuthors:Journal[index].CoAuthors,
            Edition:Journal[index].Volume,
            Year:Journal[index].Year.getFullYear()
        };
    })
    return res.json(result);
})

// Route 3 : Delete journal 
router.delete('/deleteJournal', checkUser, async (req, res) => {
    // TO delete any journal, we need to check if that bid is pointing to some other Volume in Publication table which is not intented to delete. In this case, delete the Volume only not the journal from the journal table. If the journal has only one Volume then delete the journal as well if it's only Volume is being deleted.
    //   console.log("This is me.")
    const { ISSN, Volume } = req.body.deleteData;
    const JID=await journal.findOne({ISSN:ISSN}).select('_id')
    const FID = req.user.id;
    //    check if this journal is there in publications
    const publication = await journalPublication.findOne({ JID: JID, Volume: Volume })
    if (!publication) {
        return res.json({ Message: "journal not found." })
    }

    // check if the requested user has wriiten this publication
    if (publication.FID != FID) {
        return res.json({ Message: "Unauthorized." })
    }
    // check if another Volume of this journal is in database or not
    // if not then delete it's details from journal table as well 
    //  else delete from journalPublication only.
    const countBid = await journalPublication.find({ JID: JID });
    if (countBid.length == 1) {
        console.log("No another copy of this journal is found.");
        try{
        await journalPublication.deleteOne({Volume:Volume})
        await journal.deleteOne({CID:CID})
        }catch(err){
            console.log("Error while deleting the journal",err)
            return res.json({Message:"Internal server error."})
        }
        
    }else{
        try{
            await journalPublication.deleteOne({Volume:Volume})
        }catch(err){
            console.log("Error while deleting the journal",err)
            return res.json({Message:"Internal server error."}) 
        }
    }
    return res.json({ Message:"Publication deleted successfully.",status:200 })

})


// Route 4:Update the journal Publicaiton
router.put('/editJournal', checkUser, async (req, res) => {
    try {
        const newData = req.body;
        console.log("Data for editJournal is",newData)
        // first fetch the bookId from the book collection
        const JID = await journal.findOne({ISSN: newData.Jid }).select('_id')
        if (!JID) {
            return res.status(204).json({ Message: "Not found.", status: 204 })
        }
        console.log("Requested journal is", JID)
        console.log("Requested faculty is", req.user.id)
        console.log("Requested Volume is", newData.OldVolume)
        console.log("updated year is", newData.Year)
        // check if the new volume already exists.If it is so then don't add it
        const checkVol=await journalPublication.findOne({Volume:newData.Volume});
        if(checkVol){
            return res.json({Message:"New volume already exists."})
        }
        // now upate the requested publication by matching the old Volume
        const result = await journalPublication.updateOne({ JID: JID._id, Volume: newData.OldVolume, FID: req.user.id }, {
            Year: new Date(`${newData.Year}`),
            Volume: newData.Volume,
            CoAuthors: newData.CoAuthors,
            Volume:newData.Volume
        });
        console.log(result)
        if (result.modifiedCount != 0)
            return res.status(200).json({ Message: "Edited Successfully", status: 200 })
        else return res.json({ Message: "Couldn't find the requested publication." })
    } catch (err) {
        return res.status(400).json({ Message: "Internal server error.", err, status: 400 });
    }

})

module.exports = router;