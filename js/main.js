/**
 * Created by ТАНЯ on 04.05.14.
 */
$(function(){


function myWindow(width, height){
    this.width = width;
    this.height = height;
    this.showHide = function() {
        this.style.display = (this.style.display == 'none') ? '' : 'none'
    }

    /*    this.show = this.open();
        this.clos = this.close();*/
    this.conten = function(){
/*        var cont = $('<div>this is main text</div><button class="close">close</button>');
        this.append(cont);*/
alert('hi')
    }
}
var popup = new myWindow(400, 500);
console.log(popup);

});