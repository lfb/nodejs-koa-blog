/**
 * 管理员菜单
 * @type {*[]}
 */

  // 查看菜单列表
const menus = [
    {
      name: "首页",
      path: "/",
      icon: "ios-navigate"
    },
    // 系统管理
    {
      name: "系统管理",
      path: "set",
      icon: "ios-cog",
      children: [
        {
          icon: "md-contacts",
          name: "管理员管理",
          path: "/admin"
        }
      ]
    },
    // 分类
    {
      name: "分类管理",
      path: "category",
      icon: "md-move",
      children: [
        {
          name: "分类列表",
          path: "/category",
          icon: "md-list"
        },
        {
          name: "分类创建",
          path: "/category/create",
          icon: "md-add-circle"
        }
      ]
    },
    // 文章
    {
      name: "文章管理",
      path: "article",
      icon: "md-list-box",
      children: [
        {
          name: "文章列表",
          path: "/article",
          icon: "md-list"
        },
        {
          name: "文章创建",
          path: "/article/create",
          icon: "md-add-circle"
        }
      ]
    },
    // 广告
    {
      name: "广告管理",
      path: "advertise",
      icon: "ios-disc",
      children: [
        {
          name: "广告列表",
          path: "/advertise",
          icon: "md-list"
        },
        {
          name: "广告创建",
          path: "/advertise/create",
          icon: "md-add-circle"
        }
      ]
    },
    // 评论
    {
      name: "评论管理",
      path: "comments",
      icon: "md-text",
      children: [
        {
          name: "评论列表",
          path: "/comments",
          icon: "md-list"
        }
      ]
    }

  ];

export {menus};
