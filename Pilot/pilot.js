'use strict';

const io = require( 'socket.io-client' );
const airlineSocket = io.connect( 'http://localhost:3001/airline' );
const originalSocket = io.connect( 'http://localhost:3001' );


originalSocket.on( 'new-flight', ( details ) => {
    setTimeout( () => {
        console.log( ` Pilot: flight with ID ‘${details.flightID}’ took-off` );
        airlineSocket.emit( 'took-off', details );
    }, 4000 );
    setTimeout( () => {
        console.log( `Pilot: flight with ID '${details.flightID}' has arrived` );
        originalSocket.emit( 'arrived', details );
    }
        , 7000 );
} );
