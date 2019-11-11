// 分类列表创建树结构
function handleTree(list) {
  // 对源数据深度克隆
  let cloneData = JSON.parse(JSON.stringify(list))
  //循环所有项
  return cloneData.filter(father => {
    let branchArr = cloneData.filter(child => {
      //返回每一项的子级数组
      return father.id === child.parent_id
    });
    if (branchArr.length > 0) {
      //如果存在子级，则给父级添加一个children属性，并赋值
      father.sub_comments = branchArr;
    }
    //返回第一层
    return father.parent_id === 0;
  });
}

module.exports = {
  handleTree
}
