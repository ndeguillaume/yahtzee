var images_des = ['https://i.imgur.com/PacGORE.png','https://i.imgur.com/6UR9NBN.png','https://i.imgur.com/PlVaj5L.png','https://i.imgur.com/IPOk28m.png','https://i.imgur.com/JuSL9DV.png','https://i.imgur.com/LxpUkEa.png'];
var selectionne = [];
var val_selectionne =[];
var des=[];
var nb_lances = 2;
var score_superieure = 0;
var score_inferieure = 0;
var texte_bouton = "lancer les dés";
var cases_sup_validees=0;
var cases_inf_validees=0;
var yahtzee = false;
var nom="Invité";


function load() {
    premier_lance();
    nom_joueur();
}

window.onload = load;

function nom_joueur() {
    $('body').append('<div id="debut"><div id="message_debut"><p>Veuillez entrer votre nom</p> <br/><input id="nom" type="text"> <br/><input class="bouton" id="jouer" type="submit" value="Jouer"></div></div>')

$('#jouer').on('click',function () {
    if ($('#nom').val()=="")
        nom="Invité";
    else {
        nom = $('#nom').val();
        nom=nom.toLowerCase();
        var tmp =nom;
        tmp=tmp.slice(0,1).toUpperCase();
        nom=nom.slice(1,nom.length);
        nom = tmp+nom;
        }
    $('#debut').remove();
    console.log(nom);

})
}

function afficher_tableau(tab){
    for (var z = 0 ; z<tab.length;z++)
    {
        console.log(z + " : " + tab[z]);
    }
    console.log("-----------------------");
}

function update_textes() {
    precalculer_score();
    if (nb_lances===0)
    {

        $('#lancer_des').val("Choisissez un score");
        $('#lancer_des').prop('disabled',true);
        $('#lancer_des').addClass("disabled");
    }
    else
    {
        $('#lancer_des').val("("+nb_lances+") "+ texte_bouton);
        $('#lancer_des').removeClass('disabled');
        $('#lancer_des').prop('disabled',false);
    }

}

function precalculer_score() {
    var i = 1;


    $('.section_superieure').each(function () {
        if ($(this).hasClass("score_a_selectionner")) {
            if ($(this).children().length === 1)
                    $(this).children().remove();

            var score_tmp = nb_des(i) * i;

            ($('img').each(function () {
                if ($(this).attr("alt")==i && $(this).hasClass("selectionne")) {
                    score_tmp+=i;
                }

            }));



            $(this).append("<p class=''>" + score_tmp + "</p>");
        }
            i++;
    });

    var i = 1;
    $('.section_inferieure').each(function () {
        if ($(this).hasClass("score_a_selectionner")) {
            var score_tmp = 0;
            if ($(this).children().length === 1)
                $(this).children().remove();

            switch (i) {
                case 1:
                    var brelan = false;
                    var tmp = [];
                    ($('img').each(function () {
                        tmp.push($(this).attr("alt"));
                    }));
                    var j = 0;
                    while (j < 6 && !brelan) {
                        var t = j + 1;
                        brelan = (compter_occurence(tmp, t) >= 3);
                        j++;
                    }
                    if (brelan) {
                        for (var j = 0; j < tmp.length; j++)
                            score_tmp += parseInt(tmp[j]);
                    }
                    else
                        score_tmp = 0;


                    break;
                case 2:

                    var carre = false;
                    var tmp = [];
                    ($('img').each(function () {
                        tmp.push($(this).attr("alt"));
                    }));
                    var j = 0;
                    while (j < 6 && !carre) {
                        var t = j + 1;
                        carre = (compter_occurence(tmp, t) >= 4);
                        j++;
                    }
                    if (carre) {
                        for (var j = 0; j < tmp.length; j++)
                            score_tmp += parseInt(tmp[j]);
                    }
                    else
                        score_tmp = 0;

                    break;
                case 3:
                    var nb_brelan;
                    var pair=false;
                    var brelan=false;

                    var tmp = [];
                    ($('img').each(function () {
                        tmp.push($(this).attr("alt"));
                    }));
                    var j = 0;
                    while (j < 6 && !brelan) {
                        var t = j + 1;
                        brelan = (compter_occurence(tmp, t) >= 3);
                        j++;
                    }
                    if (brelan)
                        nb_brelan=j;


                    var tmp = [];
                    ($('img').each(function () {
                        tmp.push($(this).attr("alt"));
                    }));
                    var j = 0;
                    pair = false;
                    while (j < 6 && !pair) {
                        var t = j + 1;
                        pair = (compter_occurence(tmp, t) >= 2);
                        j++;
                        if (j===nb_brelan && pair===true)
                            pair=false;
                    }

                    if (pair && brelan)
                    {
                        score_tmp=25
                    }
                    else
                        score_tmp=0;
                    break;
                case 4:
                    var tmp = [];
                    ($('img').each(function () {
                        if (!contains(tmp, parseInt($(this).attr("alt"))))
                            tmp.push(parseInt($(this).attr("alt")));
                    }));
                    if (petite_suite(tmp))
                        score_tmp = 30;
                    else
                        score_tmp = 0;
                    break;
                case 5:
                    var tmp = [];
                    ($('img').each(function () {
                        if (!contains(tmp, parseInt($(this).attr("alt"))))
                            tmp.push(parseInt($(this).attr("alt")));
                    }));
                    if (grande_suite(tmp))
                        score_tmp = 40;
                    else
                        score_tmp = 0;
                    break;
                case 6:
                    var tmp = [];
                    ($('img').each(function () {
                        tmp.push(parseInt($(this).attr("alt")));
                    }));
                    if (tmp[0] == tmp[1] == tmp[2] == tmp[3] == tmp[4]) {
                        score_tmp = 50;
                    }
                    else
                        score_tmp=0;
                                       break;
                case 7:
                    ($('img').each(function () {
                        score_tmp += parseInt($(this).attr("alt"));
                    }));
                    break;
            }
            $(this).append("<p class=''>" + score_tmp + "</p>");
        }
        i++
    })
}

