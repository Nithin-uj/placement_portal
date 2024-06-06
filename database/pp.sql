-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: placement_portal
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Admin`
--

DROP TABLE IF EXISTS `Admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Admin` (
  `name` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `type` varchar(20) NOT NULL,
  `phno` bigint NOT NULL,
  `password` varchar(128) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admin`
--

LOCK TABLES `Admin` WRITE;
/*!40000 ALTER TABLE `Admin` DISABLE KEYS */;
INSERT INTO `Admin` VALUES ('H D sir','hdsir@gmail.com','tpo',2323232399,'$2a$10$9XrKsdZSNWkgZ35tKY3ydOGA0lw5AzIirQx79dGHWSBzwaFhUue.q'),('Shamanth Kumar H V','shamanth@gmail.com','admin',2323232399,'$2a$10$UQS5q489tUDgx5Q7wQ.CUOC6.nbEv/Gin.9HH8p5pqzekVUVrOwMm'),('Nithin U J','ujnithin20@gmail.com','admin',8884850299,'$2a$10$gZ6/WxePZZG.vy588DX2x.hkqyXULwoR6Nxjv5Dy3zfu1.K8.VMXa'),('Vedanth M','vedanth@gmail.com','pc',1234567890,'$2a$10$rCc1qGnD5dfzw1/7k8w2S.st3NlHp6ESaT/LJ7mWgtosr27hwLm82');
/*!40000 ALTER TABLE `Admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student`
--

DROP TABLE IF EXISTS `Student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Student` (
  `usn` varchar(10) NOT NULL,
  `email` varchar(254) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `gender` varchar(1) NOT NULL,
  `pphno` bigint NOT NULL,
  `sphno` bigint DEFAULT NULL,
  `presentaddr` varchar(512) NOT NULL,
  `permanentaddr` varchar(512) NOT NULL,
  `bepassingyear` year NOT NULL,
  `ccgpa` float NOT NULL,
  `branch` varchar(5) NOT NULL,
  `syear` year NOT NULL,
  `ssem` int NOT NULL,
  `section` varchar(1) NOT NULL,
  `etype` varchar(8) NOT NULL,
  `twelfthpyear` year DEFAULT NULL,
  `twelfthper` float DEFAULT NULL,
  `diplomapyear` year DEFAULT NULL,
  `diplomaper` float DEFAULT NULL,
  `tenthpyear` year NOT NULL,
  `tenthper` float NOT NULL,
  `backlog` tinyint(1) NOT NULL,
  `cpassword` varchar(128) NOT NULL,
  `resume` varchar(254) DEFAULT NULL,
  PRIMARY KEY (`usn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student`
--

LOCK TABLES `Student` WRITE;
/*!40000 ALTER TABLE `Student` DISABLE KEYS */;
INSERT INTO `Student` VALUES ('4NI21CS068','2021cs_dummycs_b@nie.ac.in','APK','2003-02-20','M',1234567899,NULL,'dummy add1','dummy add2\n',2025,8.85,'CSE',2002,3,'B','regular',2021,99,0000,-1,2019,74.88,0,'$2a$10$13RnIK5fWpX.IbckHsR1luhpfn6O.RmwQJIeFErz3Q8Zs2Nv3IUB2',NULL),('4NI21CS090','csemail@gmail.com','aishwarya','2002-02-11','F',1234456789,1212121212,'add2','add22',2025,10,'ECE',2002,3,'B','regular',2018,100,0000,-1,2019,99,1,'$2a$10$hDmWgBUPqIJRDntXpxeyOe0TEidlqidJ59AI2NGtfvQrorOYY6r0y',NULL),('4NI21EC020','ujerg@we.nom','nanda','2003-11-11','M',2323232323,NULL,'addr3','addr33',2024,8.56,'ECE',2003,6,'B','regular',2021,89,0000,-1,2019,89,0,'$2a$10$/KnqzMeuATkufG3OIoV4o.4.EINtwmAdpRK3cNmE0uNKjkcR1f64m',NULL),('4NI21IS068','2021is_nithinuj_b@nie.ac.in','Nithin U J','2004-03-20','M',8884850248,8884770118,'Bogadhi, Mysuru, Karnataka 560001','G B Palya Bengaluru, Karnataka 560068',2025,8.13,'ISE',2003,6,'B','regular',2021,80,0000,-1,2019,74.88,0,'$2a$10$DqTNnK1zyetVNRM/f8bM.e/uJ3D1m9Ijl9njAM3n01Kuy387IaJEW',NULL),('4NI21IS069','2021is_nithishkumarj_b@nie.ac.in','Nithish Kumar J','2004-03-20','M',1234567899,NULL,'#121 main road mysuru','ballery',2025,8.77,'ISE',2003,6,'B','regular',2021,99,0000,-1,2019,88,0,'$2a$10$dzifULWB5cTohPXq8vBuQON0NcrSHT4dTVacYAwNEA.O3joRODGuC',NULL);
/*!40000 ALTER TABLE `Student` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-06  8:09:02
