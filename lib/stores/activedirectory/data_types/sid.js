var ldap = require('ldapjs');

exports.store = {
  mixinCallback: function(){
        
    //Windows SID
    this.addType('sid', {
      read: function(value){        
        if(value === null) return null;

        var hex = new Buffer(value, 'base64').toString('hex').toUpperCase();
        var parts = hex.match(/.{2}/g);
        var output = ['S'];

        output.push(parseInt(parts[0], 16));  
        output.push(parseInt(parts[7], 16));    

        for(i = 8; i<parts.length; i+=4){
          tmp = '';
          for(var x = 3; x >= 0; x--){
            tmp += parts[i + x];
          }
          output.push(parseInt(tmp, 16));
        }

        return output.join('-');
      },
      write: function(value){
        return value;
      }
    }, {
      binary: true,
      operators:{
        default: 'eq',
        defaults: ['eq', 'not']
      }
    });
    
  }
}