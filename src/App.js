


import React from 'react';
import SearchParams from './SearchParams';
import Details from './Details';
import { Router, Link } from '@reach/router'

export const App = () => {
   return (
     <div>
        <header>
         <Link to='/'> Adopt Me</Link>
        </header>
        <Router>
            <SearchParams path='/' />
            <Details path='/details/:id'/>
        </Router>
     </div>
   )
};

