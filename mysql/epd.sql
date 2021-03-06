-- MariaDB dump 10.19  Distrib 10.4.21-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: epd
-- ------------------------------------------------------
-- Server version	10.4.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `charactor_list`
--

DROP TABLE IF EXISTS `charactor_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `charactor_list` (
  `CharactorID` varchar(40) NOT NULL,
  `CharactorName` varchar(40) NOT NULL,
  `PlanetID_1` varchar(40) NOT NULL,
  `PlanetID_2` varchar(40) NOT NULL,
  `PlanetID_3` varchar(40) NOT NULL,
  `PlanetID_4` varchar(40) NOT NULL,
  `PlanetID_5` varchar(40) NOT NULL,
  `PlanetID_6` varchar(40) NOT NULL,
  `PlanetID_V` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `charactor_list`
--

LOCK TABLES `charactor_list` WRITE;
/*!40000 ALTER TABLE `charactor_list` DISABLE KEYS */;
INSERT INTO `charactor_list` VALUES ('CH10001','Syby Han','PL10001','PL10002','PL10003','PL10004','PL10008','PL00000','PL1000V'),('CH10002','Veronic Han','PL10001','PL10004','PL10006','PL10007','PL10008','PL10009','PL1000V'),('CH10003','Xiaowei Han','PL10001','PL10004','PL10006','PL10007','PL10009','PL10000','PL1000V');
/*!40000 ALTER TABLE `charactor_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planet_list`
--

DROP TABLE IF EXISTS `planet_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `planet_list` (
  `PlanetID` varchar(40) NOT NULL,
  `Region` varchar(80) NOT NULL,
  `Constellation` varchar(80) NOT NULL,
  `SolarSystem` varchar(80) NOT NULL,
  `PlanetNo` varchar(80) NOT NULL,
  `PlanetType` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planet_list`
--

LOCK TABLES `planet_list` WRITE;
/*!40000 ALTER TABLE `planet_list` DISABLE KEYS */;
INSERT INTO `planet_list` VALUES ('PL10001','','','WE-KK2','1','Barren'),('PL10002','','','WE-KK2','2','Barren'),('PL10003','','','WE-KK2','2','Lava'),('PL10004','','','WE-KK2','4','Lava'),('PL10008','','','WE-KK2','8','Ice'),('PL10007','','','WE-KK2','7','Gas'),('PL10009','','','WE-KK2','9','Ice');
/*!40000 ALTER TABLE `planet_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planet_product`
--

DROP TABLE IF EXISTS `planet_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `planet_product` (
  `PlanetType` varchar(40) NOT NULL,
  `ProductType_1` varchar(40) NOT NULL,
  `ProductType_2` varchar(40) NOT NULL,
  `ProductType_3` varchar(40) NOT NULL,
  `ProductType_4` varchar(40) NOT NULL,
  `ProductType_5` varchar(40) NOT NULL,
  `ProductType_6` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planet_product`
--

LOCK TABLES `planet_product` WRITE;
/*!40000 ALTER TABLE `planet_product` DISABLE KEYS */;
INSERT INTO `planet_product` VALUES ('Lava','PP-0002','PP-0006','PP-0007','PP-0008','PP-0009','PP-0000'),('Barren','PP-0001','PP-0002','PP-0003','PP-0004','PP-0005','PP-0000'),('Gas','PP-0001','PP-0002','PP-0010','PP-0011','PP-0012','PP-0000'),('Ice','PP-0001','PP-0007','PP-0004','PP-0011','PP-0013','PP-0000'),('Oceanic','PP-0001','PP-0003','PP-0014','PP-0004','PP-0013','PP-0000'),('Plasma','PP-0002','PP-0007','PP-0005','PP-0008','PP-0009','PP-0000'),('Storm','PP-0001','PP-0002','PP-0010','PP-0011','PP-0009','PP-0000'),('Temperate','PP-0001','PP-0015','PP-0003','PP-0014','PP-0004','PP-0000'),('TestPlanet','PP-AAAA','PP-AAAB','PP-AAAC','PP-AAAD','PP-AAAE','PP-AAAF');
/*!40000 ALTER TABLE `planet_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_catalogue`
--

DROP TABLE IF EXISTS `product_catalogue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_catalogue` (
  `ProductType` varchar(40) NOT NULL,
  `ProductName` varchar(40) NOT NULL,
  `ProductLevel` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_catalogue`
--

LOCK TABLES `product_catalogue` WRITE;
/*!40000 ALTER TABLE `product_catalogue` DISABLE KEYS */;
INSERT INTO `product_catalogue` VALUES ('PP-0001','Aqueous Liquid','P0'),('PP-0002','Base Metals','P0'),('PP-0003','Carbon Compounds','P0'),('PP-0004','Micro Organisms','P0'),('PP-0005','Noble Metals','P0'),('PP-0000','n/a','n/a'),('PP-0006','Felsic Magma','P0'),('PP-0007','Heavy Metals','P0'),('PP-0008','Non-CS Crystals','P0'),('PP-0009','Suspended Plasma','P0'),('PP-0010','Ionic Solutions','P0'),('PP-0011','Noble Gas','P0'),('PP-0012','Reactive Gas','P0'),('PP-0013','Planktic Colonies','P0'),('PP-0014','Complex Organisms','P0'),('PP-0015','Autotrophs','P0'),('PP-0016','Coolant','P2'),('PP-0017','Precious Metals','P1'),('PP-0018','Robotics','P3'),('PP-0019','Toxic Metals','P1'),('PP-0020','Water','P1'),('PP-0021','Reactive Metals','P1'),('PP-0022','Electrolytes','P1'),('PP-0023','Consumer Electronics','P2'),('PP-0024','Mechanical Parts','P2'),('PP-0025','Oxygen','P1'),('PP-0026','Enriched Uranium','P2'),('PP-0027','Chiral Structures','P2'),('PP-0028','Water-Cooled CPU','P2'),('PP-XXXX','NAME-XXXX','LEVEL-XXXX');
/*!40000 ALTER TABLE `product_catalogue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_list`
--

DROP TABLE IF EXISTS `stock_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock_list` (
  `CharactorID` varchar(40) NOT NULL,
  `PlanetID` varchar(40) NOT NULL,
  `ProductID` varchar(40) NOT NULL,
  `ProductQty` int(40) NOT NULL,
  `Abandoned` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_list`
--

LOCK TABLES `stock_list` WRITE;
/*!40000 ALTER TABLE `stock_list` DISABLE KEYS */;
INSERT INTO `stock_list` VALUES ('','PID','PP-0016',4940,0),('CH10003','PL10004','PP-0026',1111,0),('CH10003','PL10004','PP-0017',1180,0),('CH10003','PL10004','PP-0021',8140,0),('CH10003','PL10004','PP-0019',6840,0),('CH10002','PL10004','PP-0026',475,0),('CH10002','PL10004','PP-0017',1180,0),('CH10002','PL10004','PP-0021',8140,0),('CH10002','PL10004','PP-0019',840,0),('CH10001','PL10001','PP-0026',475,1),('CH10001','PL10001','PP-0017',1180,1),('CH10001','PL10001','PP-0021',8140,1),('CH10001','PL10001','PP-0019',6840,1),('CH10001','PL10001','PP-0026',475,0),('CH10001','PL10001','PP-0017',1180,0),('CH10001','PL10001','PP-0021',8140,0),('CH10001','PL10001','PP-0019',6840,0);
/*!40000 ALTER TABLE `stock_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `v_planet_product_details`
--

DROP TABLE IF EXISTS `v_planet_product_details`;
/*!50001 DROP VIEW IF EXISTS `v_planet_product_details`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `v_planet_product_details` (
  `PlanetType` tinyint NOT NULL,
  `ProductName` tinyint NOT NULL,
  `ProductLevel` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `v_planet_product_details`
--

/*!50001 DROP TABLE IF EXISTS `v_planet_product_details`*/;
/*!50001 DROP VIEW IF EXISTS `v_planet_product_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_planet_product_details` AS select `a`.`PlanetType` AS `PlanetType`,`a`.`ProductName` AS `ProductName`,`a`.`ProductLevel` AS `ProductLevel` from (select `pp`.`PlanetType` AS `PlanetType`,`pc`.`ProductName` AS `ProductName`,`pc`.`ProductLevel` AS `ProductLevel` from (`epd`.`planet_product` `pp` join `epd`.`product_catalogue` `pc` on(`pp`.`ProductType_1` = `pc`.`ProductType` or `pp`.`ProductType_2` = `pc`.`ProductType` or `pp`.`ProductType_3` = `pc`.`ProductType` or `pp`.`ProductType_4` = `pc`.`ProductType` or `pp`.`ProductType_5` = `pc`.`ProductType`))) `a` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-31  8:26:31
