-- Adminer 4.8.1 MySQL 8.0.27 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `city`;
CREATE TABLE `city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` int NOT NULL DEFAULT '0',
  `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) NOT NULL,
  `parentId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_502f28f00e93f40de5873a2ec11` (`parentId`),
  CONSTRAINT `FK_502f28f00e93f40de5873a2ec11` FOREIGN KEY (`parentId`) REFERENCES `city` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `city` (`id`, `status`, `createDate`, `updateDate`, `name`, `parentId`) VALUES
(1,	0,	'2024-04-29 02:32:15.902630',	'2024-04-29 02:32:15.902630',	'华北',	NULL),
(2,	0,	'2024-04-29 02:32:16.149554',	'2024-04-29 02:32:16.149554',	'山东',	1),
(3,	0,	'2024-04-29 02:36:18.927913',	'2024-04-29 02:36:18.927913',	'华南',	NULL),
(4,	0,	'2024-04-29 02:36:18.966929',	'2024-04-29 02:36:18.966929',	'云南',	3),
(5,	0,	'2024-04-29 02:36:19.042083',	'2024-04-29 02:36:19.042083',	'昆明',	4);

DROP TABLE IF EXISTS `city_closure`;
CREATE TABLE `city_closure` (
  `id_ancestor` int NOT NULL,
  `id_descendant` int NOT NULL,
  PRIMARY KEY (`id_ancestor`,`id_descendant`),
  KEY `IDX_1f3ef9279932b801698831499b` (`id_ancestor`),
  KEY `IDX_0a1ec292fafcb6398899f7f587` (`id_descendant`),
  CONSTRAINT `FK_0a1ec292fafcb6398899f7f587a` FOREIGN KEY (`id_descendant`) REFERENCES `city` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_1f3ef9279932b801698831499b3` FOREIGN KEY (`id_ancestor`) REFERENCES `city` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `city_closure` (`id_ancestor`, `id_descendant`) VALUES
(1,	1),
(1,	2),
(2,	2),
(3,	3),
(3,	4),
(3,	5),
(4,	4),
(4,	5),
(5,	5);

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- 2024-04-29 02:58:38
