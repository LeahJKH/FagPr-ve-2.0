'use client'

import { redirect } from 'next/navigation';
import style from './sidemenu.module.css'
import { useState, useEffect } from 'react'
export default function SideMenu({chosenBuilding, chosenRoom, rD, bD}) {
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [FullData, setFullData] = useState([])

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 810);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {

        async function getData() {
                        try {
       const response = await fetch("http://localhost:5000/api/TAPI", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            Bd: bD,
            })
        })
        
    
        const data = await response.json() // wait for data
        setFullData(data.data)
       if (!response.ok) {
            console.log(data.message) // send error msg from backend
            return
        }
        } catch (err) {
        console.error(err)
        }
        
    }
        getData()
    }, [bD])
    
    function changeRoom(room, rid) {
        redirect(`http://localhost:3000/Report?building=Solsiden,%20blokk%20C&room=${room}&BD=B-3003&RD=${rid}`)
    }



    return (
        <>
        <aside className={style.aside}>
            <section className={style.infosect}>
                <p className={style.pmain}>Nåværende bygg:</p>
                <p className={style.pside}>{chosenBuilding}</p>
                <p className={style.pmain}>Nåværende rom:</p>
                <p className={style.pside}>{chosenRoom}</p>
            </section>
            <hr className={style.splitter}></hr>
            <section className={style.listedCont}>

                <p className={style.pside}>Feil rom? klikk <span className={style.LinkBtn} onClick={handleOpen}>Her</span></p>
                 {isOpen?
                 <div className={isMobile? style.MobileRoomData: style.Roomcont}>
                    <button onClick={handleOpen}>X</button>
                    <div className={style.roomData}>
                        {FullData.map((res) => {
                        return <p className={style.pStyle} onClick={(e) => changeRoom(res.navn, res.id)} key={res.id}>{res.navn}</p>
                        })}
                    </div>
                </div>:<></>}
            </section>
        </aside>
        </>
    )
}