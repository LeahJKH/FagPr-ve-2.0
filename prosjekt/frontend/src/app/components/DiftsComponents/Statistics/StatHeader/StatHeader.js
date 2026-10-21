'use client'

import StatModal from '../StatModal/StatModal';
import style from './StatHeader.module.css'
import {useState, useEffect} from 'react'

export default function StatHeader() {
    const [statFull, setStatFull] = useState(false)

        const [stats, setStats] = useState({});


    useEffect(() => {
        const fetchCases = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/Stats');
                if (res.ok) {
                    const data = await res.json();
                    setStats(data); 
                }
            } catch (error) {
                console.error("Kunne ikke hente statestikk:", error);
            }
        };

        fetchCases();
    }, []);

    function setModal() {
        setStatFull(!statFull)
    }

    return (
        <>
        <header className={style.Header}>
            <section className={style.GraphMenu}>
                <div className={style.GraphCont}>
                    <p>Antall Kritisk</p>
                    <div>
                        <progress className={`${style.progressBar} ${style.criticalBar}`} min="0" max={stats.Antall} value={stats.kritisk}></progress>
                        <p>{stats.kritisk}/{stats.Antall}</p>
                    </div>
                </div>

                <div className={style.GraphCont}>
                    <p>Antall middels</p>
                    <div>
                        <progress className={`${style.progressBar} ${style.midBar}`} min="0" max={stats.Antall} value={stats.middels}></progress>
                        <p>{stats.middels}/{stats.Antall}</p>                    
                    </div>
                </div>

                <div className={style.GraphCont}>
                    <p>Antall lav</p>
                    <div>
                        <progress className={`${style.progressBar} ${style.lowBar}`} min="0" max={stats.Antall} value={stats.lav}></progress>
                        <p>{stats.lav}/{stats.Antall}</p>
                    </div>
                </div>
            </section>
            <button className={style.moreBtn} onClick={setModal}>Se flere</button>
            {statFull? <StatModal stats={stats} setModal={() => setModal()}/>: <></>}
        </header>
        </>
    )
}