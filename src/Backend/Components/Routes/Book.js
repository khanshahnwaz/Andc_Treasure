const book = require('../Collections/Book/Book');
const bookPublication= require('../Collections/Book/BookPublication')
const app = require('express');
const router = app.Router();

const checkUser = require('../LoginMiddleware/checkUser');


// Route 1: CREATE .
router.post('/addBook', checkUser, async (req, res) => {
    const { Name, Year, CoAuthors, Publisher, ISBN, Edition } = req.body;
    const FID = req.user.id;
    console.log(Year);
    try {

        //   Check if this book Id is present in the database 
        let flag=true; //check if the book is new or not 
        let checkBid=await book.findOne({ISBN:ISBN});
        if(!checkBid){
            flag=false;
            const BookData=await book.create({
                Name:Name,
                ISBN:ISBN,
                Publisher:Publisher
            })
        }
     checkBid=await book.findOne({ISBN:ISBN});

        // Add publication details 
        // FID and edition altogether should be unqiuely identify each row 
        const checkPublication = await bookPublication.findOne({FID:FID,Edition:Edition});
        if(checkPublication && flag ){ //May be same details but different book
            return res.status(400).json({Error:"Duplicate entry detected.Please check If you have already entered these details."})
        }
        const BookData=await bookPublication.create({
            FID:FID,
            BID:checkBid._id,
            Year:new Date(`${Year}`),
            CoAuthors:CoAuthors,
            Edition:Edition
        })
        return res.status(200).json(BookData);
    } catch (err) {
       return res.status(400).json({ Error: "Internal server error.", err });
    }
})


// Route 2: READ 
router.get('/readBooks',checkUser,async (req,res)=>{
    // First I need to fetch Book Id written by the faculty from BookPublication
    const FID=req.user.id; 
    const BID=await bookPublication.find({FID:FID}).select('BID');
    console.log(BID);
    // Find books from BOOK table with the fetched id 
    const Book=await bookPublication.find().populate('BID').populate('FID');
    // console.log(Book)

    // Extract required data 
    const result = Book.map((value,index)=>{
        return {
            BookName:Book[index].BID.Name,
            ISBN:Book[index].BID.ISBN,
            Publisher:Book[index].BID.Publisher,
            CoAuthors:Book[index].CoAuthors,
            Edition:Book[index].Edition,
            Year:Book[index].Year.getFullYear()
        };
    })
    return res.json(result);
})
module.exports = router;