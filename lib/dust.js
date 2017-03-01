// --------------------------------------------------------------------------------
// BOOTSTRAP
// --------------------------------------------------------------------------------

var fs = require('fs');
var dust = require('dustjs-helpers');

var config = {
    path: './',
    extension: '.dust',
    whitespace: false,
};
setConfig(config);

dust.onLoad = loadTemplate; // load and compile files for partials as needed

module.exports = exports = {};

exports.getConfig = getConfig;
exports.setConfig = setConfig;
exports.renderComponent = renderComponent;


// --------------------------------------------------------------------------------
// METHODS
// --------------------------------------------------------------------------------

function getConfig() {
    return JSON.parse(JSON.stringify(config));
}

function setConfig(newConfig) {
    
    config.path = newConfig.path || config.path;
    /\/$/.test(config.path) || (config.path += '/');
    
    config.extension = newConfig.extension || config.extension;
    /^\./.test(config.extension) || (config.extension = '.' + config.extension);
    
    config.whitespace = newConfig.whitespace || config.whitespace;
    dust.config.whitespace = !!config.whitespace;
}

function loadTemplate(templateName, cb) {
    var path = config.path + templateName + config.extension;
    fs.readFile(path, {encoding: 'utf8'}, function(err, data) {
        cb(err, data);
    });
}

function renderComponent(templateName, data, cb) {
    if (typeof templateName !== 'string') throw new Error('template name must be a string');
    var path = config.path + templateName + config.extension;
    fs.readFile(path, {encoding: 'utf8'}, function(err, src) {
        if (err) {
            cb(err);
            return;
        }
        dust.loadSource(dust.compile(src, templateName));
        dust.render(templateName, data || {}, function(err, out) {
            cb(err, out)
        });
    });
}


