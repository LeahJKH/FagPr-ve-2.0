import sqlPromise from '../../config/ConnectDB.js'
import express from 'express'
import sql from 'mssql'
const router = express.Router()

router.post('/CaseImg', async (req, res) => {
    const {id} = req.body

    try {
        const dbConnect = await sqlPromise;
        const result = await dbConnect
            .request()
            .input("id", sql.VarChar, id)
            .query('SELECT picture FROM T_Tindvik_personInfo WHERE caseID = @id') // get only the image we ask for
        
        if (result.recordset[0].picture) { // checks if picture
            

            const imageBuffer = result.recordset[0].picture;
            const base64Image = imageBuffer.toString('base64'); // make sure its turned into base&4 string so we can display
            
            const imageUrl = `data:image/jpeg;base64,${base64Image}`; // tell it too create url for our image

            res.status(200).json({ Picture: imageUrl });
        } else {
            res.status(404).json({ message: "No image found 404" });
        }
        
    } catch (err) {  
        res.status(500).json({
            message: "Could not get image"
        })
    }
})

export default router