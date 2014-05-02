# TOC
   - [sg-until](#sg-until)
<a name=""></a>
 
<a name="sg-until"></a>
# sg-until
continuously calls a function every 100ms until it returns truthy.

```js
var counter = 0;
until( function () {
	counter++;
	if ( counter === 5 ) return 'chicken';
}, function ( _error, _result ) {
	should( _error ).equal( null );
	_result.should.eql( 'chicken' );
	_done();
} );
```

should wait for about 3 seconds.

```js
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
```

should wait for about 3 seconds but check every 10 milliseconds.

```js
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
```

should stop checking if an error is returned.

```js
var timesChecked = 0;
until( function () {
	timesChecked++;
	if ( timesChecked === 5 ) return new Error( '5 is odd' );
}, function ( _error ) {
	_error.should.be.an.Error;
	_done();
} );
```

should timeout if specified.

```js
var timeout = 1000;
until( function () {
	return false;
}, function ( _error ) {
	_error.should.be.an.Error;
	/timed out/i.test( _error.message );
	_done();
}, 100, timeout );
```

