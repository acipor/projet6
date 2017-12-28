/*----------------------  audio .js ------------------------*/ 
$(function() {
    var imgArray = [  
     'images/haut_parleur_non.png',
     'images/haut_parleur.png'
    ];
    var counter = 0;
    $('#son').click(function() {
        $('.ambiance').prop('muted') ? $(".ambiance").prop('muted', false) : $(".ambiance").prop('muted', true);
        document.getElementById('imgson').src = imgArray[counter % imgArray.length]; 
        counter += 1;
    });  
});