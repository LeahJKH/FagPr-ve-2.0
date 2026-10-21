'use client'

import style from './Statmodal.module.css'
import Chart from 'chart.js/auto' 
import { useRef, useEffect } from 'react'

export default function StatModal(props) {
    const chartRef = useRef(null); 

    let statistic = props.stats 

    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d');
        if (!ctx) return;

        const myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['lav', 'middels', 'kritisk'],
                datasets: [
                    {
                        label: 'Antall saker',
                        data: [statistic.lav, statistic.middels, statistic.kritisk],
                        backgroundColor: [
                            '#facc15',
                            '#60a5fa',
                            '#34d399',
                        ],
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            },
        });

        return () => {
            myChart.destroy();
        };
    }, [statistic]);

    return (
        <>
            <main className={style.overlay} onClick={props.setModal}>
                <div className={style.cont} onClick={(e) => e.stopPropagation()}>
                    <p style={{cursor: 'pointer'}} onClick={props.setModal}>x</p>
                    <section>
                        <canvas ref={chartRef} width={300} height={300}></canvas>
                    </section>
                </div>
            </main>
        </>
    )
}