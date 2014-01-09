/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50090
Source Host           : localhost:3306
Source Database       : ydcb

Target Server Type    : MYSQL
Target Server Version : 50090
File Encoding         : 65001

Date: 2013-11-24 20:19:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tb_castleally
-- ----------------------------
DROP TABLE IF EXISTS `tb_castleally`;
CREATE TABLE `tb_castleally` (
  `id` bigint(11) default NULL,
  `castleId` bigint(11) default NULL COMMENT '城堡ID',
  `allyCastleId` bigint(11) default NULL COMMENT '盟友城堡ID'
) ENGINE=MyISAM DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Records of tb_castleally
-- ----------------------------
INSERT INTO `tb_castleally` VALUES ('1', '1', '2');
INSERT INTO `tb_castleally` VALUES ('2', '1', '3');
INSERT INTO `tb_castleally` VALUES ('3', '2', '1');

-- ----------------------------
-- Table structure for tb_castledevlisting
-- ----------------------------
DROP TABLE IF EXISTS `tb_castledevlisting`;
CREATE TABLE `tb_castledevlisting` (
  `id` bigint(11) NOT NULL auto_increment COMMENT '主键',
  `castleId` bigint(11) NOT NULL COMMENT '城堡ID',
  `floorId` int(1) NOT NULL COMMENT '楼层ID',
  `devId` int(4) NOT NULL COMMENT '设施ID',
  `devGuestPrice` double(10,0) NOT NULL COMMENT '游客消费设施费用',
  `devCharm` int(4) NOT NULL COMMENT '当前魅力',
  `devX` int(4) NOT NULL COMMENT '图片坐标',
  `devY` int(4) NOT NULL COMMENT '图片坐标',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=37 DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Records of tb_castledevlisting
-- ----------------------------
INSERT INTO `tb_castledevlisting` VALUES ('18', '1', '1', '11', '3450', '5', '8', '3');
INSERT INTO `tb_castledevlisting` VALUES ('22', '1', '1', '3', '2010', '5', '-7', '10');
INSERT INTO `tb_castledevlisting` VALUES ('23', '1', '1', '2', '1010', '5', '-8', '5');
INSERT INTO `tb_castledevlisting` VALUES ('24', '1', '1', '2', '1010', '5', '-7', '11');
INSERT INTO `tb_castledevlisting` VALUES ('25', '1', '1', '2', '2010', '5', '2', '2');
INSERT INTO `tb_castledevlisting` VALUES ('26', '1', '1', '30', '1360', '5', '2', '6');
INSERT INTO `tb_castledevlisting` VALUES ('28', '1', '1', '30', '1990', '5', '4', '5');
INSERT INTO `tb_castledevlisting` VALUES ('32', '1', '1', '3', '3100', '5', '5', '3');
INSERT INTO `tb_castledevlisting` VALUES ('34', '1', '1', '7', '10', '4', '8', '13');
INSERT INTO `tb_castledevlisting` VALUES ('35', '1', '1', '7', '10', '4', '10', '1');
INSERT INTO `tb_castledevlisting` VALUES ('36', '1', '1', '28', '2010', '10', '10', '2');

-- ----------------------------
-- Table structure for tb_castledevstore
-- ----------------------------
DROP TABLE IF EXISTS `tb_castledevstore`;
CREATE TABLE `tb_castledevstore` (
  `id` bigint(11) NOT NULL auto_increment,
  `castleId` bigint(11) NOT NULL COMMENT '城堡ID',
  `devId` double(4,0) NOT NULL COMMENT '设施ID',
  `devBuildPrice` double(10,0) NOT NULL COMMENT '设施当前价格',
  `devBuyNum` int(4) default NULL COMMENT '购买次数',
  `counts` bigint(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Records of tb_castledevstore
-- ----------------------------
INSERT INTO `tb_castledevstore` VALUES ('1', '1', '2', '10000', '0', '1000000');
INSERT INTO `tb_castledevstore` VALUES ('2', '1', '30', '10000', '0', '1000000');
INSERT INTO `tb_castledevstore` VALUES ('3', '1', '3', '20000', '0', '1000000');
INSERT INTO `tb_castledevstore` VALUES ('4', '1', '31', '500', '0', '1000000');
INSERT INTO `tb_castledevstore` VALUES ('5', '1', '25', '500', '0', '1000000');
INSERT INTO `tb_castledevstore` VALUES ('6', '1', '17', '1000', '0', '1000000');
INSERT INTO `tb_castledevstore` VALUES ('7', '1', '19', '2000', '0', '1000000');
INSERT INTO `tb_castledevstore` VALUES ('8', '1', '6', '1000', '0', '1000000');
INSERT INTO `tb_castledevstore` VALUES ('12', '1', '20', '50000', '0', '1000000');
INSERT INTO `tb_castledevstore` VALUES ('21', '1', '7', '8000', '0', '1000000');
INSERT INTO `tb_castledevstore` VALUES ('14', '1', '18', '5000', '0', '1000000');
INSERT INTO `tb_castledevstore` VALUES ('16', '1', '28', '50000', '0', '1000000');

-- ----------------------------
-- Table structure for tb_castleitem
-- ----------------------------
DROP TABLE IF EXISTS `tb_castleitem`;
CREATE TABLE `tb_castleitem` (
  `id` bigint(11) NOT NULL auto_increment,
  `castleId` bigint(11) default NULL COMMENT '城堡ID',
  `itemId` bigint(11) default NULL COMMENT '项目ID',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Records of tb_castleitem
-- ----------------------------
INSERT INTO `tb_castleitem` VALUES ('1', '1', '1');
INSERT INTO `tb_castleitem` VALUES ('7', '1', '2');
INSERT INTO `tb_castleitem` VALUES ('10', '1', '5');
INSERT INTO `tb_castleitem` VALUES ('8', '1', '3');
INSERT INTO `tb_castleitem` VALUES ('9', '1', '4');

-- ----------------------------
-- Table structure for tb_castlejob
-- ----------------------------
DROP TABLE IF EXISTS `tb_castlejob`;
CREATE TABLE `tb_castlejob` (
  `id` bigint(11) default NULL,
  `castleId` bigint(11) default NULL COMMENT '城堡ID',
  `allyCastleId` bigint(11) default NULL COMMENT '盟友城堡ID',
  `jobId` int(4) default NULL COMMENT '职位ID'
) ENGINE=MyISAM DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Records of tb_castlejob
-- ----------------------------

-- ----------------------------
-- Table structure for tb_castlemail
-- ----------------------------
DROP TABLE IF EXISTS `tb_castlemail`;
CREATE TABLE `tb_castlemail` (
  `id` bigint(11) NOT NULL auto_increment,
  `castleId` bigint(11) default NULL COMMENT '城堡ID',
  `sendCastleId` bigint(11) default NULL COMMENT '发件人城堡ID',
  `mailTitle` varchar(45) default NULL COMMENT '邮件主题',
  `mailTest` varchar(200) default NULL COMMENT '邮件内容',
  `alreadyRead` int(1) unsigned zerofill NOT NULL default '0' COMMENT '是否已读（0是未读）',
  PRIMARY KEY  (`id`,`alreadyRead`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Records of tb_castlemail
-- ----------------------------
INSERT INTO `tb_castlemail` VALUES ('5', '1', '2', '111', '1111111111112222', '0');
INSERT INTO `tb_castlemail` VALUES ('7', '1', '2', '1111', '1234', '0');
INSERT INTO `tb_castlemail` VALUES ('8', '1', '2', '222222', '3333333333333333333333', '0');
INSERT INTO `tb_castlemail` VALUES ('11', '1', '2', '主题', 'VVVVVVVVVVVCVC', '0');
INSERT INTO `tb_castlemail` VALUES ('12', '1', '2', '主题', 'ssssssssssssssssssssss', '0');

-- ----------------------------
-- Table structure for tb_castlewupin
-- ----------------------------
DROP TABLE IF EXISTS `tb_castlewupin`;
CREATE TABLE `tb_castlewupin` (
  `id` bigint(11) NOT NULL auto_increment,
  `castleId` bigint(11) default NULL,
  `wupinId` int(4) default NULL,
  `realMoney` double(10,0) default NULL,
  `ascMoney` double(10,0) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tb_castlewupin
-- ----------------------------
INSERT INTO `tb_castlewupin` VALUES ('1', '1', '9', '16000', '4000');
INSERT INTO `tb_castlewupin` VALUES ('2', '1', '16', '21000', '3500');
INSERT INTO `tb_castlewupin` VALUES ('3', '1', '11', '1000', '1000');
INSERT INTO `tb_castlewupin` VALUES ('4', '1', '4', null, null);

-- ----------------------------
-- Table structure for tb_cevacquiremode
-- ----------------------------
DROP TABLE IF EXISTS `tb_cevacquiremode`;
CREATE TABLE `tb_cevacquiremode` (
  `ID` decimal(10,0) NOT NULL,
  `typecode` int(2) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Records of tb_cevacquiremode
-- ----------------------------
INSERT INTO `tb_cevacquiremode` VALUES ('1', '1', '初始拥有');
INSERT INTO `tb_cevacquiremode` VALUES ('2', '2', '当玩家城堡游览1次后到达风车镇空港便可获得');
INSERT INTO `tb_cevacquiremode` VALUES ('3', '3', '当玩家城堡游览2次回到龙城空港便可获得');
INSERT INTO `tb_cevacquiremode` VALUES ('4', '4', '当玩家城堡首次抵达雅典娜空港时获得');
INSERT INTO `tb_cevacquiremode` VALUES ('5', '5', '通过投资开发获得，建造次数不限制');

-- ----------------------------
-- Table structure for tb_dev
-- ----------------------------
DROP TABLE IF EXISTS `tb_dev`;
CREATE TABLE `tb_dev` (
  `devId` int(4) NOT NULL COMMENT '设施ID',
  `devName` varchar(50) NOT NULL COMMENT '设施名称',
  `devTypeID` int(1) NOT NULL COMMENT '设施种类',
  `devInitBuildPrice` bigint(10) NOT NULL COMMENT '初始造价',
  `devAscPrice` bigint(10) NOT NULL COMMENT '售价递增',
  `devInitGuestPrice` bigint(10) NOT NULL COMMENT '游客初始消费',
  `devInitCharm` int(4) NOT NULL COMMENT '初始魅力',
  `devInitTotleFee` double(10,0) NOT NULL COMMENT '初始总收费',
  `devPath` varchar(45) character set utf8 NOT NULL COMMENT '设施图片PATH',
  `devSizeX` int(4) NOT NULL COMMENT '设施大小',
  `devSizeY` int(4) NOT NULL COMMENT '设施大小',
  `devAcquireMethod` int(4) default NULL COMMENT '获得方法',
  PRIMARY KEY  (`devId`)
) ENGINE=MyISAM DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Records of tb_dev
-- ----------------------------
INSERT INTO `tb_dev` VALUES ('1', 'aijiditan', '3', '5000', '0', '0', '1', '0', 'normal', '1', '1', '5');
INSERT INTO `tb_dev` VALUES ('2', 'bianlidian', '2', '10000', '5000', '1000', '5', '1500', 'normal', '2', '2', '1');
INSERT INTO `tb_dev` VALUES ('3', 'biaozhunfangjian', '1', '20000', '5000', '2000', '5', '2500', 'normal', '1', '1', '1');
INSERT INTO `tb_dev` VALUES ('4', 'huangjiaduchang', '2', '200000', '200000', '6000', '30', '9000', 'normal', '2', '2', '5');
INSERT INTO `tb_dev` VALUES ('5', 'daxingfangjian', '1', '40000', '2000', '3000', '10', '4000', 'normal', '2', '1', '5');
INSERT INTO `tb_dev` VALUES ('6', 'dalishizhuan', '3', '1000', '0', '0', '0', '0', 'normal', '1', '1', '1');
INSERT INTO `tb_dev` VALUES ('7', 'fengjingbihua', '3', '8000', '5000', '0', '4', '0', 'normal', '1', '1', '5');
INSERT INTO `tb_dev` VALUES ('8', 'fenglingshu', '3', '10000', '5000', '0', '4', '0', 'normal', '1', '1', '5');
INSERT INTO `tb_dev` VALUES ('9', 'gaoerfuqiuchang', '1', '100000', '15000', '5000', '20', '7000', 'normal', '3', '2', '5');
INSERT INTO `tb_dev` VALUES ('10', 'gewuting', '2', '50000', '50000', '3000', '15', '4500', 'normal', '2', '2', '5');
INSERT INTO `tb_dev` VALUES ('11', 'jinhuangguandiaoxiang', '3', '50000', '10000', '0', '6', '0', 'normal', '1', '1', '5');
INSERT INTO `tb_dev` VALUES ('12', 'haohuabaojian', '1', '60000', '15000', '4000', '15', '5500', 'normal', '2', '2', '5');
INSERT INTO `tb_dev` VALUES ('13', 'heimowangtan', '3', '10000', '0', '0', '3', '0', 'normal', '1', '1', '5');
INSERT INTO `tb_dev` VALUES ('14', 'jiuba', '2', '100000', '50000', '4000', '20', '6000', 'normal', '2', '2', '5');
INSERT INTO `tb_dev` VALUES ('15', 'jianshenfang', '2', '10000', '5000', '1000', '5', '1500', 'normal', '2', '1', '3');
INSERT INTO `tb_dev` VALUES ('16', 'kafeiwu', '2', '30000', '5000', '1500', '10', '2500', 'normal', '2', '2', '4');
INSERT INTO `tb_dev` VALUES ('17', 'luluopenjing', '3', '1000', '100', '0', '1', '0', 'normal', '1', '1', '1');
INSERT INTO `tb_dev` VALUES ('18', 'lurongpenjing', '3', '5000', '2000', '0', '3', '0', 'normal', '1', '1', '5');
INSERT INTO `tb_dev` VALUES ('19', 'jingguanshu', '3', '2000', '200', '0', '2', '0', 'normal', '1', '1', '1');
INSERT INTO `tb_dev` VALUES ('20', 'meirongguan', '2', '50000', '20000', '2000', '10', '3000', 'normal', '2', '1', '5');
INSERT INTO `tb_dev` VALUES ('21', 'wenquanyuchi', '1', '60000', '15000', '2000', '10', '3000', 'normal', '2', '2', '5');
INSERT INTO `tb_dev` VALUES ('22', 'nushengpenquan', '3', '100000', '50000', '0', '8', '0', 'normal', '2', '2', '5');
INSERT INTO `tb_dev` VALUES ('23', 'jueshikazuo', '1', '50000', '15000', '2000', '10', '3000', 'normal', '2', '1', '5');
INSERT INTO `tb_dev` VALUES ('24', 'tianshidiaoxiang', '3', '20000', '10000', '0', '5', '0', 'normal', '1', '1', '5');
INSERT INTO `tb_dev` VALUES ('25', 'tangyi', '1', '5000', '2000', '500', '2', '700', 'normal', '1', '1', '1');
INSERT INTO `tb_dev` VALUES ('26', 'xishicanting', '2', '10000', '5000', '1000', '5', '1500', 'normal', '2', '2', '2');
INSERT INTO `tb_dev` VALUES ('27', 'yunsongpenjing', '3', '20000', '10000', '0', '5', '0', 'normal', '1', '1', '5');
INSERT INTO `tb_dev` VALUES ('28', 'youxijiting', '2', '50000', '20000', '2000', '10', '3000', 'normal', '1', '1', '5');
INSERT INTO `tb_dev` VALUES ('29', 'youyongchi', '1', '80000', '15000', '2000', '15', '4500', 'normal', '2', '2', '5');
INSERT INTO `tb_dev` VALUES ('30', 'zhongshicanting', '2', '10000', '5000', '1000', '5', '1500', 'normal', '2', '2', '1');
INSERT INTO `tb_dev` VALUES ('31', 'zidongfanmaiji', '1', '5000', '2000', '500', '2', '700', 'normal', '1', '1', '1');
INSERT INTO `tb_dev` VALUES ('32', 'zongtongtaofang', '1', '60000', '15000', '5000', '20', '7000', 'normal', '3', '2', '5');

-- ----------------------------
-- Table structure for tb_devtype
-- ----------------------------
DROP TABLE IF EXISTS `tb_devtype`;
CREATE TABLE `tb_devtype` (
  `devTypeId` int(1) NOT NULL,
  `devTypeName` varchar(20) NOT NULL COMMENT '描述',
  PRIMARY KEY  (`devTypeId`)
) ENGINE=MyISAM DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Records of tb_devtype
-- ----------------------------
INSERT INTO `tb_devtype` VALUES ('1', '设施');
INSERT INTO `tb_devtype` VALUES ('2', '店铺');
INSERT INTO `tb_devtype` VALUES ('3', '装饰');

-- ----------------------------
-- Table structure for tb_item
-- ----------------------------
DROP TABLE IF EXISTS `tb_item`;
CREATE TABLE `tb_item` (
  `itemId` int(4) default NULL COMMENT '项目ID',
  `itemName` varchar(45) default NULL COMMENT '项目名称',
  `itemMoney` double(10,0) default NULL COMMENT '项目金额',
  `effect` varchar(45) default NULL COMMENT '投资效果',
  `itemdesc` varchar(45) default NULL COMMENT '投资时的简介',
  `appearCondition` varchar(45) default NULL COMMENT '出现条件',
  `iconPath` varchar(45) default NULL COMMENT '项目图标',
  `iconTpye` int(2) default NULL COMMENT '项目类型',
  `ascCastleBaseFamous` double(10,0) default NULL COMMENT '增加城堡知名度',
  `ascDevBaseCharm` double(10,0) default NULL COMMENT '增加设施基础魅力',
  `ascGuestBasePrice` double(10,0) default NULL COMMENT '增加游客基础收费'
) ENGINE=MyISAM DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Records of tb_item
-- ----------------------------
INSERT INTO `tb_item` VALUES ('2', '玩乐计划', '20000', '可以建造游戏机厅', '客人说有点无聊，要不要造个游戏厅来供客人打发时间？', '初始拥有', 'tz', '2', null, null, null);
INSERT INTO `tb_item` VALUES ('3', '爱美之人', '30000', '可以建造美容馆', '主妇们要求建造个美容馆，她们说：保养很重要！！', '初始拥有', 'tz', '2', null, null, null);
INSERT INTO `tb_item` VALUES ('1', '城堡的推广', '50000', '仅此项可重复投资；\r\n增加城堡的知名度20', '想要让更多的人来你的城堡游玩吗？', '初始拥有', 'tz', '1', null, null, null);
INSERT INTO `tb_item` VALUES ('4', '美化环境', '20000', '可以建造绿榕盆景', '盆栽商人一直在关注着我们的城堡。', '初始拥有', 'tz', '2', null, null, null);
INSERT INTO `tb_item` VALUES ('5', '墙壁妆点', '30000', '可以建造风景壁画', '有个知名画家愿意为我们批量绘制精美油画，要不要考虑一下？', '初始拥有', 'tz', '2', null, null, null);

-- ----------------------------
-- Table structure for tb_job
-- ----------------------------
DROP TABLE IF EXISTS `tb_job`;
CREATE TABLE `tb_job` (
  `jobId` int(1) default NULL COMMENT '职位ID',
  `jobName` varchar(45) default NULL COMMENT '职位名称'
) ENGINE=MyISAM DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Records of tb_job
-- ----------------------------
INSERT INTO `tb_job` VALUES ('1', '雇佣为招待服务');
INSERT INTO `tb_job` VALUES ('2', '雇佣为大陆推广');
INSERT INTO `tb_job` VALUES ('3', '雇佣为全球推广');
INSERT INTO `tb_job` VALUES ('4', '雇佣为大唐经理');

-- ----------------------------
-- Table structure for tb_login
-- ----------------------------
DROP TABLE IF EXISTS `tb_login`;
CREATE TABLE `tb_login` (
  `account` varchar(45) character set gb2312 NOT NULL,
  `keycode` varchar(45) character set gb2312 NOT NULL,
  `userid` int(11) NOT NULL,
  `status` int(1) NOT NULL default '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_login
-- ----------------------------
INSERT INTO `tb_login` VALUES ('test', '111111', '1', '0');

-- ----------------------------
-- Table structure for tb_temp_castleitem
-- ----------------------------
DROP TABLE IF EXISTS `tb_temp_castleitem`;
CREATE TABLE `tb_temp_castleitem` (
  `id` bigint(11) NOT NULL auto_increment,
  `castleId` bigint(11) default NULL,
  `itemId` bigint(11) default NULL,
  `createTime` datetime default NULL,
  `state` int(2) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=92 DEFAULT CHARSET=gb2312 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of tb_temp_castleitem
-- ----------------------------
INSERT INTO `tb_temp_castleitem` VALUES ('2', '1', '5', '2013-05-12 00:00:00', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('3', '1', '5', '2013-10-13 15:06:52', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('4', '1', '5', '2013-10-13 15:25:22', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('5', '1', '5', '2013-10-13 15:27:01', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('6', '1', '5', '2013-10-13 15:35:03', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('7', '1', '5', '2013-10-13 15:41:30', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('8', '1', '5', '2013-10-13 15:41:56', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('9', '1', '5', '2013-10-13 15:43:01', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('10', '1', '5', '2013-10-13 15:43:50', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('11', '1', '5', '2013-10-13 17:36:51', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('12', '1', '3', '2013-10-13 17:42:07', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('13', '1', '6', '2013-10-13 17:43:12', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('14', '1', '3', '2013-10-13 17:46:08', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('15', '1', '3', '2013-10-13 17:47:28', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('16', '1', '3', '2013-10-13 17:50:04', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('17', '1', '3', '2013-10-13 17:50:13', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('18', '1', '3', '2013-10-13 17:50:55', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('19', '1', '3', '2013-10-13 17:56:52', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('20', '1', '3', '2013-10-13 17:58:24', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('21', '1', '3', '2013-10-13 18:21:42', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('22', '1', '2', '2013-10-13 18:24:54', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('23', '1', '1', '2013-10-13 18:33:49', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('24', '1', '2', '2013-10-13 18:35:27', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('25', '1', '2', '2013-10-13 18:56:58', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('26', '1', '2', '2013-10-13 19:02:14', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('27', '1', '3', '2013-10-13 19:04:04', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('28', '1', '2', '2013-10-13 19:05:27', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('29', '1', '3', '2013-10-13 19:06:59', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('30', '1', '2', '2013-10-13 19:08:12', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('31', '1', '2', '2013-10-13 19:09:28', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('32', '1', '2', '2013-10-13 19:10:52', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('33', '1', '2', '2013-10-13 19:13:13', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('34', '1', '2', '2013-10-13 19:16:38', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('35', '1', '2', '2013-10-13 19:40:13', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('36', '1', '2', '2013-10-13 19:44:52', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('37', '1', '3', '2013-10-13 22:12:59', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('38', '1', '2', '2013-10-19 09:39:00', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('39', '1', '2', '2013-10-20 16:18:05', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('40', '1', '3', '2013-10-20 16:18:15', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('41', '1', '2', '2013-10-20 16:20:38', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('42', '1', '3', '2013-10-20 16:20:49', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('43', '1', '5', '2013-10-20 16:33:44', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('44', '1', '2', '2013-10-20 16:41:34', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('45', '1', '2', '2013-10-20 16:42:42', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('46', '1', '3', '2013-10-20 16:43:06', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('47', '1', '4', '2013-10-20 16:43:33', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('48', '1', '1', '2013-10-20 16:59:20', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('49', '1', '3', '2013-10-20 17:05:50', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('50', '1', '2', '2013-10-20 17:17:02', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('51', '1', '2', '2013-10-20 17:17:43', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('52', '1', '2', '2013-10-20 17:18:22', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('53', '1', '3', '2013-10-20 17:20:06', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('54', '1', '3', '2013-10-20 17:21:26', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('55', '1', '3', '2013-10-20 17:29:11', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('56', '1', '3', '2013-10-20 17:31:21', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('57', '1', '3', '2013-10-20 17:32:37', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('58', '1', '3', '2013-10-20 17:33:23', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('59', '1', '4', '2013-10-20 17:34:20', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('60', '1', '3', '2013-10-20 17:37:08', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('61', '1', '2', '2013-10-20 17:39:43', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('62', '1', '3', '2013-10-20 17:40:26', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('63', '1', '3', '2013-10-20 17:41:58', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('64', '1', '3', '2013-10-20 17:43:13', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('65', '1', '3', '2013-10-20 17:45:08', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('66', '1', '3', '2013-10-20 17:46:13', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('67', '1', '3', '2013-10-20 17:47:51', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('68', '1', '2', '2013-10-20 17:49:43', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('69', '1', '4', '2013-10-20 17:50:25', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('70', '1', '3', '2013-10-20 17:51:38', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('71', '1', '4', '2013-10-20 17:52:29', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('72', '1', '3', '2013-10-20 17:54:05', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('73', '1', '4', '2013-10-20 17:56:58', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('74', '1', '3', '2013-10-20 17:57:56', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('75', '1', '3', '2013-10-20 17:59:27', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('76', '1', '3', '2013-10-20 18:01:46', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('77', '1', '3', '2013-10-20 18:03:32', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('78', '1', '3', '2013-10-20 18:10:31', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('79', '1', '1', '2013-10-21 14:12:29', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('80', '1', '2', '2013-11-19 21:41:57', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('81', '1', '3', '2013-11-19 21:57:49', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('82', '1', '5', '2013-11-19 22:16:15', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('83', '1', '4', '2013-11-19 22:21:50', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('84', '1', '5', '2013-11-19 22:30:24', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('85', '1', '2', '2013-11-19 22:58:20', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('86', '1', '2', '2013-11-19 22:58:48', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('87', '1', '5', '2013-11-19 23:08:32', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('88', '1', '5', '2013-11-19 23:16:24', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('89', '1', '5', '2013-11-19 23:34:29', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('90', '1', '5', '2013-11-19 23:36:13', '0');
INSERT INTO `tb_temp_castleitem` VALUES ('91', '1', '5', '2013-11-19 23:39:01', '0');

-- ----------------------------
-- Table structure for tb_users
-- ----------------------------
DROP TABLE IF EXISTS `tb_users`;
CREATE TABLE `tb_users` (
  `castleId` bigint(11) NOT NULL auto_increment COMMENT '用户&城堡ID',
  `username` varchar(45) character set gb2312 default NULL COMMENT '用户名',
  `userNickname` varchar(45) character set gb2312 default NULL COMMENT '昵称',
  `castleNickname` varchar(45) character set gb2312 default NULL COMMENT '城堡昵称',
  `sex` varchar(1) character set gb2312 default NULL COMMENT '性别',
  `birthdate` varchar(20) character set gb2312 default NULL COMMENT '生日',
  `horoscope` varchar(45) character set gb2312 default NULL COMMENT '星座',
  `mobile` varchar(15) character set gb2312 default NULL COMMENT '电话',
  `regtime` datetime default NULL COMMENT '注册时间',
  `floorNum` int(1) default NULL COMMENT '城堡层数',
  `money` double(10,0) default NULL COMMENT '当前钞票',
  `landNum` bigint(11) default NULL COMMENT '登陆次数',
  `curTime` datetime default NULL COMMENT '当前时间',
  `lastTime` datetime default NULL COMMENT '上次登陆时间',
  `landTime` datetime default NULL COMMENT '登陆时间',
  `star` int(1) default NULL COMMENT '星级',
  `guestRemainTime` int(2) default NULL COMMENT '游客设施消费停留时间',
  PRIMARY KEY  (`castleId`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_users
-- ----------------------------
INSERT INTO `tb_users` VALUES ('1', 'test', '游戏测试', 'aaa', '1', '1988-09-01', '双鱼', '18811088888', '2013-09-07 00:00:00', null, null, null, null, null, null, null, null);
INSERT INTO `tb_users` VALUES ('2', 'ttt', 'ttt', 'ttt', '1', null, null, null, null, null, null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for tb_wupin
-- ----------------------------
DROP TABLE IF EXISTS `tb_wupin`;
CREATE TABLE `tb_wupin` (
  `wupinId` int(4) NOT NULL auto_increment,
  `wupinName` varchar(45) default NULL,
  `wupinMoney` double(10,0) default NULL,
  `ascWupinMoney` double(10,0) default NULL,
  `effectPrice` double(10,0) default NULL,
  `descEffectPrice` double(10,0) default NULL,
  `fitDevs` varchar(255) default NULL,
  `notFitDevs` varchar(255) default NULL,
  PRIMARY KEY  (`wupinId`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Records of tb_wupin
-- ----------------------------
INSERT INTO `tb_wupin` VALUES ('1', '鱼翅', '2000', '2000', '100', '30', null, null);
INSERT INTO `tb_wupin` VALUES ('11', '牛奶', '1000', '1000', '100', '30', null, null);
INSERT INTO `tb_wupin` VALUES ('9', '咖啡豆', '4000', '4000', '400', '150', null, null);
INSERT INTO `tb_wupin` VALUES ('16', '三明治', '3500', '3500', '350', '120', null, null);
INSERT INTO `tb_wupin` VALUES ('4', '伏特加', '3500', '3500', '350', '120', null, null);

-- ----------------------------
-- Table structure for tb_wupindev
-- ----------------------------
DROP TABLE IF EXISTS `tb_wupindev`;
CREATE TABLE `tb_wupindev` (
  `id` bigint(20) NOT NULL auto_increment,
  `devListId` bigint(20) NOT NULL,
  `wupinId` bigint(20) NOT NULL,
  `effect` double(10,0) default NULL,
  `descEffect` double(10,0) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Records of tb_wupindev
-- ----------------------------
INSERT INTO `tb_wupindev` VALUES ('1', '18', '1', '70', '30');
INSERT INTO `tb_wupindev` VALUES ('2', '18', '5', '350', '120');
INSERT INTO `tb_wupindev` VALUES ('3', '18', '9', '400', '150');
INSERT INTO `tb_wupindev` VALUES ('4', '18', '11', '70', '30');
INSERT INTO `tb_wupindev` VALUES ('5', '18', '16', '350', '120');
INSERT INTO `tb_wupindev` VALUES ('6', '25', '9', '250', '150');
INSERT INTO `tb_wupindev` VALUES ('7', '28', '16', '230', '120');
INSERT INTO `tb_wupindev` VALUES ('8', '32', '16', '110', '120');
INSERT INTO `tb_wupindev` VALUES ('9', '28', '4', null, null);
INSERT INTO `tb_wupindev` VALUES ('10', '28', '9', '400', '150');
INSERT INTO `tb_wupindev` VALUES ('11', '32', '4', null, null);
INSERT INTO `tb_wupindev` VALUES ('12', '32', '9', '400', '150');
INSERT INTO `tb_wupindev` VALUES ('13', '25', '4', '350', '120');
INSERT INTO `tb_wupindev` VALUES ('14', '26', '16', '350', '120');

-- ----------------------------
-- View structure for v_castleeally
-- ----------------------------
DROP VIEW IF EXISTS `v_castleeally`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER  VIEW `v_castleeally` AS select `u`.`castleId` AS `castleId`,`u`.`userNickname` AS `userNickname`,`u`.`castleNickname` AS `castleNickname`,`e`.`allyCastleId` AS `allyCastleId` from (`tb_users` `u` join `tb_castleally` `e`) where (`u`.`castleId` = `e`.`castleId`) ;

-- ----------------------------
-- View structure for v_randdev1
-- ----------------------------
DROP VIEW IF EXISTS `v_randdev1`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER  VIEW `v_randdev1` AS select `tb_dev`.`devId` AS `devId`,`tb_dev`.`devName` AS `devName`,`tb_dev`.`devTypeID` AS `devTypeID`,`tb_dev`.`devInitBuildPrice` AS `devInitBuildPrice`,`tb_dev`.`devAscPrice` AS `devAscPrice`,`tb_dev`.`devInitGuestPrice` AS `devInitGuestPrice`,`tb_dev`.`devInitCharm` AS `devInitCharm`,`tb_dev`.`devInitTotleFee` AS `devInitTotleFee`,`tb_dev`.`devPath` AS `devPath`,`tb_dev`.`devSizeX` AS `devSizeX`,`tb_dev`.`devSizeY` AS `devSizeY`,`tb_dev`.`devAcquireMethod` AS `devAcquireMethod` from `tb_dev` where (`tb_dev`.`devId` >= (select floor((rand() * (select max(`tb_dev`.`devId`) from `tb_dev`))))) order by `tb_dev`.`devId` limit 5 ;

-- ----------------------------
-- View structure for v_randusers1
-- ----------------------------
DROP VIEW IF EXISTS `v_randusers1`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER  VIEW `v_randusers1` AS select `u`.`castleId` AS `castleId`,`u`.`username` AS `username`,`u`.`userNickname` AS `userNickname`,`u`.`castleNickname` AS `castleNickname`,`u`.`sex` AS `sex`,`u`.`birthdate` AS `birthdate`,`u`.`horoscope` AS `horoscope`,`u`.`mobile` AS `mobile`,`u`.`regtime` AS `regtime`,`u`.`floorNum` AS `floorNum`,`u`.`money` AS `money`,`u`.`landNum` AS `landNum`,`u`.`curTime` AS `curTime`,`u`.`lastTime` AS `lastTime`,`u`.`landTime` AS `landTime`,`u`.`star` AS `star`,`u`.`guestRemainTime` AS `guestRemainTime` from `tb_users` `u` where (`u`.`castleId` >= (select floor((rand() * (select max(`tb_users`.`castleId`) from `tb_users`))))) order by `u`.`castleId` ;

-- ----------------------------
-- Procedure structure for proc_createally
-- ----------------------------
DROP PROCEDURE IF EXISTS `proc_createally`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_createally`(IN `castleId_p` bigint,IN `allyCastleId_p` bigint)
BEGIN
	insert into tb_castleally(castleId,allyCastleId) values(castleId_p,allyCastleId_p);
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for proc_createItem
-- ----------------------------
DROP PROCEDURE IF EXISTS `proc_createItem`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_createItem`()
BEGIN
	insert into tb_castleitem(itemName, itemMoney,effect,itemdesc,appearCondition,iconPath,iconType,ascCastleBaseFamous,ascDevBaseCharm,ascGuestBasePrice)
  values('玩乐计划',20000,'可以建造游戏机厅','客人说有点无聊，要不要造个游戏厅来供客人打发时间？','初始拥有','项目图标2');
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for proc_createMail
-- ----------------------------
DROP PROCEDURE IF EXISTS `proc_createMail`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_createMail`(IN `castleId_p` bigint,IN `sendCastleId_p` bigint,IN `mailTitle_p` varchar(45),IN `mailTest_p` varchar(200))
BEGIN
	insert into tb_castlemail (castleId,sendCastleId,mailTitle,mailTest) 
	values(castleId_p,sendCastleId_p,mailTitle_p,mailTest_p);

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for proc_createTouziItem
-- ----------------------------
DROP PROCEDURE IF EXISTS `proc_createTouziItem`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_createTouziItem`(`castleId_p` bigint,`itemId_p` bigint,`money_p` bigint)
BEGIN
	insert into tb_temp_castleitem (castleId,itemId,createTime,state) 
	values(castleId_p,itemId_p,NOW(),0);
	UPDATE tb_users as u set u.money = u.money - money_p where u.castleId = castleId;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for proc_delCastleMail
-- ----------------------------
DROP PROCEDURE IF EXISTS `proc_delCastleMail`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_delCastleMail`(IN `mailid` bigint)
BEGIN
	delete from tb_castlemail where id = mailid;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for proc_endTouziItem
-- ----------------------------
DROP PROCEDURE IF EXISTS `proc_endTouziItem`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_endTouziItem`(`castleId_p` bigint,`devId_p` 

bigint, `itemid_p` bigint)
BEGIN
	declare devBuildPrice_p bigint;
	select devInitBuildPrice into devBuildPrice_p from tb_dev 

where devId = devId_p;

	delete from tb_castledevstore where castleid = castleId_p 

and devid = devId_p;
	insert into tb_castledevstore 

(castleId,devId,devBuildPrice,devBuyNum,counts) 
	values(castleId_p,devId_p,devBuildPrice_p,0,1000000);

	delete from tb_castleitem where castleid = castleId_p and 

itemid = itemid_p;

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for proc_sendally
-- ----------------------------
DROP PROCEDURE IF EXISTS `proc_sendally`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_sendally`(IN `id_p` bigint,IN `castleId_p` bigint,IN `allyCastleId_p` bigint)
BEGIN
	insert into tb_castleally (id,castleId,allyCastleId) 
values(id_P,castleId_P,allyCastleId_P);

END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for proc_useWupin
-- ----------------------------
DROP PROCEDURE IF EXISTS `proc_useWupin`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_useWupin`(`castleId_p` bigint,`wupinId_p` int, `devX_p` bigint, `devY_p` bigint)
BEGIN
	declare numUsedWupin_p,devListId_p bigint;
	declare m,am,e,de double;

	select id into devListId_p from tb_castledevlisting where castleid = castleId_p and devX = devX_p and devY = devY_p;

	select count(*) into numUsedWupin_p from tb_wupindev where wupinId = wupinId_p and devListId = devListId_p;
	IF (numUsedWupin_p > 0) THEN
		UPDATE tb_wupindev SET effect = effect - descEffect WHERE wupinId = wupinId_p AND devListId = devListId_p;
	ELSE
		SELECT effectPrice, descEffectPrice into e, de from tb_wupin WHERE wupinId = wupinId_p;
		INSERT INTO tb_wupindev (wupinId, devListId, effect, descEffect) VALUES (wupinId_p, devListId_p, e, de);
	END IF;

	select count(*) into numUsedWupin_p from tb_castlewupin where wupinId = wupinId_p and castleId = castleId_p;
	IF (numUsedWupin_p > 0) THEN
		UPDATE tb_castlewupin SET realMoney = realMoney + ascMoney WHERE wupinId = wupinId_p AND castleId = castleId_p;
	ELSE
		SELECT wupinMoney, ascWupinMoney into m, am from tb_wupin WHERE wupinId = wupinId_p;
		INSERT INTO tb_castlewupin (wupinId, castleId, realMoney, ascMoney) VALUES (wupinId_p, castleId_p, m, am);
	END IF;

	SELECT realMoney into m FROM tb_castlewupin WHERE castleId = castleId_p and wupinId = wupinId_p;
	UPDATE tb_users set money = money - m where castleId = castleId;
	SELECT effect into e FROM tb_wupindev WHERE wupinId = wupinId_p and devListId = devListId_p;
	IF (e > 0) THEN
		UPDATE tb_castledevlisting set devGuestPrice = devGuestPrice + e WHERE id = devListId_p;
	END IF;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for pro_createCastleDev
-- ----------------------------
DROP PROCEDURE IF EXISTS `pro_createCastleDev`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `pro_createCastleDev`(`castleId` bigint,`floorId` bigint,`devId` int,`devGuestPrice` double,`devCharm` int,`devX` int,`devY` int,`devInitBuildPrice` bigint)
BEGIN
	insert into tb_castledevlisting (castleId,floorId,devId,devGuestPrice,devCharm,devX,devY) 
		values(castleId,floorId,devId,devGuestPrice,devCharm,devX,devY);
	UPDATE tb_users as u set u.money = u.money - devInitBuildPrice where u.castleId = castleId;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for pro_deletedCastleDev
-- ----------------------------
DROP PROCEDURE IF EXISTS `pro_deletedCastleDev`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `pro_deletedCastleDev`(`devX_p` int,`devY_p` int)
BEGIN
	
	DELETE from tb_castledevlisting where devX = devX_p and devY = devY_p;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for pro_guestXF
-- ----------------------------
DROP PROCEDURE IF EXISTS `pro_guestXF`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `pro_guestXF`(`devGuestPrice` double,`castleId` bigint)
BEGIN
	
	UPDATE tb_users as u set u.money = u.money + devGuestPrice where u.castleId = castleId;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for pro_moveCastleDev
-- ----------------------------
DROP PROCEDURE IF EXISTS `pro_moveCastleDev`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `pro_moveCastleDev`(`devX_p` int,`devY_p` int,`oldX` int,`oldY` int)
BEGIN
	
	UPDATE tb_castledevlisting as c set c.devX = devX_p , c.devY = devY_p where c.devX = oldX and c.devY = oldY;
END
;;
DELIMITER ;
