
const mysqlConnection  = require('../connection.js');
const request = require('request');

const findAll = () => {
    mysqlConnection.query('SELECT * FROM characters', (err, rows, fields) => {
        if(!err) {

         return rows[0];
        } else {
          console.log(err);
        }
      });  
}

const findById = async (id) => {
    let result = await selectCharacter(id);
    console.log(result);
    /*
    if(result.id == null && result.id == undefined && result.id == ''){
        await requestApi(id);
        result = await selectCharacter(id);
    }
    */
    return result;
}
//api
const requestApi = (id) =>
{
    if(id != null || id != "")
    {
        request.get({
            "url": "https://anapioficeandfire.com/api/characters/"+id
        }, (error, res, body) => {
            if(error) {
                return console.dir(error);
            }
            else
            {
                
                body = JSON.parse(body);
                body.id = id;

                insertCharacter(body);

                let titles = body['titles'];
                for(let i=0; i<titles.length;i++)
                {
                    insertTitles(body, titles[i]);
                    //console.log(titles[i]);
                }
    
                let aliases = body['aliases'];
                for(let i=0; i<aliases.length;i++)
                {
                    insertAliases(body, aliases[i]);
                    console.log(aliases[i]);
                }
    
                let allegiances = body['allegiances'];
                for(let i=0; i<allegiances.length;i++)
                {
                    insertAllegiances(body, allegiances[i]);
                    console.log(allegiances[i]);
                }
    
                let books = body['books'];
                for(let i=0; i<books.length;i++)
                {
                    insertBooks(body, books[i]);
                    console.log(books[i]);
                }
    
                let povBooks = body['povBooks'];
                for(let i=0; i<povBooks.length;i++)
                {
                    insertPovBooks(body, povBooks[i]);
                    console.log(povBooks[i]);
                }
    
                let tvSeries = body['tvSeries'];
                for(let i=0; i<tvSeries.length;i++)
                {
                    insertTvSeries(body, tvSeries[i]);
                    console.log(tvSeries[i]);
                }
    
                let playedBy = body['playedBy'];
                for(let i=0; i<playedBy.length;i++)
                {
                    insertPlayedBy(body, playedBy[i]);
                    console.log(playedBy[i]);
                }
    
                return body;
            }
        });
    }
    
}
//INIT SELECTS
const selectCharacter = (id) => {
    mysqlConnection.query('SELECT id, url, name, gender, culture, born, died, father,mother, spouse FROM characters WHERE id = ?', [id], (err, rows, fields) => {
        if(!err) {
            let aliases = selectAliases(id);
            let allegiances = selectAllegiances(id);
            let books = selectBooks(id);
            let played_by = selectPlayedBy(id);
            let pov_books = selectPovBooks(id);
            let titles = selectTitles(id);
            let series = selectTvSeries(id);
            rows['aliases'] = aliases;
            rows['allegiances'] = allegiances;
            rows['books'] = books;
            rows['playedBy'] = played_by;
            rows['povBooks'] = pov_books;
            rows['titles'] = titles;
            rows['tvSeries'] = series;
            
            return rows[0];

        } else {
          console.log(err);
        }
      });
}

const selectAliases = (id) => {
    mysqlConnection.query('SELECT alias FROM aliases WHERE character_id = ?', [id], (err, rows, fields) => {
        if(!err) {
            return rows;
        } else {
          console.log(err);
          return err;
        }
      });
}

const selectAllegiances = (id) => {
    mysqlConnection.query('SELECT allegiance FROM allegiances WHERE character_id = ?', [id], (err, rows, fields) => {
        if(!err) {
            return rows;
        } else {
          console.log(err);
          return err;
        }
      });
}

const selectBooks = (id) => {
    mysqlConnection.query('SELECT book FROM books WHERE character_id = ?', [id], (err, rows, fields) => {
        if(!err) {
            return rows;
        } else {
          console.log(err);
          return err;
        }
      });
}

const selectPlayedBy = (id) => {
    mysqlConnection.query('SELECT played FROM playedby WHERE character_id = ?', [id], (err, rows, fields) => {
        if(!err) {
             return rows;
        } else {
          console.log(err);
          return err;
        }
      });
}

const selectPovBooks = (id) => {
    mysqlConnection.query('SELECT book FROM povbooks WHERE character_id = ?', [id], (err, rows, fields) => {
        if(!err) {
            return rows;
       } else {
         console.log(err);
         return err;
       }
      });
}

const selectTitles = (id) => {
    mysqlConnection.query('SELECT title FROM titles WHERE character_id = ?', [id], (err, rows, fields) => {
        if(!err) {
            return rows;
       } else {
         console.log(err);
         return err;
       }
      });
}

const selectTvSeries = (id) => {
    mysqlConnection.query('SELECT serie FROM tvseries WHERE character_id = ?', [id], (err, rows, fields) => {
        if(!err) {
            return rows;
       } else {
         console.log(err);
         return err;
       }
      });
}
//END SELECTS

//INIT INSERTS
const insertCharacter = (character) => {
    mysqlConnection.query('INSERT INTO characters (id, url, name, gender, culture, born, died, father, mother, spouse) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [character.id, character.url, character.name, character.gender, character.culture, character.born, character.died, character.father, character.mother, character.spouse], (err, rows, fields) => {
        if(!err) {
         console.log({status: 'Character Added'});
        } else {
          console.log(err);
        }
      });
}

const insertAliases = (character, alias) => {
    mysqlConnection.query('INSERT INTO aliases (character_id, alias) VALUES (?, ?)', [character.id, alias], (err, rows, fields) => {
        if(!err) {
         console.log({status: 'Alias Added'});
        } else {
          console.log(err);
        }
      });
}

const insertAllegiances = (character, allegiance) => {
    mysqlConnection.query('INSERT INTO allegiances (character_id, allegiance) VALUES (?, ?)', [character.id, allegiance], (err, rows, fields) => {
        if(!err) {
         console.log({status: 'Allegiance Added'});
        } else {
          console.log(err);
        }
      });
}

const insertBooks = (character, book) => {
    mysqlConnection.query('INSERT INTO books (character_id, book) VALUES (?, ?)', [character.id, book], (err, rows, fields) => {
        if(!err) {
         console.log({status: 'Book Added'});
        } else {
          console.log(err);
        }
      });
}

const insertPlayedBy = (character, played) => {
    mysqlConnection.query('INSERT INTO playedby (character_id, played) VALUES (?, ?)', [character.id, played], (err, rows, fields) => {
        if(!err) {
         console.log({status: 'Player Added'});
        } else {
          console.log(err);
        }
      });
}

const insertPovBooks = (character, book) => {
    mysqlConnection.query('INSERT INTO povbooks (character_id, book) VALUES (?, ?)', [character.id, book], (err, rows, fields) => {
        if(!err) {
         console.log({status: 'Pov Books Added'});
        } else {
          console.log(err);
        }
      });
}

const insertTitles = (character, title) => {
    mysqlConnection.query('INSERT INTO titles (character_id, title) VALUES (?, ?)', [character.id, title], (err, rows, fields) => {
        if(!err) {
         console.log({status: 'Title Added'});
        } else {
          console.log(err);
        }
      });
}

const insertTvSeries = (character, serie) => {
    mysqlConnection.query('INSERT INTO tvseries (character_id, serie) VALUES (?, ?)', [character.id, serie], (err, rows, fields) => {
        if(!err) {
         console.log({status: 'TV Serie Added'});
        } else {
          console.log(err);
        }
      });
}
//END INSERTS
module.exports = { findAll, findById };