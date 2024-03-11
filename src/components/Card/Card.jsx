import React, { useEffect, useState } from "react";
import Cards from "../Cards/Cards";
import css from "./Card.module.css";

function Card({countries}) {
    const [filteredCountries, setFilteredCountries] = useState([]); // Estado para almacenar los países filtrados
    const [numSubarray, setNumSubarray] = useState(0);
    const [activeButton, setActiveButton] = useState(0);

    // Función para dividir un array en subarrays
    function dividirArrayEnSubarrays(arrayPrincipal, tamañoSubarray) {
        const subarrays = [];
        for (let i = 0; i < arrayPrincipal.length; i += tamañoSubarray) {
            const subarray = arrayPrincipal.slice(i, i + tamañoSubarray);
            subarrays.push(subarray);
        }
        return subarrays;
    }

    // Aplica el filtro al array de países y actualiza el estado de los países filtrados
    useEffect(() => {
        const subarray = dividirArrayEnSubarrays(countries, 9);
        setFilteredCountries(subarray.map(sub => sub.filter(c => c))); // Aplica el filtro a cada subarray
        setNumSubarray(0);
        setActiveButton(0);
    }, [countries]);

    const anterior = () => {
        if (numSubarray > 0) {
            setNumSubarray(numSubarray - 1);
            setActiveButton(numSubarray - 1);
        }
    };

    const siguiente = () => {
        if (numSubarray < filteredCountries.length - 1) {
            setNumSubarray(numSubarray + 1);
            setActiveButton(numSubarray + 1);
        } else {
            null;
        }
    };

    const getPositionButton = (e) => {
        setNumSubarray(parseInt(e.target.value));
        setActiveButton(parseInt(e.target.value));
    };

    // console.log(countries)

    return (
        <div className={css.divConteinerCard}>
            <div className={css.conteinerCard}>
                {filteredCountries.length > 0 ? (
                    filteredCountries[numSubarray].map((c) => (
                        <Cards
                            key={c.id}
                            countrie={c}/>
                    ))
                ) : (
                    <div>{countries.error?countries.error:(
                        <p>No hay países que mostrar</p>
                    )}</div>
                )}
            </div>
            {filteredCountries.length > 0 ? (
                <div className={css.conteinerPaginado}>
                    <button className={css.flechitas} onClick={anterior}>{"<"}</button>
                    {filteredCountries.map((s, index) => (
                        <button
                            id={index}
                            className={`${css.butonNumber} ${index === activeButton ? css.active : ''}`}
                            onClick={getPositionButton}
                            value={index}
                            key={index}>
                                {index}
                        </button>
                    ))}
                    <button className={css.flechitas} onClick={siguiente}>{">"}</button>
                </div>
            ) : null}
        </div>
    );
}

export default Card;
