function validate(data) {

    let  error = {
        // name: "",
        // difficulty: "",
        // duration: "",
        // season: "",
        // country: ""
    }
    
    if(data.name.length<3 || data.name.length>50 ||  /\d/.test(data.name))  error={...error, name:"debe ser mayor a 3 y menora 50 caracteres y sin numeros"}
    if(data.difficulty===0 ||data.difficulty>5)  error={...error, difficulty:"debe ser mayor a 0 y menor a 5"}
    if(data.duration==="" || parseInt(data.duration)===0 || parseInt(data.duration)>10) error={...error, duration:"debe tener una duracion de 1 a 10  hs"}
    if(data.season==="") error={...error, season:"ingresa una temporada"}
    if(data.country ==="") error={...error, country:"debes seleccionar al menos un pais"}

    return error
}
export default validate