"use client"
import CaseCard from '../CaseCard/CaseCard';
import CaseListModal from '../CaseListModal/CaseListModal';
import style from './CaseListMain.module.css'
import { useState, useEffect } from 'react'

export default function CaseListMain() {
    const [cases, setCases] = useState([]);
    const [showFull, setShowFull] = useState(false)

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/Cases');
                if (res.ok) {
                    const data = await res.json();
                    setCases(data); 
                }
            } catch (error) {
                console.error("Kunne ikke hente saker:", error);
            }
        };

        fetchCases();
    }, []);

    function setModal () {
        setShowFull(!showFull)
    }

    return (
        <main className={style.Main}>
            <section className={style.CaseOptionsCont}>
                <p>Saksliste</p>
                
                <label>
                    Sorter prioritet
                    <select className={style.SelectCase}>
                        <option value="">--VELG--</option>
                        <option value="Lav">Lav</option>
                        <option value="middels">Middels</option>
                        <option value="kritisk">Kritisk</option>
                    </select>
                </label>
            </section>
            
            <section className={style.CaseVeiw}>
                {cases.length > 0 ? (
                    cases.map((sak) => (
                        <CaseCard key={sak.caseID} sak={sak}/>
                    ))
                ) : (
                    <p>Ingen saker funnet, eller laster data...</p>
                )} 
            </section>
            
            <button className={style.Fler} onClick={setModal}>Se flere</button>
                {showFull? <CaseListModal cases={cases} setModal={() => setModal}/>: <></>}
        </main>
    )
}