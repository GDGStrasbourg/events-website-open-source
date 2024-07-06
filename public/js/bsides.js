$(function() {
    $("#navbar-content").load("elements/navbar.html", function() {
        $("#tabbar").load("elements/tabbar.html", function() {
            var elems = document.querySelectorAll('#dropdown-trigger-tab');
            M.Dropdown.init(elems, {
                coverTrigger: false,
                container: 'toolbar-fixed',
                constrainWidth: false,
                alignment: 'right'
            });
        });
    });
    $("#footer").load("elements/footer.html");

    var header = $(".top-navbar");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
            header.removeClass('transparent z-depth-0 trans').addClass("color-dark z-depth-1 trans");
        } else {
            header.removeClass("color-dark z-depth-1 trans").addClass('transparent z-depth-0 trans');
        }
    });
});