这是主页  
2020/08/02  
最近一次更新：2020.11.04  
内测阶段  
## Project Page  
定位：简洁+有功能的主页  
  
### 功能 　  
1.搜索  
  1.1使用方法：直接输入文本，然后按回车或按钮  
  1.2改变搜索引擎  
    1.2.1输入set baidu可以把搜索引擎改成百度，其余类推  
    1.2.2打开settings.js，也可以修改  
    1.2.3每次关闭网页会自动保存上次使用的搜索引擎  
    1.2.4如果数据里没有相应的搜索引擎名称或缩写，则无法修改  
    1.2.5按回车、按钮的同时按住ctrl键不放，无论文本内容为何，都进行搜索  
    1.2.6添加搜索引擎的方法：找到网址，把关键词替换成{keyword}，按照2.2的方法进行。
  1.3一次性使用搜索引擎
    1.3.1特色：如果能够完全单一对应某个搜索引擎的话会自动补全，否则会出现最佳匹配提示  
    1.3.2使用方法：输入search 引擎名称 关键词  
    1.3.3使用方法：输入sh 引擎名称 关键词  
    1.3.4暂不支持简称
    1.3.5备份：输入backup engine，就把数据复制到了剪贴板。  
2.跳转  
  2.1使用方法：直接输入文本，然后按回车或按钮  
  2.2添加跳转方法：只输入add一个单词，在第一次跳出的框里填写名称，在第二次跳出的框里填写网址。  
    2.2.1无需操作，即可自动保存  
    2.2.2打开settings.js，也可以修改，如把结果复制粘贴到settings.js里面的相应位置。  
    2.2.3备份：输入backup shortcut，就把数据复制到了剪贴板。    
    2.2.4如果删除数据，则网页中保存的将丢失  
3.壁纸  
  3.1更改方法为bg URL。  
    3.1.1本地图片，URL=file:///开头+图片地址。  
    3.1.2网页URL，URL=你的网址。  
    3.1.3必应每日壁纸，URL=bing。  
4.随机数  
  4.1使用方法：random 小整数 大整数 =  
    4.1.1结果：包含端点值的随机数  
5.翻译  
  5.1使用方法：fy 要翻译的内容  
  5.2百度翻译API获取，详见settings.js  
  5.3有道翻译也已经添加，可以通过set translation youdao改为有道翻译  
6.更新  
  6.1使用方法：update  
  6.2会弹出一个警告框，说明是否有更新的版本  
  6.3最新版默认存储在github上  
7.时间与日期  
  7.1使用方法：time、date  
  7.2获取的是本地时间，不保证与世界时间同步  
8.帮助  
  8.1使用方法：help  
9.计算  
  9.1使用方法：输入一个完整的算式，包括代码，按=  
  9.2结果显示在下方的框里，不完整的算式不会有任何效果  
10webarchive API  
  10.1保存方法：archive 网址  
  10.2打开方法：openarchive 网址  
  10.3注意事项：该API需要梯子才行，否则打不开  
11网络连通性检测 API（没有UI界面，需要调用zzz.web.test(url)方法，其中url可以是特殊值"foreign"（翻墙）和"web"（普通））  
12全屏API（没有UI界面，需要调用zzz.browser.fullscreen.enter(document.body)方法）  
13固定操作方法  
  13.1使用方法：输入fix 方法  
  13.2效果：以后的输入，可以不用再输方法名称  
  13.3为了方便起见，仅仅作用于翻译和随机数。  
14unicode  
  14.1使用方法：unicode 字符名称  
    14.1.1会进行模糊查找  
  14.2添加一个字符的方法：unicode 字符名称（可中文，不允许空格） 字符  
  14.3暂无本地存储方法  
15链接跳转  
  15.1使用方法：输入网址直接跳转（必须是正确的域名才行）
  15.2如果没有输入http头，会自动补全。其他头不行。
16js脚本  
  16.1输入任何可以执行的js脚本，按等于号，如果有结果就会显示在信息栏里  
TODO待完成的事  
1.fetch API  
2.网络检测  
3.添加聚合搜索（一次搜多个）  
4.添加框架内搜索（载入zzz.js）  
5.画画  
