-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: automobiles
-- ------------------------------------------------------
-- Server version	5.7.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auto`
--

DROP TABLE IF EXISTS `auto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auto` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `make` varchar(25) NOT NULL,
  `model` varchar(40) NOT NULL,
  `modelYear` year(4) NOT NULL,
  `MSRP` decimal(10,2) unsigned NOT NULL,
  `description` varchar(200) DEFAULT 'No description provided',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auto`
--

LOCK TABLES `auto` WRITE;
/*!40000 ALTER TABLE `auto` DISABLE KEYS */;
INSERT INTO `auto` VALUES (1,'Chevorlet','Blazer',1994,500.00,'The Red Barron'),(2,'Chevorlet','Blazer',1997,600.00,'Black Beauty'),(3,'GMC','Jimmy',2001,300.00,'Jimmy'),(4,'Cadillac','SRX',2005,3000.00,'Dead'),(5,'Volvo','V70',2000,300.00,'Mom Car');
/*!40000 ALTER TABLE `auto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `autoPart`
--DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supplier` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `hq` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,'Advance Auto','Balitmore, MD'),(2,'Car Quest','Atlanta, GA'),(3,'Napa Auto Parts','Austin , TX');
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `part`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `part` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `cost` decimal(7,2) unsigned NOT NULL,
  `partNo` smallint(50) unsigned NOT NULL,
  `supplierID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_supplier_idx` (`supplierID`),
  CONSTRAINT `FK_supplier` FOREIGN KEY (`supplierID`) REFERENCES `supplier` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `part`
--

LOCK TABLES `part` WRITE;
/*!40000 ALTER TABLE `part` DISABLE KEYS */;
INSERT INTO `part` VALUES (8,'Alternator',156.99,124,1),(9,'Water Pump',154.99,5326,1),(10,'Thermostat',89.99,7453,1),(11,'Alternator',156.99,1,2),(12,'Water Pump',154.99,5326,2),(13,'Thermostat',89.99,7453,2),(14,'Alternator',156.99,1,3),(15,'Water Pump',154.99,5326,3),(16,'Thermostat',89.99,7453,3),(17,'Alternator',156.99,1324,2),(18,'Water Pump',154.99,5326,1),(19,'Thermostat',89.99,7453,2),(20,'Alternator',156.99,1324,3),(21,'Water Pump',154.99,5326,1),(22,'Thermostat',89.99,7453,2),(23,'Valve Cover Gasket Set',48.99,302,2),(24,'Alternator',133.99,637,2),(25,'Water Pump',357.99,984,2);
/*!40000 ALTER TABLE `part` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `autoPart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `autoPart` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `autoID` int(10) unsigned NOT NULL,
  `partID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_auto_idx` (`autoID`),
  KEY `FK_part_idx` (`partID`),
  CONSTRAINT `FK_auto` FOREIGN KEY (`autoID`) REFERENCES `auto` (`ID`),
  CONSTRAINT `FK_part` FOREIGN KEY (`partID`) REFERENCES `part` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autoPart`
--

LOCK TABLES `autoPart` WRITE;
/*!40000 ALTER TABLE `autoPart` DISABLE KEYS */;
INSERT INTO `autoPart` VALUES (6,1,8),(7,1,9),(8,1,10),(9,1,14),(10,1,20),(11,2,12),(12,2,13),(13,2,15),(14,3,16),(15,3,17),(16,3,18);
/*!40000 ALTER TABLE `autoPart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `new_view`
--


-- Table structure for table `part`

--

--



--
-- Table structure for table `supplier`
--


-- Final view structure for view `new_view`
--DROP TABLE IF EXISTS `new_view`;
/*!50001 DROP VIEW IF EXISTS `new_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `new_view` AS SELECT
 1 AS `autoPartID`,
 1 AS `autoID`,
 1 AS `partID`,
 1 AS `partName`,
 1 AS `partNo`,
 1 AS `supplierID`,
 1 AS `supplierName`,
 1 AS `hq`,
 1 AS `make`,
 1 AS `model`,
 1 AS `modelYear`,
 1 AS `MSRP`,
 1 AS `description`*/;
SET character_set_client = @saved_cs_client;

--

/*!50001 DROP VIEW IF EXISTS `new_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `new_view` AS select `ap`.`ID` AS `autoPartID`,`ap`.`autoID` AS `autoID`,`ap`.`partID` AS `partID`,`p`.`name` AS `partName`,`p`.`partNo` AS `partNo`,`p`.`supplierID` AS `supplierID`,`s`.`name` AS `supplierName`,`s`.`hq` AS `hq`,`a`.`make` AS `make`,`a`.`model` AS `model`,`a`.`modelYear` AS `modelYear`,`a`.`MSRP` AS `MSRP`,`a`.`description` AS `description` from (((`autopart` `ap` join `auto` `a` on((`ap`.`autoID` = `a`.`ID`))) join `part` `p` on((`ap`.`partID` = `p`.`ID`))) join `supplier` `s` on((`s`.`ID` = `p`.`supplierID`))) */;
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

-- Dump completed on 2017-07-25 16:06:26
