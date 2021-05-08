const { findAll, findById, insert }= require("../datasource/charactersDatasource");

const getCharacters = () => {
    const characters = findAll();
    return characters;
}
const getCharacterById = (id) => {
    const character = findById(id);
    return character;
}

module.exports = { getCharacters,  getCharacterById};