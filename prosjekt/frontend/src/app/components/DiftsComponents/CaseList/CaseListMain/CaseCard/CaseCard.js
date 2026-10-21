"use client"
import style from './CaseCard.module.css'
import {useEffect, useState} from 'react'
import Image from 'next/image'
export default function CaseCard({sak}) {
    const [pic, setPic] = useState("");
    
    useEffect(() => {
        const fetchCases = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/caseImg", {
                      method: "POST",
                      headers: {
                      "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                      id: sak.caseID,
                      })
                  })

                if (res.ok) {
                    const data = await res.json();
                    setPic(data.Picture); 
                }
            } catch (error) {
                console.error("Kunne ikke hente saker:", error);
            }
        };

        fetchCases();
    }, [sak.caseID]);

    return (
        <div key={sak.caseID} className={style.CaseCard}> 
                <h3>Bygg {sak.buildingID} Rom {sak.roomID}</h3>
                <p>Prioritet: {sak.Seriousness}</p>
                <p>Beskrivelse: {sak.description}</p>
                
                {pic? <Image src={pic} alt="Case visual" width={200} height={200}/> : <></>}
               
                <p>Meldt inn: {new Date(sak.CreatedDate).toLocaleDateString("no-NO")}</p>
        </div>
    )
}