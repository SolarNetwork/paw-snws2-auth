(function() {
	'use strict';

	/*
	CryptoJS v3.1.2
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	var CryptoJS=CryptoJS||function(h,s){var f={},g=f.lib={},q=function(){},m=g.Base={extend:function(a){q.prototype=this;var c=new q;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
	r=g.WordArray=m.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=s?c:4*a.length},toString:function(a){return(a||k).stringify(this)},concat:function(a){var c=this.words,d=a.words,b=this.sigBytes;a=a.sigBytes;this.clamp();if(b%4)for(var e=0;e<a;e++)c[b+e>>>2]|=(d[e>>>2]>>>24-8*(e%4)&255)<<24-8*((b+e)%4);else if(65535<d.length)for(e=0;e<a;e+=4)c[b+e>>>2]=d[e>>>2];else c.push.apply(c,d);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
	32-8*(c%4);a.length=h.ceil(c/4)},clone:function(){var a=m.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],d=0;d<a;d+=4)c.push(4294967296*h.random()|0);return new r.init(c,a)}}),l=f.enc={},k=l.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++){var e=c[b>>>2]>>>24-8*(b%4)&255;d.push((e>>>4).toString(16));d.push((e&15).toString(16))}return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b+=2)d[b>>>3]|=parseInt(a.substr(b,
	2),16)<<24-4*(b%8);return new r.init(d,c/2)}},n=l.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++)d.push(String.fromCharCode(c[b>>>2]>>>24-8*(b%4)&255));return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b++)d[b>>>2]|=(a.charCodeAt(b)&255)<<24-8*(b%4);return new r.init(d,c)}},j=l.Utf8={stringify:function(a){try{return decodeURIComponent(escape(n.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return n.parse(unescape(encodeURIComponent(a)))}},
	u=g.BufferedBlockAlgorithm=m.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=j.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,d=c.words,b=c.sigBytes,e=this.blockSize,f=b/(4*e),f=a?h.ceil(f):h.max((f|0)-this._minBufferSize,0);a=f*e;b=h.min(4*a,b);if(a){for(var g=0;g<a;g+=e)this._doProcessBlock(d,g);g=d.splice(0,a);c.sigBytes-=b}return new r.init(g,b)},clone:function(){var a=m.clone.call(this);
	a._data=this._data.clone();return a},_minBufferSize:0});g.Hasher=u.extend({cfg:m.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){u.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,d){return(new a.init(d)).finalize(c)}},_createHmacHelper:function(a){return function(c,d){return(new t.HMAC.init(a,
	d)).finalize(c)}}});var t=f.algo={};return f}(Math);
	(function(h){for(var s=CryptoJS,f=s.lib,g=f.WordArray,q=f.Hasher,f=s.algo,m=[],r=[],l=function(a){return 4294967296*(a-(a|0))|0},k=2,n=0;64>n;){var j;a:{j=k;for(var u=h.sqrt(j),t=2;t<=u;t++)if(!(j%t)){j=!1;break a}j=!0}j&&(8>n&&(m[n]=l(h.pow(k,0.5))),r[n]=l(h.pow(k,1/3)),n++);k++}var a=[],f=f.SHA256=q.extend({_doReset:function(){this._hash=new g.init(m.slice(0))},_doProcessBlock:function(c,d){for(var b=this._hash.words,e=b[0],f=b[1],g=b[2],j=b[3],h=b[4],m=b[5],n=b[6],q=b[7],p=0;64>p;p++){if(16>p)a[p]=
	c[d+p]|0;else{var k=a[p-15],l=a[p-2];a[p]=((k<<25|k>>>7)^(k<<14|k>>>18)^k>>>3)+a[p-7]+((l<<15|l>>>17)^(l<<13|l>>>19)^l>>>10)+a[p-16]}k=q+((h<<26|h>>>6)^(h<<21|h>>>11)^(h<<7|h>>>25))+(h&m^~h&n)+r[p]+a[p];l=((e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22))+(e&f^e&g^f&g);q=n;n=m;m=h;h=j+k|0;j=g;g=f;f=e;e=k+l|0}b[0]=b[0]+e|0;b[1]=b[1]+f|0;b[2]=b[2]+g|0;b[3]=b[3]+j|0;b[4]=b[4]+h|0;b[5]=b[5]+m|0;b[6]=b[6]+n|0;b[7]=b[7]+q|0},_doFinalize:function(){var a=this._data,d=a.words,b=8*this._nDataBytes,e=8*a.sigBytes;
	d[e>>>5]|=128<<24-e%32;d[(e+64>>>9<<4)+14]=h.floor(b/4294967296);d[(e+64>>>9<<4)+15]=b;a.sigBytes=4*d.length;this._process();return this._hash},clone:function(){var a=q.clone.call(this);a._hash=this._hash.clone();return a}});s.SHA256=q._createHelper(f);s.HmacSHA256=q._createHmacHelper(f)})(Math);
	(function(){var h=CryptoJS,s=h.enc.Utf8;h.algo.HMAC=h.lib.Base.extend({init:function(f,g){f=this._hasher=new f.init;"string"==typeof g&&(g=s.parse(g));var h=f.blockSize,m=4*h;g.sigBytes>m&&(g=f.finalize(g));g.clamp();for(var r=this._oKey=g.clone(),l=this._iKey=g.clone(),k=r.words,n=l.words,j=0;j<h;j++)k[j]^=1549556828,n[j]^=909522486;r.sigBytes=l.sigBytes=m;this.reset()},reset:function(){var f=this._hasher;f.reset();f.update(this._iKey)},update:function(f){this._hasher.update(f);return this},finalize:function(f){var g=
	this._hasher;f=g.finalize(f);g.reset();return g.finalize(this._oKey.clone().concat(f))}})})();

	var kFormUrlEncodedContentTypeRegex = /^application\/x-www-form-urlencoded/i;

	function getLocation(href) {
		var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(?:\?([^#]*|)(#.*|))?$/);
		return match && {
			protocol: match[1],
			host: match[2],
			hostname: match[3],
			port: match[4],
			path: match[5],
			search: match[6],
			hash: match[7]
		};
	}

	function _encodeURIComponent(str) {
	  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	  });
	}

	function requestContentType(request) {
		return request.getHeaderByName('Content-Type');
	}

	function contentTypeIsQueryParameters(contentType) {
		// we don't send Digest for form data, because server treats this as URL parameters
		return (contentType && contentType.match(kFormUrlEncodedContentTypeRegex));
	}

	function requestBodyTreatedAsQueryParameters(request) {
		var contentType = requestContentType(request);
		return (request.method === 'POST' && contentTypeIsQueryParameters(contentType));
	}

	function canonicalQueryParameters(request) {
		var data = request.body,
			params = (requestBodyTreatedAsQueryParameters(request)
				? request.getUrlEncodedBody()
				: request.getUrlParameters());
		var sortedKeys = [],
			key,
			i,
			len,
			first = true,
			result = '';

		for ( key in params ) {
			sortedKeys.push(key);
		}
		sortedKeys.sort();
		for ( i = 0, len = sortedKeys.length; i < len; i += 1 ) {
			if ( first ) {
				first = false;
			} else {
				result += '&';
			}
			key = sortedKeys[i];
			result +=  _encodeURIComponent(key);
			result += '=';
			result += _encodeURIComponent(params[key]);
		}
		return result;
	}

	function canonicalHeaders(request, uri, date) {
		var contentType = requestContentType(request);
		var result = {
			headerNames : ['host'],
			headers : {
				'host' : (uri.port && uri.port == 80 ? uri.hostname : uri.host)
			}
		};
		var names = request.getHeadersNames();
		if ( names ) {
			names.forEach(function(name) {
				var lower = name.toLowerCase();
				if ( lower === 'content-type' || lower === 'date' || lower === 'content-md5' || lower === 'digest' || lower.startsWith('x-sn-') ) {
					result.headerNames.push(lower);
					result.headers[lower] = request.getHeaderByName(name);
				}
			});
		}
		if ( result.headers.date === undefined && result.headers['x-sn-date'] === undefined ) {
			result.headers['x-sn-date'] = date.toUTCString();
			result.headerNames.push('x-sn-date');
		}
		result.headerNames.sort();
		return result;
	}

	function iso8601Date(date, includeTime) {
		return ''+date.getUTCFullYear()
				+(date.getUTCMonth() < 9 ? '0' : '') +(date.getUTCMonth()+1)
				+(date.getUTCDate() < 10 ? '0' : '') + date.getUTCDate()
				+(includeTime ?
					'T'
					+(date.getUTCHours() < 10 ? '0' : '') + date.getUTCHours()
					+(date.getUTCMinutes() < 10 ? '0' : '') + date.getUTCMinutes()
					+(date.getUTCSeconds() < 10 ? '0' : '') +date.getUTCSeconds()
					+'Z'
					: '');
	}

	function sha256Hex(input) {
		var dv = DynamicValue("com.luckymarmot.HashDynamicValue", {
			input: input,
			hashType: 5,                // SHA256
			encoding: 'Hexadecimal',    // Hexadecimal
			uppercase: false,           // lower case
		});
		return dv.getEvaluatedString();
	}

	function getSignatureKey(key, dateStamp) {
		var kDate= CryptoJS.HmacSHA256(dateStamp, "SNWS2" + key)
		var kSigning= CryptoJS.HmacSHA256("snws2_request", kDate)
		return kSigning
	}

	function requestDateHeaderName(request) {
		return (request.getHeaderByName('X-SN-Date')
			? 'X-SN-Date'
			: request.getHeaderByName('Date')
				? 'Date'
				: undefined);
	}

	function requestDate(request) {
		var result = new Date();
		var dateHeader = request.getHeaderByName('X-SN-Date');
		if ( !dateHeader ) {
			dateHeader = request.getHeaderByName('Date');
		}
		if ( dateHeader ) {
			result = new Date(dateHeader);
		}
		return result;
	}

	function canonicalBodyDigest(request) {
		var content = (request.body && !requestBodyTreatedAsQueryParameters(request)
				? request.body
				: '');
		return sha256Hex(content);
	}

	function generateCanonicalRequestMessage(params) {
		var msg =
			(params.method === undefined ? 'GET' : params.method.toUpperCase()) + '\n'
			+params.uri.path +'\n'
			+(params.queryParams ? params.queryParams : '') +'\n';
		params.headers.headerNames.forEach(function(name) {
			msg += name + ':' +params.headers.headers[name] + '\n';
		});
		msg += params.headers.headerNames.join(';') +'\n';
		msg += params.bodyDigest;
		return msg;
	}

	function parseUrlSearch(search) {
		var params = {};
		var pairs;
		var pair;
		var i, len;
		if ( search !== undefined && search.length > 0 ) {
			// remove any leading ? character
			if ( search.match(/^\?/) ) {
				search = search.substring(1);
			}
			pairs = search.split('&');
			for ( i = 0, len = pairs.length; i < len; i++ ) {
				pair = pairs[i].split('=', 2);
				if ( pair.length === 2 ) {
					params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
				}
			}
		}
		return params;
	}

	function currentRequest(context) {
		var req = context.getCurrentRequest();
		if ( !this.preSignedUrl ) {
			return req;
		}
		var me = this;
		return {
			method: me.preSignedMethod,
			url: me.preSignedUrl,
			body: me.preSignedContent,
			getHeaderByName: function(name) {
				var val,
					lcName = name.toLowerCase();
				if ( me.preSignedHeaders ) {
					me.preSignedHeaders.some(function(kv) {
						if ( kv[0].toLowerCase() === lcName ) {
							val = kv[1];
							return true;
						}
						return false;
					});
				}
				if ( !val && (lcName === 'date' || lcName === 'x-sn-date') ) {
					val = req.getHeaderByName(name);
				}
				return val;
			},
			getHeadersNames: function() {
				var names;
				if ( me.preSignedHeaders ) {
					names = me.preSignedHeaders.map(function(kv) { return kv[0]; });
				}
				return names;
			},
			getUrlEncodedBody: function() {
				return parseUrlSearch(me.preSignedContent);
			},
			getUrlParameters: function() {
				return parseUrlSearch(getLocation(me.preSignedUrl).search);
			},
		};
	}

	// See https://github.com/SolarNetwork/solarnetwork/wiki/SolarNet-API-authentication-scheme-V2
	var SNWS2SignatureDynamicValue = function() {
		this.evaluate = function(context) {
			if ( !this.preSignedUrl && context.runtimeInfo.task != 'requestSend' ) {
				return '** SNWS auth is only generated during request send **'
			}
			var request = currentRequest.call(this, context);
			var uri = getLocation(request.url);
			var now = requestDate(request);
			var day = iso8601Date(now);
			var daytime = iso8601Date(now, true);
			var canonBodyDigest = canonicalBodyDigest(request);
			var canonHeaders = canonicalHeaders(request, uri, now);
			var canonQueryParams = canonicalQueryParameters(request);

			// Step 1
			var canonical = generateCanonicalRequestMessage({
				method: request.method,
				uri: uri,
				queryParams : canonQueryParams,
				headers : canonHeaders,
				bodyDigest: canonBodyDigest
			});

			var canonicalHash = sha256Hex(canonical);

			// Step 2
			var stringToSign = 'SNWS2-HMAC-SHA256\n'
				+ daytime + '\n'
				+ canonicalHash;

			// Step 3
			var signKey = getSignatureKey(this.secret, day);

			var signature = CryptoJS.HmacSHA256(stringToSign, signKey);

			// Step 4
			var auth = 'SNWS2 Credential='
				+ this.key
				+ ',SignedHeaders=' + canonHeaders.headerNames.join(';')
				+ ',Signature=' + signature;

			console.log('Canonical request:\n' +canonical
				+'\n\nString to sign:\n' +stringToSign
				+'\n\nSigning date: ' +day
				+'\nSigning key : ' +signKey);

			return auth;
		};
	};

	SNWS2SignatureDynamicValue.identifier = 'net.solarnetwork.PawExtensions.SNWS2SignatureDynamicValue';
	SNWS2SignatureDynamicValue.title = 'SolarNetwork Signature V2 Auth';
	SNWS2SignatureDynamicValue.help = 'https://github.com/SolarNetwork/Paw-SNWS2SignatureDynamicValue';
	SNWS2SignatureDynamicValue.inputs = [
		  DynamicValueInput('key', 'SN Access Key', 'SecureValue'),
		  DynamicValueInput('secret', 'SN Secret Key', 'SecureValue'),
		  DynamicValueInput('preSignedUrl', 'Pre-sign URL', 'String'),
		  DynamicValueInput('preSignedMethod', 'Pre-sign Method', 'Select',
		  	{"choices": {"GET":"GET", "POST":"POST", "PUT":"PUT", "DELETE":"DELETE"}}),
		  DynamicValueInput('preSignedHeaders', 'Pre-sign Headers', 'KeyValueList'),
		  DynamicValueInput('preSignedContent', 'Pre-sign Content', 'String'),
	  ];

	registerDynamicValueClass(SNWS2SignatureDynamicValue);
}.call(this));
