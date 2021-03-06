/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : cms

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 09/09/2020 17:41:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `PKID` int(11) NOT NULL AUTO_INCREMENT,
  `ParentID` int(11) NULL DEFAULT NULL,
  `MenuName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Status` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`PKID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (1, 0, '系统设置', 'el-icon-setting', NULL, 1);
INSERT INTO `sys_menu` VALUES (2, 1, '用户管理', '', '/usermanage', 1);
INSERT INTO `sys_menu` VALUES (3, 1, '菜单管理', NULL, '/menu', 1);
INSERT INTO `sys_menu` VALUES (4, 1, '角色管理', NULL, '/role', 1);

-- ----------------------------
-- Table structure for sys_menu_operation
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu_operation`;
CREATE TABLE `sys_menu_operation`  (
  `PKID` int(11) NOT NULL AUTO_INCREMENT,
  `menuID` int(11) NOT NULL,
  `OperationName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`PKID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu_operation
-- ----------------------------
INSERT INTO `sys_menu_operation` VALUES (2, 2, '新增&修改');
INSERT INTO `sys_menu_operation` VALUES (3, 2, '删除');
INSERT INTO `sys_menu_operation` VALUES (4, 3, '查询');
INSERT INTO `sys_menu_operation` VALUES (5, 3, '新增&修改');
INSERT INTO `sys_menu_operation` VALUES (6, 3, '删除');
INSERT INTO `sys_menu_operation` VALUES (7, 4, '新增&修改');
INSERT INTO `sys_menu_operation` VALUES (8, 4, '删除');
INSERT INTO `sys_menu_operation` VALUES (9, 4, '查询');
INSERT INTO `sys_menu_operation` VALUES (10, 4, '权限设置');
INSERT INTO `sys_menu_operation` VALUES (12, 2, '查询');

-- ----------------------------
-- Table structure for sys_roles
-- ----------------------------
DROP TABLE IF EXISTS `sys_roles`;
CREATE TABLE `sys_roles`  (
  `PKID` int(11) NOT NULL AUTO_INCREMENT,
  `RoleName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Status` int(255) NULL DEFAULT NULL,
  `PermissionIDS` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`PKID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_roles
-- ----------------------------
INSERT INTO `sys_roles` VALUES (1, '系统管理员', '拥有系统最高权限', 0, '2_12,2_2');
INSERT INTO `sys_roles` VALUES (2, '数据人员', 'T', 0, NULL);

-- ----------------------------
-- Table structure for sys_users
-- ----------------------------
DROP TABLE IF EXISTS `sys_users`;
CREATE TABLE `sys_users`  (
  `PKID` int(11) NOT NULL AUTO_INCREMENT,
  `DepID` int(11) NULL DEFAULT NULL,
  `LoginName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Roles` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `UserName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `PassWord` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `MobilePhone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `HeaderImgUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Errcount` int(1) NULL DEFAULT NULL,
  `UnLockedTime` datetime(0) NULL DEFAULT NULL,
  `Is_Locked` int(1) NULL DEFAULT NULL,
  `Status` int(1) NULL DEFAULT 0,
  `Createtime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`PKID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_users
-- ----------------------------
INSERT INTO `sys_users` VALUES (1, 0, 'admin', '1', '管理人', 'J5/4ZVWmI81cwnMbyLbHOw==', '15775691979', NULL, 0, '2020-08-31 18:02:07', 1, 1, '2020-08-28 10:23:00');
INSERT INTO `sys_users` VALUES (2, 0, 'aaa', '2', 'aaaa', 'dfaBSNJaVnJYR4x21NsEMg==', NULL, NULL, 0, NULL, NULL, 1, '2020-09-09 16:51:06');
INSERT INTO `sys_users` VALUES (3, 0, 'vvv', '2', 'ccc', 'dfaBSNJaVnJYR4x21NsEMg==', '11111', NULL, 0, NULL, NULL, 1, '2020-09-09 16:51:46');

-- ----------------------------
-- Table structure for sys_usersextension
-- ----------------------------
DROP TABLE IF EXISTS `sys_usersextension`;
CREATE TABLE `sys_usersextension`  (
  `userid` int(11) NOT NULL,
  `headerimg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`userid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
