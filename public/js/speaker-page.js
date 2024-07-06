var firestore = firebase.firestore();


firestore.collection("speakers").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, " -> ", doc.data().title);
        var bio = doc.data().bio;
        var company = doc.data().company;
        var country = doc.data().country;
        var name = doc.data().name;
        var photoUrl = doc.data().photoUrl;
        var title = doc.data().title;
        $('#cards').append('<div class="col s12 l3"><a class="modal-trigger" href="#'+ doc.id +'"> <div class="card white card-speaker z-depth-0" style="min-height:400px;"><div class="center-align" style="padding-top: 30px;"><img src="'+ photoUrl +'" class="circle auto-fit"><h1 class="card-title black-text">'+ name +'</h1><div class="origin black-text">'+ title +' - ' + company +'</div><div class="origin black-text">'+ country +'</div><div class="card-content black-text left-align" style="text-align: justify;"><p>'+ bio.substring(0, 156) +'...</p></div></div></div></a></div>');
        $('#modals').append('<div id="' + doc.id +'" class="modal"><div style="height: 175px; background-color:#eeecec; padding: 23.5px;"><div class="container row"><div class="col s3"><img src="'+ photoUrl +'" class="circle auto-fit"></div><div class="col s9"><h1 class="container-title" style="margin-top: 40px; line-height: 0px;">'+ name +'</h1><span>'+ country +'</span></div></div></div><div class="modal-content container"><h5>'+ title +' · '+ company +'</h5><p style="text-align: justify;">'+ bio +'</p></div><div class="modal-footer"><a href="#!" class="modal-close waves-effect waves-green btn-flat">Fermer</a></div></div>');        $('.modal').modal({});
    });

});