import express from 'express'


const router = express.Router()

router.post('/TAPI', async (req, res) => {
   try {

      const {Bd} = req.body
      
      if (!Bd) {
         console.error("Error: C.1");
         return res.status(400).json({ error: "Missing building ID (Bd)" });
      }

      const response = await fetch(`http://localhost:3200/api/v1/bygg/${Bd}/rom`, {
         method: 'GET',
         headers: {
            'X-API-Key': 'tindvik-test-2026',
            'Content-Type': 'application/json' 
         } 
      });
      let data = await response.json()
      
      res.status(201).json(data)
   } catch(err) {
      console.error(err)
   }
})

export default router