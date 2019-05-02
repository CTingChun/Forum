var url = location.href;
var arr = url.split("?");
// console.log(arr[1]);

function init() {

    var user_email = '';
    
    firebase.auth().onAuthStateChanged(function (user) {
        var menu = document.getElementById('dynamic-menu');
        if (user) {
            user_email = user.email;
            menu.innerHTML = "<span class='dropdown-item'>" +"<a href='userpage.html'>" + user.email + "</span><span class='dropdown-item' id='logout-btn'>Logout</span>";
            var btnLogout = document.getElementById("logout-btn");
            btnLogout.addEventListener('click', async function () {
                await firebase.auth().signOut().then(() => {
                    window.location.assign("index.html");
                    alert("Success!");
                }).catch(function(error) {
                    alert("Error!");
                });
            });
        } else {
            menu.innerHTML = "<a class='dropdown-item' href='index.html'>Login</a>";
            document.getElementById('post_list').innerHTML = "";
        }
    });

    post_btn = document.getElementById('post_btn');
    post_txt = document.getElementById('comment');
    
    
    post_btn.addEventListener('click', function () {
        if (post_txt.value != "") {
                firebase.database().ref('beauty_list'+arr[1].toString()).push({
                username : htmlspecialchars(user_email),
                text : htmlspecialchars(post_txt.value),
               
                });
                post_txt.value='';
        }
    });

    var str_before_username = "<div class='my-3 p-3 bg-white rounded box-shadow'><h6 class='border-bottom border-gray pb-2 mb-0' style='text-align:center'>"+user_email+"</h6><div class='media text-muted pt-3'><p class='media-body pb-3 mb-0 small lh-125 border-bottom border-gray'><strong class='d-block text-gray-dark'>";
    console.log(user_email);
    var str_after_content = "</p></div></div>\n";

    var postsRef = firebase.database().ref('beauty_list');
    // List for store posts html
    var total_post = [];
    var postsRef1 = firebase.database().ref('beauty_list'+arr[1].toString());
    postsRef.once('value')
        .then(function (snapshot) {
            var obj = snapshot.val();
            for(var key in obj){
                if(key == arr[1].toString()){
                    total_post.push(obj[key]);
                    document.getElementById("post_list").innerHTML += str_before_username + obj[key].username + "</strong>" + obj[key].title + '<br>' + obj[key].text + str_after_content;
                }
            }
            postsRef.on('value', function(snapshot){
                document.getElementById('post_list').innerHTML = "";
                total_post = [];
                var newobj = snapshot.val();
                for(var key in newobj){
                    if(key == arr[1].toString()){
                        total_post.push(newobj[key]);
                        document.getElementById("post_list").innerHTML += str_before_username + newobj[key].username + "</strong>" + newobj[key].title + '<br>' + obj[key].text + str_after_content;
                    }
                }

            })
        })
        .catch(e => console.log(e.message));

        postsRef1.once('value')
        .then(function (snapshot) {
            var obj = snapshot.val();
            for(var key in obj){
                total_post.push(obj[key]);
                document.getElementById("com_list").innerHTML += str_before_username + obj[key].username + "</strong>" + obj[key].text + str_after_content;
            }
            postsRef1.on('value', function(snapshot){
                document.getElementById('com_list').innerHTML = "";
                total_post = [];
                var newobj = snapshot.val();
                for(var key in newobj){
                    total_post.push(newobj[key]);
                    document.getElementById("com_list").innerHTML += str_before_username + newobj[key].username + "</strong>" + newobj[key].text + str_after_content;
                }

            })
        })
        .catch(e => console.log(e.message));

        
}

window.onload = function () {
    init();
};

function htmlspecialchars(ch) {
    if (ch===null) return '';
    ch = ch.replace(/&/g,"&amp;");
    ch = ch.replace(/\"/g,"&quot;");
    ch = ch.replace(/\'/g,"&#039;");
    ch = ch.replace(/</g,"&lt;");
    ch = ch.replace(/>/g,"&gt;");
    return ch;
}