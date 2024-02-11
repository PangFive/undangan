/*!
 * Countdown v0.1.0
 * https://github.com/fengyuanchen/countdown
 *
 * Copyright 2014 Fengyuan Chen
 * Released under the MIT license
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";var b=function(c,d){this.$element=a(c),this.defaults=a.extend({},b.defaults,this.$element.data(),a.isPlainObject(d)?d:{}),this.init()};b.prototype={constructor:b,init:function(){var a=this.$element.html(),b=new Date(this.defaults.date||a);b.getTime()&&(this.content=a,this.date=b,this.find(),this.defaults.autoStart&&this.start())},find:function(){var a=this.$element;this.$days=a.find("[data-days]"),this.$hours=a.find("[data-hours]"),this.$minutes=a.find("[data-minutes]"),this.$seconds=a.find("[data-seconds]"),this.$days.length+this.$hours.length+this.$minutes.length+this.$seconds.length>0&&(this.found=!0)},reset:function(){this.found?(this.output("days"),this.output("hours"),this.output("minutes"),this.output("seconds")):this.output()},ready:function(){var a,b=this.date,c=100,d=1e3,e=6e4,f=36e5,g=864e5,h={};return b?(a=b.getTime()-(new Date).getTime(),0>=a?(this.end(),!1):(h.days=a,h.hours=h.days%g,h.minutes=h.hours%f,h.seconds=h.minutes%e,h.milliseconds=h.seconds%d,this.days=Math.floor(h.days/g),this.hours=Math.floor(h.hours/f),this.minutes=Math.floor(h.minutes/e),this.seconds=Math.floor(h.seconds/d),this.deciseconds=Math.floor(h.milliseconds/c),!0)):!1},start:function(){!this.active&&this.ready()&&(this.active=!0,this.reset(),this.autoUpdate=this.defaults.fast?setInterval(a.proxy(this.fastUpdate,this),100):setInterval(a.proxy(this.update,this),1e3))},stop:function(){this.active&&(this.active=!1,clearInterval(this.autoUpdate))},end:function(){this.date&&(this.stop(),this.days=0,this.hours=0,this.minutes=0,this.seconds=0,this.deciseconds=0,this.reset(),this.defaults.end())},destroy:function(){this.date&&(this.stop(),this.$days=null,this.$hours=null,this.$minutes=null,this.$seconds=null,this.$element.empty().html(this.content),this.$element.removeData("countdown"))},fastUpdate:function(){--this.deciseconds>=0?this.output("deciseconds"):(this.deciseconds=9,this.update())},update:function(){--this.seconds>=0?this.output("seconds"):(this.seconds=59,--this.minutes>=0?this.output("minutes"):(this.minutes=59,--this.hours>=0?this.output("hours"):(this.hours=23,--this.days>=0?this.output("days"):this.end())))},output:function(a){if(!this.found)return void this.$element.empty().html(this.template());switch(a){case"deciseconds":this.$seconds.text(this.getSecondsText());break;case"seconds":this.$seconds.text(this.seconds);break;case"minutes":this.$minutes.text(this.minutes);break;case"hours":this.$hours.text(this.hours);break;case"days":this.$days.text(this.days)}},template:function(){return this.defaults.text.replace("%s",this.days).replace("%s",this.hours).replace("%s",this.minutes).replace("%s",this.getSecondsText())},getSecondsText:function(){return this.active&&this.defaults.fast?this.seconds+"."+this.deciseconds:this.seconds}},b.defaults={autoStart:!0,date:null,fast:!1,end:a.noop,text:"%s days, %s hours, %s minutes, %s seconds"},b.setDefaults=function(c){a.extend(b.defaults,c)},a.fn.countdown=function(c){return this.each(function(){var d=a(this),e=d.data("countdown");e||d.data("countdown",e=new b(this,c)),"string"==typeof c&&a.isFunction(e[c])&&e[c]()})},a.fn.countdown.constructor=b,a.fn.countdown.setDefaults=b.setDefaults,a(function(){a("[countdown]").countdown()})}); jQuery("document").ready(function(t){t("#post-guestbook-box").submit(function(o){o.preventDefault();var e="action=guestbook_box_submit&id="+t(".guestbook-box-content").data("id")+"&avatar="+t("#hidden-avatar img").attr("src")+"&"+t(this).serialize();t.post(cevar.ajax_url,e,function(o){t(".guestbook-list").prepend(o),t("#post-guestbook-box")[0].reset()})})});jQuery("document").ready(function(n){var e=window.settingAutoplay;e?(n("#mute-sound").show(),document.getElementById("song").play()):n("#unmute-sound").show(),n("#audio-container").click(function(u){e?(n("#mute-sound").hide(),n("#unmute-sound").show(),document.getElementById("song").pause(),e=!1):(n("#unmute-sound").hide(),n("#mute-sound").show(),document.getElementById("song").play(),e=!0)})});
(function ($) {
    "use strict";

    var editMode = false;
    
            // Sticky script starts
var wdpSticky = function ($scope, $) {
    var wdpStickySection = $scope.find('.wdp-sticky-section-yes').eq(0);

    wdpStickySection.each(function(i) {
        var dataSettings = $(this).data('settings');
        $.each( dataSettings, function(index, value) { 
            if( index === 'wdp_sticky_top_spacing' ){
                $scope.find('.wdp-sticky-section-yes').css( "top", value + "px" );
            }
        }); 
    });
    $scope.each(function(i) {
        var sectionSettings = $scope.data("settings");
        $.each( sectionSettings, function(index, value) { 
            if( index === 'wdp_sticky_top_spacing' ){
                $scope.css( "top", value + "px" );
            }
        }); 
    });
    
    if ( wdpStickySection.length > 0 ) {
        var parent = document.querySelector('.wdp-sticky-section-yes').parentElement;
        while (parent) {
            var hasOverflow = getComputedStyle(parent).overflow;
            if (hasOverflow !== 'visible') {
                parent.style.overflow = "visible"
            }
            parent = parent.parentElement;
        }
    }

    var columnClass = $scope.find( '.wdp-column-sticky' );
    var dataId = columnClass.data('id');
    var dataType = columnClass.data('type');
    var topSpacing = columnClass.data('top_spacing');

    if( dataType === 'column' ){
        var $target  = $scope;
        var wrapClass = columnClass.find( '.elementor-widget-wrap' );
    
        wrapClass.stickySidebar({
            topSpacing: topSpacing,
            bottomSpacing: 60,
            containerSelector: '.elementor-row',
            innerWrapperSelector: '.elementor-column-wrap',
        });
    }

}
// Sticky script ends
$(window).on('elementor/frontend/init', function () {
    if( elementorFrontend.isEditMode() ) {
        editMode = true;
    }
    
    elementorFrontend.hooks.addAction( 'frontend/element_ready/section', wdpSticky);
}); 

}(jQuery));
;