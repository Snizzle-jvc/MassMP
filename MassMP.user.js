// ==UserScript==
// @name        MassMP
// @author      Snizzle
// @version     1.5
// @downloadURL https://github.com/Snizzle-jvc/MassMP/raw/master/MassMP.user.js
// @updateURL   https://github.com/Snizzle-jvc/MassMP/raw/master/MassMP.user.js
// @supportURL  http://www.jeuxvideo.com/messages-prives/nouveau.php?all_dest=Snizzle;Snitchzzle
// @copyright   2018, Snizzle
// @licence     MIT
// @description Facilite les MP de masse sur JVC
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @match       *://www.jeuxvideo.com/forums/*
// @run-at      document-end
// ==/UserScript==
$(function($){
    var link = "http://www.jeuxvideo.com/messages-prives/nouveau.php";
    var getPseudos = JSON.parse(localStorage.getItem('massmp')) || [];
    var btnSend = '<span class="picto-msg-nuke send-mass-mp" title="Envoyer le MP" style="color:white;float:right;margin: 8px 8px 0 0;cursor:pointer;"></span>';
    var btnClear = '<span class="picto-msg-croix clear-mass-mp" title="Vider la liste" style="float:right;cursor:pointer;margin: 8px 8px 0px 0px;filter: grayscale(1);"></span>';

    $(".bloc-options-msg").prepend('<span class="picto-msg-nuke mass-mp" title="Mass MP" style="filter: grayscale(1);"><span>Mass MP</span></span>');
    $(".col-right").prepend('<div class="panel panel-jv-forum panel-mass-mp"><div class="panel-heading panel-heading-mass-mp">Mass-MP'+btnClear+btnSend+'</div><div class="panel-body panel-body-mass-mp" style="text-align:center;"><div class="scrollable-content bloc-info-forum" id="liste-mass-mp"></div></div></div>');

    if (localStorage.getItem('massmp') == "[]") {$(".panel-mass-mp").hide();}
    function getPseudosList(){
        for (var z = 0; z < getPseudos.length; z++) {
            $("#liste-mass-mp").append("<span class='btn btn-actu-new-list-forum btn-list-users' id='"+getPseudos[z].toLowerCase()+"' title='Supprimer ce pseudo du MP' style='margin-right:5px;margin-top:5px'>"+getPseudos[z].toLowerCase()+"<span class='picto-msg-croix pull-right' style='margin: 5px 5px 0 5px;'></span></span>");
        }
    }

    getPseudosList();

    $(".mass-mp").each(function() {
        var pseudo = $(this).parent().parent().children().html().trim();
        var user = $(".account-pseudo").html();
        if (localStorage.getItem('massmp').includes(pseudo) || (pseudo == user)) {
            $(this).hide();}
    })

    $(".mass-mp").click(function() {
        var pseudo = $(this).parent().parent().children().html().trim().toLowerCase();
        var oldItems = JSON.parse(localStorage.getItem('massmp')) || [];
        var newItem = pseudo;
        oldItems.push(newItem);
        localStorage.setItem('massmp',JSON.stringify(oldItems));
        $(this).hide();
        $("#liste-mass-mp").append("<span class='btn btn-actu-new-list-forum btn-list-users' id='"+pseudo.toLowerCase()+"' title='Supprimer ce pseudo du MP' style='margin-right:5px;margin-top:5px'>"+newItem.toLowerCase()+"<span class='picto-msg-croix pull-right' style='margin: 5px 5px 0 5px;'></span></span>");
        $(".panel-mass-mp").show();
        $(".mass-mp").each(function() {
            var pseudo = $(this).parent().parent().children().html().trim();
            if (localStorage.getItem('massmp').includes(pseudo)) {
                $(this).hide();}
        })
    })

    $(".send-mass-mp").click(function(){
        var r = confirm("Envoyer le MP ?");
        if (r == true) {
            var getPseudos = JSON.parse(localStorage.getItem('massmp')) || [];
            if (localStorage.getItem('massmp') !== "[]") {
                window.open(link+'#massmp').focus();
            }
        }
    })
    if (window.location.href === (link+'#massmp')) {
        for (var z = 0; z < getPseudos.length; z++) {
            $(".form-control-tag-inner").append('<span class="label label-default"><span class="text-">'+getPseudos[z]+'</span><span class="close close-tag" aria-hidden="true">×</span><input type="hidden" name="participants['+getPseudos[z]+']" value="'+getPseudos[z]+'"></span>')
        }
        localStorage.setItem("massmp","[]");
    }
    $('#liste-mass-mp').on('click', '.btn.btn-actu-new-list-forum.btn-list-users', function() {
        var getPseudos = JSON.parse(localStorage.getItem('massmp')) || [];
        var pseudo = $(this).attr("id");
        var index = getPseudos.indexOf(pseudo);
        if (index >= 0) {
            getPseudos.splice(index, 1);
            $(this).hide();
            localStorage.setItem("massmp", JSON.stringify(getPseudos));
        }
    })

    $(".clear-mass-mp").click(function(){
        var r = confirm("Vider la liste de signalements ?");
        if (r == true) {
            localStorage.setItem("massmp","[]");
            $(".panel-mass-mp").hide();location.reload()}

    })
})
