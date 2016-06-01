// Web Notifications API
// http://javascript.ruanyifeng.com/bom/notification.html

(function (w) {
    if (window.Notification) {
        // 支持

        // 要求權限
        // Notification.permission屬性，用於讀取用戶給予的權限，它是一個只讀屬性，它有三種狀態。
        // default：使用者尚未給予任何權限 (因此不會顯示任何通知)
        // granted：使用者允許接收到 Apps 的通知
        // denied：使用者拒絕接收 Apps 的通知        
        Notification.requestPermission(function (status) {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
        });

        //checkCookie();

    } else {
        // 不支持
    }


})(this);

function setMessage(val) {
    // 顯示通知
    if (window.Notification && Notification.permission !== "denied") {
        Notification.requestPermission(function (status) {
            notificationShow("", val);            
        });
    }
}

function notificationShow(title, body) {
    // Notification對像作為構造函數使用時，用來生成一條通知。
    // var notification = new Notification(title, options);
    // Notification構造函數的title屬性是必須的，用來指定通知的標題，格式為字符串。 options屬性是可選的，格式為一個對象，用來設定各種設置。該對象的屬性如下：
    // dir：文字方向，可能的值為auto、ltr（從左到右）和rtl（從右到左），一般是繼承瀏覽器的設置。
    // lang：使用的語種，比如en-US、zh-CN。
    // body：通知內容，格式為字符串，用來進一步說明通知的目的。 。
    // tag：通知的ID，格式為字符串。一組相同tag的通知，不會同時顯示，只會在用戶關閉前一個通知後，在原位置顯示。
    // icon：圖表的URL，用來顯示在通知上。 
    var n = new Notification('通知', { body: body });
    // Notification實例會觸發一些事件。
    // show：通知顯示給用戶時觸發。
    // click：用戶點擊通知時觸發。
    // close：用戶關閉通知時觸發。
    // error：通知出錯時觸發（大多數發生在通知無法正確顯示時）。
    // 這些事件有對應的onshow、onclick、onclose、onerror方法，用來指定相應的回調函數。 addEventListener方法也可以用來為這些事件指定回調函數。

    // 手動關閉
    n.close();

    // 自動關閉
    n.onshow = function () {
        setTimeout(n.close.bind(n), 5000);
    }
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user == "") {
        getMessage();
        setCookie("username", "user1", 1);
    }
}
