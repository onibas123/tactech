
const { getCharacterById, getCharacters, createCharacter }= require("../services/charactersService");

const getAll = (req, res) => {

    try {
        const characters = getCharacters();
        res.json(characters)
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
  
}

const getById = (req, res) => {
    const { id } = req.params; 
    try {
       const character =  getCharacterById(id);
       res.json(character);
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
}

const create = (req, res) => {
    let rut = req.body.rut;
    let razon = req.body.razon;
    


}


module.exports = { getById, getAll, create };