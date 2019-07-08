// ==UserScript==
// @name        MassMP
// @author      Snizzle
// @version     3.1
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
    function g() {
        a(".add-user").each(function() {
            var b = a(this).parent().parent().children().html().trim().toLowerCase();
            (localStorage.getItem("massmp").includes(b) || b == h) && a(this).hide()
        })
    }
    document.head.insertAdjacentHTML("beforeend", '<style type="text/css" id="massmp-css">\n.mmp-panel {\npadding: 7px;\nborder-bottom: 1px solid #ccc;\nmargin-bottom: 0.625rem;\n}\n\n.mmp-panel span:hover{\ncolor: #f00;\n}\n\n.mmp-compteur,.mmp-compteur:hover {\nfont-weight: 700;\ncolor:initial!important;\n}\n\n.mmp-btn,.mmp-btn:hover {\ncursor:pointer;\nbackground: #d7d7d7;\npadding: 2px 5px 2px 5px;\ncolor:initial!important;\nmargin-left: 5px;\n}\n\n.mmp-btn:active {\nbox-shadow: inset 0 0.1875rem 0.3125rem rgba(0,0,0,0.125);\n}\n\n.mmp-title {\nmargin-bottom: 10px;\n}\n\n.add-user {\nbackground: url(\'http://static.jvc.gg/1.96.4/img/profils/ico-pseudo-profil.png\') no-repeat -18px 0px;\ndisplay: inline-block;\nborder-radius: 3px;\nwidth: 1.3rem;\nheight: 1rem;\nfilter: invert(1) hue-rotate(147deg);\n}\n</style>');
    var h = a(".account-pseudo").html().toLowerCase();
    null === localStorage.getItem("massmp") && localStorage.setItem("massmp", "[]");
    var e = JSON.parse(localStorage.getItem("massmp")) || [];
    a(".bloc-options-msg").append('<span class="add-user" title="Ajouter ce pseudo au MP" style=""></span>');
    a(".bloc-pre-pagi-forum.bloc-outils-top").after('<div class="mmp-panel"><div class="mmp-title"><div class="mmp-liste"></div><span class="mmp-compteur">MassMP: ' + e.length + '/100 </span><span class="mmp-btn mmp-massadd pull-right" title="Ajouter la page actuelle dans le MP">Ajouter la page enti\u00e8re</span><span class="mmp-btn mmp-send pull-right">Envoyer MP</span><span class="mmp-btn mmp-clear pull-right icon-bin" title="Vider la liste"></span></div>');
    0 == e.length && a(".mmp-liste").hide();
    g();
    (function() {
        for (var b = 0; b < e.length; b++) a(".mmp-panel").append("<span id='" + e[b].toLowerCase() + "' title='Supprimer ce pseudo du MP' style='cursor:pointer;'>" + e[b].toLowerCase() + "  </span>")
    })();
    a(".add-user").click(function() {
        var b = (JSON.parse(localStorage.getItem("massmp")) || []).length,
            c = a(this).parent().parent().children().html().trim().toLowerCase();
        if (100 > b) {
            var d = JSON.parse(localStorage.getItem("massmp")) || [];
            d.push(c);
            localStorage.setItem("massmp", JSON.stringify(d));
            a(this).hide();
            a(".mmp-panel").show();
            a(".mmp-panel").append("<span id='" + c.toLowerCase() + "' title='Supprimer ce pseudo du MP' style='cursor:pointer;'>" + c.toLowerCase() + "  </span>");
            a(".mmp-compteur").text("MassMP: " + ++b + "/100 ");
            g()
        } else alert("Limite de personnes atteinte! (100)")
    });
    a(".mmp-panel").on("click", "span", function() {
        var b = JSON.parse(localStorage.getItem("massmp")) || [],
            c = b.length,
            d = a(this).attr("id");
        d = b.indexOf(d);
        0 <= d && (b.splice(d, 1), a(this).hide(), localStorage.setItem("massmp", JSON.stringify(b)),
            a(".mmp-compteur").text("MassMP: " + --c + "/100 "))
    });
    a(".mmp-massadd").click(function() {
        var b = (JSON.parse(localStorage.getItem("massmp")) || []).length;
        a(".add-user").each(function() {
            var c = a(this).parent().parent().children().html().trim().toLowerCase();
            if (!localStorage.getItem("massmp").includes(c) && 100 > b && c != h) {
                var d = JSON.parse(localStorage.getItem("massmp")) || [];
                d.push(c);
                localStorage.setItem("massmp", JSON.stringify(d));
                a(this).hide();
                a(".mmp-panel").show();
                a(".mmp-panel").append("<span id='" + c.toLowerCase() +
                    "' title='Supprimer ce pseudo du MP' style='cursor:pointer;'>" + c.toLowerCase() + "  </span>");
                a(".mmp-compteur").text("MassMP: " + ++b + "/100 ");
                g()
            }
        })
    });
    a(".mmp-clear").click(function() {
        1 == confirm("Vider la liste ?") && (localStorage.setItem("massmp", "[]"), a(".mmp-panel").hide(), location.reload())
    });
    a(".mmp-send").click(function() {
        1 == confirm("Envoyer le MP ?") && (a(".mmp-panel").hide(), JSON.parse(localStorage.getItem("massmp")), "[]" !== localStorage.getItem("massmp") && window.open("http://www.jeuxvideo.com/messages-prives/nouveau.php#massmp").focus())
    });
    if ("http://www.jeuxvideo.com/messages-prives/nouveau.php#massmp" === window.location.href) {
        for (var f = 0; f < e.length; f++) a(".form-control-tag-inner").append('<span class="label label-default"><span class="text-">' + e[f] + '</span><span class="close close-tag" aria-hidden="true">\u00d7</span><input type="hidden" name="participants[' + e[f] + ']" value="' + e[f] + '"></span>');
        localStorage.setItem("massmp", "[]")
    }
});