function test_yahtzee() {
    if (yahtzee==true) {
        var tmp = [];
        ($('img').each(function () {
            tmp.push(parseInt($(this).attr("alt")));
        }));
        if (tmp[0] == tmp[1] == tmp[2] == tmp[3] == tmp[4]) {
                $('#yahtze').append("<p>100</p>")
            }
    }
}

function compter_occurence(tab,val){
    var tmp = tab.slice(0);
    var occurence = 0;
    var b = true;
    if (contains(tmp,val)) {

            for (var k=0;k<tmp.length;k++)
        {
            if (tmp[k]==val) {
                tmp[k] = null;
                occurence++;
            }
        }
        }
    return occurence;
}

function petite_suite(tmp) {
    return (tmp.indexOf(1)!=-1 && tmp.indexOf(2)!=-1 && tmp.indexOf(3)!=-1 && tmp.indexOf(4)!=-1 || tmp.indexOf(2)!=-1 && tmp.indexOf(3)!=-1 && tmp.indexOf(4)!=-1 && tmp.indexOf(5)!=-1 || tmp.indexOf(3)!=-1 && tmp.indexOf(4)!=-1 && tmp.indexOf(5)!=-1 && tmp.indexOf(6)!=-1 )
}

function grande_suite(tmp)
{
    return (tmp.indexOf(1)!=-1 && tmp.indexOf(2)!=-1 && tmp.indexOf(3)!=-1 && tmp.indexOf(4)!=-1 && tmp.indexOf(5)!=-1|| tmp.indexOf(2)!=-1 && tmp.indexOf(3)!=-1 && tmp.indexOf(4)!=-1 && tmp.indexOf(5)!=-1 && tmp.indexOf(6)!=-1)
}

function nb_des(val){
    var res=0;
    for (var i=0 ; i<des.length; i++)
    {
        if (des[i]===val) {
            res++;
        }
        }

    return res;
}

