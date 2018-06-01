var position;
/*Tahle funkce řeší kultivaci inicializaci a nastavení Colorboxu, který se stará o zobrazení detailu prací po kliknutí...
 Prostě wannabe html javascript galerie hadr*/
function ukazSkupinu(aProbohaCeho) {
    /*Zjistime scrollpozici a bloknem scroll*/
    position = $(document).scrollTop();
    $('html').css({
        overflow: 'hidden'
    });
    /*skryjeme hovertext, protože v colorboxu nemá být vidět*/
    aProbohaCeho.find("div.hover").css({"display": "none"});
    /*necháme skřítky naformátovat a ukázat skrytý obsah*/
    aProbohaCeho.find("div.hidden-desc").css({"display": "block"});
    aProbohaCeho.find("span.hidden-title").css({"display": "block"});
    aProbohaCeho.css({"text-align": "center"});

    /*Prida, napozycuje a nastyluje zaviraci zlacitko*/
    $("#cboxLoadedContent").append('<div id="cboxCustomCloseWrapper">' +
        '<div id="cboxCustomClose" class="btn btn-dark btn-lg">' +
        'Zavřít' + "</div></div>");
}
function schovejSkupinu(aProbohaCeho) {
    /*odblokovat hovertext*/
    aProbohaCeho.find("div.hover").css({"display": "block"});
    /*schováme skřítky zobrazený obsah*/
    aProbohaCeho.removeClass("cboxElement");
    aProbohaCeho.find("div.hidden-desc").css({"display": "none"});
    aProbohaCeho.find("span.hidden-title").css({"display": "none"});

    /*obnovíme scrollposition*/
    $('html').css({
        overflow: 'auto'
    });
    $("html,body").scrollTop(position);
    /*zaznamenat stav Cboxu*/

    /*vycisti zaviraci tlacitko*/
    $("#cboxCustomCloseWrapper").remove();
}
$(document).ready(function () {
    /*event handling ukoncovaciho tlacitka colorboxu*/
    $("#colorbox").on("click", "#cboxCustomClose", function () {
        $.colorbox.close();
    });

    /*kliknutí na obrázek galerie*/
    $('div.item').click(function (event) {
        /*Jedna řídící proměnná, která určí jestli můžeme zobrazovat nebo už máme zobrazeno*/
        var jeCboxAktivni = false;
        /*Skupina fotek, na jejíhož potomka bylo kliknuto*/
        var skupinaFotek = $(this).parent();

        try {
            /*Jestliže skupina nemá .cboxElement, můžeme ji zobrazit*/
            jeCboxAktivni = skupinaFotek.attr("class").indexOf("cboxElement") > -1;
        }
        catch (err) {
            jeCboxAktivni = false;
        }
        /*Jinak je aktivní Cbox a určitě ho nechceme restartovat, takže nic*/
        /*pokud je cbox aktivní zastavíme rozjetý skřítky*/
        if (jeCboxAktivni == true) {
            event.stopImmediatePropagation();
            event.preventDefault();
            return false;
        }
        /*Pokud jsou vhodný podmínky a je co ukazovat, aktivujeme cbox*/
        if ((skupinaFotek.attr("class") == "group-to-show-in-colorBox")) {
            skupinaFotek.colorbox({
                inline: true,
                closeButton: false,
                href: $(this).parent(),
                width: "65%",
                height: "100%",
                top: 0,
                onComplete: function () {
                    (ukazSkupinu(skupinaFotek));
                },
                onCleanup: function () {
                    schovejSkupinu(skupinaFotek);
                }
            });
        }
    });
    /*Kliknutí na skrytý obrázek galerie*/
    $('div.item-hidden').click(function (event) {
        event.stopImmediatePropagation();
        event.preventDefault();
        return false;
    });
})
;