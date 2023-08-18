-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: i9a209.p.ssafy.io    Database: zucchini
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `no` int NOT NULL AUTO_INCREMENT,
  `category` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'디지털기기'),(2,'가구/인테리어'),(3,'유아동'),(4,'여성의류/잡화'),(5,'남성의류/잡화'),(6,'생활가전/주방'),(7,'도서/게임/음반'),(8,'뷰티/미용'),(9,'식물'),(10,'식품'),(11,'반려동물용품'),(12,'티켓/교환권'),(13,'기타 중고물품');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conference`
--

DROP TABLE IF EXISTS `conference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conference` (
  `no` int NOT NULL AUTO_INCREMENT,
  `is_active` tinyint(1) NOT NULL,
  `item_no` int DEFAULT NULL,
  `confirmed_date` timestamp NOT NULL,
  PRIMARY KEY (`no`),
  KEY `conference_ibfk_1` (`item_no`),
  CONSTRAINT `conference_ibfk_1` FOREIGN KEY (`item_no`) REFERENCES `item` (`no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conference`
--

LOCK TABLES `conference` WRITE;
/*!40000 ALTER TABLE `conference` DISABLE KEYS */;
INSERT INTO `conference` VALUES (1,1,1,'2023-08-07 15:24:18'),(3,1,9,'2023-08-18 02:00:00'),(4,0,10,'2023-08-18 02:30:00'),(5,0,11,'2023-08-18 03:00:00'),(6,0,66,'2023-08-18 09:00:00'),(7,0,68,'2023-08-18 09:30:00'),(8,0,70,'2023-08-18 10:00:00'),(9,1,83,'2023-08-18 03:30:00'),(10,1,87,'2023-08-18 04:00:00'),(11,1,85,'2023-08-18 03:30:00'),(12,1,88,'2023-08-18 04:00:00'),(13,1,89,'2023-08-18 04:20:00'),(14,1,90,'2023-08-18 04:30:00'),(15,1,91,'2023-08-18 08:00:00'),(16,1,92,'2023-08-18 08:00:00'),(17,1,93,'2023-08-18 08:00:00'),(18,1,94,'2023-08-18 08:30:00'),(19,1,97,'2023-08-18 09:00:00'),(20,1,98,'2023-08-18 09:30:00'),(21,1,99,'2023-08-18 09:50:00'),(22,1,100,'2023-08-18 09:50:00');
/*!40000 ALTER TABLE `conference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `date`
--

