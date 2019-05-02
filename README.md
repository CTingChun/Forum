# Software Studio 2019 Spring Midterm Project
## Notice
* Replace all [xxxx] to your answer

## Topic
* Project Name : Forum by Ting Chun
* Key functions (add/delete)
    1. User page
    2. Post page
    3. Post list page
    4. Leave comment under any post
    
* Other functions (add/delete)
    1. Delete post

## Basic Components
|Component|Score|Y/N|
|:-:|:-:|:-:|
|Membership Mechanism|20%|Y|
|Firebase Page|5%|Y|
|Database|15%|Y|
|RWD|15%|Y|
|Topic Key Function|15%|Y|

## Advanced Components
|Component|Score|Y/N|
|:-:|:-:|:-:|
|Third-Party Sign In|2.5%|Y|
|Chrome Notification|5%|Y|
|Use CSS Animation|2.5%|Y|
|Security Report|5%|Y|

## Website Detail Description

## 作品網址：https://midtermproject-dac9a.firebaseapp.com


# Components Description : 
1. User page : 
    > 登入後，在網頁上方選單點擊自己的email，即可進入user page，並可以查看自己發了哪些貼文。
2. Post page : 
    > 登入後，便進入選擇看板的頁面，可以選擇自己想看的看板。
3. Post list page : 
    > 進入看板後，可以看到自己或是其他人的post。
4. Leave comment under any post : 
    > 點擊post list page的post title即可進入post，並且可以讀到post的內容，也可以在下面留言。

# Other Functions Description(1~10%) : 
1. Delete post : 
    > 在user page中，根據自己的email比對，找到此帳戶曾經發過的文，並且顯示出來。在那篇文的下面會有一個Delete鍵，一按下即可刪除那篇post。

## Security Report (Optional)
1. 在database rules中加入<code>auth != null</code>，若非通過authentication的用戶，無法read/write database裡的資料。
2. 使用<code>htmlspecialchars()</code>，在push訊息時，將訊息中的特殊字元替換掉，防範使用者輸入html tags，攻擊聊天室。
