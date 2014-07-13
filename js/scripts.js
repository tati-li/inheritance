$(function(){

    $('.show').click(function(){
        var message = new Message({
            width: 150,
            content: 'data loading...'
        });
    });
    $('.show2').click(function(){
        var message2 = new Confirm({
			width: 250,
            content: 'Do You want to leave?',
            buttons:{
                yes: {
                    name: 'yes',
                    callback: function(){
                        alert(this.name);
                    }
                },
                no: {
                    name: 'no',
                    callback: function(){
                        alert('hi');
                    }
                }
            }
		});
    });
    $('.show3').click(function(){
        var message2 = new Dialog({
            width: 500,
            content: 'Choose a picture, please',
            pictures: {
                first: {
                    src : 'img/1.jpg'
                },
                second: {
                    src : 'img/2.jpg'
                }
            },
            callback: function(outcome){
                $('body').css({
                    'background': 'url('+outcome+') no-repeat',
                    'background-size':'50%'
                })
            }

        });
    });
});
var Message = function(opt){
    this.option = opt;
    this.initialize();
    this.show();
};

Message.prototype = {
    content:$('<div class="cont"></div>'),
    btn_close:$(' <button id="close">Close</button>'),
    el: $('<div class="myModal"></div>'),
    initialize: function(opt){
        this.content.html(this.option.content);
        if(!this.option.timer){
            this.btn_close.appendTo(this.content);
        } else {
            this.time();
        }
        this.content.appendTo(this.el);
        this.el.appendTo($('body'));
        this.content.css({
            'margin-top' : 50,
            'width' : this.option.width
        });
    },
    show: function(opt){
        var _this = this;
        this.btn_close
            .click(function (){
                _this.hide();
            })
    },
    hide: function(){
        if (this.timer) clearTimeout(this.timer);
        this.el.remove();

    },
    time: function(){
        this.timer = setTimeout(
            function (obj){obj.hide()},
            this.option.timer*1000,
            this
        );
    }
};

var Confirm = function(opt){
    this.option = opt;
    this.btn_yes = $(' <button id="yes">'+opt.buttons.yes.name+'</button>');
    this.btn_no = $(' <button id="no">'+opt.buttons.no.name+'</button>');
    this.initialize();
    this.addButtons();
    this.buttonsEvent(function (outcome) {
        if(outcome=="yes"){opt.buttons.yes.callback()}
        else if(outcome=="no"){opt.buttons.no.callback()}
    })
};

Confirm.prototype = new Message({});

Confirm.prototype.addButtons = function(){
    this.content.append(this.btn_yes,this.btn_no);
};

Confirm.prototype.buttonsEvent = function(handler){
    var _this = this;
    Message.prototype.show();
    this.btn_yes.click(function (e){
		_this.hide();
		handler("yes");
	});
    this.btn_no.click(function (e){
		_this.hide();
		handler("no");
	});
};


var Dialog = function(opt){
    this.option = opt;
    this.initialize();
    this.show();
    this.callback(function (outcome) {
        if(outcome){opt.callback(opt.pictures[outcome].src)}
    })
};

Dialog.prototype = new Message({});

Dialog.prototype.initialize = function(){
    Message.prototype.initialize.apply(this, arguments);
    var radioBox = '';
    $.each(this.option.pictures,function(name, obj){
        radioBox +='<input type="radio" name="choose" id='+name+'><label for='+name+'><img src='+obj['src']+' width="100" height="100"/></label>'
    });
    this.content.append($(radioBox));
};

Dialog.prototype.callback = function(handler){
    this.content.on('change' , ":radio[name='choose']",function() { handler(this.id) } )
};
