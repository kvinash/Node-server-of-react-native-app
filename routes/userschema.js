const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema( {
  name: { type: String},
  password: { type: String},
  profile: { type: String, },
 
});
var userModel = mongoose.model('user',user);


module.exports = userModel;