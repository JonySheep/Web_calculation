# Web_calculation
[TOC]

## 框架搭建

参考：

https://blog.csdn.net/nature_day/article/details/44488249

使用技术：html + css + javascript + jquery + express + nodeJS + Ajax + mysql（数据库）

使用Express部署到本地服务器方法：

- 进入**ser**文件夹
- npm install
- npm start
- 打开localhost：3000即可访问

连接本地数据库的方法：

- 本地root用户下建立数据库名为memento
- 在router/index.js中 将mysql的密码改为本机密码

ps：如果无法打开可能是3000端口被占用，在活动监视器里面检查一下把占用的进程kill掉

ps：因为本地的assets部署到服务器处理了一下，如果直接打开html会无法加载资源



## 图片上传功能的实现：Ajax + multer（express的中间件）

参考：https://www.jb51.net/article/115537.htm

- 使用说明：

  1. 在主页填写movie名称和comment并上传图片，点击提交后会显示在主页上
  2. 点击图片的导出按钮，可进行图片编辑与合成，导出到本地



## Session and Cookie实现

参考：

https://www.cnblogs.com/mingjiatang/p/7495321.html

https://www.jianshu.com/p/92bd60cc7649

http://www.cnblogs.com/chenchenluo/p/4197181.html



## Rest api

使用LeanCloud提供的短信服务rest api，在注册时进行手机号验证

https://leancloud.cn/docs/rest_sms_api.html#hash889571772



## 标签

- 实现了对电影的标签标注
- 可以通过标签检索电影
- 标签和电影可以根据热度（点赞数+浏览量）进行排序，展示热门标签