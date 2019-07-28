import React, { useState, useEffect } from 'react'
import useDropdown from "./useDropdown";
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from './Results';


const SearchParams = () => {
    // const location = 'Seattle, WA';
    const [ location, setLocation ] = useState('Seattle, WA');
    const [ breeds, setBreeds ] = useState([]);
    const [animal, AnimalDropdown, updateAnimal] = useDropdown("Animal", "dog", ANIMALS);
    const [breed, BreedDropdown, updateBreed] = useDropdown("Breed", "", breeds);
    const [pets, setPets ] = useState([]);

    const changeLocation = (event) => {
        console.log('*** change location', event.target.value);
        setLocation(event.target.value);
    }

    async function requestPets () {
        const { animals = [] } = await pet.animals({ location, breed, type: animal});
        setPets(animals);
    }

    useEffect(() => {
        /*
            empty the all breeds to empty array
            set empty string for inital value for the updatebreed
        */
        setBreeds([]);
        updateBreed('');
        pet.breeds(animal).then(({ breeds }) => {
            const listOfBreedNames =  breeds.map( ({ name}) => name);
            setBreeds(listOfBreedNames);
        }).catch(console.error);
    }, [setBreeds, animal, updateBreed])

    return (
        <div className='search-params'>
                <form onSubmit={ (e) => {
                    e.preventDefault();
                    requestPets();
                }}>
                    <label htmlFor='location'>
                        location
                        <input id="location" value={location} placeholder='location' onChange={changeLocation}/>
                    </label>
                    <AnimalDropdown />
                    <BreedDropdown />
                    <button>Submit</button>
                </form>
                <Results pets={pets} />
            </div>
    )
}

export default SearchParams;
