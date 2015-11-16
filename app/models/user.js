var services    = require('../services'),
    checkit     = require('checkit'),
    bcrypt      = require('bcryptjs');


var rules = {
    email: ['required', 'email'],
    password: 'required',
    confirm_password: {
        rule: 'matchesField:password',
        message: 'Passwords must match!'
    }
}

var User = services.Bookshelf.Model.extend({
    tableName:  'users',
    hasTimestamps: ["created_at", "updated_at"],
    initialize: function() {
        this.on('saving', this.validateSave, this);
        this.on('saving', this.hashit, this);
        this.on('saving', this.removeConfirm, this);
    },
    validateSave: function() {
        return checkit(rules).run(this.attributes);
    },
    removeConfirm: function() {
        delete this.attributes.confirm_password;
    },
    hashit: function(model) {
        var that = this;
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(that.attributes.password, salt, function(err, hash) {
                    if(err) return reject(err)
                    model.set('password', hash);
                    resolve(model);
                });
            });
        });
        
    }
});

module.exports = User;
