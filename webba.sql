CREATE DATABASE  IF NOT EXISTS `main_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `main_db`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: main_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cars` (
  `id_car` int(11) NOT NULL AUTO_INCREMENT,
  `plate` varchar(7) NOT NULL,
  `manufacturer` varchar(45) NOT NULL,
  `model` varchar(45) NOT NULL,
  `year_of_manufacture` year(4) NOT NULL,
  `year_of_model` year(4) NOT NULL,
  `fleet` varchar(45) NOT NULL,
  `project` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `comments` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id_car`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drivers`
--

DROP TABLE IF EXISTS `drivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `drivers` (
  `id_driver` int(6) NOT NULL AUTO_INCREMENT,
  `conductor` varchar(45) NOT NULL,
  `ddd` int(3) NOT NULL,
  `contact` int(11) NOT NULL,
  `driver_license` int(11) NOT NULL,
  `category_of_driver_license` varchar(3) NOT NULL,
  `maturity_of_driver_license` varchar(45) NOT NULL,
  `defensive_driving` varchar(45) DEFAULT NULL,
  `project` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `comments` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id_driver`),
  CONSTRAINT `driver` FOREIGN KEY (`id_driver`) REFERENCES `cars` (`id_car`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drivers`
--

LOCK TABLES `drivers` WRITE;
/*!40000 ALTER TABLE `drivers` DISABLE KEYS */;
/*!40000 ALTER TABLE `drivers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id_construction` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  `country` varchar(45) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `number_of_cars` int(11) NOT NULL,
  PRIMARY KEY (`id_construction`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idusers` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `license` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (14,'teste testando','teste@teste.com.br','08140927996','(41) 99906-3935','$2b$10$3FRZ.RRgHOiEgzNEgIJBAeeCC9Nz.cAUSHObadp66/2H2Tqwi.MwK'),(15,'chrystopher ferreira','teste@teste.com','08140922927','(41) 99779-1628','!Usuario0');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-13 21:31:54
