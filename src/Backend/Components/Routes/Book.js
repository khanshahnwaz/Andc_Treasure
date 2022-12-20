const book = require('../Collections/Book/Book');
const bookPublication = require('../Collections/Book/BookPublication')
const faculty = require('../Collections/User')
const app = require('express');
const router = app.Router();

const checkUser = require('../LoginMiddleware/checkUser');


// Route 1: CREATE .
router.post('/addBook', checkUser, async (req, res) => {
    const { Name, Year, CoAuthors, Publisher, ISBN, Edition } = req.body;
    const FID = req.user.id;
    console.log(FID);
    try {
        // check if the user exists or not
        let checkFaculty = await faculty.findOne({ Id: FID })
        console.log("Faculty", checkFaculty)
        if (!checkFaculty) {
            return res.json({ Error: "Faculty not found." })
        }
        //   Check if this book Id is present in the database 
        let flag = true; //check if the book is new or not 
        let checkBid = await book.findOne({ ISBN: ISBN });
        if (!checkBid) {
            flag = false;
            const BookData = await book.create({
                Name: Name,
                ISBN: ISBN,
                Publisher: Publisher
            })
        }


        // Add publication details 
        // FID and edition altogether should be unqiuely identify each row 
        const checkPublication = await bookPublication.findOne({ FID: FID, Edition: Edition });
        if (checkPublication && flag) { //This user has already added this publication 
            return res.json({ Message: "Duplicate entry detected.Please check If you have already entered these details.", status: 400 })
        }
        checkBid = await book.findOne({ ISBN: ISBN });
        const BookData = await bookPublication.create({
            FID: FID,
            BID: checkBid._id,
            Year: new Date(`${Year}`),
            CoAuthors: CoAuthors.split(" "),
            Edition: Edition
        })
        return res.status(200).json({ Data: BookData, Message: "Book added successfully.", status: 200 });
    } catch (err) {
        return res.status(400).json({ Message: "Internal server error.", err, status: 400 });
    }
})


// Route 2: READ 
router.get('/readBooks', checkUser, async (req, res) => {
    // First I need to fetch Book Id written by the faculty from BookPublication
    const FID = req.user.id;
    const BID = await bookPublication.find({ FID: FID }).select('BID');
    console.log(BID);
    // Find books from BOOK table with the fetched id 
    const Book = await bookPublication.find({ FID: FID }).populate('BID').populate('FID');
    // console.log(Book)

    // Extract required data 
    const result = Book.map((value, index) => {
        return {
            Name: Book[index].BID.Name,
            ID: Book[index].BID.ISBN,
            Publisher: Book[index].BID.Publisher,
            CoAuthors: Book[index].CoAuthors,
            Edition: Book[index].Edition,
            Year: Book[index].Year.getFullYear()
        };
    })
    return res.json(result);
})

// Route 3 : Delete Book 
router.delete('/deleteBook', checkUser, async (req, res) => {
    // TO delete any book, we need to check if that bid is pointing to some other edition in Publication table which is not intented to delete. In this case, delete the edition only not the book from the book table. If the book has only one edition then delete the book as well if it's only edition is being deleted.
    //   console.log("This is me.")
    console.log("I am executing the code to delete book.",req.body)
    const { ISBN, Edition } = req.body.deleteData;
    console.log("Requested book ISBN is",ISBN)
    const BID=await book.findOne({ISBN:ISBN}).select('_id')
    console.log("requested id of the book is",BID)
    const FID = req.user.id;
    //    check if this book is there in publications
    const publication = await bookPublication.findOne({ BID: BID, Edition: Edition })
    if (!publication) {
        return res.json({ Message: "Book not found." })
    }

    // check if the requested user has wriiten this publication
    if (publication.FID != FID) {
        return res.status(400).json({ Message: "Unauthorized." })
    }
    // check if another edition of this book is in database or not
    // if not then delete it's details from Book table as well 
    //  else delete from bookPublication only.
    const countBid = await bookPublication.find({ BID: BID });
    if (countBid.length == 1) {
        console.log("No another copy of this book is found.");
        try{
        await bookPublication.deleteOne({Edition:Edition})
        await book.deleteOne({ISBN:ISBN})
        }catch(err){
            console.log("Error while deleting the book",err)
            return res.json({Message:"Internal server error."})
        }
        
    }else{
        try{
            await bookPublication.deleteOne({Edition:Edition})
        }catch(err){
            console.log("Error while deleting the book",err)
            return res.json({Message:"Internal server error."}) 
        }
    }
    return res.json({Message:"Publication deleted successfully.",status:200 })

})


// Route 4:Update the book Publicaiton
router.put('/editBook', checkUser, async (req, res) => {
    try {
        const newData = req.body;
        console.log(newData)
        // first fetch the bookId from the book collection
        const BID = await book.findOne({ ISBN: newData.Bid }).select('_id')
        if (!BID) {
            return res.status(204).json({ Message: "Not found.", status: 204 })
        }
        console.log("Requested book is", BID)
        console.log("Requested faculty is", req.user.id)
        console.log("Requested edition is", newData.OldEdition)
        console.log("updated year is", newData.Year)
        // now upate the requested publication by matching the old edition
        const result = await bookPublication.updateOne({ BID: BID._id, Edition: newData.OldEdition, FID: req.user.id }, {
            Year: new Date(`${newData.Year}`),
            Edition: newData.Edition,
            CoAuthors: newData.CoAuthors
        });
        console.log(result)
        if (result.modifiedCount != 0)
            return res.status(200).json({ Message: "Edited Successfully", status: 200 })
        else return res.json({ Message: "Couldn't find the requested publication.." })
    } catch (err) {
        return res.status(400).json({ Message: "Internal server error.", err, status: 400 });
    }

})
module.exports = router;