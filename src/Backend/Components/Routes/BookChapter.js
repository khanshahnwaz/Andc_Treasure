const publicationType=require('../Collections/PublicationType/PublicationType')
const bookChapter=require('../Collections/Book/BookChapter')
const app=require('express')
const router=app.Router();
const checkUser=require('../LoginMiddleware/checkUser')

// CREATE bookChapter
router.post('/addChapter',checkUser,async(req,res)=>{
    const FID = req.user.id;

    //   find if user is adding publication or chapter
    const{Name, Year,Publisher,ISPN}=req.body;

     // extract chapter information
     const{ChapterTitle,BookTitle,Editor,Edition,Area}=req.body;

      // check if publication is already added in publication type or not 
    // flag to track if the publication type is new or old
    let pubFlag=true;
    let PID;

    if(await publicationType.findOne({ISPN:ISPN})){
        console.log("This publication already exists.")
        PID=await publicationType.findOne({ISPN:ISPN})
        pubFlag=false;
     }

     const {chapterTitle}=req.body;
    //   False means, publication type already exists and we have the PID
       if(!pubFlag){ 
        if(await bookChapter.findOne({PID:PID,FID:FID,ChapterTitle:ChapterTitle})){
            return res.json({"Message":"Duplicate entry.BookTitle already exists."})
        }
    }

    if(pubFlag){ // if publication type is new then create new entry else ignore
        console.log("creating new publication type.")
        PID= await publicationType.create(
        {
           Type:"BOOK",
           Name:Name,
           Year:new Date(`${Year}`),
           Publisher:Publisher,
           ISPN:ISPN 
        }
    )}
    console.log("PID is ",PID)
    
    await bookChapter.create(
        {
            PID:PID,
            FID:FID,
            ChapterTitle:ChapterTitle,
            BookTitle:BookTitle,
            Editor:Editor,
            Edition:Edition,
            Area:Area

        }
    )
    return res.json({"Message":"Book Chapter added successfully."})

}
)

// READ bookChapters

router.get('/readChapters',checkUser,async(req,res)=>{
    const FID=req.user.id;
    // Match FID and type==Chapter and fetch PID
    const PID=await publicationType.find({FID:FID,Type:"BOOK"}).select('_id');
    const data=await bookChapter.find({FID:FID,PID:PID}).populate('PID');
    const result=data.map((item,i)=>{
        return {
        BookName:data[i].PID.Name,
        BookTitle:data[i].BookTitle,
        ChapterTitle:data[i].ChapterTitle,
        Edition:data[i].Edition,
        Publisher:data[i].PID.Publisher,
        Editor:data[i].Editor,
        ISBN:data[i].PID.ISPN,
        Year:data[i].PID.Year.getFullYear(),
        Area:data[i].Area}

    })
    return res.json(result);
})

// UPDATE BookChapters
router.put('/updateChapters',checkUser,async(req,res)=>{
    const FID=req.user.id;
    let {ISPN,ChapterTitle,NewChapterTitle,BookTitle,Edition,Editor,Area}=req.body;
    // find the PID of requested chapter
    const PID=await publicationType.findOne({ISPN:ISPN}).select('_id');
    
     try{
    await bookChapter.updateOne({PID:PID,FID:FID,ChapterTitle:ChapterTitle},{
        ChapterTitle:NewChapterTitle,
        BookTitle:BookTitle,
        Edition:Edition,
        Editor:Editor,
        Area:Area
    })
}catch(err){
    return res.json(err)
}
NewChapterTitle?ChapterTitle=NewChapterTitle:ChapterTitle;
const chapter=await bookChapter.findOne({PID:PID,FID:FID,ChapterTitle:ChapterTitle});
return res.json(chapter)
})


// DELETE bookChapters
router.delete('/deleteChapters',checkUser,async(req,res)=>{
    const FID=req.user.id;
    const {ISPN,ChapterTitle}=req.body;
    const PID=await publicationType.findOne({ISPN:ISPN}).select('_id');
    console.log(PID)
   // if PID does not exist or has already been deleted.
    if(!PID){
        return res.json({"Message":"Publication not found."})
    }
   
    try{
        // if chapter does not exist or has already been deleted.
        if(!await bookChapter.findOne({FID:FID,PID:PID,ChapterTitle:ChapterTitle}))
        {
            return res.json({"Message":"Chapter not found."})
        }
    
        await bookChapter.deleteOne({FID:FID,PID:PID,ChapterTitle:ChapterTitle});
    }catch(err){
        console.log("Generated error is",err)
        return res.json(err)
    }
    return res.json({"Message":"Chapter deleted successfully."})
})
module.exports=router;