function rdm(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function premier_lance() {

    $("body").append("<div id='resultat'></div>");
    for (var i = 0; i<5; i++)
    {
        var j;
        j = rdm(6);
        var tmpj = j+1;
        var tmp = i+1;
        $("#resultat").append("<div><img alt="+tmpj+" id="+tmp+" src="+images_des[j]+"/></div");
        var x=rdm(80);
        while (x<10)
            x=rdm(80);
        var y = rdm(100);
        var rotate=rdm(360);
        $('#'+tmp).css({transform:'rotate('+rotate+'deg)',top:y+'px',left:x+'%',position:'relative'});
        des.push(tmpj);
    }

    $("div img").on("click",function () {
        var id = $(this)[0].id;
        val_selectionne.push($(this).attr("alt"));
        $(this).addClass("selectionne");
        $(this).css({top:'0',left:'0',transform:'rotate(0deg)'});
        if (selectionne.indexOf(id) === -1){
            selectionne.push(id);
        }
    });
    update_textes();
}


function relancer_des(){
    des=[];
    var tmp = cases_a_changer();
    for (var i = 0 ; i < selectionne.length; i ++)
    {
        des.push($("#"+[selectionne[i]]).attr("alt"));
    }
    for (var i = 0 ; i < tmp.length;i++)
    {
        relancer_de(tmp[i]-1);
    }

}

function cases_a_changer() {
    var tmp = [] ;
    if ($("#1").attr("class")===undefined)
        tmp.push(1);
    if ($("#2").attr("class")===undefined)
      tmp.push(2);
    if ($("#3").attr("class")===undefined)
        tmp.push(3);
    if ($("#4").attr("class")===undefined)
      tmp.push(4);
    if ($("#5").attr("class")===undefined)
        tmp.push(5);

    return tmp;
}

function contains(tab,e)
{
    for (var i =0;i<tab.length;i++)
    {
        if (tab[i]==e)
            return true;
    }
    return false;
}


function relancer_de(i) {
    var tmp = i+1;
    var de = rdm(6);
    $("#"+tmp).attr("src",images_des[de]);
    de++;
    $("#"+tmp).attr("alt",de);
    var x=rdm(80);
    while (x<10)
        x=rdm(80);
    var y = rdm(100);
    var rotate=rdm(360);
    $('#'+tmp).css({transform:'rotate('+rotate+'deg)',top:y+'px',left:x+'%',position:'relative'});
    des.push(de);

}


$('#lancer_des').on("click",function () {
    if (nb_lances==3)
        premier_lance();
    else
        relancer_des();
    nb_lances--;
    test_yahtzee();
    update_textes()

});

$(".section_superieure").on("click",function () {
        if ($(this).hasClass("score_a_selectionner")) {
            $(this).removeClass("score_a_selectionner");
            $(this).addClass("score_selectionne");
            score_superieure += parseInt($(this).find("p").text());
            $("#total").text(score_superieure);
            $("#resultat").remove();

            cases_sup_validees++;
            nb_lances = 2;
            selectionne = [];
            des = [];
            premier_lance();
        }

        if (cases_sup_validees==6 && $("#total_superieure p").length==0)
        {
            if (score_superieure>=63) {
                score_superieure += 35;
                $("#prime63").append("<p>" + score_superieure + "</p>");
            }
            else
                $("#prime63").append("<p>0</p>");

            $("#total_superieure").append("<p>"+score_superieure+"</p>");

        }
});

$('.section_inferieure').on("click",function () {
    if ($(this).hasClass("score_a_selectionner"))
    {
        $(this).removeClass("score_a_selectionner   ");
        $(this).addClass("score_selectionne");
        if (parseInt($(this).find("p").text())==50)
            yahtzee=true;
        score_inferieure+= parseInt($(this).find("p").text());
        $("#resultat").remove();

        cases_inf_validees++;
        nb_lances = 2;
        selectionne = [];
        des = [];
        premier_lance();

        if (cases_inf_validees==7){
            if (yahtzee && $('#yahtze').find("p").text()==100)
                score_inferieure+=100;
            else
                $('#yahtze').append("<p>0</p>");
        $('#total_inferieure').append("<p>"+score_inferieure+"</p>")
        }
    }
});

$('td').on("click",function () {
    if (cases_inf_validees==7 && cases_sup_validees==6)
    {
        localStorage.setItem(nom,parseInt(score_superieure+score_inferieure));
        $('body').append('<div id="fin"><div id="message_fin"><p>Bravo '+ nom+' ! </p> <br/><p>Votre score est de '+parseInt(score_superieure+score_inferieure)+'</p> <br/><input class="bouton" id="rejouer" type="submit" value="Rejouer"><p><u>Tableau des scores</u></p><div id="affichage_scores"></p><table id="scores"></table></div></div></div>');

        Object.keys(localStorage).forEach(function(key){
            if (key===nom)
                $('#scores').append("<tr><td><b>"+key+"</b></td><td><b>"+localStorage.getItem(key)+"</b></td></tr>");
            else
                $('#scores').append("<tr><td>"+key+"</td><td>"+localStorage.getItem(key)+"</td></tr>");

        });
    }


    $('#rejouer').on("click",function () {
        $('#fin').remove();
        remise_a_zero_jeu();
    });
});

function remise_a_zero_jeu() {
     selectionne = [];
     val_selectionne =[];
     des=[];
     nb_lances = 2;
     score_superieure = 0;
     score_inferieure = 0;
     texte_bouton = "lancer les dés";
     cases_sup_validees=0;
     cases_inf_validees=0;
     yahtzee = false;
     brelan=false;

     $('.score_selectionne').each(function () {
         $(this).removeClass("score_selectionne");
         $(this).addClass("score_a_selectionner");
     });
     $('#resultat').remove();
     $('#total').text("");
     $('#prime63').text("");
     $('#total_superieure').text("");
     $('#yahtze').text("");
     $('#total_inferieure').text("");
     premier_lance();
     update_textes();

}