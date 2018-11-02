// ==UserScript==
// @name        MassMP
// @author      Snizzle
// @version     2.2
// @downloadURL https://github.com/Snizzle-jvc/MassMP/raw/master/MassMP.user.js
// @updateURL   https://github.com/Snizzle-jvc/MassMP/raw/master/MassMP.user.js
// @supportURL  http://www.jeuxvideo.com/messages-prives/nouveau.php?all_dest=Snizzle;Snitchzzle
// @copyright   2018, Snizzle
// @licence     MIT
// @description Facilite les MP de masse sur JVC
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @match       *://www.jeuxvideo.com/forums/*
// @match       *://www.jeuxvideo.com/messages-prives/*
// @run-at      document-end
// ==/UserScript==
$(function(a) {
  null === localStorage.getItem("massmp") && localStorage.setItem("massmp", "[]");
  var d = window.location.href, e = JSON.parse(localStorage.getItem("massmp")) || [];
  a(".bloc-options-msg").prepend('<span class="picto-msg-nuke mass-mp" title="Mass MP" style="filter: grayscale(1);"><span>Mass MP</span></span>');
  a(".col-right").prepend('<div class="panel panel-jv-forum panel-mass-mp"><div class="panel-heading panel-heading-mass-mp">Mass-MP<span class="picto-msg-croix clear-mass-mp" title="Vider la liste" style="float:right;cursor:pointer;margin: 8px 8px 0px 0px;filter: grayscale(1);"></span><span class="picto-msg-nuke send-mass-mp" title="Envoyer le MP" style="color:white;float:right;margin: 8px 8px 0 0;cursor:pointer;"></span></div><div class="panel-body panel-body-mass-mp" style="text-align:center;"><div class="scrollable-content bloc-info-forum" id="liste-mass-mp"></div></div></div>');
  "[]" == localStorage.getItem("massmp") && a(".panel-mass-mp").hide();
  (function() {
    for (var b = 0; b < e.length; b++) {
      a("#liste-mass-mp").append("<span class='btn btn-actu-new-list-forum btn-list-users' id='" + e[b].toLowerCase() + "' title='Supprimer ce pseudo du MP' style='margin-right:5px;margin-top:5px'>" + e[b].toLowerCase() + "<span class='picto-msg-croix pull-right' style='margin: 5px 5px 0 5px;'></span></span>");
    }
  })();
  a(".mass-mp").each(function() {
    var b = a(this).parent().parent().children().html().trim().toLowerCase(), c = a(".account-pseudo").html();
    (localStorage.getItem("massmp").includes(b) || b == c) && a(this).hide();
  });
  a(".mass-mp").click(function() {
    var b = a(this).parent().parent().children().html().trim().toLowerCase(), c = JSON.parse(localStorage.getItem("massmp")) || [];
    c.push(b);
    localStorage.setItem("massmp", JSON.stringify(c));
    a(this).hide();
    a("#liste-mass-mp").append("<span class='btn btn-actu-new-list-forum btn-list-users' id='" + b.toLowerCase() + "' title='Supprimer ce pseudo du MP' style='margin-right:5px;margin-top:5px'>" + b.toLowerCase() + "<span class='picto-msg-croix pull-right' style='margin: 5px 5px 0 5px;'></span></span>");
    a(".panel-mass-mp").show();
    a(".mass-mp").each(function() {
      var b = a(this).parent().parent().children().html().trim().toLowerCase();
      localStorage.getItem("massmp").includes(b) && a(this).hide();
    });
  });
  a(".send-mass-mp").click(function() {
    1 == confirm("Envoyer le MP ?") && (JSON.parse(localStorage.getItem("massmp")), "[]" !== localStorage.getItem("massmp") && window.open("http://www.jeuxvideo.com/messages-prives/nouveau.php#massmp").focus());
  });
  if ("http://www.jeuxvideo.com/messages-prives/nouveau.php#massmp" === d) {
    for (d = 0; d < e.length; d++) {
      a(".form-control-tag-inner").append('<span class="label label-default"><span class="text-">' + e[d] + '</span><span class="close close-tag" aria-hidden="true">\u00d7</span><input type="hidden" name="participants[' + e[d] + ']" value="' + e[d] + '"></span>');
    }
    localStorage.setItem("massmp", "[]");
  }
  a("#liste-mass-mp").on("click", ".btn.btn-actu-new-list-forum.btn-list-users", function() {
    var b = JSON.parse(localStorage.getItem("massmp")) || [], c = a(this).attr("id");
    c = b.indexOf(c);
    0 <= c && (b.splice(c, 1), a(this).hide(), localStorage.setItem("massmp", JSON.stringify(b)));
  });
  a(".clear-mass-mp").click(function() {
    1 == confirm("Vider la liste de signalements ?") && (localStorage.setItem("massmp", "[]"), a(".panel-mass-mp").hide(), location.reload());
  });
});
