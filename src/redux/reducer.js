import {CONTINENT_FILTER, 
        GET_CONTINENT, 
        GET_ALL_COUNTRIES,
        GET_ACTIVITIES,
        SEARCH_NAME_COUNTRIES, 
        SEARCH_ID_COUNTRIES,
        ACTIVITIES_FILTER,
        ORDER_ALFABETICAMENTE,
        ORDER_POPULATION,
} from "./action-types"

let initialStore = {
    countries: [],
    copyCountries: [],
    continents: [],
    activities: []
}

const reducer = (state = initialStore, {type, payload})=>{
    switch (type) {
        case GET_ALL_COUNTRIES:
            return {...state, countries: payload, copyCountries: payload}
            break;
    
        case SEARCH_NAME_COUNTRIES:
            return {...state, countries: payload}
            break;

        case SEARCH_ID_COUNTRIES:
            return {...state, countries: payload}
            break;

        case GET_CONTINENT:
            return{...state, continents: payload}

        case CONTINENT_FILTER:
            const copy3 = [...state.copyCountries];
            let filtro = copy3;

            if (payload === "all") {
                filtro = [...state.copyCountries]
            }else{
                filtro = copy3.filter((c) => c.continent && c.continent.includes(payload));

            }
            // console.log(copy3)
            return {
                ...state, countries: filtro
            };

            case GET_ACTIVITIES:
                return {...state, activities: payload}

            case ACTIVITIES_FILTER:
                let idActivitiesCountries = payload
                if (payload!=="all") {
                    idActivitiesCountries=JSON.parse(payload)
                }
                console.log(idActivitiesCountries)
                const copy4 = [...state.copyCountries];
                let filtroCounAct = copy4;

                if (payload === "all") {
                    filtroCounAct = [...state.copyCountries]
                }else{
                    // filtroCounAct = copy4.filter((c) => c.id && c.id.includes(idActivitiesCountries[0].id))
                    filtroCounAct=[]
                    for (let i = 0; i < copy4.length; i++) {
                        for (let j = 0; j < idActivitiesCountries.length; j++) {
                            if(copy4[i].id===idActivitiesCountries[j].id){
                                filtroCounAct.push(copy4[i])
                            }
                            
                        }
                        
                    }
                }
                return {
                    ...state, countries: filtroCounAct
                }
                
                case ORDER_ALFABETICAMENTE:
                    let copy5 = [...state.copyCountries]
                    if (payload==="default") {
                        return {...state, countries: copy5}
                    } else {
                        return {
                            ...state,
                            countries: copy5.sort((a, b) => {
                            return payload === "asc" ? a.name.localeCompare(b.name): b.name.localeCompare(a.name);
                            })
                        };
                    }

                    case ORDER_POPULATION:
                        const copy6 = [...state.copyCountries]
                        if (payload==="default") {
                            return {...state, countries: copy6}
                        } else {
                            return {
                                ...state,
                                countries: copy6.sort((a, b)=>{
                                    return payload==="mayor" ? b.population - a.population : a.population - b.population
                                })
                            }
                        }

        default:
            return {...state}
    }
}
export default reducer