var redis = require('../redisClient');

var node = {
  // Returns an array of errors or false if a valid node object was passed
  invalid: function(data) {
    var errors = [];
    if (!data.lat) {
      errors.push("A map node must have a lat property. Found " + data.lat || "undefined" + " instead");
    }
    if (!data.long) {
      errors.push("A map node must have a long property. Found " + data.long || "undefined" + " instead");
    }

    if (errors.length) {
      return errors;
    }
    else {
      return false;
    }
  },

  create: function(data, cb) {
    var errors = this.invalid(data);
    if (errors) {
      return cb(errors);
    }

  },

  retrieve: function(data, cb) {


  },

  update: function(data, cb) {


  },

  del: function(data, cb) {


  }
};

var map = {

  validate: function(data) {


  },

  create: function(data, cb) {

  },

  retrieve: function(data, cb) {

  },

  update: function(data, cb) {


  },

  del: function(data, cb) {


  }
};

exports.map = map;
exports.node = node;

