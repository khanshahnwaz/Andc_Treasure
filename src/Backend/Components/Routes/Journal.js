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
        // FID and Volume altogether should be unqiuely identify each row 
        const checkPublication = await journalPublication.findOne({FID:FID,Volume:Volume});
        if(checkPublication){
            return res.status(400).json({Error:"Duplicate entry detected.Please check If you have already entered these details."})
        }
        const journalData=await journalPublication.create({
            FID:FID,
            JID:checkJid._id,
            Year:new Date(`${Year}`),
            CoAuthors:CoAuthors,
            Volume:Volume,
            PaperTitle:PaperTitle
        })
        return res.status(200).json(journalData);
    } catch (err) {
       return res.status(400).json({ Error: "Internal server error.", err });
    }
})


// Route 2: Read Journals 
router.get('/readJournals',checkUser,async (req,res)=>{
    // First I need to fetch journal Id written by the faculty from journalPublication
    const FID=req.user.id; 
    const JID=await journalPublication.find({FID:FID}).select('JID');
    // Find journals from journal table with the fetched id 
    const Journal=await journalPublication.find().populate('JID').populate('FID');
    // console.log(journal)

    // Extract required data 
    const result = Journal.map((value,index)=>{
        return {
            JournalName:Journal[index].JID.Name,
            ISSN:Journal[index].JID.ISSN,
            Publisher:Journal[index].JID.Publisher,
            CoAuthors:Journal[index].CoAuthors,
            Volume:Journal[index].Volume,
            Year:Journal[index].Year.getFullYear()
        };
    })
    return res.json(result);
})

module.exports = router;