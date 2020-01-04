var handlebars = require('handlebars');

handlebars.registerHelper('convertmoney', function(money){
    return formatDecimal(money,{precision: 0})+"đ";
})
handlebars.registerHelper('for', function(n, block) {
    var allblock = '';
    for(var i = 1; i <= n; ++i) {
        block.data.index = i;
        allblock += block.fn(this);
    }
    return allblock;
});

handlebars.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 == v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

handlebars.registerHelper('selectproducts', function(v1, v2, label) {
    if(v1 == v2) {
        return new handlebars.SafeString('<option value="' + v2 + '\" class=\"btn\" selected = "selected"> ' + label + '</option>');
    }
    return new handlebars.SafeString('<option value="' + v2 + '\" class=\"btn\"> ' + label + '</option>');
});


// handlebars.registerHelper('totalmoney', function(v1, v2, options) {
//     if(v1 == undefined || v2 == undefined) {
//         return 0;
//     }
//     return v1 * v2;
// });
handlebars.registerHelper('option', function(value) {
    if(value == 0){
        return new handlebars.SafeString('<span class="screen-reader-text">Trạng thái: Mở</span>');
    }else if(value == 1){
        return new handlebars.SafeString('<span class="screen-reader-text">Trạng thái: booked </span>');
    }else if(value == 2){
        return new handlebars.SafeString('<span class="screen-reader-text">Trạng thái: closed </span>')
    }
    
  });