const { Activity, Country } = require("../db");

const createActivity = async (name, dificulty, duration, season, countryId) => {

    try {
        
            const activity = await Activity.create({ name, dificulty, duration, season })
        const thisCountry = await Country.findByPk(countryId)
       
            await activity.addCountry(thisCountry)


            let allActivityCountry = await Activity.findOne({
                where: {
                    name: name
                },
                attributes: {
                    exclude: ["updateAt", "createdAt"]
                },
                include:[ {
                    model: Country,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                }]
            });
            return allActivityCountry
      
       
    } catch (error) {
        throw new Error("algo no esta bien, no se creo la actividad")
    }
    
};

// -----------------------------------------------------------------//

// todas las actividades
const getAllActivitiesControllers = async () => {
    const activities = await Activity.findAll({
        include: [{
            model: Country, 
            attributes: ["id", "name"],
            through: {
                attributes: []
            }
        }]
    });
    
    return activities;
}

module.exports = { createActivity, getAllActivitiesControllers };