"use client"
import CaseCard from '../CaseCard/CaseCard';
import CaseListModal from '../CaseListModal/CaseListModal';
import style from './CaseListMain.module.css'
import { useState, useEffect } from 'react'

export default function CaseListMain() {
    const [allCases, setAllCases] = useState([]);
    
    const [showFull, setShowFull] = useState(false);
    const [priority, setPriority] = useState(""); 

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/Cases');
                if (res.ok) {
                    const data = await res.json();
                    // Lagre alle sakene uten å filtrere dem enda
                    setAllCases(data); 
                }
            } catch (error) {
                console.error("Kunne ikke hente saker:", error);
            }
        };

        fetchCases();
    }, []); // Kjører kun én gang ved innlasting

    function setModal () {
        setShowFull(!showFull);
    }

    const filteredCases = priority === "" 
        ? allCases 
        : allCases.filter(sak => sak.Seriousness.toLowerCase() === priority.toLowerCase());

    return (
        <main className={style.Main}>
            <section className={style.CaseOptionsCont}>
                <p>Saksliste</p>
                
                <label>
                    Sorter prioritet
                    <select className={style.SelectCase} value={priority} onChange={e => setPriority(e.target.value)}>
                        <option value="">--Alle--</option>
                        <option value="lav">Lav</option>
                        <option value="middels">Middels</option>
                        <option value="kritisk">Kritisk</option>
                    </select>
                </label>
            </section>
            
            <section className={style.CaseVeiw}>
                {filteredCases.length > 0 ? (
                    filteredCases.map((sak) => (
                        <CaseCard key={sak.caseID} sak={sak}/>
                    ))
                ) : (
                    <p>Ingen saker funnet for denne prioriteten, eller laster data...</p>
                )} 
            </section>
            
            <button className={style.Fler} onClick={setModal}>Se flere</button>
            {showFull ? <CaseListModal cases={filteredCases} setModal={setModal}/> : null}
        </main>
    )
}