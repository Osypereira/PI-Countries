const { Activity, Country } = require("../db");

const createActivity = async (activitis) => {
        const{name, dificulty, duration, season, countries} = activitis
    try {
        
        const activity = await Activity.create({ name, dificulty, duration, season })
        for(let id of countries) {
            const thisCountry = await Country.findByPk(id)
       
            await activity.addCountry(thisCountry)
            
        }


            return
    } catch (error) {
        throw new Error("algo no esta bien, no se creo la actividad")
    }
    
};

// -----------------------------------------------------------------//

// todas las actividades
const getAllActivitiesControllers = async () => {
    const activities = await Country.findAll({
        include: [{
            model: Activity, 
            attributes: ["id", "name"],
            through: {
                attributes: []
            }
        }]
    });
    
    return activities;
}

module.exports = { createActivity, getAllActivitiesControllers };