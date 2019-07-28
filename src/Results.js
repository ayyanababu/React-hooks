import React from 'react'
import Pet from './Pet';

const Results = (props) => {
    const { pets = [] } = props;
    debugger;
    console.log('animals', pets);
    return (
        <div className='search'>
            { pets.length === 0 && <h1>No Pets Found </h1> }
            { pets.length !== 0 && pets.map( eachPet => {
                return <Pet name={eachPet.name}
                            animal={eachPet.type}
                            breed={eachPet.breeds.primary}
                            key={eachPet.id}
                            media={eachPet.photos}
                            location={`${eachPet.contact.address.city}, ${eachPet.contact.address.state}, ${eachPet.id}`}
                            />
            }) }
        </div>
    )
}

export default Results;
