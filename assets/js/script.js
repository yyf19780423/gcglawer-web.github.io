$(document).ready(function() {
    $('body').scrollspy({ target: '#main-navbar' });
    
    $('#slider_1').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: true,
        items: 1
    });
    
    $('#test-slider').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: true,
        items: 1
    });

    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        const postData = $(this).serializeArray();
        const formURL = $(this).attr('action');
        const $cfResponse = $('#contactFormResponse');
        const $cfsubmit = $('#cfsubmit');
        const cfsubmitText = $cfsubmit.text();

        $cfsubmit.text('Sending...');

        $.ajax({
            url: formURL,
            type: 'POST',
            data: postData,
            success: function(data) {
                $cfResponse.html(data);
                $cfsubmit.text(cfsubmitText);
            },
            error: function() {
                alert('Error occurred! Please try again');
            }
        });

        return false;
    });
});

/*------------------------------------------
 Subscribe form ajax
 ------------------------------------------*/

$('#subscription-form').submit(function(e) {
    e.preventDefault();
    
    const $form = $('#subscription-form');
    const submit = $('#subscribe-button');
    const ajaxResponse = $('#subscription-response');
    const email = $('#subscriber-email').val();

    $.ajax({
        type: 'POST',
        url: 'php/subscribe.php',
        dataType: 'json',
        data: { email: email },
        cache: false,
        beforeSend: function() {
            submit.html('Working...');
        },
        success: function(result) {
            if (result.sendstatus === 1) {
                ajaxResponse.html(result.message);
                $form.fadeOut(500);
            } else {
                ajaxResponse.html(result.message);
                submit.html('<i class="ion-heart"></i> Get it');
            }
        },
        error: function() {
            submit.html('<i class="ion-heart"></i> Get it');
            alert('Error occurred! Please try again');
        }
    });
});