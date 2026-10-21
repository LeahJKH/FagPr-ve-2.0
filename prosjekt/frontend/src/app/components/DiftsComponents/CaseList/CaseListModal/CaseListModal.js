import style from './CaseListModal.module.css'
import CaseCard from '../CaseCard/CaseCard'
export default function CaseListModal(props) {

    let cases = props.cases
    return (
        <>
        <main className={style.overlay} onClick={props.setModal}>
            <div className={style.cont} onClick={(e) => e.stopPropagation()}>
                <section>
                <label>
                    <select>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                    </select>
                </label>
                <p>X</p>
                </section>

                <section className={style.CaseCont}>
                {cases.length > 0 ? (
                    cases.map((sak) => (
                        <CaseCard key={sak.caseID} sak={sak}/>
                    ))
                ) : (
                    <p>Ingen saker funnet, eller laster data...</p>
                )} 
                </section>
            </div>
        </main>
        </>
    )
}