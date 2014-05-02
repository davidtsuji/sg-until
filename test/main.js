var should = require( 'should' ),
	until = require( '../src' );

describe( 'sg-until', function () {
	this.slow( 10000 );
	this.timeout( 5000 );

	it( 'continuously calls a function every 100ms until it returns truthy', function ( _done ) {
		var counter = 0;

		until( function () {
			counter++;
			if ( counter === 5 ) return 'chicken';
		}, function ( _error, _result ) {
			should( _error ).equal( null );
			_result.should.eql( 'chicken' );
			_done();
		} );

	} );

	it( 'should wait for about 3 seconds', function ( _done ) {
		var started = new Date().getTime(),
			timesChecked = 0;

		until( function () {
			timesChecked++;
			return new Date().getTime() - started > 500;
		}, function () {
			( new Date().getTime() - started ).should.be.greaterThan( 500 );
			timesChecked.should.be.greaterThan( ( 500 / 100 * .8 ) );
			_done();
		} );

	} );

	it( 'should wait for about 3 seconds but check every 10 milliseconds', function ( _done ) {
		var started = new Date().getTime(),
			timesChecked = 0;

		until( function () {
			timesChecked++;
			return new Date().getTime() - started > 500;
		}, function () {
			( new Date().getTime() - started ).should.be.greaterThan( 500 );
			timesChecked.should.be.greaterThan( 500 / 10 * .8 );
			_done();
		}, 10 );

	} );

	it( 'should stop checking if an error is returned', function ( _done ) {
		var timesChecked = 0;

		until( function () {
			timesChecked++;
			if ( timesChecked === 5 ) return new Error( '5 is odd' );
		}, function ( _error ) {
			_error.should.be.an.Error;
			_done();
		} );

	} );

	it( 'should timeout if specified', function ( _done ) {
		var timeout = 1000;

		until( function () {
			return false;
		}, function ( _error ) {
			_error.should.be.an.Error;
			/timed out/i.test( _error.message );
			_done();
		}, 100, timeout );

	} );

} );