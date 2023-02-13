const publicationType = require('../Collections/PublicationType/PublicationType')
const conference = require('../Collections/Conference/ConferencePublication')
const app = require('express')
const router = app.Router();
const checkUser = require('../LoginMiddleware/checkUser')

// CREATE Conference
router.post('/addConference', checkUser, async (req, res) => {
    const FID = req.user.id;

    //   find if user is adding publication or chapter
    const { Name, Year, Publisher, ISPN } = req.body;

    // extract conference information
    const { PaperTitle, CorrespondingAuthor, FirstAuthor, PaperPresented, National, Place, CoAuthors } = req.body;

    // check if publication is already added in publication type or not 
    // flag to track if the publication type is new or old
    let pubFlag = true;
    let PID;

    if (await publicationType.findOne({ ISPN: ISPN })) {
        console.log("This publication already exists.")
        PID = await publicationType.findOne({ ISPN: ISPN })
        pubFlag = false;
    }

    //   False means, publication type already exists and we have the PID
    if (!pubFlag) {
        if (await conference.findOne({ PID: PID, FID: FID, PaperTitle: PaperTitle })) {
            return res.json({ "Message": "Duplicate entry.Conference already exists." })
        }
    }

    if (pubFlag) { // if publication type is new then create new entry else ignore
        console.log("creating new publication type.")
        PID = await publicationType.create(
            {
                Type: "CONFERENCE",
                Name: Name,
                Year: new Date(`${Year}`),
                Publisher: Publisher,
                ISPN: ISPN
            }
        )
    }
    console.log("PID is ", PID)

    await conference.create(
        {
            PID: PID,
            FID: FID,
            PaperTitle: PaperTitle,
            CorrespondingAuthor: CorrespondingAuthor,
            FirstAuthor: FirstAuthor,
            PaperPresented: PaperPresented,
            National: National,
            Place: Place,
            CoAuthors: CoAuthors

        }
    )
    return res.json({ "Message": "Conference added successfully." })

}
)

// READ conferences
router.get('/readConferences', checkUser, async (req, res) => {
    const FID = req.user.id;
    // Match FID and type==Chapter and fetch PID
    const PID = await publicationType.find({ FID: FID, Type: "CONFERENCE" }).select('_id');
    const data = await conference.find({ FID: FID, PID: PID }).populate('PID');
    const result = data.map((item, i) => {
        return {
            ConferenceName: data[i].PID.Name,
            PaperTitle: data[i].PaperTitle,
            ISSN: data[i].PID.ISPN,
            Publisher: data[i].PID.Publisher,
            CorrespondingAuthor: data[i].CorrespondingAuthor,
            FirstAuthor: data[i].FirstAuthor,
            PaperPresented: data[i].PaperPresented,
            National: data[i].National,
            Place: data[i].Place,
            CoAuthors: data[i].CoAuthors
        }

    })
    return res.json(result);
})

// UPDATE conferences
router.put('/updateConference', checkUser, async (req, res) => {
    const FID = req.user.id;
    let { ISPN, PaperTitle, NewPaperTitle, CorrespondingAuthor, FirstAuthor, PaperPresented, National, Place, CoAuthors } = req.body;
    // find the PID of requested chapter
    const PID = await publicationType.findOne({ ISPN: ISPN }).select('_id');
    try {
        await conference.updateOne(
            { PID: PID, FID: FID, PaperTitle: PaperTitle }, {
            PaperTitle:NewPaperTitle,
            CorrespondingAuthor: CorrespondingAuthor,
            FirstAuthor: FirstAuthor,
            PaperPresented: PaperPresented,
            National: National,
            Place: Place,
            CoAuthors: CoAuthors,
            Year:data[i].PID.Year.getFullYear()
        })
    } catch (err) {
        return res.json(err)
    }
    NewPaperTitle ? PaperTitle = NewPaperTitle : PaperTitle;
    const chapter = await conference.findOne({ PID: PID, FID: FID, PaperTitle: PaperTitle });

    return res.json(chapter)
})


// DELETE Conference
router.delete('/deleteConference', checkUser, async (req, res) => {
    const FID = req.user.id;
    const { ISPN, PaperTitle } = req.body;
    const PID = await publicationType.findOne({ ISPN: ISPN }).select('_id');
    console.log(PID)
    // if PID does not exist or has already been deleted.
    if (!PID) {
        return res.json({ "Message": "Publication not found." })
    }

    try {
        // if conference does not exist or has already been deleted.
        if (!await conference.findOne({ FID: FID, PID: PID, PaperTitle: PaperTitle })) {
            return res.json({ "Message": "Conference not found." })
        }

        await conference.deleteOne({ FID: FID, PID: PID, PaperTitle: PaperTitle });
    } catch (err) {
        console.log("Generated error is", err)
        return res.json(err)
    }
    return res.json({ "Message": "Chapter deleted successfully." })
})
module.exports = router;