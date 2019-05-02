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

    // post_btn = document.getElementById('post_btn');
    post_txt = document.getElementById('comment');
    var database = firebase.database();
    
    // post_btn.addEventListener('click', function () {
    //     if (post_txt.value != "") {

    //         async function getkey(){
    //             var a = await postsRef.push({
    //                 user_email,
    //                 text: post_txt.value,
    //                 key: "0"
    //             })
    //             var k = a.key;
    //             firebase.database().ref('com_list' + '/' + k +"/key").set(k);
    //         }

    //         getkey();
    //         post_txt.value = "";
    //     }
    // });

    var str_before_username = "<div class='my-3 p-3 bg-white rounded box-shadow'><h6 class='border-bottom border-gray pb-2 mb-0' style='text-align:center'>What I've Posted</h6><div class='media text-muted pt-3'><p class='media-body pb-3 mb-0 small lh-125 border-bottom border-gray'><strong class='d-block text-gray-dark'>";
    var str_after_content = "</p></div></div>\n";

    var postsRefb = firebase.database().ref('beauty_list');
    var postsRefm = firebase.database().ref('mood_list');
    var postsRefv = firebase.database().ref('movie_list');
    var total_postb = [];
    var total_postm = [];
    var total_postv = [];

    postsRefb.once('value')
        .then(function (snapshot) {
            var obj = snapshot.val();
            for(var key in obj){
                if(obj[key].username == user_email){
                    total_postb.push(obj[key]);
                    document.getElementById("post_listb").innerHTML += str_before_username + obj[key].title + "</strong>" + '<br>' + obj[key].text + str_after_content + "<button style='background-color:#cfceee' onclick='deletearticleb(`"+key+"`)'>Delete</button>";
                }
            }
            postsRefb.on('value', function(snapshot){
                document.getElementById('post_listb').innerHTML = "";
                total_postb = [];
                var newobj = snapshot.val();
                for(var key in newobj){
                    if(newobj[key].username == user_email){
                        total_postb.push(newobj[key]);
                        document.getElementById("post_listb").innerHTML += str_before_username + newobj[key].title + "</strong>" + '<br>' + obj[key].text + str_after_content + "<button style='background-color:#cfceee' onclick='deletearticleb(`"+key+"`)'>Delete</button>";
                    }
                }

            })
        })
        .catch(e => console.log(e.message));

        postsRefm.once('value')
        .then(function (snapshot) {
            var obj = snapshot.val();
            for(var key in obj){
                if(obj[key].username == user_email){
                    total_postm.push(obj[key]);
                    document.getElementById("post_listm").innerHTML += str_before_username + obj[key].title + "</strong>" + '<br>' + obj[key].text + str_after_content + "<button style='background-color:#cfceee' onclick='deletearticlem(`"+key+"`)'>Delete</button>";
                }
            }
            postsRefm.on('value', function(snapshot){
                document.getElementById('post_listm').innerHTML = "";
                total_postm = [];
                var newobj = snapshot.val();
                for(var key in newobj){
                    if(newobj[key].username == user_email){
                        total_postm.push(newobj[key]);
                        document.getElementById("post_listm").innerHTML += str_before_username + newobj[key].title + "</strong>" + '<br>' + obj[key].text + str_after_content + "<button style='background-color:#cfceee' onclick='deletearticlem(`"+key+"`)'>Delete</button>";
                    }
                }

            })
        })
        .catch(e => console.log(e.message));

        postsRefv.once('value')
        .then(function (snapshot) {
            var obj = snapshot.val();
            for(var key in obj){
                if(obj[key].username == user_email){
                    total_postv.push(obj[key]);
                    document.getElementById("post_listv").innerHTML += str_before_username + obj[key].title + "</strong>" + '<br>' + obj[key].text + str_after_content + "<button style='background-color:#cfceee' onclick='deletearticlev(`"+key+"`)'>Delete</button>";
                }
            }
            postsRefv.on('value', function(snapshot){
                document.getElementById('post_listv').innerHTML = "";
                total_postv = [];
                var newobj = snapshot.val();
                for(var key in newobj){
                    if(newobj[key].username == user_email){
                        total_postv.push(newobj[key]);
                        document.getElementById("post_listv").innerHTML += str_before_username + newobj[key].title + "</strong>" + '<br>' + obj[key].text + str_after_content + "<button style='background-color:#cfceee' onclick='deletearticlev(`"+key+"`)'>Delete</button>";
                    }
                }

            })
        })
        .catch(e => console.log(e.message));
}



window.onload = function () {
    init();
};


function deletearticleb(i) {
    firebase.database().ref('beauty_list/'+i.toString()).remove();
}
function deletearticlem(i) {
    firebase.database().ref('mood_list/'+i.toString()).remove();
}
function deletearticlev(i) {
    firebase.database().ref('movie_list/'+i.toString()).remove();
}