import sqlPromise from '../../config/ConnectDB.js'
import express from 'express'

const router = express.Router()

router.get('/Stats', async (req, res) => {
    try {
        const dbConnect = await sqlPromise;
        const result = await dbConnect
            .request()
            .query('SELECT seriousness FROM T_Tindvik_Cases') 
        

        let values = result.recordset

        let low = 0;
        let mid = 0;
        let critical = 0;
        let unsorted = 0; // this will be a fail value if it has over one its a fail
        let amount = 0;


        values.forEach(e => {
            if(e.seriousness == "lav") {
                low++
            } else if (e.seriousness == "middels") {
                mid++
            } else if (e.seriousness == "kritisk") {
                critical++
            } else {
                unsorted++
            }
            amount++
        })

        res.status(200).json({
            Antall: amount,
            lav: low,
            middels: mid,
            kritisk: critical,
            usortert: unsorted
        })
        
    } catch (err) {  
        res.status(500).json({
            message: "Could not get cases"
        })
    }
})

export default router