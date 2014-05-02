module.exports = function ( _fn, _callback, _interval, _timeout ) {
	var fn = typeof _fn === 'function' ? _fn : function () {},
		callback = typeof _callback === 'function' ? _callback : function () {},
		interval = typeof _interval === 'number' && _interval > 0 ? _interval : 100,
		timeout = typeof _timeout === 'number' && _timeout > 0 ? _timeout : 0,
		timedout = false,
		timeoutId;

	if ( timeout ) {
		timeoutId = setTimeout( function () {
			timedout = true;
			_callback( new Error( 'Timed out' ) );
		}, timeout );
	}

	var test = function () {
		if ( timedout ) return;

		var result = _fn();

		if ( !result ) {
			setTimeout( test, interval );
		} else {
			clearTimeout( timeoutId );
			if ( result instanceof Error ) {
				_callback( result );
			} else {
				_callback( null, result );
			}
		}
	};

	test();
}