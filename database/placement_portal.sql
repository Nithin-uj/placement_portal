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
INSERT INTO `Admin` VALUES ('H D sir','hdsir@gmail.com','tpo',2323232399,'$2a$10$9XrKsdZSNWkgZ35tKY3ydOGA0lw5AzIirQx79dGHWSBzwaFhUue.q'),('Shamanth Kumar H V','shamanth@gmail.com','admin',2323232399,'$2a$10$UQS5q489tUDgx5Q7wQ.CUOC6.nbEv/Gin.9HH8p5pqzekVUVrOwMm'),('Nithin U J','ujnithin20@gmail.com','admin',8884850299,'$2a$10$UubmKgKGkYiIBLNAk2WQ4uQ3rkOPCxy6iWTfywhMGAfiZw21bQrOW'),('Vedanth M','vedanth@gmail.com','pc',1234567890,'$2a$10$rCc1qGnD5dfzw1/7k8w2S.st3NlHp6ESaT/LJ7mWgtosr27hwLm82');
/*!40000 ALTER TABLE `Admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Applied`
--

DROP TABLE IF EXISTS `Applied`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Applied` (
  `aid` int NOT NULL AUTO_INCREMENT,
  `usn` varchar(10) NOT NULL,
  `jid` int NOT NULL,
  `appliedat` datetime DEFAULT NULL,
  PRIMARY KEY (`aid`),
  KEY `usn` (`usn`),
  KEY `jid` (`jid`),
  CONSTRAINT `Applied_ibfk_1` FOREIGN KEY (`usn`) REFERENCES `Student` (`usn`),
  CONSTRAINT `Applied_ibfk_2` FOREIGN KEY (`jid`) REFERENCES `Job` (`jid`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Applied`
--

LOCK TABLES `Applied` WRITE;
/*!40000 ALTER TABLE `Applied` DISABLE KEYS */;
INSERT INTO `Applied` VALUES (25,'4NI21IS068',1031,'2024-07-02 19:31:08'),(28,'4NI21IS069',1031,'2024-07-02 22:44:31'),(29,'4NI21CS090',1027,'2024-07-04 20:24:15'),(30,'4NI21CV063',1027,'2024-07-04 20:24:15'),(31,'4NI21EC020',1027,'2024-07-04 20:24:15'),(32,'4NI21IS068',1027,'2024-07-04 20:24:15'),(33,'4NI21IS069',1027,'2024-07-04 20:24:15'),(34,'4NI21IS070',1027,'2024-07-04 20:24:15'),(35,'4NI21IS093',1027,'2024-07-04 20:24:15'),(36,'4NI21IS068',1028,'2024-07-05 17:49:34'),(37,'4NI21IS068',1041,'2024-07-05 17:50:12');
/*!40000 ALTER TABLE `Applied` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Branch`
--

DROP TABLE IF EXISTS `Branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Branch` (
  `bid` int NOT NULL AUTO_INCREMENT,
  `jid` int DEFAULT NULL,
  `AIML` tinyint(1) DEFAULT NULL,
  `CSE` tinyint(1) DEFAULT NULL,
  `ISE` tinyint(1) DEFAULT NULL,
  `ECE` tinyint(1) DEFAULT NULL,
  `EEE` tinyint(1) DEFAULT NULL,
  `ME` tinyint(1) DEFAULT NULL,
  `CV` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`bid`),
  UNIQUE KEY `jid` (`jid`),
  CONSTRAINT `Branch_ibfk_1` FOREIGN KEY (`jid`) REFERENCES `Job` (`jid`),
  CONSTRAINT `fk_jid` FOREIGN KEY (`jid`) REFERENCES `Job` (`jid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Branch`
--

LOCK TABLES `Branch` WRITE;
/*!40000 ALTER TABLE `Branch` DISABLE KEYS */;
INSERT INTO `Branch` VALUES (4,1027,1,1,1,0,0,0,0),(5,1028,1,1,1,1,1,0,1),(6,1029,1,1,1,1,1,0,0),(7,1030,1,1,1,1,1,1,1),(8,1031,1,1,1,1,1,1,1),(9,1041,1,1,1,1,1,1,1),(10,1042,1,1,1,1,1,1,1);
/*!40000 ALTER TABLE `Branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Controls`
--

DROP TABLE IF EXISTS `Controls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Controls` (
  `type` varchar(100) DEFAULT NULL,
  `value` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Controls`
--

LOCK TABLES `Controls` WRITE;
/*!40000 ALTER TABLE `Controls` DISABLE KEYS */;
INSERT INTO `Controls` VALUES ('studentprofileedit',1);
/*!40000 ALTER TABLE `Controls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Job`
--

DROP TABLE IF EXISTS `Job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Job` (
  `jid` int NOT NULL AUTO_INCREMENT,
  `cname` varchar(120) NOT NULL,
  `email` varchar(254) NOT NULL,
  `type` varchar(10) NOT NULL,
  `role` varchar(100) DEFAULT NULL,
  `jd` varchar(2000) DEFAULT NULL,
  `location` varchar(500) DEFAULT NULL,
  `fulltimectc` float DEFAULT NULL,
  `backlogs` tinyint(1) DEFAULT NULL,
  `becutoff` float DEFAULT NULL,
  `twelfthcutoff` float DEFAULT NULL,
  `diplomacutoff` float DEFAULT NULL,
  `tenthcutoff` float DEFAULT NULL,
  `internship` tinyint(1) DEFAULT NULL,
  `stipendpm` float DEFAULT NULL,
  `durationinm` int DEFAULT NULL,
  `password` varchar(128) NOT NULL,
  `info` varchar(1000) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `arrivaldate` datetime DEFAULT NULL,
  `lastdate` datetime DEFAULT NULL,
  PRIMARY KEY (`jid`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1043 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Job`
--

LOCK TABLES `Job` WRITE;
/*!40000 ALTER TABLE `Job` DISABLE KEYS */;
INSERT INTO `Job` VALUES (1027,'Optimum sync','optimumsync@gmail.com','mass','Software architect','fresher software engineer trainee','Bengaluru, Mysuru',8.25,1,70,40,40,40,1,15000,6,'$2a$10$tOga/u8poHTtNIzNrB9gxOAOVdP9PeeFt/DR8lqlw1JQ5BHaPCzrq','Optimum sync is a start up company','active','2024-06-15 00:00:00','2024-07-03 23:59:00'),(1028,'TCS','tcs@gmail.com','mass','Support Engineer','looking for internship','Bengaluru',8.8,0,70,40,40,40,1,10000,6,'$2a$10$qHeWzKxg8v.2xzPes3cmFOrduJQUT4zv/4ICRwJfmFTp7YUma56jq','additional info','active','2024-06-25 23:59:00','2024-07-11 23:59:00'),(1029,'Lowe\'s','lowes@gmail.com','opendream','Marketing analyst','marketing analyst','Bengaluru, Hydrabad',19,0,90,40,40,40,0,0,0,'$2a$10$1r/MGNOBwS40W13weQxbMOFE8XI1T2iWOtTu5m2RudsdcOzytwcxy','additional info from lowe\'s','active','2024-06-29 09:44:00','2024-07-03 10:00:00'),(1030,'comming company','optimumsync@gmail.camdd','mass','qwer','qwqw','asas',8.22,1,40,40,40,40,0,0,0,'$2a$10$NFwWJEiR28Y1r.JhKjk8wuxoZ6b0cNnAHhzwiirtPiJ9GlcM5T9Cq','','active','2024-06-29 16:03:00','2024-06-29 17:15:00'),(1031,'Company1','optimumsync@gmail.cam','opendream','qwer','1212','12121212',33,1,40,40,40,40,0,0,0,'$2a$10$4MSCw94JYX7uCYrvqakJ.u3P1Bz4vdBr9kI5mRYKJ/sAw2TozYpwq','1234','active','2024-06-28 14:37:00','2024-07-03 12:15:00'),(1041,'Company2','optimumsync@gmail.camf','dream','qwer','qwer','asdf',8.22,1,40,40,40,40,0,0,0,'$2a$10$JAoJFaF0SxHkMkpomch3V.fXflnP/IQjVN4uV/LvZF7k4ffLtJNJO','asdf','active','2024-07-05 14:37:00','2024-07-10 14:37:00'),(1042,'New company3','ujnithin20@gmail.comd','core','qwer','saas','Mysuru',9.52,1,40,40,40,40,1,15000,9,'$2a$10$DRNoKutFUkaM6ND1cP4r.OlDj9i4MCD9txkKVrlv7nQVuG5XYJBSe','','active','2024-07-06 19:28:00','2024-07-10 20:28:00');
/*!40000 ALTER TABLE `Job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Placed`
--

DROP TABLE IF EXISTS `Placed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Placed` (
  `pid` int NOT NULL AUTO_INCREMENT,
  `usn` varchar(20) DEFAULT NULL,
  `jid` int DEFAULT NULL,
  `placedon` datetime DEFAULT NULL,
  `feedback` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`pid`),
  UNIQUE KEY `usn` (`usn`),
  KEY `jid` (`jid`),
  CONSTRAINT `Placed_ibfk_1` FOREIGN KEY (`usn`) REFERENCES `Student` (`usn`),
  CONSTRAINT `Placed_ibfk_2` FOREIGN KEY (`jid`) REFERENCES `Job` (`jid`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Placed`
--

LOCK TABLES `Placed` WRITE;
/*!40000 ALTER TABLE `Placed` DISABLE KEYS */;
INSERT INTO `Placed` VALUES (71,'4NI21IS068',1027,'2024-07-05 01:08:55','Had a great experience'),(74,'4NI21IS069',1031,'2024-07-05 17:18:00',NULL);
/*!40000 ALTER TABLE `Placed` ENABLE KEYS */;
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
  `syear` int NOT NULL,
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
INSERT INTO `Student` VALUES ('4NI21CS090','csemail@gmail.com','aishwarya','2002-02-11','F',1234456789,7878787878,'add2','add22',2025,10,'ECE',3,3,'B','regular',2018,100,0000,-1,2019,99,1,'$2a$10$hDmWgBUPqIJRDntXpxeyOe0TEidlqidJ59AI2NGtfvQrorOYY6r0y',NULL),('4NI21CV063','2021cv_nidhilokesh_b@nie.ac.in','Nidhi Lokesh','2003-02-27','F',8088803552,6360924347,'NIE','NITHINS HEART',2025,8.3,'CV',3,6,'B','regular',2021,93,0000,-1,2019,91,0,'$2a$10$DRRGxNzWqVlrs91HL0r5DOMeD7D24rtWjelQkCTvDjR48M9S3.62S',NULL),('4NI21EC020','ujerg@we.nom','nanda','2003-11-11','M',2323232323,NULL,'addr3','addr33',2024,8.56,'ECE',3,6,'B','regular',2021,89,0000,-1,2019,89,0,'$2a$10$/KnqzMeuATkufG3OIoV4o.4.EINtwmAdpRK3cNmE0uNKjkcR1f64m',''),('4NI21IS068','2021is_nithinuj_b@nie.ac.in','Nithin U J','2004-03-20','M',8884850248,8884770118,'Bogadhi, Mysuru, Karnataka 560001','G B Palya Bengaluru, Karnataka 560068',2025,8.13,'ISE',3,6,'B','regular',2021,80,0000,-1,2019,74.88,0,'$2a$10$LZMlfjqehGoWCHmkx.2i2eVi8EwepFZX.KYxrY1Brusg7O39ONrIO','https://drive.google.com/file/d/1a_lBuwCyrx4bf9OlQpdPS_L2ODQ891Ec/view?usp=sharing'),('4NI21IS069','2021is_nithishkumarj_b@nie.ac.in','Nithish Kumar J','2004-03-20','M',1234567899,NULL,'#121 main road mysuru','ballery',2025,8.77,'ISE',3,6,'B','regular',2021,90,0000,-1,2019,40,0,'$2a$10$djHp1zUIKokC2MFrN9BxQOCpM1Z5iWVPfAaz4HB254WNLTCbcisU2',''),('4NI21IS070','ujnithin20@gmail.com','APKii','2004-03-20','M',1234568595,8884770118,'qwqw','asas',2024,9.32,'AIML',1,2,'B','regular',2021,94,0000,-1,2019,83,0,'$2a$10$wuPW8gtjxj7AjuJiscEVh.p3r3x0Bmua1m6HezyxBX7Kfv58Qat8m',NULL),('4NI21IS093','shamanth@gmail.com','Shamanth','2003-03-20','M',7411979152,8243586553,'Mysore','Mysore',2025,8.24,'ISE',3,6,'B','regular',2021,99,0000,-1,2019,96,0,'$2a$10$JavMxkRzB1183BpwasXy4OLDl6G5VbNcJRVt2/x07KfTDP1yc.H5a',NULL);
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

-- Dump completed on 2024-07-05 18:02:05
