const conference = require('../Collections/Conference/conference');
const conferencePublication= require('../Collections/Conference/ConferencePublication')
const app = require('express');
const router = app.Router();

const checkUser = require('../LoginMiddleware/checkUser');

// Route 1 : Add conference 
router.post('/addConference', checkUser, async (req, res) => {
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
            return res.status(400).json({Error:"Duplicate entry detected.Please check If you have already entered these details."})
        }
        const conferenceData=await conferencePublication.create({
            FID:FID,
            CID:checkCid._id,
            Year:new Date(`${Year}`),
            CoAuthors:CoAuthors,
            Proceedings:Proceedings,
            PaperTitle:PaperTitle
        })
        return res.status(200).json(conferenceData);
    } catch (err) {
       return res.status(400).json({ Error: "Internal server error.", err });
    }
})

// Route 2: READ 
router.get('/readConferences',checkUser,async (req,res)=>{
    // First I need to fetch conference Id written by the faculty from conferencePublication
    const FID=req.user.id; 
    const CID=await conferencePublication.find({FID:FID}).select('CID');
    // console.log(BID);
    // Find conferences from conference table with the fetched id 
    const Conference=await conferencePublication.find().populate('CID').populate('FID');
    // console.log(conference)

    // Extract required data 
    const result = Conference.map((value,index)=>{
        return {
            conferenceName:Conference[index].CID.Name,
            CID:Conference[index].CID.CID,
            Organizer:Conference[index].CID.Organizer,
            CoAuthors:Conference[index].CoAuthors,
            Proceedings:Conference[index].Proceedings,
            Paper_Title:Conference[index].PaperTitle,
            Year:Conference[index].Year.getFullYear()
        };
    })
    return res.json(result);
})
module.exports = router;