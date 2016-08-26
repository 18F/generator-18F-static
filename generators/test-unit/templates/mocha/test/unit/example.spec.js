'use strict';
var assert = require('assert');

describe('lower()', function() {

  var lower = require('../../lib/lower');

  it('returns a lowercase string', function() {
    assert.equal(lower('Foo Bar'), 'foo bar');
  });

});
