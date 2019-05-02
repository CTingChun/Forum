function init() {

    var user_email = '';
    
    firebase.auth().onAuthStateChanged(function (user) {
        var menu = document.getElementById('dynamic-menu');
        // Check user login
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
            console.log("~")
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
    //             console.log(k);
    //             firebase.database().ref('com_list' + '/' + k +"/key").set(k);
    //         }

    //         getkey();
    //         post_txt.value = "";
    //     }
    // });

    // The html code for post
    var str_before_username = "<div class='my-3 p-3 bg-white rounded box-shadow'><h6 class='border-bottom border-gray pb-2 mb-0'>Recent updates</h6><div class='media text-muted pt-3'><p class='media-body pb-3 mb-0 small lh-125 border-bottom border-gray'><strong class='d-block text-gray-dark'>";
    var str_after_content = "</p></div></div>\n";

    var postsRef = firebase.database().ref('com_list');
    // List for store posts html
    var total_post = [];
    // Counter for checking history post update complete
    var first_count = 0;
    // Counter for checking when to update new post
    var second_count = 0;

    // postsRef.once('value')
    //     .then(function (snapshot) {
    //         var obj = snapshot.val();
    //         for(var key in obj){
    //             console.log(obj[key]);
    //             total_post.push(obj[key]);
    //             document.getElementById("post_list").innerHTML += str_before_username + user_email + "</strong>" + '<a href="comment.html">' + obj[key].text + '</a>' + str_after_content;
    //         }
    //         postsRef.on('value', function(snapshot){
    //             document.getElementById('post_list').innerHTML = "";
    //             total_post = [];
    //             var newobj = snapshot.val();
    //             for(var key in newobj){
    //                 // console.log(newobj[key]);
    //                 total_post.push(newobj[key]);
    //                 console.log(newobj[key].key)
    //                 document.getElementById("post_list").innerHTML += str_before_username + user_email + "</strong>" + '<a href="comment.html?id=' + newobj[key].key + '">' +newobj[key].text + '</a>' + str_after_content;
    //             }

    //         })
    //     })
    //     .catch(e => console.log(e.message));

        
}

function test(){
    console.log("cool");
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