DROP TABLE IF EXISTS `date`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `date` (
  `no` int NOT NULL AUTO_INCREMENT,
  `item_no` int NOT NULL,
  `date` timestamp NOT NULL,
  `status` tinyint DEFAULT '0',
  PRIMARY KEY (`no`),
  KEY `date_ibfk_1` (`item_no`) /*!80000 INVISIBLE */,
  CONSTRAINT `date_ibfk_1` FOREIGN KEY (`item_no`) REFERENCES `item` (`no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=220 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `date`
--

LOCK TABLES `date` WRITE;
/*!40000 ALTER TABLE `date` DISABLE KEYS */;
INSERT INTO `date` VALUES (7,8,'2023-08-01 13:14:00',0),(8,8,'2023-08-02 13:14:00',1),(9,9,'2023-08-18 02:00:00',1),(10,10,'2023-08-18 02:30:00',1),(11,11,'2023-08-18 03:00:00',1),(12,12,'2023-08-18 03:00:00',2),(13,13,'2023-08-19 10:00:00',0),(14,13,'2023-08-19 10:30:00',0),(15,13,'2023-08-20 13:00:00',0),(16,13,'2023-08-20 13:30:00',0),(17,14,'2023-08-19 14:00:00',0),(18,14,'2023-08-19 14:30:00',0),(19,14,'2023-08-19 15:00:00',0),(20,14,'2023-08-19 15:30:00',0),(21,14,'2023-08-19 16:30:00',0),(22,16,'2023-08-21 12:00:00',0),(23,16,'2023-08-21 12:30:00',0),(24,16,'2023-08-22 13:30:00',0),(25,16,'2023-08-22 14:00:00',0),(26,16,'2023-08-22 14:30:00',0),(27,17,'2023-08-19 17:00:00',0),(28,17,'2023-08-19 17:30:00',0),(29,18,'2023-08-19 13:00:00',0),(30,18,'2023-08-19 13:30:00',0),(31,18,'2023-08-20 13:30:00',0),(32,18,'2023-08-20 14:30:00',0),(33,19,'2023-08-19 06:30:00',0),(34,19,'2023-08-25 06:00:00',0),(35,19,'2023-08-25 06:30:00',0),(36,20,'2023-08-19 14:00:00',0),(37,20,'2023-08-19 14:30:00',0),(38,20,'2023-08-21 14:30:00',0),(39,20,'2023-08-21 15:30:00',0),(40,21,'2023-08-25 06:00:00',0),(41,21,'2023-08-25 06:30:00',0),(42,22,'2023-08-25 02:00:00',0),(43,22,'2023-08-25 03:00:00',0),(44,24,'2023-08-19 07:00:00',0),(45,24,'2023-08-19 07:30:00',0),(46,25,'2023-08-19 04:30:00',0),(47,25,'2023-08-19 06:30:00',0),(48,25,'2023-08-25 04:00:00',0),(49,25,'2023-08-25 04:30:00',0),(50,26,'2023-08-22 12:00:00',0),(51,26,'2023-08-22 12:30:00',0),(52,26,'2023-08-22 18:00:00',0),(53,26,'2023-08-22 18:30:00',0),(54,26,'2023-08-24 18:30:00',0),(55,26,'2023-08-24 19:30:00',0),(56,28,'2023-08-19 04:00:00',0),(57,28,'2023-08-19 04:30:00',0),(58,29,'2023-08-19 04:00:00',0),(59,29,'2023-08-19 04:30:00',0),(60,30,'2023-08-19 00:00:00',0),(61,30,'2023-08-19 00:30:00',0),(62,30,'2023-08-25 02:00:00',0),(63,30,'2023-08-25 06:00:00',0),(64,32,'2023-08-19 04:00:00',0),(65,32,'2023-08-19 04:30:00',0),(66,32,'2023-08-27 06:00:00',0),(67,32,'2023-08-27 06:30:00',0),(68,33,'2023-08-22 06:30:00',0),(69,33,'2023-08-22 07:30:00',0),(70,34,'2023-08-19 03:30:00',0),(71,36,'2023-08-24 14:30:00',0),(72,36,'2023-08-24 15:00:00',0),(73,36,'2023-08-24 15:30:00',0),(74,36,'2023-08-25 15:30:00',0),(75,36,'2023-08-25 16:30:00',0),(76,37,'2023-08-20 07:00:00',0),(77,37,'2023-08-20 07:30:00',0),(78,38,'2023-08-21 14:30:00',0),(79,38,'2023-08-21 15:00:00',0),(80,38,'2023-08-21 15:30:00',0),(81,38,'2023-08-23 15:30:00',0),(82,38,'2023-08-23 16:00:00',0),(83,39,'2023-08-23 02:30:00',0),(84,39,'2023-08-23 06:30:00',0),(85,40,'2023-08-21 14:30:00',0),(86,40,'2023-08-21 15:00:00',0),(87,40,'2023-08-21 15:30:00',0),(88,40,'2023-08-24 15:00:00',0),(89,40,'2023-08-24 15:30:00',0),(90,41,'2023-08-20 02:30:00',0),(91,41,'2023-08-20 06:30:00',0),(92,42,'2023-08-22 12:30:00',0),(93,42,'2023-08-22 13:00:00',0),(94,42,'2023-08-22 13:30:00',0),(95,42,'2023-08-24 13:30:00',0),(96,42,'2023-08-24 14:00:00',0),(97,43,'2023-08-28 02:30:00',0),(98,43,'2023-08-28 06:30:00',0),(99,44,'2023-08-21 12:00:00',0),(100,44,'2023-08-21 12:30:00',0),(101,44,'2023-08-21 13:00:00',0),(102,44,'2023-08-21 13:30:00',0),(103,45,'2023-08-23 02:30:00',0),(104,45,'2023-08-25 02:30:00',0),(105,46,'2023-08-21 14:30:00',0),(106,46,'2023-08-21 15:30:00',0),(107,46,'2023-08-21 16:30:00',0),(108,46,'2023-08-22 15:30:00',0),(109,46,'2023-08-22 16:30:00',0),(110,46,'2023-08-22 17:30:00',0),(111,47,'2023-08-19 02:30:00',0),(112,47,'2023-08-25 02:30:00',0),(113,48,'2023-08-22 12:30:00',0),(114,48,'2023-08-22 13:00:00',0),(115,48,'2023-08-22 13:30:00',0),(116,49,'2023-08-26 02:30:00',0),(117,49,'2023-08-26 06:30:00',0),(118,50,'2023-08-21 02:30:00',0),(119,50,'2023-08-26 02:30:00',0),(120,51,'2023-08-23 16:30:00',0),(121,51,'2023-08-23 17:00:00',0),(122,51,'2023-08-23 17:30:00',0),(123,51,'2023-08-25 17:30:00',0),(124,52,'2023-08-21 15:00:00',0),(125,52,'2023-08-22 15:00:00',0),(126,52,'2023-08-23 15:00:00',0),(127,52,'2023-08-24 15:00:00',0),(128,52,'2023-08-25 15:00:00',0),(129,53,'2023-08-19 06:00:00',0),(130,53,'2023-08-19 06:30:00',0),(131,55,'2023-08-25 03:00:00',0),(132,55,'2023-08-25 06:00:00',0),(133,56,'2023-08-19 15:00:00',0),(134,56,'2023-08-19 18:00:00',0),(135,57,'2023-08-21 15:00:00',0),(136,57,'2023-08-21 15:30:00',0),(137,57,'2023-08-23 16:00:00',0),(138,57,'2023-08-23 16:30:00',0),(139,58,'2023-08-31 03:00:00',0),(140,58,'2023-08-31 06:30:00',0),(141,60,'2023-08-19 16:00:00',0),(142,60,'2023-08-19 16:30:00',0),(143,61,'2023-08-21 18:00:00',0),(144,61,'2023-08-21 18:30:00',0),(145,61,'2023-08-22 18:00:00',0),(146,61,'2023-08-22 18:30:00',0),(147,61,'2023-08-24 18:00:00',0),(148,61,'2023-08-24 18:30:00',0),(149,62,'2023-08-19 09:00:00',0),(150,62,'2023-08-19 09:30:00',0),(151,64,'2023-08-19 03:00:00',0),(152,64,'2023-08-19 04:00:00',0),(153,65,'2023-08-19 03:00:00',0),(154,65,'2023-08-19 06:00:00',0),(155,65,'2023-08-19 06:30:00',0),(156,66,'2023-08-18 09:00:00',1),(157,66,'2023-08-21 21:00:00',0),(158,66,'2023-08-21 21:30:00',0),(159,67,'2023-08-19 03:00:00',0),(160,67,'2023-08-19 04:00:00',0),(161,68,'2023-08-18 09:30:00',1),(162,68,'2023-08-22 21:30:00',0),(163,68,'2023-08-22 22:00:00',0),(164,68,'2023-08-25 22:00:00',0),(165,69,'2023-08-19 06:00:00',0),(166,69,'2023-08-19 06:30:00',0),(167,70,'2023-08-18 10:00:00',1),(168,70,'2023-08-22 22:00:00',0),(169,70,'2023-08-22 22:30:00',0),(170,70,'2023-08-26 22:30:00',0),(171,71,'2023-08-19 06:00:00',0),(172,71,'2023-08-19 06:30:00',0),(173,72,'2023-08-25 03:00:00',0),(174,72,'2023-08-25 06:00:00',0),(175,73,'2023-08-24 03:00:00',0),(176,73,'2023-08-24 06:00:00',0),(177,74,'2023-08-18 10:30:00',0),(178,74,'2023-08-22 10:30:00',0),(179,74,'2023-08-22 11:00:00',0),(180,74,'2023-08-23 22:00:00',0),(181,75,'2023-08-18 11:00:00',0),(182,75,'2023-08-22 11:00:00',0),(183,75,'2023-08-23 11:00:00',0),(184,75,'2023-08-24 11:00:00',0),(185,76,'2023-08-30 06:00:00',0),(186,76,'2023-08-30 06:30:00',0),(187,76,'2023-08-31 06:00:00',0),(188,77,'2023-08-23 03:00:00',0),(189,77,'2023-08-23 07:00:00',0),(190,78,'2023-08-18 11:30:00',0),(191,78,'2023-08-22 00:00:00',0),(192,78,'2023-08-22 11:30:00',0),(193,78,'2023-08-23 00:00:00',0),(194,79,'2023-08-23 03:00:00',0),(195,79,'2023-08-23 08:00:00',0),(196,80,'2023-08-24 06:00:00',0),(197,80,'2023-08-24 06:30:00',0),(198,81,'2023-08-24 05:30:00',0),(199,81,'2023-08-24 17:30:00',0),(200,83,'2023-08-18 03:30:00',1),(202,85,'2023-08-18 03:30:00',1),(204,87,'2023-08-18 04:00:00',1),(205,88,'2023-08-18 04:00:00',1),(206,89,'2023-08-18 04:30:00',1),(207,90,'2023-08-18 04:30:00',1),(208,91,'2023-08-18 08:30:00',2),(209,92,'2023-08-18 08:30:00',2),(210,93,'2023-08-18 08:30:00',1),(211,94,'2023-08-18 08:30:00',1),(212,95,'2023-08-22 09:00:00',0),(213,95,'2023-08-22 09:30:00',0),(214,95,'2023-08-22 10:00:00',0),(216,97,'2023-08-18 09:00:00',1),(217,98,'2023-08-18 09:30:00',1),(218,99,'2023-08-18 10:00:00',2),(219,100,'2023-08-18 10:00:00',1);
/*!40000 ALTER TABLE `date` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grade`
--

DROP TABLE IF EXISTS `grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grade` (
  `no` int NOT NULL AUTO_INCREMENT,
  `item_no` int NOT NULL,
  `grader` varchar(20) NOT NULL,
  `grade_recipient` varchar(20) NOT NULL,
  PRIMARY KEY (`no`),
  KEY `item_no` (`item_no`),
  KEY `grader` (`grader`),
  KEY `grade_recipient` (`grade_recipient`),
  CONSTRAINT `grade_ibfk_1` FOREIGN KEY (`item_no`) REFERENCES `item` (`no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `grade_ibfk_2` FOREIGN KEY (`grader`) REFERENCES `user` (`id`),
  CONSTRAINT `grade_ibfk_3` FOREIGN KEY (`grade_recipient`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grade`
--

LOCK TABLES `grade` WRITE;
/*!40000 ALTER TABLE `grade` DISABLE KEYS */;
INSERT INTO `grade` VALUES (1,98,'boyeon1113','baeksi');
/*!40000 ALTER TABLE `grade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `no` int NOT NULL AUTO_INCREMENT,
  `item_no` int NOT NULL,
  `link` varchar(2048) NOT NULL,
  PRIMARY KEY (`no`),
  KEY `image_ibfk_1` (`item_no`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`item_no`) REFERENCES `item` (`no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1,13,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/6a2d22003d1e-11ee-bd8f-c75fc1a60d25.ipad-6780284_640.jpg'),(2,14,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/80846ea03d1e-11ee-af7c-4d296ca3ccef.nintendo-switch-3953601_1280.jpg'),(3,14,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/8084e3d03d1e-11ee-af7c-4d296ca3ccef.nintendo-switch-3061236_640.jpg'),(5,16,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/a7c542a03d1e-11ee-bd8f-c75fc1a60d25.장식인형.jpg'),(6,17,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/c50b76403d1e-11ee-af7c-4d296ca3ccef.세라믹식탁.jpg'),(7,18,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/cfe94ab03d1e-11ee-bd8f-c75fc1a60d25.나이키운동화.jpg'),(8,19,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/e594ee003d1e-11ee-af7c-4d296ca3ccef.레인부츠.jpg'),(9,20,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/03566c203d1f-11ee-bd8f-c75fc1a60d25.파리게이츠.jpg'),(10,20,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/035693303d1f-11ee-bd8f-c75fc1a60d25.파리게이츠2.jpg'),(11,21,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/1d3b73603d1f-11ee-b555-a39625e3493e.꽃나염오프블라우스.jpeg'),(12,22,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/2fdc20a03d1f-11ee-b555-a39625e3493e.경량패딩.jpeg'),(13,23,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/399683b03d1f-11ee-bd8f-c75fc1a60d25.조던2.jpg'),(14,24,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/4e7169803d1f-11ee-b555-a39625e3493e.식기세척.jpeg'),(15,25,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/697fd5903d1f-11ee-b555-a39625e3493e.해리포터.jpg'),(16,25,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/697ffca03d1f-11ee-b555-a39625e3493e.해리포터2.jpg'),(17,25,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/697ffca13d1f-11ee-b555-a39625e3493e.해리포터3.jpg'),(18,26,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/722323503d1f-11ee-bd8f-c75fc1a60d25.비스포크2.jpg'),(19,26,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/72234a603d1f-11ee-bd8f-c75fc1a60d25.비스포크.jpg'),(20,27,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/90d1c0903d1f-11ee-bd8f-c75fc1a60d25.모동숲.jpg'),(21,27,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/90d1e7a03d1f-11ee-bd8f-c75fc1a60d25.모동숲2.png'),(22,28,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/ab2c94103d1f-11ee-b555-a39625e3493e.시카.webp'),(23,29,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/13119ac03d21-11ee-b555-a39625e3493e.식물1.webp'),(24,30,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/3e73dde03d21-11ee-b555-a39625e3493e.신라면.webp'),(25,31,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/4d3d92803d21-11ee-a18d-ffd36964626a.캔버스화장품.PNG'),(26,32,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/867566403d21-11ee-b555-a39625e3493e.반려.webp'),(27,33,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/ac89c8303d21-11ee-a18d-ffd36964626a.산세베리아.PNG'),(28,33,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/ac89ef403d21-11ee-a18d-ffd36964626a.산세베리아1.PNG'),(29,34,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/bc7a70a03d21-11ee-b555-a39625e3493e.포말.webp'),(30,35,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/d6a840b03d21-11ee-a18d-ffd36964626a.솥반.PNG'),(31,36,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/1ce5aae03d22-11ee-a18d-ffd36964626a.애견기저귀.PNG'),(32,37,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/29e1a4603d22-11ee-a323-4b063ea3045f.김정기.webp'),(33,38,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/6e46cc203d22-11ee-a18d-ffd36964626a.바비.PNG'),(34,39,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/a9d205c03d22-11ee-a323-4b063ea3045f.ipad-6787486_640.jpg'),(35,40,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/bc589b503d22-11ee-a18d-ffd36964626a.아이패드에어3.jpg'),(36,41,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/c957a2103d22-11ee-a323-4b063ea3045f.쇼파세트.jpg'),(37,42,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/e2e980403d22-11ee-a18d-ffd36964626a.해바라기액자.jpg'),(38,43,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/f98417703d22-11ee-a323-4b063ea3045f.기저귀갈이대.jpg'),(39,45,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/2dfd78c03d23-11ee-8eb9-0fef2a950f1d.멜빵팬츠2.jpg'),(40,46,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/5419f1003d23-11ee-a18d-ffd36964626a.크롭야상.jpg'),(41,46,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/541a18103d23-11ee-a18d-ffd36964626a.크롭야상1.jpg'),(42,46,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/541a18113d23-11ee-a18d-ffd36964626a.크롭야상2.jpg'),(43,47,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/60d02ef03d23-11ee-8eb9-0fef2a950f1d.벨트.jpg'),(44,48,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/785610803d23-11ee-a18d-ffd36964626a.나이키런닝화.jpg'),(45,49,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/842438603d23-11ee-8eb9-0fef2a950f1d.인버터에어컨.jpg'),(46,50,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/a124d7803d23-11ee-8eb9-0fef2a950f1d.마리오카트3.jpg'),(47,50,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/a124d7813d23-11ee-8eb9-0fef2a950f1d.마리오카트2.webp'),(48,50,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/a124fe903d23-11ee-8eb9-0fef2a950f1d.마리오카트.jpg'),(49,51,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/a8aace603d23-11ee-a18d-ffd36964626a.드롱기.jpg'),(50,51,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/a8aaf5703d23-11ee-a18d-ffd36964626a.드롱기2.jpg'),(51,52,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/f0e233d03d23-11ee-a18d-ffd36964626a.플스53.jpg'),(52,52,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/f0e25ae03d23-11ee-a18d-ffd36964626a.플스52.jpg'),(53,52,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/f0e25ae13d23-11ee-a18d-ffd36964626a.플스5.jpg'),(54,53,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/03ebb5003d24-11ee-8eb9-0fef2a950f1d.숨.webp'),(55,54,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/1e3a7a903d24-11ee-a18d-ffd36964626a.올인원.PNG'),(56,55,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/2e3eab003d24-11ee-8eb9-0fef2a950f1d.에피.webp'),(57,56,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/4bf728703d24-11ee-8eb9-0fef2a950f1d.불닭.webp'),(58,57,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/52a55cf03d24-11ee-a18d-ffd36964626a.알보.PNG'),(59,58,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/86b96cc03d24-11ee-8eb9-0fef2a950f1d.반려동.webp'),(60,59,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/923221a03d24-11ee-a18d-ffd36964626a.김.PNG'),(61,60,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/b67b12603d24-11ee-8eb9-0fef2a950f1d.스즈메.webp'),(62,61,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/e49bb2303d24-11ee-a18d-ffd36964626a.강아지욕조.PNG'),(63,62,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/0d2c37b03d25-11ee-8eb9-0fef2a950f1d.지부리.webp'),(64,63,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/224b2b603d25-11ee-a18d-ffd36964626a.스카이랜드.PNG'),(65,64,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/a5dcf6703d25-11ee-8eb9-0fef2a950f1d.애플펜슬1.jpg'),(66,65,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/d3c8caa03d25-11ee-8eb9-0fef2a950f1d.리빙박스.jpg'),(67,66,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/e32549603d25-11ee-a18d-ffd36964626a.갤럭시Z플립.jpg'),(68,67,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/06d814a03d26-11ee-8eb9-0fef2a950f1d.뽀로로병원2.jpg'),(69,67,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/06d83bb03d26-11ee-8eb9-0fef2a950f1d.뽀로로병원.jpg'),(70,68,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/0c5e92003d26-11ee-a18d-ffd36964626a.침실램프.jpg'),(71,69,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/297be0e03d26-11ee-8eb9-0fef2a950f1d.루즈핏니트티2.jpg'),(72,70,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/2fce12b03d26-11ee-a18d-ffd36964626a.브이텍붕붕.jpg'),(73,70,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/2fce12b13d26-11ee-a18d-ffd36964626a.브이텍붕붕2.jpg'),(74,71,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/540ddbb03d26-11ee-8eb9-0fef2a950f1d.아디다스2.jpg'),(75,72,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/7513af603d26-11ee-8eb9-0fef2a950f1d.톰슨2.jpg'),(76,73,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/89a4baf03d26-11ee-8eb9-0fef2a950f1d.레이튼.jpg'),(77,73,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/89a4e2003d26-11ee-8eb9-0fef2a950f1d.레이튼2.jpg'),(78,74,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/8a6f36e03d26-11ee-a18d-ffd36964626a.에어맥스.jpg'),(79,74,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/8a6f36e13d26-11ee-a18d-ffd36964626a.에어맥스2.jpg'),(80,75,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/c4877f903d26-11ee-a18d-ffd36964626a.정수기.jpg'),(81,75,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/c4877f913d26-11ee-a18d-ffd36964626a.정수기2.jpg'),(82,76,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/d61efa303d26-11ee-8eb9-0fef2a950f1d.화장1.webp'),(83,77,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/f3f9ccb03d26-11ee-8eb9-0fef2a950f1d.식물23.webp'),(84,78,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/fe6c0e103d26-11ee-a18d-ffd36964626a.음반1.jpg'),(85,79,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/184814a03d27-11ee-8eb9-0fef2a950f1d.스팸.webp'),(86,80,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/3a5e46e03d27-11ee-8eb9-0fef2a950f1d.반려1.webp'),(87,81,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/7c0eaee03d27-11ee-8eb9-0fef2a950f1d.오펜.webp'),(88,82,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/bb5590f03d27-11ee-8eb9-0fef2a950f1d.자전거.webp'),(89,83,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/919f8c503d29-11ee-84b1-79300ffbf0f2.rn_image_picker_lib_temp_09a098f8-739f-4b8e-ab83-fca81ab4dbf1.jpg'),(91,85,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/387275103d2a-11ee-84b1-79300ffbf0f2.20230818_030719.jpg'),(92,85,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/38729c203d2a-11ee-84b1-79300ffbf0f2.20230818_030721.jpg'),(94,87,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/dd3346b03d2a-11ee-84b1-79300ffbf0f2.rn_image_picker_lib_temp_5a9afa55-42e8-4959-8f3d-8a101335992b.jpg'),(95,88,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/bfdfb3503d2f-11ee-af63-43b65fd5e9b9.rn_image_picker_lib_temp_e6c5dcd0-13a2-4150-984e-4d0d6fc81411.jpg'),(96,90,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/4af65c703d33-11ee-9447-6de9716eff55.rn_image_picker_lib_temp_73edc6f8-a88f-46a8-8c69-2a4fb869880b.jpg'),(97,91,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/75d6fb603d52-11ee-bda1-c3b6c92f76dd.모빌.jpg'),(98,92,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/59670e103d53-11ee-8d0f-a3505a241109.모빌1.jpg'),(99,93,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/17d116703d54-11ee-a597-0574f256c114.먼작귀.jpg'),(100,94,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/e19448503d55-11ee-a2a7-efc466bfaa9b.IMG_2088.jpg'),(101,94,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/e19496703d55-11ee-a2a7-efc466bfaa9b.IMG_2089.jpg'),(102,94,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/e194bd803d55-11ee-a2a7-efc466bfaa9b.IMG_2087.jpg'),(103,95,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/cde7daf03d56-11ee-b382-ebba9d9384f0.인형.jpg'),(107,97,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/ef1899c03d57-11ee-b008-2301de840922.IMG_2088.jpg'),(108,97,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/ef18e7e03d57-11ee-b008-2301de840922.IMG_2089.jpg'),(109,97,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/ef18e7e13d57-11ee-b008-2301de840922.IMG_2087.jpg'),(110,98,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/3541bbd03d5c-11ee-9ec0-7d01be504c83.IMG_2088.jpg'),(111,98,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/354231003d5c-11ee-9ec0-7d01be504c83.IMG_2089.jpg'),(112,98,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/354231013d5c-11ee-9ec0-7d01be504c83.IMG_2087.jpg'),(113,99,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/bfa987503d5f-11ee-8d40-1feaf7c59c98.인형.jpg');
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `no` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `content` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `price` int NOT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  `buyer` int DEFAULT NULL,
  `seller` int NOT NULL,
  `view` int DEFAULT '0',
  PRIMARY KEY (`no`),
  KEY `buyer_idx` (`buyer`),
  KEY `seller_idx` (`seller`),
  CONSTRAINT `buyer` FOREIGN KEY (`buyer`) REFERENCES `user` (`no`),
  CONSTRAINT `seller` FOREIGN KEY (`seller`) REFERENCES `user` (`no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'galbi','2023-07-24 16:29:00','2023-07-24 16:29:00','galbijjim taste',123410,0,4,16,0),(3,'제목 등록4','2023-07-24 21:31:19','2023-08-01 15:37:50','내용 등록4',10000,0,6,16,0),(8,'국밥팔아요','2023-08-01 04:33:10','2023-08-12 10:04:03','국밥을 싸게 팝니다',30000,0,NULL,16,3),(9,'master branch openvidu test','2023-08-18 01:38:11','2023-08-17 16:39:13','abc',123213,1,19,25,3),(10,'master branch chat test','2023-08-18 01:40:53','2023-08-17 16:41:50','abc',1111,1,19,25,2),(11,'master branch test3','2023-08-18 01:43:47','2023-08-17 16:46:21','asdasd',123123,0,NULL,25,7),(12,'master branch test5','2023-08-18 01:44:10','2023-08-17 16:46:29','asds',123213,0,NULL,25,7),(13,'아이패드 프로 11 4세대','2023-08-18 01:52:16','2023-08-17 17:54:01','아이패드 프로 실버 입니다.\r\n기스 흠짐 아예 없어요.\r\n풀인증 가능',1045000,0,NULL,23,2),(14,'닌텐도 스위치 배터리 개선판','2023-08-18 01:52:52','2023-08-17 16:52:51','닌텐도 스위치 배터리 개선판입니다.\r\n실사용 10번 미만 독은 거의 사용 안했어요!\r\n상태 S급이에요~~',230000,0,NULL,21,1),(16,'장식 인형','2023-08-18 01:53:59','2023-08-17 18:02:48','사용감 상태 사진 참조\r\n인테리어에 완전 찰떡입니다ㅎㅎ',15000,0,NULL,23,3),(17,'세라믹 6인 식탁테이블 의자 세트','2023-08-18 01:54:47','2023-08-17 19:25:01','상판이 무광이라 완전 고급스러워요~ 아스테이지를 덮고 사용해 상태 좋습니다. 의자는 사용감 조금 있네요ㅜ\r\n테이블 1개 + 의자 4개 구성이고 세트 가격입니당\r\n어느정도 가격 협상 가능해요!',380000,0,NULL,21,2),(18,'나이키 운동화','2023-08-18 01:55:07','2023-08-17 16:55:06','세탁 해둔 깨끗한 상품이에요~~애기들이 신기 넘넘 좋아요',4000,0,NULL,23,1),(19,'유아 레인부츠','2023-08-18 01:55:41','2023-08-17 16:55:44','지난 주 구매 후 두번정도 착용했는데 사이즈 미스로 판매합니다ㅜㅜ\r\n화상으로 부츠에 흠 없는지 자세히 보여드릴수 있어요!!',7000,0,NULL,21,2),(20,'파리게이츠 골프여성의류세트','2023-08-18 01:56:33','2023-08-17 16:56:33','사진이 잘 안나오는데 상태 좋아요! 화상으로 보시면 더 잘 보일거에요~ 세트는 아닌데 같은 네이비계열이라 세트처럼 입었네용',70000,0,NULL,23,1),(21,'크롭 후레아 꽃나염 오프숄더 블라우스','2023-08-18 01:57:15','2023-08-17 16:57:14','브랜드&도매&쇼핑몰 직접 납품하는 상품입니다!\r\n제품 수량이 많아 싸게싸게 드려요~',8000,0,NULL,21,1),(22,'남자 경량 패딩','2023-08-18 01:57:46','2023-08-17 16:57:45','사이즈 100',12000,0,NULL,21,1),(23,'조던 위드마크 티셔츠','2023-08-18 01:58:04','2023-08-17 16:58:04','스캇, 다크모카 등 모카계열과 잘 어울립니다\r\n에눌 문의 절대사절',70000,0,NULL,23,1),(24,'식기세척기 상판','2023-08-18 01:58:37','2023-08-17 16:58:37','삼성전자 식세기 상판입니다\r\n매립시공으로 사용하지 않은 새제품입니다~^^',10000,0,NULL,21,1),(25,'해리포터 전권세트','2023-08-18 01:59:22','2023-08-17 16:59:22','아이보라고 생일선물로 사준건데 아이가 한두번 다 읽고나더니 더이상 보질않아서 판매해용~',40000,0,NULL,21,1),(26,'삼성전자 비스포크 냉장고 패널','2023-08-18 01:59:39','2023-08-17 16:59:39','삼성전자 비스포크 냉장고 패널 상, 하 총 4개입니다.\r\n냉장고 구입과 동시에 바로 교체해서 박스에 넣어둔 상태라 새상품입니다~^^',80000,0,NULL,23,1),(27,'모여봐요 동물의 숲 칩','2023-08-18 02:00:31','2023-08-17 17:00:30','모동숲 한창 유행할때 사놓고 더이상 안해서 급하게 팔아봅니다',50000,0,NULL,23,1),(28,'시카 화장품 ,여성화장품 기초세트','2023-08-18 02:01:13','2023-08-17 17:01:12','2025년까지입니다\r\n병풀추출이 피부진정보습에좋습니다\r\n양도많아요\r\n4종이구요\r\n사진과같은상태입니다',55000,0,NULL,21,1),(29,'공기정화식물 산세베리아 슈퍼바 식집사 키우기 쉬운 식물 반그늘식물','2023-08-18 02:11:16','2023-08-17 17:14:24','공기정화 식물의 대표적인 식물로\r\n산세베리아ㅡ슈퍼바에요.\r\n\r\n옆으로 튼튼한 아이들 계속 자라고있어요.\r\n\r\n반그늘, 그늘에서도 키워도 되는데\r\n집에 해가 잘 들어 창가에 둬서 더 튼튼해요.\r\n햇빛 쨍쨍해도/ 그늘져도 /반그늘이어도 다 OK\r\n\r\n물은 손가락 넣어보고 마를때즘 흠뻑 줬어요.\r\n목마르면 잎이 흐늘흐늘 해져요.\r\n그땐 물 흠뻑주고 며칠 있으면 다시 쌩쌩해져요.\r\n통풍 잘 안되도 상관없더라구요.\r\n갈 고비를 몇번이나 넘겼지만 생명력 강해서 키우기 쉬워요 :)\r\n초보식집사도 환영인 식물이에요',2000,0,NULL,21,2),(30,'농심 신라면 5개입 5봉 봉지라면 식품 존맛탱 1팩 간편조리식품 맛있게 맵다','2023-08-18 02:12:29','2023-08-17 17:12:29','1봉에 600원으로 계산했습니다\r\n5봉 있어요\r\n\r\n최근 구매입니다\r\n2023년 12월까지',2998,0,NULL,21,1),(31,'캔버스 화장품 세트(새상품) 친환경화장품','2023-08-18 02:12:56','2023-08-17 17:12:56','캔버스 화장품 세트(새상품) 판매합니다\r\n클렌징ㅡ토너ㅡ아이크림ㅡ세럼ㅡ데이크림ㅡ나이트크림ㅡ\r\n선크림ㅡ미스트 세트에요.\r\n한세트당 30만원 넘게 주고 구입했으며\r\n친환경 화장품이라 순해 아이들이나 피부 민감하신분들도\r\n사용가능해요',30000,0,NULL,23,1),(32,'애완동물 매트 여름매트 쿨매트 애완매트 반려동물매트 방석','2023-08-18 02:14:30','2023-08-17 17:14:30','▶️무더운 찜통더위, 반려동물도 함께 더워요!\r\n\r\n▶️시원 바닥소재로 한여름 이겨낼 소중한 매트!\r\n\r\n▶️색상: 레드딸기,아보카드,흰색,노랑병아리(완료!)\r\n\r\n▶️사이즈:L (65*60)\r\n\r\n▶️일반택배:3천원',13000,0,NULL,21,1),(33,'산세베리아','2023-08-18 02:15:36','2023-08-17 17:15:36','공기정화식물 산세베리아\r\n\r\n초보식집사도 환영인 식물이에요',3000,0,NULL,23,1),(34,'포스트말론 콘서트 티켓 양도/라우브, 찰리푸스 콘서트 교환 가능','2023-08-18 02:16:01','2023-08-17 17:16:00','9.23일 포스트 말론 콘서트\r\nR석 C2구역 티켓 팔아요\r\n\r\n라우브, 찰리푸스 콘서트 티켓 날짜랑 좌석 상관없이 교환도 합니다',190000,0,NULL,21,1),(35,'햇반 3가지 햇반 솥반','2023-08-18 02:16:47','2023-08-17 17:16:47','햇반 3가지 햇반 솥반\r\n\r\nCJ 햇반 흑미밥 210g × 12개\r\nCJ 솥반 꿀약밥 210g × 3개\r\nCJ 햇반 이천쌀밥 210g × 6개',24000,0,NULL,23,1),(36,'애견 기저귀 위생커버 S. ','2023-08-18 02:18:45','2023-08-17 17:18:44','2022년 5월 10일구매\r\n2개샀는데 하나만있으면 될거같아서\r\n내놓습니다\r\n스몰(S)사이즈입니다',10000,0,NULL,23,1),(37,'(고 김정기 화백 일러스트) 미개봉 땅끝까지 이르러 보드게임+일러스트 초회판','2023-08-18 02:19:04','2023-08-17 17:19:04','펀딩응모하고 1년기다려서 받았던 작품입니다.\r\n\r\n하나는 소장하고 한 개는 판매하려고 합니다.\r\n\r\n보드게임과 일러스트 그림 + 액자 세트로 판매합니다.\r\n\r\n고 김정기 화백 유작으로도 소장가치가 충분합니다.',100000,0,NULL,21,1),(38,'바비 오리지널 티켓 + 스페셜 티켓 일괄 팝니다','2023-08-18 02:21:01','2023-08-17 17:21:01','바비 오리지널 티켓 1세트\r\n바비 스페셜 티켓 2종 1세트\r\n\r\n일괄 가격입니다',42000,0,NULL,23,1),(39,'아이패드 프로 12.9인치 2세대 ','2023-08-18 02:22:39','2023-08-17 17:22:38','아이패드 프로 실버 입니다.\r\n기스 흠짐 아예 없어요.\r\n풀인증 가능',1045000,0,NULL,22,1),(40,'아이패드 에어3','2023-08-18 02:23:12','2023-08-17 17:54:08','아이패드 에어3 64기가 와이파이 기능이상 없음\r\n변심으로 인한 환불 절대 사절',370000,0,NULL,25,2),(41,'인테리어 쇼파세트','2023-08-18 02:23:32','2023-08-17 17:54:19','구매해놓고 잘 사용하지 않아서 아깝지만 판매하려구요ㅠ\r\n1인용 2개\r\n2인용 1개\r\n풀세트로 판매합니다..',280000,0,NULL,22,3),(42,'해바라기 액자','2023-08-18 02:24:17','2023-08-17 17:24:17','아름다운 해바라기 그림의 액자입니다\r\n장식장이나 책상 옆에 두면 정말 보기 좋아요!',29000,0,NULL,25,1),(43,'이케아 기저귀갈이대','2023-08-18 02:24:53','2023-08-17 17:24:52','아이들이 커서 재판매하려구요. 상태 깨끗하고 좋아요!! 원하시면 추가로 쓰레기통도 드려용',20000,0,NULL,22,1),(44,'갭베이비 원피스 80','2023-08-18 02:25:28','2023-08-17 17:25:27','세탁 후 못 입히구 계속 옷장에 방치해두고있네요\r\n사용감 거의 없습니다',9000,0,NULL,25,1),(45,'일자 청바지 멜빵팬츠','2023-08-18 02:26:21','2023-08-17 17:26:20','몇번 안입은 새상품이에요! 잘 안입게되어서 얼른 팔아봐요!',20000,0,NULL,22,1),(46,'크롭 야상 점퍼','2023-08-18 02:27:27','2023-08-17 17:27:26','각 14000',14000,0,NULL,25,1),(47,'제주 말가죽벨트','2023-08-18 02:27:46','2023-08-17 17:54:14','제주여행 선물로 들어왔는데 잘 안쓰게 되네요.\r\n고급 말가죽 벨트고 저렴하게 가져가세요.',70000,0,NULL,22,2),(48,'나이키 런닝화 운동화 255','2023-08-18 02:28:27','2023-08-17 17:28:27','정말 발이 편한 런닝화에요',19000,0,NULL,25,1),(49,'삼성 인버터벽걸이 에어컨 판매합니다','2023-08-18 02:28:45','2023-08-17 17:28:45','16년도 제품입니다\r\n분리되어 있습니다',100000,0,NULL,22,1),(50,'슈퍼마리오 메이커 칩','2023-08-18 02:29:34','2023-08-17 17:29:34','생각보다 게임이 제 스타일이 아니어서 바로 팝니다',39998,0,NULL,22,1),(51,'드롱기 전기 주전자 새상품 팝니다','2023-08-18 02:29:49','2023-08-17 17:54:34','드롱기 디스틴타 펄라 전기주전자 새상품 팔아요ㅎㅎ 구경 겸 사진 촬영하기 위해 개봉만 한 상태에요!',90000,0,NULL,25,2),(52,'PS5 플스5','2023-08-18 02:31:50','2023-08-17 17:54:40','풀박스 이구요.\r\n제조연월 20.10\r\n정상작동 합니다\r\n듀얼센스 실리콘커버 및 스틱커버 씌어져 있습니다',490000,0,NULL,25,2),(53,'숨37 화장품 세트 선물용 기초화장품 스킨케어','2023-08-18 02:32:19','2023-08-17 17:32:19','- 2024.11.22일까지 입니다\r\n\r\n[ 숨37 로시크숨마 엘릭서 3종 스페셜 세트 ]\r\n\r\n주름개선 기능성 기초 스킨케어 세트 입니다\r\n\r\n유통기한 넉넉해서 보관했다가 사용 가능하고,\r\n박스포장 다 되어있어서 선물하기도 좋아요 ~',100000,0,NULL,22,1),(54,'록시땅 올인원 옴므 바디+헤어 미개봉','2023-08-18 02:33:06','2023-08-17 19:25:08','록시땅 미개봉 올인원 바디+헤어 샤워젤 입니다\r\n25000원입니다',21000,0,NULL,25,2),(55,'에피프레넘피나텀 바리에가타 희귀식물 찢잎식물 무늬식물','2023-08-18 02:33:30','2023-08-17 17:33:30','에피프레넘피나텀 바리에가타 희귀식물 찢잎식물 무늬식물\r\n\r\n모체가 무늬 천재라 무늬천재 예약이요~\r\n키우기 매우 쉬워요',6000,0,NULL,22,1),(56,'불닭볶음탕면 하바네로 불닭볶음면 야키소바 불닭볶음면','2023-08-18 02:34:20','2023-08-17 17:34:20','불닭볶음탕면 7개\r\n하바네로 불닭볶음면 7개\r\n야키소바 불닭볶음면 5개\r\n일괄 문고리판매',14000,0,NULL,22,1),(57,'알보 화분 식물 희귀식물','2023-08-18 02:34:34','2023-08-17 17:34:33','알보\r\n무늬좋고\r\n뿌리가 엄청 건강해서 키우기 쉬우실거에요',50000,0,NULL,25,1),(58,'강아지 드라이기 아베크 브러시 드라이기 반려동물 반려견','2023-08-18 02:35:59','2023-08-17 17:35:58','강아지 반려견 반려묘 반려동물 드라이기\r\n아베크 브러시 드라이기예요.\r\n브러시가 달려있는 드라이기라 목욕 후 털 빗으면서 말리기 좋은 제품이에요! 박스 없이 본체만 있어요~',15000,0,NULL,22,1),(59,'광천김]국내산 파래김/햇김/재래김/생김/명품김 100매(새 제품)','2023-08-18 02:36:20','2023-08-17 17:37:31','미개봉 새 제품.\r\n유통기한 : 24.3.22\r\n100% 국내산.\r\n소금, 기름을 사용하지 않아 고유의 식감과 풍미가 가득한 명품 생김.\r\n한 세트(100매) 가격.',8000,0,NULL,25,2),(60,'스즈메의 문단속 티켓,포스터,스티커 / 티켓 따로 사기 가능 현금 가능','2023-08-18 02:37:19','2023-08-17 17:37:19','다 합쳐서 일괄로 팔아요 연락주세요!',40000,0,NULL,22,1),(61,'강아지욕조 바썸펫 스마트 온도측정 접이식 강아지 욕조 목욕탕 스파 애견 반려견 고양이 애견욕조','2023-08-18 02:38:39','2023-08-17 17:38:38','크기를 대충 보고 샀더니 원룸인 저희집 화장실에서 쓰기에 너머 좁아서 팝니다.... 두번 사용했어요 ㅠ\r\n4키로 푸들이 쓰기에 널널? 조금 큰 느낌',19000,0,NULL,25,1),(62,'지브리 판스티커 팔아요','2023-08-18 02:39:45','2023-08-17 17:39:44','장당 500원입니다.\r\n퀄리티 좋고 귀여워요! 잘라서 쓰셔도되고 그냥 붙이셔도 이뻐용\r\n\r\n하울2디자인/센과치히로2디자인/포뇨/토토로/키키/아리에티',500,0,NULL,22,1),(63,'상동 스카이랜드 사우나 티켓.찜질방 VIP 티켓','2023-08-18 02:40:22','2023-08-17 17:40:22','유효기한 23년 11월 30일까지(바로 사용 가능합니다)\r\n\r\n한장 구매하시면 8000원입니다.\r\n2~9장 구매하시면 장당 7000원입니다.\r\n10장이상 구매하시면 장당 6800원입니다.\r\n\r\n티켓 사용시 찜질복 포함 찜질방 수영장 헬스 북카페등 무료 이용합니다. 주간 야간 주중 주말 모두 상관 없이 사용 가능합니다.',6800,0,NULL,25,1),(64,'애플펜슬 1세대','2023-08-18 02:44:01','2023-08-17 17:44:00','애플펜슬 쓰다가 이번에 2세대로 갈아타서 중고로 팔아용\r\n딱히 기스 없고 잘 됩니다!!',70000,0,NULL,24,1),(65,'리빙박스','2023-08-18 02:45:18','2023-08-17 17:45:17','쓰지않아서 판매합니다.',5000,0,NULL,24,1),(66,'갤럭시 Z플립 5G','2023-08-18 02:45:46','2023-08-17 17:58:38','갤럭시Z플립 5G(무잔상)모델 판매합니다..\r\n업무용으로 써서 사용감 진짜 없어요~\r\n하자내역은 화상으로 자세하게 보여드리겠습니다. 문의주세요!',180000,0,NULL,19,3),(67,'뽀로로 병원놀이차','2023-08-18 02:46:43','2023-08-17 17:46:43','뽀로로 병원놀이차 판매합니다. 소리 잘나고 구성품 전부 있어요~~',5000,0,NULL,24,1),(68,'침실 램프','2023-08-18 02:46:55','2023-08-17 17:58:48','램프 가만히 두고 얼마 안써서 상태 완전 양호합니다!\r\n자세한 사항은 화상으로 얼마든지 보여드립니다~~',17000,0,NULL,19,4),(69,'루즈핏 긴팔 박스 니트티','2023-08-18 02:47:42','2023-08-17 17:47:41','남자친구가 정말 잘 어울린다 해줬는데 얼마전에 헤어졌네요ㅋㅋㅋㅋㅋㅋㅜ\r\n쳐다보기도 싫어져서 바로 팔아요;;',9000,0,NULL,24,1),(70,'브이텍 붕붕카','2023-08-18 02:47:54','2023-08-17 17:58:55','전반적으로 깨끗한데 전원버튼키거나 옆에 모드를 바꾸면 >이 인식되어서 화면에서 >가 뜨고 노래가 나와요ㅜ\r\n 자세한건 화상으로 보여드릴게요~',10000,0,NULL,19,3),(71,'아디다스 운동화 단화','2023-08-18 02:48:53','2023-08-17 17:56:46','아주 편한 신발인데 사이즈가 270으로 나왔는데 저한텐 너무 크네요.',18000,0,NULL,24,3),(72,'톰슨 에어프라이어','2023-08-18 02:49:48','2023-08-17 17:49:48','구입한지 한 3년정도\r\n3.5L\r\n빠른정리위해 판매합니다.',8000,0,NULL,24,1),(73,'레이튼 교수와 이상한 마을 닌텐도 칩','2023-08-18 02:50:23','2023-08-17 17:50:23','닌텐도 추억의 게임입니다. 레이튼 게임 정말 재밌어요~',15000,0,NULL,24,1),(74,'에어맥스95 285','2023-08-18 02:50:26','2023-08-17 17:56:28','한번신고 신발장에 보관중입니다',85000,0,NULL,20,3),(75,'직수형 정수기','2023-08-18 02:52:04','2023-08-17 17:52:03','퓨리얼 직수형 정수기\r\n필터교환 완료\r\n나머지 필터 새거 두개 같이 드려요~',28000,0,NULL,20,1),(76,'라벨라 화장품 인체줄기세포배양액 화장품 관심 있으신분','2023-08-18 02:52:31','2023-08-17 17:52:31','속건조해결, 피부 재생능력 100%\r\n윤광피부\r\n고가원료인 인체줄기세포전문 브랜드 라벨라\r\n시연 또는 사용해보고싶은 분 계실까여?\r\n사용, 사업 관심 있으신분\r\n챗 주세요^^',20000,0,NULL,24,1),(77,'식물 화분 아레카 야자 특 A 대형 공기정화식물 1위','2023-08-18 02:53:21','2023-08-17 19:25:16','야자잎이 부드러워서 한쪽방향으로 눕히시면 자가용에 실려요~^^\r\n직접보시고 결정하셔도 되세요 \r\n화분받침대까지 셋트로 다 드리겠습니다\r\n원하신다면 화이트 자갈도 한봉지 가득 서비스로 드려요\r\n그럼 편하게 쳇 주세요 ~^^',45000,0,NULL,24,3),(78,'구하기 힘든 음반 DVD','2023-08-18 02:53:41','2023-08-17 17:53:40','국내에서 구하기 힘든 라이브 DVD입니다.\r\n2000년대 초반부터 꾸준히 모아온 귀한 음반입니다.\r\n가격은 이정도면 정말 저렴한편입니다.',15000,0,NULL,20,1),(79,'스팸 hw호, 스팸 라이트 300g 1개','2023-08-18 02:54:22','2023-08-17 17:54:22','스팸 hw호 총 12개 구성중 하나를 먹어 11개와 스팸 라이트 300g 1개 총 12개 입니다. 스팸 hw호의 기존 가격은 6,6000원 상당의 제품입니다. 유통기한은 모두 2025년으로 넉넉합니다.',30000,0,NULL,24,1),(80,'브랜드 말랑말랑 야생 동물 6종 대형 새것 유아동 친환경 동물 인테리어 피규어 소품 생활 반려동물','2023-08-18 02:55:19','2023-08-17 17:55:57','브랜드 말랑말랑 야생 동물 6종 새것 입니다.\r\n\r\n유아동 친환경 동물 인테리어 피규어 소품으로도 좋아요.\r\n\r\n소리는 나지 않아요.\r\n\r\n개당 4천원 / 일괄 1만6천원\r\n\r\n브랜드 제품으로 구입했었는데 검색하며 나옵니다.\r\n\r\n*싼 제품 절대 아닙니다.\r\n\r\n**눈이 보배, 구입하시는 분\r\n횡재한 것 입니다.\r\n\r\n중고 거래 특성상 상품에 하자가 없으면 교환ㆍ환불이 안됩니다. 이해해 주셔요~',16000,0,NULL,24,2),(81,'오펜하이머 오리지널 티켓 ','2023-08-18 02:57:10','2023-08-18 00:24:51','오펜하이머 오티 팔아요~',50000,1,25,24,6),(82,'거의 완전새것?? 18인치 삼천리 아동자전거 미니벨로자전거 접이식자전거 실내자전거 자전거유모차 사이클자전거','2023-08-18 02:58:56','2023-08-17 18:01:32','거의 완전새것?? 삼천리 어린이자전거\r\n정말 색깔도 예쁘고 정말 깨끗해요\r\n18인치 어린이자전거 흠없고 깔끔하고\r\n알루미늄 프레임으로 견고하고 가벼우며\r\n충격흡수용 안장을 장착하였어요\r\n아주 깨끗한 어린이자전거 판매\r\n얼마안타고 바로 집에서 계속 보관해온 자전거입니다\r\n원하시면 배송도 해드려요 3000원~5000원',44000,1,20,24,3),(83,'춘식이 인형','2023-08-18 03:12:05','2023-08-17 18:31:49','너무 귀엽고 깜찍한 춘식이 인형,,,,\r\n제가 진짜 애정하는데 사시는 분도 춘식이를 애정하는 분이셨음 좋겠어요ㅠㅅㅠ',15000,1,24,19,5),(85,'아이패드 m1 프로 4세대 팔아용','2023-08-18 03:16:45','2023-08-17 18:41:37','올해초에 생일선물로 받은건데 바쁘다보니 통 안써서요,,,\r\n급하게 팔아봅니다',800000,2,20,21,9),(87,'삼성 마우스','2023-08-18 03:21:21','2023-08-17 19:19:04','믿고쓰는 삼성 제품입니다\r\n사용감은 그닥 없어요~',15000,1,19,23,7),(88,'제주산 춘식이 인형','2023-08-18 03:56:20','2023-08-17 18:58:35','말랑말랑 감귤 춘식이 인형 너무 귀엽죠\r\n아껴주실분만 사가여~',15000,1,20,22,4),(89,'test','2023-08-18 04:13:23','2023-08-17 19:17:14','sets',12341,1,25,24,4),(90,'행운을 주는 춘식이','2023-08-18 04:21:43','2023-08-17 19:22:24','행운 가득한 춘식이 팔아요',15000,1,20,23,3),(91,'모빌 팔아요','2023-08-18 08:04:50','2023-08-17 23:08:36','애기들이 좋아해요~~~',13000,2,25,23,3),(92,'모빌','2023-08-18 08:11:11','2023-08-17 23:11:58','모빌팔아요',13000,1,25,23,3),(93,'인형 각 15000','2023-08-18 08:16:31','2023-08-17 23:19:27','인형 각 15000',15000,1,25,23,3),(94,'에어팟 3세대 팝니다!!','2023-08-18 08:29:18','2023-08-18 00:13:30','지인에게 에어팟 프로를 선물받아서 사용하고 있는 에어팟 3세대는 필요가 없어졌어요 저렴하게 판매합니다!!',130000,1,24,25,5),(95,'귀여운 인형 팔아요','2023-08-18 08:35:55','2023-08-18 00:38:56','귀여우니 빨리 데려가세요',10000,0,NULL,23,2),(97,'에어팟 3세대 팝니다!','2023-08-18 08:44:00','2023-08-18 00:13:13','에어팟 프로를 선물받아서 에어팟 3세대를 싸게 처분하고 있습니다!!',130000,1,24,25,3),(98,'에어팟 3세대 팝니다!!','2023-08-18 09:14:36','2023-08-18 00:21:44','에어팟 프로를 선물 받아서 가지고 있던 에어팟 3을 저렴하게 처분합니다!!',130000,2,22,25,3),(99,'[끌올]인형','2023-08-18 09:39:55','2023-08-18 00:41:21','귀여운 인형사세요',10000,1,25,24,4),(100,'그림그려드려요','2023-08-18 09:42:34','2023-08-18 00:43:18','그림그려드려요',3000,1,25,24,3);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_category`
--

DROP TABLE IF EXISTS `item_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_category` (
  `item_no` int NOT NULL,
  `category_no` int NOT NULL,
  PRIMARY KEY (`category_no`,`item_no`),
  KEY `items_category_ibfk_1` (`item_no`),
  KEY `items_category_ibfk_2` (`category_no`),
  CONSTRAINT `item_category_ibfk_1` FOREIGN KEY (`item_no`) REFERENCES `item` (`no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `item_category_ibfk_2` FOREIGN KEY (`category_no`) REFERENCES `category` (`no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_category`
--

LOCK TABLES `item_category` WRITE;
/*!40000 ALTER TABLE `item_category` DISABLE KEYS */;
INSERT INTO `item_category` VALUES (9,3),(10,11),(11,4),(12,3),(13,1),(14,1),(16,2),(17,2),(18,3),(19,3),(20,4),(21,4),(22,5),(23,5),(24,6),(25,7),(26,6),(27,7),(28,8),(29,9),(30,10),(31,8),(32,11),(33,9),(34,12),(35,10),(36,11),(37,13),(38,12),(39,1),(40,1),(41,2),(42,2),(43,3),(43,4),(44,3),(45,4),(46,4),(47,5),(48,5),(49,6),(50,7),(51,6),(52,7),(53,8),(54,8),(55,9),(56,10),(57,9),(58,11),(59,10),(60,12),(61,11),(62,13),(63,12),(64,1),(65,2),(66,1),(67,3),(68,2),(69,4),(70,3),(71,5),(72,6),(73,7),(74,5),(75,6),(76,8),(77,9),(78,7),(79,10),(80,11),(81,12),(82,13),(83,2),(85,1),(87,1),(88,2),(89,13),(90,13),(91,3),(92,3),(93,13),(94,1),(95,13),(97,1),(98,1),(99,13),(100,13);
/*!40000 ALTER TABLE `item_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `no` int NOT NULL AUTO_INCREMENT,
  `room_no` int NOT NULL,
  `sender` int NOT NULL,
  `content` varchar(2000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_read` tinyint DEFAULT '0',
  PRIMARY KEY (`no`),
  KEY `room_no` (`room_no`),
  KEY `sender` (`sender`),
  CONSTRAINT `room_no` FOREIGN KEY (`room_no`) REFERENCES `room` (`no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sender` FOREIGN KEY (`sender`) REFERENCES `user` (`no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (19,1,16,'아아','2023-08-04 06:32:24',1),(20,1,4,'귤','2023-08-04 06:32:34',1),(21,1,4,'오렌지','2023-08-04 06:32:48',1),(22,1,16,'오렌지','2023-08-04 06:32:51',1),(23,1,16,'왜안읽음?','2023-08-04 06:33:57',1),(24,1,16,'밥','2023-08-04 07:49:44',1),(25,1,16,'귤','2023-08-04 07:50:19',1),(26,1,16,'asdasdsa','2023-08-04 08:06:54',1),(27,1,4,'asdsaasasd','2023-08-04 08:06:58',1),(28,1,4,'asdasd','2023-08-04 08:07:05',1),(29,1,4,'asdsad','2023-08-04 08:07:09',1),(30,1,16,'asd','2023-08-04 08:13:33',1),(31,1,16,'asd','2023-08-04 08:13:34',1),(32,1,16,'하이','2023-08-06 23:00:59',1),(33,1,4,'아아','2023-08-06 23:28:04',1),(34,1,16,'됩니까?','2023-08-06 23:28:07',1),(35,1,4,'왜','2023-08-06 23:31:14',1),(36,1,4,'메세지가','2023-08-06 23:31:15',1),(37,1,4,'안줄어','2023-08-06 23:31:16',1),(38,1,4,'아아','2023-08-06 23:31:23',1),(39,1,16,'테스트','2023-08-06 23:55:29',1),(40,1,16,'아아','2023-08-06 23:57:37',1),(41,1,16,'오','2023-08-06 23:57:38',1),(42,1,16,'되네','2023-08-06 23:57:39',1),(43,1,16,'굿','2023-08-06 23:57:40',1),(44,1,16,'하이','2023-08-07 01:48:14',1),(45,1,16,'하이','2023-08-07 01:48:14',1),(46,1,16,'하이하이','2023-08-07 01:49:15',1),(47,1,4,'드림하이','2023-08-07 01:49:53',1),(48,1,4,'잘보내지나','2023-08-07 01:49:56',1),(49,1,16,'안읽음테스트','2023-08-07 01:53:13',1),(50,1,4,'읽음테스트','2023-08-07 01:53:31',1),(51,1,16,'읽음?','2023-08-07 01:54:49',1),(52,1,4,'읽엇겟냐고','2023-08-07 01:55:08',1),(53,2,19,'채팅','2023-08-18 01:41:08',1),(54,2,19,'할래요?','2023-08-18 01:41:09',1),(55,2,25,'제가채팅을좀','2023-08-18 01:41:29',1),(56,2,25,'잘합니다','2023-08-18 01:41:30',1),(57,2,25,'예약햇어요','2023-08-18 01:41:41',1),(58,4,20,'안녕하세요!','2023-08-18 02:59:51',1),(59,4,20,'혹시 구매가능한가요?','2023-08-18 02:59:54',1),(60,4,24,'안녕하세요~~ 구매 당연히 가능합니다!!','2023-08-18 03:00:03',1),(61,4,20,'혹시 4만원에 가능할까요?','2023-08-18 03:00:11',1),(62,4,24,'42000원까진 가능한데 그 이상은 힘들어요ㅠ','2023-08-18 03:00:23',1),(63,4,20,'그럼 42000원에 제가 구매할게요!!','2023-08-18 03:00:35',1),(64,4,24,'네네!!','2023-08-18 03:00:45',1),(65,4,20,'감사합니다~~~','2023-08-18 03:01:06',1),(66,4,24,'아녜요~좋은 분한테 잘 간것 같아서 맘이 놓여요^^','2023-08-18 03:03:16',0),(67,5,23,'혹시 지금 바로도 가능하세요?','2023-08-18 08:36:44',1),(68,5,23,'영상통화요!','2023-08-18 08:36:49',1),(69,5,25,'네. 지금 바로 가능합니다!','2023-08-18 08:36:53',1),(70,5,23,'네 신청할게요~~','2023-08-18 08:36:58',1),(71,6,24,'혹시 지금 바로도 가능하세요?','2023-08-18 08:38:44',1),(72,6,24,'영상통화요!','2023-08-18 08:38:47',1),(73,6,25,'네. 지금 바로 가능합니다!','2023-08-18 08:39:05',1),(74,6,24,'네 신청할게요~~','2023-08-18 08:39:07',1),(75,7,22,'혹시 영상통화없이','2023-08-18 09:22:14',1),(76,7,22,'거래가능할까요?','2023-08-18 09:22:17',1),(77,7,24,'네 가능합니다!','2023-08-18 09:22:39',1),(78,7,22,'지금 바로 거래하고 싶어요!','2023-08-18 09:22:45',1),(79,7,24,'아니오','2023-08-18 09:23:45',0),(80,8,25,'안녕하세요! 혹시 거래 가능할까요?','2023-08-18 09:23:59',1),(81,8,24,'화상으로요?','2023-08-18 09:24:07',1),(82,8,25,'화상 없이 거래 하고 싶어요~','2023-08-18 09:24:15',1),(83,8,24,'네 가능해요~~','2023-08-18 09:24:20',1),(84,8,25,'지금 바로 거래하고 싶어요','2023-08-18 09:24:32',1),(85,8,24,'네 계좌번호 ******* 입니다','2023-08-18 09:24:41',1),(86,8,25,'입금했어요!','2023-08-18 09:24:45',1),(87,8,24,'네 거래 처리할게요!','2023-08-18 09:24:49',1);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `no` int NOT NULL AUTO_INCREMENT,
  `reporter` varchar(20) NOT NULL,
  `reported` varchar(20) NOT NULL,
  `reason` text,
  `report_date` timestamp NULL DEFAULT NULL,
  `item_no` int NOT NULL,
  `room_no` int DEFAULT NULL,
  PRIMARY KEY (`no`),
  KEY `reporter` (`reporter`),
  KEY `reported` (`reported`),
  KEY `item_no` (`item_no`),
  KEY `report_ibfk_4_idx` (`room_no`),
  CONSTRAINT `report_ibfk_1` FOREIGN KEY (`reporter`) REFERENCES `user` (`id`),
  CONSTRAINT `report_ibfk_2` FOREIGN KEY (`reported`) REFERENCES `user` (`id`),
  CONSTRAINT `report_ibfk_3` FOREIGN KEY (`item_no`) REFERENCES `item` (`no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `report_ibfk_4` FOREIGN KEY (`room_no`) REFERENCES `room` (`no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `no` int NOT NULL AUTO_INCREMENT,
  `user_no` int NOT NULL,
  `conference_no` int NOT NULL,
  `is_seller` tinyint(1) NOT NULL,
  `is_attended` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`no`),
  KEY `reservation_ibfk_1` (`user_no`),
  KEY `reservation_ibfk_2` (`conference_no`),
  CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`user_no`) REFERENCES `user` (`no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`conference_no`) REFERENCES `conference` (`no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (1,4,1,0,0),(2,16,1,1,0),(3,19,3,0,0),(4,25,3,1,0),(5,19,4,0,0),(6,25,4,1,0),(7,19,5,0,0),(8,25,5,1,0),(9,20,6,0,0),(10,19,6,1,0),(11,20,7,0,0),(12,19,7,1,0),(13,20,8,0,0),(14,19,8,1,0),(15,24,9,0,0),(16,19,9,1,0),(17,19,10,0,0),(18,23,10,1,0),(19,20,11,0,0),(20,21,11,1,0),(21,20,12,0,0),(22,22,12,1,0),(23,25,13,0,0),(24,24,13,1,0),(25,20,14,0,0),(26,23,14,1,0),(27,25,15,0,0),(28,23,15,1,0),(29,25,16,0,0),(30,23,16,1,0),(31,25,17,0,0),(32,23,17,1,0),(33,24,18,0,0),(34,25,18,1,0),(35,24,19,0,0),(36,25,19,1,0),(37,22,20,0,0),(38,25,20,1,0),(39,25,21,0,0),(40,24,21,1,0),(41,25,22,0,0),(42,24,22,1,0);
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `no` int NOT NULL AUTO_INCREMENT,
  `item_no` int DEFAULT NULL,
  PRIMARY KEY (`no`),
  KEY `room_ibfk_2` (`item_no`),
  CONSTRAINT `room_ibfk_2` FOREIGN KEY (`item_no`) REFERENCES `item` (`no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,8),(2,10),(3,12),(7,81),(8,81),(4,82),(5,94),(6,94);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_user`
--

DROP TABLE IF EXISTS `room_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_user` (
  `room_no` int NOT NULL,
  `user_no` int NOT NULL,
  `no` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`no`),
  KEY `room_user_ibfk_1` (`room_no`),
  KEY `room_user_ibfk_2` (`user_no`),
  CONSTRAINT `room_user_ibfk_1` FOREIGN KEY (`room_no`) REFERENCES `room` (`no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `room_user_ibfk_2` FOREIGN KEY (`user_no`) REFERENCES `user` (`no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_user`
--

LOCK TABLES `room_user` WRITE;
/*!40000 ALTER TABLE `room_user` DISABLE KEYS */;
INSERT INTO `room_user` VALUES (1,16,1),(1,4,2),(2,19,3),(2,25,4),(3,19,5),(3,25,6),(4,20,7),(4,24,8),(5,23,9),(5,25,10),(6,24,11),(6,25,12),(7,22,13),(7,24,14),(8,25,15),(8,24,16);
/*!40000 ALTER TABLE `room_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `no` int NOT NULL AUTO_INCREMENT,
  `id` varchar(20) DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `nickname` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `phone` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `report_count` int DEFAULT '0',
  `grade` float DEFAULT '3',
  `authority` tinyint DEFAULT '0',
  `is_locked` tinyint DEFAULT '0',
  `is_deleted` tinyint DEFAULT '0',
  `deal_count` int DEFAULT '0',
  PRIMARY KEY (`no`),
  UNIQUE KEY `id` (`id`),
  KEY `is_deleted` (`is_deleted`),
  KEY `is_locked` (`is_locked`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (19,'consultant209','$2a$10$gD19uipetmcKjSTeALn0leCNUA0xEvRu62o76kkr6O4QZtIc.WEae','컨설턴트','컨설턴트','010-1234-1234',NULL,'consultant@gmail.com',0,3,0,0,0,0),(20,'coach209','$2a$10$gD19uipetmcKjSTeALn0leCNUA0xEvRu62o76kkr6O4QZtIc.WEae','코치','코치','010-1234-1234',NULL,'coach@gmail.com',0,3,0,0,0,0),(21,'choeunby','$2a$10$gD19uipetmcKjSTeALn0leCNUA0xEvRu62o76kkr6O4QZtIc.WEae','실버레인','조은비','010-1234-1234',NULL,'silverrain@gmail.com',0,3,0,0,0,0),(22,'boyeon1113','$2a$10$gD19uipetmcKjSTeALn0leCNUA0xEvRu62o76kkr6O4QZtIc.WEae','루비누나','김보연','010-1122-3344',NULL,'kkbbyy1113@gmail.com',0,3,0,0,0,2),(23,'dkgusdkfk','$2a$10$gD19uipetmcKjSTeALn0leCNUA0xEvRu62o76kkr6O4QZtIc.WEae','반안안아','백아현','010-3366-0306',NULL,'dkgusdlek@gmail.com',0,3,0,0,0,0),(24,'kkh0818','$2a$10$gD19uipetmcKjSTeALn0leCNUA0xEvRu62o76kkr6O4QZtIc.WEae','소심한애호박','김경희','010-3366-0306',NULL,'kkh0818@gmail.com',0,3,0,0,0,0),(25,'baeksi','$2a$10$gD19uipetmcKjSTeALn0leCNUA0xEvRu62o76kkr6O4QZtIc.WEae','사과','백승일','010-1111-2222',NULL,'ssibbb@gmail.com',0,3.985,0,0,0,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_item_like`
--

DROP TABLE IF EXISTS `user_item_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_item_like` (
  `user_no` int NOT NULL,
  `item_no` int NOT NULL,
  PRIMARY KEY (`user_no`,`item_no`),
  KEY `user_item_like_ibfk_1` (`user_no`),
  KEY `user_item_like_ibfk_2` (`item_no`),
  CONSTRAINT `user_item_like_ibfk_1` FOREIGN KEY (`user_no`) REFERENCES `user` (`no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_item_like_ibfk_2` FOREIGN KEY (`item_no`) REFERENCES `item` (`no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_item_like`
--

LOCK TABLES `user_item_like` WRITE;
/*!40000 ALTER TABLE `user_item_like` DISABLE KEYS */;
INSERT INTO `user_item_like` VALUES (19,17),(19,54),(19,77),(20,13),(20,16),(20,40),(20,47),(20,51),(20,52),(23,94);
/*!40000 ALTER TABLE `user_item_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video` (
  `no` int NOT NULL AUTO_INCREMENT,
  `item_no` int NOT NULL,
  `link` varchar(2048) NOT NULL,
  `start_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `delete_time` timestamp NULL DEFAULT ((now() + interval 7 day)),
  PRIMARY KEY (`no`),
  KEY `item_no` (`item_no`),
  CONSTRAINT `item_no` FOREIGN KEY (`item_no`) REFERENCES `item` (`no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` VALUES (7,98,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/video/98.mp4','2023-08-18 09:20:30','2023-08-18 09:20:50','2023-09-02 09:00:00'),(8,100,'https://zucchinifile.s3.ap-northeast-2.amazonaws.com/video/100.mp4','2023-08-18 09:43:02','2023-08-18 09:43:18','2023-08-26 09:00:00');
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  9:44:16
