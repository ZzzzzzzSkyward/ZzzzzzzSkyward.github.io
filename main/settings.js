//这里是设置
//需要你手动修改
//双斜杠表示这是注释
//其他全是代码
var settingsInit=function() {
    if(!window.pagejs){
        setTimeout(settingsInit,1);
        return;
    }
//搜索引擎
    zzz.addAttr(searchMethod, {
        //这里可以增加或删改
        //例子：
        //baidu:"http://www.baidu.com/s?wd={keyword}",
        //如果名称包括除了字母以外的字符，请用双引号引起，例如："必应-国内":"...",
        //{keyword}是关键词，如果是搜索引擎可以加。
    });
//缩写跳转（书签）（快捷方式）
    zzz.addAttr(searchSettings.jump, {
        "gp": "https://weibo.com/u/6500648590?profile_ftype=1&is_all=1#_0",
        git:"https://github.com/ZzzzzzzSkyward/ZzzzzzzSkyward.github.io",
        "mail":"http://www.mail.163.com/",
        "gp":"https://weibo.com/u/6500648590?profile_ftype=1&is_all=1#_0",
        "qq":"https://i.qq.com/?s_url=http%3A%2F%2Fuser.qzone.qq.com%2F1053535138%2Fmain",
        "zhi":"https://www.zhihu.com/follow",
        "pku":"https://iaaa.pku.edu.cn/iaaa/oauth.jsp?appID=portal2017&appName=%E5%8C%97%E4%BA%AC%E5%A4%A7%E5%AD%A6%E6%A0%A1%E5%86%85%E4%BF%A1%E6%81%AF%E9%97%A8%E6%88%B7%E6%96%B0%E7%89%88&redirectUrl=https://portal.pku.edu.cn/portal2017/ssoLogin.do",
        "tieba":"http://tieba.baidu.com/i/i/replyme"
    });
//缩写
    zzz.addAttr(searchSettings.short, {
        //这里可以增加或删改
        //例子：
        //bd:"baidu",
    });
//翻译API
    //百度翻译，请去http://api.fanyi.baidu.com/api/trans/product/desktop开通免费服务，并找到appid和密匙，分别对应id和token，填入下面的双引号中
    //并去除前面的两个斜杠
    //zzz.value.translation.id.baidu="";
    //zzz.value.translation.token.baidu="";

};
settingsInit();