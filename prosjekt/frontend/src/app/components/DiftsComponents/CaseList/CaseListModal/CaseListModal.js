"use client"

import style from './CaseListModal.module.css'
import CaseCard from '../CaseCard/CaseCard'
import { useState } from 'react'

export default function CaseListModal(props) {
    const [priority, setPriority] = useState("");

    const filteredCases = priority === "" 
        ? props.cases 
        : props.cases.filter(sak => sak.Seriousness.toLowerCase() === priority.toLowerCase());

    return (
        <>
        <main className={style.overlay} onClick={props.setModal}>
            <div className={style.cont} onClick={(e) => e.stopPropagation()}>
                <section>
                    <label>
                        Sorter prioritet:
                        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="">--Alle--</option>
                            <option value="lav">Lav</option>
                            <option value="middels">Middels</option>
                            <option value="kritisk">Kritisk</option>
                        </select>
                    </label>
                    <button onClick={props.setModal}>X</button>
                </section>

                <section className={style.CaseCont}>
                    {filteredCases.length > 0 ? (
                        filteredCases.map((sak) => (
                            <CaseCard key={sak.caseID} sak={sak}/>
                        ))
                    ) : (
                        <p>Ingen saker funnet for denne prioriteten...</p>
                    )} 
                </section>
            </div>
        </main>
        </>
    )
}