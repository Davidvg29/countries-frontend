import {
    CONTINENT_FILTER,
    GET_CONTINENT,
    GET_ALL_COUNTRIES,
    GET_ACTIVITIES,
    SEARCH_NAME_COUNTRIES,
    SEARCH_ID_COUNTRIES,
    ACTIVITIES_FILTER,
    ORDER_ALFABETICAMENTE,
    ORDER_POPULATION,
} from "./action-types";

let initialStore = {
    countries: [],
    copyCountries: [],
    continents: [],
    activities: []
}

const reducer = (state = initialStore, {type, payload}) => {
    switch (type) {
        case GET_ALL_COUNTRIES:
            return {...state, countries: payload, copyCountries: payload};

        case SEARCH_NAME_COUNTRIES:
            return {...state, copyCountries: payload};

        case SEARCH_ID_COUNTRIES:
            return {...state, countries: payload};

        case GET_CONTINENT:
            return {...state, continents: payload};

        case CONTINENT_FILTER:
            let filteredByContinent = state.copyCountries;
            if (payload !== "all") {
                filteredByContinent = state.countries.filter(c => c.continent && c.continent.includes(payload));
                return {...state, copyCountries: filteredByContinent};
            }else{
                return {...state, copyCountries: state.countries};
            }
           

        case GET_ACTIVITIES:
            return {...state, activities: payload};



        case ACTIVITIES_FILTER:
            let filteredByActivities = state.copyCountries;
            let a = state.countries

            if(filteredByActivities === state.countries){
                const idActivitiesCountries = JSON.parse(payload);
                    a = state.countries.filter(c => idActivitiesCountries.some(activity => c.id === activity.id));
                     return {...state, copyCountries: a};
            }else{
                if (payload !== "all") {
                    const idActivitiesCountries = JSON.parse(payload);
                    filteredByActivities = state.copyCountries.filter(c => idActivitiesCountries.some(activity => c.id === activity.id));
                     return {...state, copyCountries: filteredByActivities};
                }else{
                    return {...state, copyCountries: state.countries};
                }
            }

            

            




        case ORDER_ALFABETICAMENTE:
            let orderAlfb = [...state.copyCountries];
            return {
                ...state,
                copyCountries: payload === "asc" ?
                    orderAlfb.sort((a, b) => a.name.localeCompare(b.name)) :
                    orderAlfb.sort((a, b) => b.name.localeCompare(a.name))
            };

        case ORDER_POPULATION:
            let orderPoulation = [...state.copyCountries];
            return {
                ...state,
                copyCountries: payload === "mayor" ?
                    orderPoulation.sort((a, b) => b.population - a.population) :
                    orderPoulation.sort((a, b) => a.population - b.population)
            };

        default:
            return {...state};
    }
};

export default reducer;