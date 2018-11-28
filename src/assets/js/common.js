export const getStatus = (params) => {
  let x='';
  switch (params)
  {
    case 1:
      x="已提交,待审核";
      break;
    case 2:
      x="已提交,待审核";
      break;
    case 3:
      x="审核未通过";
      break;
    case 4:
      x="认定违规";
      break;
    case 5:
      x="已关闭";
      break;
    case 6:
      x="已被举报";
      break;
    case 7:
      x="已通过";
      break;
    default:
      x="已提交,待审核";
  }
  return x
};

export const isEmojiCharacter = (substring) => {
  for (var i = 0; i < substring.length; i++) {
    var hs = substring.charCodeAt(i);
    if (0xd800 <= hs && hs <= 0xdbff) {
      if (substring.length > 1) {
        var ls = substring.charCodeAt(i + 1);
        var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
        if (0x1d000 <= uc && uc <= 0x1f77f) {
          return true;
        }
      }
    } else if (substring.length > 1) {
      var ls = substring.charCodeAt(i + 1);
      if (ls == 0x20e3) {
        return true;
      }
    } else {
      if (0x2100 <= hs && hs <= 0x27ff) {
        return true;
      } else if (0x2B05 <= hs && hs <= 0x2b07) {
        return true;
      } else if (0x2934 <= hs && hs <= 0x2935) {
        return true;
      } else if (0x3297 <= hs && hs <= 0x3299) {
        return true;
      } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
        || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
        || hs == 0x2b50) {
        return true;
      }
    }
  }
};

export const getlevelClass = (params) => {
  let levelclass='';
  switch (params)
  {
    case 1:
    case 2:
    case 3:
    case 4:
      levelclass="bg-range-1";
      break;
    case 5:
    case 6:
    case 7:
    case 8:
      levelclass="bg-range-2";
      break;
    case 9:
    case 10:
      levelclass="bg-range-3";
      break;
    case 11:
      levelclass="bg-range-4";
      break;
    default:
      levelclass="bg-range-1";
  }
  return levelclass
};

// 回到顶部
export const addEvent = (obj,type,fn) => {
  if(obj.attachEvent){ //ie
    obj.attachEvent('on'+type,function(){
      fn.call(obj);
    })
  }else{
    obj.addEventListener(type,fn,false);
  }
};

export const remove = (obj,type,fn) => {
  if(obj.detachEvent){ //ie
    obj.detachEvent('on'+type,fn)
  }else{
    obj.removeEventListener(type,fn);
  }
};

//去左右空格;
export const trim =(s) =>{
  return s.replace(/(^\s*)|(\s*$)/g, "");
};
