const publicationType=require('../Collections/PublicationType/PublicationType')
const journal=require('../Collections/Journal/JournalPublication')
const app=require('express')
const router=app.Router();
const checkUser=require('../LoginMiddleware/checkUser')

// CREATE journal
router.post('/addJournal',checkUser,async(req,res)=>{
    const FID = req.user.id;

    //   find if user is adding publication or chapter
    const{Name, Year,Publisher,ISPN}=req.body;

     // extract chapter information
     const{Title,NewTitle,ISSN,Volume,CorrespondingAuthor,FirstAuthor,CoAuthors}=req.body;

      // check if publication is already added in publication type or not 
    // flag to track if the publication type is new or old
    let pubFlag=true;
    let PID;

    if(await publicationType.findOne({ISPN:ISPN})){
        console.log("This publication already exists.")
        PID=await publicationType.findOne({ISPN:ISPN})
        pubFlag=false;
     }

    //   False means, publication type already exists and we have the PID
       if(!pubFlag){ 
        if(await journal.findOne({PID:PID,FID:FID,Title:Title})){
            return res.json({"Message":"Duplicate entry.Title already exists."})
        }
    }

    if(pubFlag){ // if publication type is new then create new entry else ignore
        console.log("creating new publication type.")
        PID= await publicationType.create(
        {
           Type:"JOURNAL",
           Name:Name,
           Year:new Date(`${Year}`),
           Publisher:Publisher,
           ISPN:ISPN 
        }
    )}
    console.log("PID is ",PID)
    
    await journal.create(
        {
            PID: PID,
            FID: FID,
            Title:Title,
            ISSN:ISSN,
            Volume:Volume,
            CorrespondingAuthor: CorrespondingAuthor,
            FirstAuthor: FirstAuthor,
            CoAuthors: CoAuthors

        }
    )
    return res.json({"Message":"Journal added successfully."})

}
)

// READ bookChapters

router.get('/readJournals',checkUser,async(req,res)=>{
    const FID=req.user.id;
    // Match FID and type==Chapter and fetch PID
    const PID=await publicationType.find({FID:FID,Type:"JOURNAL"}).select('_id');
    const data=await journal.find({FID:FID,PID:PID}).populate('PID');
    const result=data.map((item,i)=>{
        return {
            JournalName: data[i].PID.Name,
            Title: data[i].Title,
            ISSN: data[i].PID.ISPN,
            Publisher: data[i].PID.Publisher,
            Volume:data[i].Volume,
            CorrespondingAuthor: data[i].CorrespondingAuthor,
            FirstAuthor: data[i].FirstAuthor,
            CoAuthors: data[i].CoAuthors,
            Year:data[i].PID.Year.getFullYear()
        }

    })
    return res.json(result);
})

// UPDATE journal
router.put('/updateJournal',checkUser,async(req,res)=>{
    const FID=req.user.id;
    let { ISPN, Title, NewTitle,ISSN,Volume, CorrespondingAuthor, FirstAuthor,  CoAuthors } = req.body;
    // find the PID of requested chapter
    const PID=await publicationType.findOne({ISPN:ISPN}).select('_id');
    
     try{
        await journal.updateOne(
            { PID: PID, FID: FID, Title: Title }, {
            Title:NewTitle,
            Volume:Volume,
            ISSN:ISSN,
            CorrespondingAuthor: CorrespondingAuthor,
            FirstAuthor: FirstAuthor,
            CoAuthors: CoAuthors
        })
}catch(err){
    return res.json(err)
}
NewTitle?Title=NewTitle:Title;
const chapter=await journal.findOne({PID:PID,FID:FID,Title:Title});
return res.json(chapter)
})


// DELETE Journals
router.delete('/deleteJournal',checkUser,async(req,res)=>{
    const FID=req.user.id;
    const {ISPN,Title}=req.body;
    console.log(req.body)
    const PID=await publicationType.findOne({ISPN:ISPN}).select('_id');
    console.log(PID)
   // if PID does not exist or has already been deleted.
    if(!PID){
        return res.json({"Message":"Publication not found."})
    }
   
    try{
        // if chapter does not exist or has already been deleted.
        if(!await journal.findOne({FID:FID,PID:PID,Title:Title}))
        {
            return res.json({"Message":"Journal not found."})
        }
    
        await journal.deleteOne({FID:FID,PID:PID,Title:Title});
    }catch(err){
        console.log("Generated error is",err)
        return res.json(err)
    }
    return res.json({"Message":"Journal deleted successfully."})
})
module.exports=router;