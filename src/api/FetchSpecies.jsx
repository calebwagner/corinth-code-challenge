/**
 * Get all species form the Starwars API
 */
 import axios from 'axios';

 export function fetchSpecies() {
     let species = [];
     // first page
     return axios("https://swapi.py4e.com/api/species")
         .then(response => {
             // collect species from first page
             species = response.data.results;
             return response.data.count;
         })
         .then(count => {
             // exclude the first request
             const numberOfPagesLeft = Math.ceil((count - 1) / 10);
             let promises = [];
             // start at 2 as you already queried the first page
             for (let i = 2; i <= numberOfPagesLeft; i++) {
                 promises.push(axios(`https://swapi.py4e.com/api/species?page=${i}`));
             }
             return Promise.all(promises);
         })
         .then(response => {
             //get the rest records - pages 2 through n.
             species = response.reduce((acc, data) => [...acc, ...data.data.results], species);
             return species;
         })
         .catch(error => console.log("Properly handle your exception here"));
 }
 
//  (async () => {
//      const starwarsPeople = await fetchPeople();
//      console.log("starwarsPeople", starwarsPeople);
//  })();

