var test = require('tape-catch');
var dust = require('../../lib/dust.js');

var fixtures = {};
fixtures.page = 'page.dust';
fixtures.partial1 = 'partial1.dust';
fixtures.partial2 = 'partial2.dust';

test('test dust.setConfig(config), getConfig()', function(t) {
    
    dust.setConfig({ extension: 'foo' });
    t.equals(dust.getConfig().extension, '.foo', "extension is normalized with a leading '.'");
    
    dust.setConfig({ extension: '.foo' });
    t.equals(dust.getConfig().extension, '.foo', "extension is normalized with a leading '.'");
    
    t.end()
    
});

test('test dust.renderComponent(name, data, cb)', function(t) {

    t.plan(4);
    
    dust.setConfig({path: './test/fixtures/', extension: '.dust', whitespace: false});
    
    t.throws(function() { dust.renderComponent(); } , "name must be a string");

    dust.renderComponent('notATemplate', {}, function(err, out) { 
        var msg = "main template name must be valid";
        err ? t.pass(msg) : t.fail(msg);
    }); 
    
    dust.renderComponent('template1', {a:"a", b: "b", c: "c", partial: "template2"}, function(err, out) {
        t.equals(out, "aabbcc", "complex template works");
    });
    
    dust.renderComponent('template4', {}, function(err, out) {
        var msg = "embedded partial template name must be valid ";
        err ? t.pass(msg) : t.fail(msg);
    });
     
});


// --------------------------------------------------------------------------------
// MOCKS, STUBS and OTHER HELPERS
// --------------------------------------------------------------------------------

