'use strict';

const io = require( 'socket.io-client' );
const socket = io.connect( 'http://localhost:3001' );
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
    socket.emit( 'new-flight', details );
}, 10000 );

socket.on( 'arrived', ( details ) => {
    console.log( `Manager: we’re greatly thankful for the amazing flight, ${details.pilot}` );
} );