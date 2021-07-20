git 仓库命令

git init 初始化本地项目

git add . 

git commit -m '注释'

创建分支命令

git checkout -b 名称

查看分支
git branch

css3 垂直居中
transform:translate(-50%,-50%)

// 每次发送ajax的get,post,ajax请求时都会调用这个方法所以在拼接公共接口域名时很有效
$.ajaxPrefilter(function(options){

})

git status 查看文件状态

git push -u origin login // 提交分支代码

git checkout 分支名 切换分支

git merge login 合并分支

git push 提交代码


user-select:none 禁止用户选中


javaScript权威指南 第7版 github地址 
https://github.com/ten-ltw/JavaScript-The-Definitive-Guide-7th-zh 
https://js.2019919.xyz/

indexOf 
判断是否存在某个字符或者数组
str.indexof('search',fromIndex); // fromIndex 不是必填，从什么位置开始查找，找到返回对应的位置，如未找到则返回-1
arr.indexof('search',fromIndex); 同字符串查找一样

iframe 调用父类js方法 (案例：在user.js中调用index.js的方法)
window.parent.方法名

重置表单，先获取jquery的form对象，再获取jsdom，然后调用reset方法 （案例：在重置密码时清空表单）
$('form')[0].reset();

上传头像思路，新写一个file，把它隐藏，然后给按钮绑定点击事件，在按钮的点击事件中再调用file的点击事件,input file 有accept属性，允许上传文件的例行（ <input type="file" id="file" class="upload-img" accept="image/png,image/jpeg">）

base64的图片比原文件大30%左右