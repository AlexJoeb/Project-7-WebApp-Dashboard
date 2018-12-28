// =====================
// = Variables =========
// =====================

// == Notification / Alerts

// = Alert Bell
const bell = $('.header__notification');
// = Alert dropdown area
const alert_area = $('.alerts');
// = Delete button ('x') for alerts.
let del = $('.alerts__item--header--del');

// == Dashboard
const dashheader = $('.dashboard__header');

const notification_list = $('.dashboard__header__notification--wrapper');

// = List of alerts to display
let alerts = [{
    title: "New message from Kary!",
    desc: "You have recieved a new message from Kary!",
},
{
    title: "New message from Adam!",
    desc: "You have recieved a new message from Adam!",
}
];
// = List of notifications to display
let notifications = [{
        type: "warn",
        desc: "<strong>Woah</strong> It's a <em>notification.</em>",
    },
    {
        type: "success",
        desc: "<strong>Woah</strong> It's a <em>notification.</em>",
    },
    {
        type: "info",
        desc: "<strong>Woah</strong> It's a <em>notification.</em>",
    }
];

// == Warning Bar
const alert = $('#alert');

// =====================
// = Functions =========
// =====================

// Get parent item for x button in alert area.
const getParentItemAlertArea = elm => {
    if (elm.is("path")) {
        return elm.parent().parent().parent().parent().parent().parent();
    } else if (elm.is("svg")) {
        return elm.parent().parent().parent();
    } else if (elm.is("div") && elm.hasClass("alerts__item--header--del")) {
        return elm.parent().parent();
    } else {
        return null;
    }
}


// Get parent item for x button in notification area.
const getParentItemNotificationArea = elm => {
    if (elm.is("path")) {
        return elm.parent().parent().parent().parent();
    } else if (elm.is("svg")) {
        return elm.parent();
    } else if (elm.is("div") && elm.hasClass("dashboard__header__notification--close")) {
        return elm.parent();
    } else {
        return null;
    }
}

// = Add a alert to display.
const createAlert = (title, desc) => {

    const container = $(`<div class="alerts__item"></div>`);

    const header__container = $(`<div class="alerts__item--header"></div>`);
    const header__title = $(`<p class="alerts__item--header--title">${title}</p>`);

    const header__del = $(`
            <div class="alerts__item--header--del">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.2 31.2" width="10px"><title>close</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M29.88,23.52a4.5,4.5,0,1,1-6.36,6.36L15.6,22,7.68,29.88a4.5,4.5,0,0,1-6.37-6.36L9.23,15.6,1.31,7.68A4.5,4.5,0,0,1,7.68,1.31L15.6,9.23l7.92-7.92a4.5,4.5,0,0,1,6.36,6.37L22,15.6Z" /></g></g></svg>
            </div>
        `)


    const desc__container = $(`<p class="alerts__item--desc"></div>`);
    desc__container.html(desc);
    header__container.append(header__title);
    header__container.append(header__del);

    container.append(header__container);
    container.append(desc__container);

    alert_area.append(container);
}

const createNotification = (type = 'warn', message) => {
    type = type.toLowerCase().trim();
    const wrapper = $(`<div class="dashboard__header__notification--wrapper"></div>`);
    const svg = $(`
        <svg class="dashboard__header__notification--close"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.2 31.2"><title>close</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M29.88,23.52a4.5,4.5,0,1,1-6.36,6.36L15.6,22,7.68,29.88a4.5,4.5,0,0,1-6.37-6.36L9.23,15.6,1.31,7.68A4.5,4.5,0,0,1,7.68,1.31L15.6,9.23l7.92-7.92a4.5,4.5,0,0,1,6.36,6.37L22,15.6Z"/></g></g></svg>
    `);
    const msg = $(`
        <p class="dashboard__header__notification--message"></p>
    `);
    msg.html(message);

    if(type === 'warn'){
        wrapper.addClass('notification--warn');
    }else if(type === 'success'){
        wrapper.addClass('notification--success');
    }else if(type === 'info'){
        wrapper.addClass('notification--info');
    }else{
        return;
    }

    wrapper.append(svg);
    wrapper.append(msg);

    dashheader.append(wrapper);
}

// = Add and remove shake class - to make the bell icon shake.
const addShake = elm => {
    elm.addClass("shake");
}
const removeShake = elm => {
    elm.removeClass("shake");
}

// =====================
// = Listeners =========
// =====================

// = When page is loaded:
$(document).on("DOMContentLoaded", (event) => {
    // = Hide alert area
    alert_area.hide();

    // Add all array items in alerts to page.
    for (let i = 0; i < alerts.length; i++) {
        createAlert(alerts[i]['title'], alerts[i]['desc']);
    }

    // Add all array items in notifications to page.
    for (let i = 0; i < notifications.length; i++) {
        createNotification(notifications[i]['type'], notifications[i]['desc']);
    }

    // = Check to see if there is a notification, if so add red dot.
    if (alert_area.children().length > 0) {
        bell.addClass('notification');
    }

    // = When bell is clicked, open alert area. If no notes, then shake.
    bell.click((event) => {

        if (alert_area.children().length > 0) {
            bell.removeClass("notification");
            alert_area.slideToggle();
        } else {
            addShake(bell);
            setTimeout(() => {
                removeShake(bell);
            }, 800);
        }

    });
});

// = When ('x') is clicked in alert area.
alert_area.click(event => {
    const item = $(event.target);

    const parent = getParentItemAlertArea(item);

    if (parent) {
        parent.slideUp(400, () => {
            parent.remove();

            if (alert_area.children().length == 0) {
                alert_area.slideToggle();
            }
        });
    }
});

// = When ('x') is clicked in alert area.
alert.click(event => {
    const item = $(event.target);
    const parent = getParentItemAlertArea(item);
    if(!parent) return;
    parent.slideToggle();
});

dashheader.click(event => {
    const item = $(event.target);
    parent = getParentItemNotificationArea(item);
    if(!parent) return;
    parent.slideToggle(400, () => {
        item.remove();
    });
})