// ==UserScript==
// @name        FastMP
// @author      Snizzle
// @version     3.2
// @downloadURL https://github.com/Snizzle-jvc/MassMP/raw/master/MassMP.user.js
// @updateURL   https://github.com/Snizzle-jvc/MassMP/raw/master/MassMP.user.js
// @supportURL  http://www.jeuxvideo.com/messages-prives/nouveau.php?all_dest=Snizzle;Snitchzzle
// @copyright   2018, Snizzle
// @licence     MIT
// @description Facilite les MP de masse sur JVC
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @match       *://www.jeuxvideo.com/forums/*
// @match       *://www.jeuxvideo.com/messages-prives/nouveau.php*
// @run-at      document-end
// ==/UserScript==
$(function(a) {
    function g() {
        a(".add-user").each(function() {
            var b = a(this).parent().parent().children().html().trim().toLowerCase();
            (localStorage.getItem("massmp").includes(b) || b == h) && a(this).hide()
        })
    }

    function l(b) {
        var d = (JSON.parse(localStorage.getItem("massmp")) || []).length;
        b = a(b).parent().parent().children().html().trim().toLowerCase();
        if (100 > d) {
            var e = JSON.parse(localStorage.getItem("massmp")) || [];
            e.push(b);
            localStorage.setItem("massmp", JSON.stringify(e));
            a(this).hide();
            a(".mmp-liste").show();
            a(".mmp-liste").append("<span id='" +
                b + "' title='Supprimer ce pseudo du MP' style='cursor:pointer;'>" + b + "  </span>");
            a(".mmp-compteur").text("MassMP: " + ++d + "/100 ");
            g()
        } else alert("Limite de personnes atteinte! (100)")
    }

    function m() {
        var b = (JSON.parse(localStorage.getItem("massmp")) || []).length;
        a("body").find(".add-user").each(function() {
            var d = a(this).parent().parent().children().html().trim().toLowerCase();
            if (!localStorage.getItem("massmp").includes(d) && 100 > b && d != h) {
                var e = JSON.parse(localStorage.getItem("massmp")) || [];
                e.push(d);
                localStorage.setItem("massmp",
                    JSON.stringify(e));
                a(this).hide();
                a(".mmp-liste").show();
                a(".mmp-liste").append("<span id='" + d + "' title='Supprimer ce pseudo du MP' style='cursor:pointer;'>" + d + "  </span>");
                a(".mmp-compteur").text("MassMP: " + ++b + "/100 ");
                g()
            }
        })
    }

    function n() {
        var b = a(".pagi-fin-actif").attr("href").split("-")[3],
            d = k.split("/")[4].split("-")[1],
            e = k.split("/")[4].split("-")[2];
        k.split("/")[4].split("-");
        for (var c = 1; c <= b; c++) a.get("http://www.jeuxvideo.com/forums/42-" + d + "-" + e + "-" + [c] + "-0-1-0-aaa.htm", function(b) {
            var c =
                (JSON.parse(localStorage.getItem("massmp")) || []).length;
            a(b).find(".text-user").each(function() {
                var b = a(this).html().trim().toLowerCase();
                if (!localStorage.getItem("massmp").includes(b) && 100 > c && b != h) {
                    var d = JSON.parse(localStorage.getItem("massmp")) || [];
                    d.push(b);
                    localStorage.setItem("massmp", JSON.stringify(d));
                    a(".mmp-liste").show();
                    a(".mmp-liste").append("<span id='" + b + "' title='Supprimer ce pseudo du MP' style='cursor:pointer;'>" + b + "  </span>");
                    a(".mmp-compteur").text("MassMP: " + ++c + "/100 ")
                }
            })
        })
    }
    document.head.insertAdjacentHTML("beforeend", '<style type="text/css" id="massmp-css">\n.mmp-panel {\npadding: 7px;\nborder-bottom: 1px solid #ccc;\nmargin-bottom: 0.625rem;\n}\n\n.mmp-panel span:hover{\ncolor: #f00;\n}\n\n.mmp-compteur,.mmp-compteur:hover {\nfont-weight: 700;\ncolor:initial!important;\n}\n\n.mmp-btn.mmp-clear.pull-right.icon-bin {\nmargin: -5px 0px 0px 5px;\n}\n\n.mmp-btn.mmp-massadd.pull-right.picto-msg-nuke {\nmargin: -4px 8px 0px 5px;\n}\n\n.mmp-btn,.mmp-btn:hover {\ncursor:pointer;\nmargin-left: 10px;\n}\n\n.mmp-title {\nmargin-bottom: 10px;\n}\n\n.add-user {\nbackground: url(\'http://static.jvc.gg/1.96.4/img/profils/ico-pseudo-profil.png\') no-repeat -18px 0px;\ndisplay: inline-block;\nborder-radius: 3px;\nwidth: 1.3rem;\nheight: 1rem;\nfilter: invert(1) hue-rotate(147deg);\n}\n\n.mmp-fulladd, .mmp-fulladd:hover{\n    margin: -4px 0px 0px 5px;\n}\n</style>');
    var k = document.location.href.split("id_topic = ")[0].split(";")[0],
        h = a(".account-pseudo").html().toLowerCase();
    null === localStorage.getItem("massmp") && localStorage.setItem("massmp", "[]");
    var c = JSON.parse(localStorage.getItem("massmp")) || [];
    a(".bloc-options-msg").append('<span class="add-user" title="Ajouter ce pseudo au MP" style=""></span>');
    a(".bloc-pre-pagi-forum.bloc-outils-top").after('<div class="mmp-panel"><div class="mmp-title"><div class="bloc-options-msg"><span class="mmp-btn pull-right mmp-fulladd picto-msg-exclam" title="Ajouter tout le topic"></span><span class="mmp-btn mmp-massadd pull-right picto-msg-nuke" title="Ajouter la page actuelle dans le MP"></span><span class="mmp-btn mmp-send pull-right picto-msg-lettre" title="Envoyer le MP"></span><span class="mmp-btn mmp-clear pull-right icon-bin" title="Vider la liste"></span></div><span class="mmp-compteur">MassMP: ' +
        c.length + '/100 </span><div class="mmp-liste"></div></div></div>');
    0 == c.length ? a(".mmp-liste").hide() : a(".mmp-liste").show();
    g();
    (function() {
        for (var b = 0; b < c.length; b++) a(".mmp-liste").append("<span id='" + c[b].toLowerCase() + "' title='Supprimer ce pseudo du MP' style='cursor:pointer;'>" + c[b].toLowerCase() + "  </span>")
    })();
    a(".add-user").click(function() {
        l(this)
    });
    a(".mmp-massadd").click(function() {
        m()
    });
    a(".mmp-fulladd").click(function() {
        n()
    });
    a(".mmp-panel").on("click", "span", function() {
        var b = JSON.parse(localStorage.getItem("massmp")) || [],
            c = b.length,
            e = a(this).attr("id");
        e = b.indexOf(e);
        0 <= e && (b.splice(e, 1), a(this).hide(), localStorage.setItem("massmp", JSON.stringify(b)), a(".mmp-compteur").text("MassMP: " + --c + "/100 "))
    });
    a(".mmp-clear").click(function() {
        1 == confirm("Vider la liste ?") && (localStorage.setItem("massmp", "[]"), a(".mmp-liste").hide(), location.reload())
    });
    a(".mmp-send").click(function() {
        1 == confirm("Envoyer le MP ?") && (a(".mmp-liste").hide(), JSON.parse(localStorage.getItem("massmp")), "[]" !== localStorage.getItem("massmp") &&
            window.open("http://www.jeuxvideo.com/messages-prives/nouveau.php#massmp").focus())
    });
    if ("http://www.jeuxvideo.com/messages-prives/nouveau.php#massmp" === window.location.href) {
        for (var f = 0; f < c.length; f++) a(".form-control-tag-inner").append('<span class="label label-default"><span class="text-">' + c[f] + '</span><span class="close close-tag" aria-hidden="true">\u00d7</span><input type="hidden" name="participants[' + c[f] + ']" value="' + c[f] + '"></span>');
        localStorage.setItem("massmp", "[]")
    }
});
