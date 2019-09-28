/*
 Navicat Premium Data Transfer

 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 80015
 Source Host           : localhost
 Source Database       : boblog

 Target Server Type    : MySQL
 Target Server Version : 80015
 File Encoding         : utf-8

 Date: 09/28/2019 23:11:30 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `admin`
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
--  Records of `admin`
-- ----------------------------
BEGIN;
INSERT INTO `admin` VALUES ('1', '梁凤波', 'itbo@163.com', '$2a$10$nnLARaiVcQAKTfALLnehYOLLU33/W7sSURmB5Buk3FjFuumHwBXei', '2019-06-17 15:14:47', '2019-06-17 15:14:47', null);
COMMIT;

-- ----------------------------
--  Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `author` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `cover` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `browse` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
--  Records of `article`
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES ('1', '今夜一起学习Node.js吗？?32324', '梁凤波', '## 原型链\n### 构造函数、原型和实例对象的关系\n\n每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例对象都包含一个指向原型对象的内部指针`[[Prototype]]`，也称为\\_\\_proto__。\n\n### 原型链的概念\n\n每个实例对象都有一个指向创建它的构造函数的原型对象的内部指针`[[Prototype]]`，这个内部指针可以叫做`__proto__`，而它的构造函数的原型对象可能也有一个指向创建它的构造函数的原型对象的内部指针`__proto__`，这些层层的关系，就形成一个原型链。\n\n### 原型链的作用\n\n当试图访问一个对象的属性时，它不仅仅在该对象上进行查询，还会继续查询该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。\n\n### 原型链继承\nECMAScript 实现继承主要依靠原型链来继承的，原型链继承的基本思想：利用原型让一个引用类型继承另一个引用类型的属性和方法。\n\n原型链继承的实现代码：\n\n```js\n// 父类\nfunction Parent() {\n    this.name = \'Parent\';\n}\n\nParent.prototype.getName = function () {\n    return this.name + \' Function\';\n}\n\n// 子类\nfunction Child() {\n    this.jobs = \'CodingMonkey\';\n}\n\n// 继承 Parent 父类\nChild.prototype = new Parent();\n\nChild.prototype.getJobs = function () {\n    return this.jobs + \' Function\'\n}\n\n// 实例化子类\nvar child = new Child();\n\nconsole.log(child.jobs); // \'CodingMonkey\' -- 来自子类的属性\nconsole.log(child.name); // \'Parent\' -- 来自父类的属性\nconsole.log(child.getName()); // \'Parent Function\' -- 来自父类的方法\nconsole.log(child.getJobs()); // \'CodingMonkey Function\' -- 来自子类的方法\n\n// 实现原理\nconsole.log(child.__proto__ === Child.prototype); // true\nconsole.log(Child.prototype.__proto__ === Parent.prototype); // true\nconsole.log(Parent.prototype.__proto__ === Object.prototype); // true\nconsole.log(Object.prototype.__proto__ === null); // true\n```\n\n<img width=\"750\" alt=\"原型链\" src=\"https://user-images.githubusercontent.com/26264225/58805995-c8224580-8647-11e9-8c49-7f847b7f187e.png\">\n\n\n如图示，实例对象 child 能访问到 Parent 原型上的方法，因为在 Child.prototype 指向了 Parent.prototype，因此拥有了 Parent 的属性和原型上的方法。\n\n上面的图例也证明了原型的搜索机制：当以读取访问一个实例属性时，首先会在实例中搜索该属性。如果没有找到该属性，则会继续搜索实例的原型。在通过原型链实现继承的情况下，搜索过程就得以沿着原型链继续向上，上面的步骤就是：搜索实例 => 搜索`Child.prototype` => 搜索`Parent.prototype` => 最后一步才会找到该方法。在找不到属性或方法的情况下，搜索过程总是要一环一环地前行到原型链末端才会停下来。\n\n## 确定原型和实例的关系\n### instanceof\ninstanceof 运算符用于测试构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。\n\n```js\nconsole.log(child instanceof Child); // true\nconsole.log(child instanceof Parent); // true\nconsole.log(child instanceof Object); // true\n```\n\n### isPrototype()\nisPrototypeOf() 方法用于测试一个对象是否存在于另一个对象的原型链上。\n```js\nconsole.log(Child.prototype.isPrototypeOf(child)); // true\nconsole.log(Parent.prototype.isPrototypeOf(child)); // true\nconsole.log(Object.prototype.isPrototypeOf(child)); // true\n```\n\n## 重写原型链\n\n1. 如果子类想覆盖父类的某个方法，或者重写父类的某个方法，在通过原型链实现继承后面写即可。\n```js\n// 父类\nfunction Parent() {\n    this.name = \'Parent\';\n}\n\nParent.prototype.getName = function () {\n    return \'parent\';\n}\n\n// 子类\nfunction Child() {\n    this.jobs = \'CodingMonkey\';\n}\n\n// 继承 Parent 父类\nChild.prototype = new Parent();\n\nChild.prototype.getJobs = function () {\n    return this.jobs;\n}\n\n// 会重写 Parent 父类的 getName 方法\nChild.prototype.getName = function () {\n    return \'child\';\n}\n```\n\n2. 在通过原型链实现继承时，不能使用对象字面量创建原型方法。因为这样做就会重写原型链。\n\n```js\n// 父类\nfunction Parent() {\n    this.name = \'Parent\';\n}\n\nParent.prototype.getName = function () {\n    return this.name + \' Function\';\n}\n\n// 子类\nfunction Child() {\n    this.jobs = \'CodingMonkey\';\n}\n\n// 继承 Parent 父类\nChild.prototype = new Parent();\n//使用字面量添加新方法，会导致上一行代码 继承 Parent 父类无效\nChild.prototype = {\n    getName: function () {\n        return \'child2\';\n    }\n}\n```\n\n## 课后练习\n- [ ] 什么是原型链？\n- [ ] 原型链有什么作用？\n- [ ] 原型链的搜索机制\n- [ ] 如何确定原型和实例的关系\n- [ ] instanceof 判断原理\n\n\n\n## 参考资料\n- [《JavaScript高级程序设计（第3版）》](http://www.ituring.com.cn/book/946), by Nicholas C.Zakas (作者) 李松峰 , 曹力 (译者)\n', 'http://cdn.boblog.com/Fs2YXZPDWOHRQgu_mChn4-YE0Bf9', '1', '151', '2019-06-17 15:16:05', '2019-08-04 13:34:31', null), ('2', '深入理解原型链', '梁凤波', '## 原型链\n### 构造函数、原型和实例对象的关系\n\n每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例对象都包含一个指向原型对象的内部指针`[[Prototype]]`，也称为\\_\\_proto__。\n\n### 原型链的概念\n\n每个实例对象都有一个指向创建它的构造函数的原型对象的内部指针`[[Prototype]]`，这个内部指针可以叫做`__proto__`，而它的构造函数的原型对象可能也有一个指向创建它的构造函数的原型对象的内部指针`__proto__`，这些层层的关系，就形成一个原型链。\n\n### 原型链的作用\n\n当试图访问一个对象的属性时，它不仅仅在该对象上进行查询，还会继续查询该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。\n\n### 原型链继承\nECMAScript 实现继承主要依靠原型链来继承的，原型链继承的基本思想：利用原型让一个引用类型继承另一个引用类型的属性和方法。\n\n原型链继承的实现代码：\n\n```js\n// 父类\nfunction Parent() {\n    this.name = \'Parent\';\n}\n\nParent.prototype.getName = function () {\n    return this.name + \' Function\';\n}\n\n// 子类\nfunction Child() {\n    this.jobs = \'CodingMonkey\';\n}\n\n// 继承 Parent 父类\nChild.prototype = new Parent();\n\nChild.prototype.getJobs = function () {\n    return this.jobs + \' Function\'\n}\n\n// 实例化子类\nvar child = new Child();\n\nconsole.log(child.jobs); // \'CodingMonkey\' -- 来自子类的属性\nconsole.log(child.name); // \'Parent\' -- 来自父类的属性\nconsole.log(child.getName()); // \'Parent Function\' -- 来自父类的方法\nconsole.log(child.getJobs()); // \'CodingMonkey Function\' -- 来自子类的方法\n\n// 实现原理\nconsole.log(child.__proto__ === Child.prototype); // true\nconsole.log(Child.prototype.__proto__ === Parent.prototype); // true\nconsole.log(Parent.prototype.__proto__ === Object.prototype); // true\nconsole.log(Object.prototype.__proto__ === null); // true\n```\n\n<img width=\"750\" alt=\"原型链\" src=\"https://user-images.githubusercontent.com/26264225/58805995-c8224580-8647-11e9-8c49-7f847b7f187e.png\">\n\n\n如图示，实例对象 child 能访问到 Parent 原型上的方法，因为在 Child.prototype 指向了 Parent.prototype，因此拥有了 Parent 的属性和原型上的方法。\n\n上面的图例也证明了原型的搜索机制：当以读取访问一个实例属性时，首先会在实例中搜索该属性。如果没有找到该属性，则会继续搜索实例的原型。在通过原型链实现继承的情况下，搜索过程就得以沿着原型链继续向上，上面的步骤就是：搜索实例 => 搜索`Child.prototype` => 搜索`Parent.prototype` => 最后一步才会找到该方法。在找不到属性或方法的情况下，搜索过程总是要一环一环地前行到原型链末端才会停下来。\n\n## 确定原型和实例的关系\n### instanceof\ninstanceof 运算符用于测试构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。\n\n```js\nconsole.log(child instanceof Child); // true\nconsole.log(child instanceof Parent); // true\nconsole.log(child instanceof Object); // true\n```\n\n### isPrototype()\nisPrototypeOf() 方法用于测试一个对象是否存在于另一个对象的原型链上。\n```js\nconsole.log(Child.prototype.isPrototypeOf(child)); // true\nconsole.log(Parent.prototype.isPrototypeOf(child)); // true\nconsole.log(Object.prototype.isPrototypeOf(child)); // true\n```\n\n## 重写原型链\n\n1. 如果子类想覆盖父类的某个方法，或者重写父类的某个方法，在通过原型链实现继承后面写即可。\n```js\n// 父类\nfunction Parent() {\n    this.name = \'Parent\';\n}\n\nParent.prototype.getName = function () {\n    return \'parent\';\n}\n\n// 子类\nfunction Child() {\n    this.jobs = \'CodingMonkey\';\n}\n\n// 继承 Parent 父类\nChild.prototype = new Parent();\n\nChild.prototype.getJobs = function () {\n    return this.jobs;\n}\n\n// 会重写 Parent 父类的 getName 方法\nChild.prototype.getName = function () {\n    return \'child\';\n}\n```\n\n2. 在通过原型链实现继承时，不能使用对象字面量创建原型方法。因为这样做就会重写原型链。\n\n```js\n// 父类\nfunction Parent() {\n    this.name = \'Parent\';\n}\n\nParent.prototype.getName = function () {\n    return this.name + \' Function\';\n}\n\n// 子类\nfunction Child() {\n    this.jobs = \'CodingMonkey\';\n}\n\n// 继承 Parent 父类\nChild.prototype = new Parent();\n//使用字面量添加新方法，会导致上一行代码 继承 Parent 父类无效\nChild.prototype = {\n    getName: function () {\n        return \'child2\';\n    }\n}\n```\n\n## 课后练习\n- [ ] 什么是原型链？\n- [ ] 原型链有什么作用？\n- [ ] 原型链的搜索机制\n- [ ] 如何确定原型和实例的关系\n- [ ] instanceof 判断原理\n\n\n\n## 参考资料\n- [《JavaScript高级程序设计（第3版）》](http://www.ituring.com.cn/book/946), by Nicholas C.Zakas (作者) 李松峰 , 曹力 (译者)\n', 'http://cdn.boblog.com/FuyyakhdqFMQa8tli6lw7WH-rM0I', '1', '57', '2019-06-17 16:11:18', '2019-08-04 09:49:59', null), ('3', '深入理解继承', 'asa', '1212', 'http://cdn.boblog.com/FrQyfc8vTmQQyntTJvMTnMmhcdt3', '1', '1', '2019-06-20 17:08:57', '2019-06-20 17:16:23', '2019-06-20 17:29:00');
COMMIT;

-- ----------------------------
--  Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
--  Records of `category`
-- ----------------------------
BEGIN;
INSERT INTO `category` VALUES ('1', 'nodejs', 'node', '0', '2019-06-17 15:15:54', '2019-06-17 15:15:54', null);
COMMIT;

-- ----------------------------
--  Table structure for `comments`
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `article_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
--  Records of `comments`
-- ----------------------------
BEGIN;
INSERT INTO `comments` VALUES ('1', '梁凤波', 'itbo@163.com', '评论1', '1', '0', '2019-06-17 15:16:45', '2019-06-17 15:16:45', null), ('2', '梁凤波2', '13@163.com', '评论2', '1', '1', '2019-06-17 15:18:50', '2019-06-17 15:18:50', null), ('3', '梁凤波3', '1212@163.com', '评论3', '1', '2', '2019-06-18 14:04:41', '2019-06-18 14:04:41', null), ('4', '梁凤波4', '121@14.com', '评论4', '1', '1', '2019-08-04 08:33:21', '2019-08-04 08:33:23', null), ('5', '梁凤波5', 'a@13.com', '评论5', '2', '0', '2019-08-04 09:48:37', '2019-08-04 09:48:39', null), ('6', '梁凤波6', 'sas@13.com', '评论5', '2', '5', '2019-08-04 09:49:41', '2019-08-04 09:49:43', null);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
