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
            return {...state, countries: payload};

        case SEARCH_ID_COUNTRIES:
            return {...state, countries: payload};

        case GET_CONTINENT:
            return {...state, continents: payload};

        case CONTINENT_FILTER:
            let filteredByContinent = state.copyCountries;
            if (payload !== "all") {
                filteredByContinent = state.countries.filter(c => c.continent && c.continent.includes(payload));
            }
            return {...state, countries: filteredByContinent};

        case GET_ACTIVITIES:
            return {...state, activities: payload};

        case ACTIVITIES_FILTER:
            let filteredByActivities = state.countries;
            if (payload !== "all") {
                const idActivitiesCountries = JSON.parse(payload);
                filteredByActivities = state.countries.filter(c => idActivitiesCountries.some(activity => c.id === activity.id));
            }
            return {...state, countries: filteredByActivities};

        case ORDER_ALFABETICAMENTE:
            let countriesToSortAlphabetically = [...state.countries];
            return {
                ...state,
                countries: payload === "asc" ?
                    countriesToSortAlphabetically.sort((a, b) => a.name.localeCompare(b.name)) :
                    countriesToSortAlphabetically.sort((a, b) => b.name.localeCompare(a.name))
            };

        case ORDER_POPULATION:
            let countriesToSortByPopulation = [...state.countries];
            return {
                ...state,
                countries: payload === "mayor" ?
                    countriesToSortByPopulation.sort((a, b) => b.population - a.population) :
                    countriesToSortByPopulation.sort((a, b) => a.population - b.population)
            };

        default:
            return {...state};
    }
};

export default reducer;

