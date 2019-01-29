const $alert_close = $(".content__main__alert--close");

const $bell = $('.header__bell');
const $bell__path = $("#bell");

// =====================
// = Alert Function ====
// =====================

$alert_close.click((event) => {
    const $target = $(event.target);
    console.log($target);
    console.log(getAlertParent($target));
    getAlertParent($target).fadeOut();
});

const getAlertParent = target => {
    if(target.is("svg")){
        return target.parent().parent();
    } else {
        return target.parent().parent().parent().parent();
    }
}

// =====================
// = Notifications =====
// =====================

let notification = [
    {
        id: 100,
        message: "This is a notification."
    },
    {
        id: 101,
        message: "This is a notification."
    },
    {
        id: 102,
        message: "This is a notification."
    },
    {
        id: 103,
        message: "This is a notification."
    },

];

// Shake the bell or open notification deping on how many notifications there are.
$bell.click((event) => {
    const $target = $(event.target);

    if(notification.length == 0){
        $bell__path.addClass("shake");

        setTimeout(() => {
            $bell__path.removeClass("shake");
        }, 1000);
    }else{
        // There is a notification.
        $notif__screen.slideToggle();
    }
});

// =======================
// = Notification Screen =
// =======================

const $notif__screen = $(".notifications");
const $notif__close = $(".notifications__close");
const $notif__content = $(".notifications__content");

// Close Notification Screen
$notif__close.click((event) => {
    const $target = $(event.target);
    if(getCloseParent($target) == null) return;
    getCloseParent($target).slideToggle();
});

// Close notification
$notif__content.click((event) => {
    const $target = $(event.target);
    if(getCloseParent($target) == null) return;

    const $parent   = getCloseParent($target);
    const id        = parseInt($parent.attr('id'));

    $parent.slideToggle(400, () => {$parent.remove();});
    removeNotificationById(id);

    if(notification.length == 0){
        $notif__screen.slideToggle();
        $bell.removeClass("notification");
    }
});

const addNotification = (notif) => {
    //Item Wrapper w/ ID
    const wrapper = $(`<div id="${notif.id}" class="notifications__content__item"></div>`);

    //Close Button
    const close = $(`<div class="notifications__content__item__close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.2 31.2"><g data-name="Layer 2"><path d="M29.88 23.52a4.5 4.5 0 1 1-6.36 6.36L15.6 22l-7.92 7.88a4.5 4.5 0 0 1-6.37-6.36l7.92-7.92-7.92-7.92a4.5 4.5 0 0 1 6.37-6.37l7.92 7.92 7.92-7.92a4.5 4.5 0 0 1 6.36 6.37L22 15.6z" data-name="Layer 1"/></g></svg></div>`);

    //Message
    const message = $(`<p class="notifications__content__item__message">${notif.message}</div>`);

    wrapper.append(close);
    wrapper.append(message);

    $notif__content.append(wrapper);
}

const removeNotificationById = id => {
    for(x in notification){
        if(notification[x].id == id){
            notification.splice(x, 1);
        }
    }
    return;
}

const getCloseParent = $target => {
    if($target.is("svg")){
        return $target.parent().parent();
    }
    else if($target.is("g")){
        return $target.parent().parent().parent();
    }
    else if($target.is("path")){
        return $target.parent().parent().parent().parent();
    }
    else return null;
}

// =======================
// = Form ================
// =======================

const $form = $("#msgform");
const $formalert = $("#formalert");

$form.submit((event) => {
    event.preventDefault();
    
    let inputValue = $form.children()[0].value.trim();
    let msgValue = $form.children()[1].value.trim();

    if(inputValue == "") console.log("Input is empty!");
    if(msgValue == "") console.log("Textarea is empty!");

    $formalert.text("Woops! You have blank fields.");
    $formalert.slideToggle(400, () => {
        setTimeout(function(){ $formalert.slideToggle(); }, 2000);
    });

});


$(document).on("DOMContentLoaded", () => {
    if(notification.length > 0){
        $bell.addClass("notification");
    }else{
        $bell.removeClass("notification");
    }

    $notif__screen.hide();
    $formalert.hide();

    for(x in notification){
        addNotification(notification[x]);
    }
});