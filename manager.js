'use strict';

const events = require( './events.js' );

require( './system.js' );
require( './pilot.js' );

const { randFullName, randAddress } = require( '@ngneat/falso' );
const { v4: uuidv4 } = require( 'uuid' );

setInterval( () => {
    let { country, city } = randAddress();
    const details = {
        airline: 'Qatar Airways',
        flightID: uuidv4(),
        pilot: randFullName(),
        destination: `${country}, ${city}`,
    };
    console.log( `Manager: new flight with ID '${details.flightID}' have been scheduled` );
    events.emit( 'new-flight', details );
}, 10000 );

events.on( 'arrived', ( details ) => {
    console.log( `Manager: we’re greatly thankful for the amazing flight, ${details.pilot}` );
} );