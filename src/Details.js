import React, { Component } from 'react'
import pet from '@frontendmasters/pet';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
/*
    // Dehugging code
    <pre>
    <code>
        { JSON.stringify(props, null, 4)}
    </code>
    </pre>
*/

class Details extends Component {

    state = {
        name: '',
        animal: '',
        location: '',
        description: '',
        media: [],
        breed: '',
        loading: false,
    }

    componentDidMount() {
        const { id } = this.props;
        this.setState({ loading: true})
        pet.animal(id).then( res => {
            const { animal } = res;
            console.log(res);
            this.setState({
                name: animal.name,
                animal: animal.type,
                location: `${animal.contact.address.city},${animal.contact.address.state}`,
                description: animal.description,
                media: animal.photos,
                breed: animal.breeds.primary,
                loading: false,
            });
        })
        .catch(e => console.error(e));


    }

    render(){
        const { loading } = this.state;
        if( loading ){
            return <h1>loading...</h1>
        }
        const { name, animal, location, description, breed, media } = this.state;
        return (
                <div className='details'>
                    <Carousel media={media} />
                    <div>
                        <h1>{name}</h1>
                        <h2>{`${animal} - ${breed} - ${ location }`}</h2>
                        <button>Adopt { name }</button>
                        <p>{description}</p>
                    </div>
                </div>
        )
    }
}

export default function DetailsWithError(props){
    return (
        <ErrorBoundary>
            <Details {...props} />
        </ErrorBoundary>
    )
};
