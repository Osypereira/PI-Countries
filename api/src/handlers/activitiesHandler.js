const { createActivity, getAllActivitiesControllers } = require("../controllers/activitiesControllers");

const createActivitiesHandler = async(req, res) => {
    const { name, dificulty, duration, season, countryId } = req.body;
    try {
        const newActivity = await createActivity(name, dificulty, duration, season, countryId);

        res.status(200).json(newActivity);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
    
};

const getActivitiesHandler = async (req, res) => {
   try {
       const result = await getAllActivitiesControllers();
       res.status(200).json(result);

   } catch (error) {
       res.status(400).json({ error: error.message })

   }
};

module.exports = {
    createActivitiesHandler,
    getActivitiesHandler
};
