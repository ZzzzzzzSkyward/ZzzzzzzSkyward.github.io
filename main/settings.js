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
//是否需要把查找到的unicode字符自动复制到剪贴板，值：true与false
    searchSettings.unicodeCopyEnabled=true;
};
settingsInit();
