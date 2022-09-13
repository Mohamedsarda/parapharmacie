-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 11, 2022 at 04:32 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `parapharmacie`
--

DELIMITER $$
--
-- Procedures
--
CREATE  PROCEDURE `addCategorie` (IN `categorieName_proc` VARCHAR(50))   BEGIN
	
    SET @categorieCount = (SELECT COUNT(*) FROM products_categories WHERE categorieName = categorieName_proc);
    
    IF @categorieCount > 0 THEN 
    	
        BEGIN 
        	SELECT 0 AS 'Response';
        END ;
        
    ELSEIF  @categorieCount = 0 THEN
    	BEGIN
        	INSERT INTO products_categories(categorieName) VALUES(categorieName_proc);
            SELECT 1 AS 'Response' , (SELECT LAST_INSERT_ID()) AS 'insertedId';
        END ;
    
    END IF ;
    
END$$

CREATE  PROCEDURE `addClient` (IN `clientName_proc` VARCHAR(50), IN `clientLastName_proc` VARCHAR(50), IN `clientEmail_proc` VARCHAR(60), IN `clientPhone_proc` VARCHAR(12), IN `clientAdress_proc` VARCHAR(100), IN `clientPassword_proc` TEXT, IN `clientCity_proc` VARCHAR(50))   BEGIN 
	SET @emailCount = (SELECT COUNT(*) FROM clients WHERE clientEmail = clientEmail_proc);
    SET @phoneCount = (SELECT COUNT(*) FROM clients WHERE clientPhone = clientPhone_proc);
    
    IF @emailCount > 0 THEN
    BEGIN 
    	SELECT 'Email exists' AS 'Result';
    END;
    ELSEIF @phoneCount > 0 THEN
    BEGIN
    	SELECT 'Phone exists' AS 'Result';
    END;
    ELSE 
    BEGIN
    	INSERT INTO clients (
        	clientName,
            clientLastName,
            clientPhone,
            clientEmail,
            clientAdress,
            clientPassword,
            clientCity
        ) VALUES (
        	clientName_proc,
            clientLastName_proc,
            clientPhone_proc,
            clientEmail_proc,
            clientAdress_proc,
            clientPassword_proc,
            (SELECT cityId FROM cities WHERE cityName = clientCity_proc)
        );
        SELECT 'Client added' AS 'Result';
    END;
    END IF;
    
END$$

CREATE  PROCEDURE `addMark` (IN `markName_proc` VARCHAR(50))   BEGIN
	SET @markCount = (SELECT COUNT(*) FROM marks WHERE markName = markName_proc);
    
    IF @markCount > 0 THEN
    BEGIN
    	SELECT 0 AS 'Response';
    END;
    ELSE 
    BEGIN
    	INSERT INTO marks(markName) VALUES(markName_proc);
        SELECT 1 AS 'Response' , (SELECT LAST_INSERT_ID()) AS 'insertedId';
    END;
    END IF;
END$$

CREATE  PROCEDURE `deleteClient` (IN `clientId_proc` INT)   BEGIN
	SET @orderCount = (SELECT COUNT(*) FROM orders WHERE orderClient = clientId_proc AND orderState = 'pending');
    IF @orderCount > 0 THEN
    	SELECT 'This client still have some pending orders' AS 'Result';
    ELSEIF @orderCount = 0 THEN
    BEGIN
    	DELETE FROM clients WHERE id = clientId_proc;
        SELECT 'Client has been deleted successfully' AS 'Result';
    END;
    END IF;
END$$

CREATE  PROCEDURE `deleteMark` (IN `markName_proc` VARCHAR(50))   BEGIN
	SET @linkedProds = (SELECT COUNT(*) FROM products WHERE productMark = markName_proc);
    IF @linkedProds > 0 THEN
    	SELECT 'This mark is linked to some products' AS 'Response';
    ELSEIF @linkedProds = 0 THEN
    BEGIN
    	DELETE FROM marks WHERE markName = markName_proc;
        SELECT 'Mark has been deleted successfully' AS 'Response';
    END ;
    END IF ;
END$$

CREATE  PROCEDURE `deleteOrder` (IN `orderId_proc` INT)   BEGIN
	SET @orderState = (SELECT orderState FROM orders WHERE orderId = orderId_proc);
    IF @orderState = 'pending' THEN
    	SELECT 'This order is still pending' AS 'Response';
    ELSE 
    	DELETE FROM orders WHERE orderId = orderId_proc;
        SELECT 'This order has been deleted' AS 'Response';
    END IF;
END$$

CREATE  PROCEDURE `deleteProduct` (IN `productId_proc` INT)   BEGIN

	SET @ordersCount = (SELECT COUNT(*) FROM orders WHERE orderProduct = productId_proc AND orderState = 'pending');
    IF @ordersCount > 0 THEN
    BEGIN
    	SELECT 'This product is linked to some pending orders' AS 'Response';
    END;
    ELSEIF @ordersCount = 0 THEN
    BEGIN
    	DELETE FROM products WHERE productId = productId_proc;
        SELECT 'Product has been deleted successfully' AS 'Response';
    END;
    END IF;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `adminId` int(11) NOT NULL,
  `adminName` varchar(50) NOT NULL,
  `adminLastName` varchar(50) NOT NULL,
  `adminPassword` text NOT NULL,
  `adminEmail` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`adminId`, `adminName`, `adminLastName`, `adminPassword`, `adminEmail`) VALUES
(1, 'root', 'ROOT', '$2b$10$HkMfOXjDscu6doEOSa3g1.W1pRyt/ShcZv5SIDaZq8oa.UwHrClMW', 'root@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `cityId` int(11) NOT NULL,
  `cityName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`cityId`, `cityName`) VALUES
(1, 'Aïn Harrouda'),
(2, 'Ben Yakhlef'),
(3, 'Bouskoura'),
(4, 'Casablanca'),
(5, 'Médiouna'),
(6, 'Mohammadia'),
(7, 'Tit Mellil'),
(8, 'Ben Yakhlef'),
(9, 'Bejaâd'),
(10, 'Ben Ahmed'),
(11, 'Benslimane'),
(12, 'Berrechid'),
(13, 'Boujniba'),
(14, 'Boulanouare'),
(15, 'Bouznika'),
(16, 'Deroua'),
(17, 'El Borouj'),
(18, 'El Gara'),
(19, 'Guisser'),
(20, 'Hattane'),
(21, 'Khouribga'),
(22, 'Loulad'),
(23, 'Oued Zem'),
(24, 'Oulad Abbou'),
(25, 'Oulad H\'Riz Sahel'),
(26, 'Oulad M\'rah'),
(27, 'Oulad Saïd'),
(28, 'Oulad Sidi Ben Daoud'),
(29, 'Ras El Aïn'),
(30, 'Settat'),
(31, 'Sidi Rahhal Chataï'),
(32, 'Soualem'),
(33, 'Azemmour'),
(34, 'Bir Jdid'),
(35, 'Bouguedra'),
(36, 'Echemmaia'),
(37, 'El Jadida'),
(38, 'Hrara'),
(39, 'Ighoud'),
(40, 'Jamâat Shaim'),
(41, 'Jorf Lasfar'),
(42, 'Khemis Zemamra'),
(43, 'Laaounate'),
(44, 'Moulay Abdallah'),
(45, 'Oualidia'),
(46, 'Oulad Amrane'),
(47, 'Oulad Frej'),
(48, 'Oulad Ghadbane'),
(49, 'Safi'),
(50, 'Sebt El Maârif'),
(51, 'Sebt Gzoula'),
(52, 'Sidi Ahmed'),
(53, 'Sidi Ali Ban Hamdouche'),
(54, 'Sidi Bennour'),
(55, 'Sidi Bouzid'),
(56, 'Sidi Smaïl'),
(57, 'Youssoufia'),
(58, 'Fès'),
(59, 'Aïn Cheggag'),
(60, 'Bhalil'),
(61, 'Boulemane'),
(62, 'El Menzel'),
(63, 'Guigou'),
(64, 'Imouzzer Kandar'),
(65, 'Imouzzer Marmoucha'),
(66, 'Missour'),
(67, 'Moulay Yaâcoub'),
(68, 'Ouled Tayeb'),
(69, 'Outat El Haj'),
(70, 'Ribate El Kheir'),
(71, 'Séfrou'),
(72, 'Skhinate'),
(73, 'Tafajight'),
(74, 'Arbaoua'),
(75, 'Aïn Dorij'),
(76, 'Dar Gueddari'),
(77, 'Had Kourt'),
(78, 'Jorf El Melha'),
(79, 'Kénitra'),
(80, 'Khenichet'),
(81, 'Lalla Mimouna'),
(82, 'Mechra Bel Ksiri'),
(83, 'Mehdia'),
(84, 'Moulay Bousselham'),
(85, 'Sidi Allal Tazi'),
(86, 'Sidi Kacem'),
(87, 'Sidi Slimane'),
(88, 'Sidi Taibi'),
(89, 'Sidi Yahya El Gharb'),
(90, 'Souk El Arbaa'),
(91, 'Akka'),
(92, 'Assa'),
(93, 'Bouizakarne'),
(94, 'El Ouatia'),
(95, 'Es-Semara'),
(96, 'Fam El Hisn'),
(97, 'Foum Zguid'),
(98, 'Guelmim'),
(99, 'Taghjijt'),
(100, 'Tan-Tan'),
(101, 'Tata'),
(102, 'Zag'),
(103, 'Marrakech'),
(104, 'Ait Daoud'),
(115, 'Amizmiz'),
(116, 'Assahrij'),
(117, 'Aït Ourir'),
(118, 'Ben Guerir'),
(119, 'Chichaoua'),
(120, 'El Hanchane'),
(121, 'El Kelaâ des Sraghna'),
(122, 'Essaouira'),
(123, 'Fraïta'),
(124, 'Ghmate'),
(125, 'Ighounane'),
(126, 'Imintanoute'),
(127, 'Kattara'),
(128, 'Lalla Takerkoust'),
(129, 'Loudaya'),
(130, 'Lâattaouia'),
(131, 'Moulay Brahim'),
(132, 'Mzouda'),
(133, 'Ounagha'),
(134, 'Sid L\'Mokhtar'),
(135, 'Sid Zouin'),
(136, 'Sidi Abdallah Ghiat'),
(137, 'Sidi Bou Othmane'),
(138, 'Sidi Rahhal'),
(139, 'Skhour Rehamna'),
(140, 'Smimou'),
(141, 'Tafetachte'),
(142, 'Tahannaout'),
(143, 'Talmest'),
(144, 'Tamallalt'),
(145, 'Tamanar'),
(146, 'Tamansourt'),
(147, 'Tameslouht'),
(148, 'Tanalt'),
(149, 'Zeubelemok'),
(150, 'Meknès'),
(151, 'Khénifra'),
(152, 'Agourai'),
(153, 'Ain Taoujdate'),
(154, 'MyAliCherif'),
(155, 'Rissani'),
(156, 'Amalou Ighriben'),
(157, 'Aoufous'),
(158, 'Arfoud'),
(159, 'Azrou'),
(160, 'Aïn Jemaa'),
(161, 'Aïn Karma'),
(162, 'Aïn Leuh'),
(163, 'Aït Boubidmane'),
(164, 'Aït Ishaq'),
(165, 'Boudnib'),
(166, 'Boufakrane'),
(167, 'Boumia'),
(168, 'El Hajeb'),
(169, 'Elkbab'),
(170, 'Er-Rich'),
(171, 'Errachidia'),
(172, 'Gardmit'),
(173, 'Goulmima'),
(174, 'Gourrama'),
(175, 'Had Bouhssoussen'),
(176, 'Haj Kaddour'),
(177, 'Ifrane'),
(178, 'Itzer'),
(179, 'Jorf'),
(180, 'Kehf Nsour'),
(181, 'Kerrouchen'),
(182, 'M\'haya'),
(183, 'M\'rirt'),
(184, 'Midelt'),
(185, 'Moulay Ali Cherif'),
(186, 'Moulay Bouazza'),
(187, 'Moulay Idriss Zerhoun'),
(188, 'Moussaoua'),
(189, 'N\'Zalat Bni Amar'),
(190, 'Ouaoumana'),
(191, 'Oued Ifrane'),
(192, 'Sabaa Aiyoun'),
(193, 'Sebt Jahjouh'),
(194, 'Sidi Addi'),
(195, 'Tichoute'),
(196, 'Tighassaline'),
(197, 'Tighza'),
(198, 'Timahdite'),
(199, 'Tinejdad'),
(200, 'Tizguite'),
(201, 'Toulal'),
(202, 'Tounfite'),
(203, 'Zaouia d\'Ifrane'),
(204, 'Zaïda'),
(205, 'Ahfir'),
(206, 'Aklim'),
(207, 'Al Aroui'),
(208, 'Aïn Bni Mathar'),
(209, 'Aïn Erreggada'),
(210, 'Ben Taïeb'),
(211, 'Berkane'),
(212, 'Bni Ansar'),
(213, 'Bni Chiker'),
(214, 'Bni Drar'),
(215, 'Bni Tadjite'),
(216, 'Bouanane'),
(217, 'Bouarfa'),
(218, 'Bouhdila'),
(219, 'Dar El Kebdani'),
(220, 'Debdou'),
(221, 'Douar Kannine'),
(222, 'Driouch'),
(223, 'El Aïoun Sidi Mellouk'),
(224, 'Farkhana'),
(225, 'Figuig'),
(226, 'Ihddaden'),
(227, 'Jaâdar'),
(228, 'Jerada'),
(229, 'Kariat Arekmane'),
(230, 'Kassita'),
(231, 'Kerouna'),
(232, 'Laâtamna'),
(233, 'Madagh'),
(234, 'Midar'),
(235, 'Nador'),
(236, 'Naima'),
(237, 'Oued Heimer'),
(238, 'Oujda'),
(239, 'Ras El Ma'),
(240, 'Saïdia'),
(241, 'Selouane'),
(242, 'Sidi Boubker'),
(243, 'Sidi Slimane Echcharaa'),
(244, 'Talsint'),
(245, 'Taourirt'),
(246, 'Tendrara'),
(247, 'Tiztoutine'),
(248, 'Touima'),
(249, 'Touissit'),
(250, 'Zaïo'),
(251, 'Zeghanghane'),
(252, 'Rabat'),
(253, 'Salé'),
(254, 'Ain El Aouda'),
(255, 'Harhoura'),
(256, 'Khémisset'),
(257, 'Oulmès'),
(258, 'Rommani'),
(259, 'Sidi Allal El Bahraoui'),
(260, 'Sidi Bouknadel'),
(261, 'Skhirate'),
(262, 'Tamesna'),
(263, 'Témara'),
(264, 'Tiddas'),
(265, 'Tiflet'),
(266, 'Touarga'),
(267, 'Agadir'),
(268, 'Agdz'),
(269, 'Agni Izimmer'),
(270, 'Aït Melloul'),
(271, 'Alnif'),
(272, 'Anzi'),
(273, 'Aoulouz'),
(274, 'Aourir'),
(275, 'Arazane'),
(276, 'Aït Baha'),
(277, 'Aït Iaâza'),
(278, 'Aït Yalla'),
(279, 'Ben Sergao'),
(280, 'Biougra'),
(281, 'Boumalne-Dadès'),
(282, 'Dcheira El Jihadia'),
(283, 'Drargua'),
(284, 'El Guerdane'),
(285, 'Harte Lyamine'),
(286, 'Ida Ougnidif'),
(287, 'Ifri'),
(288, 'Igdamen'),
(289, 'Ighil n\'Oumgoun'),
(290, 'Imassine'),
(291, 'Inezgane'),
(292, 'Irherm'),
(293, 'Kelaat-M\'Gouna'),
(294, 'Lakhsas'),
(295, 'Lakhsass'),
(296, 'Lqliâa'),
(297, 'M\'semrir'),
(298, 'Massa (Maroc)'),
(299, 'Megousse'),
(300, 'Ouarzazate'),
(301, 'Oulad Berhil'),
(302, 'Oulad Teïma'),
(303, 'Sarghine'),
(304, 'Sidi Ifni'),
(305, 'Skoura'),
(306, 'Tabounte'),
(307, 'Tafraout'),
(308, 'Taghzout'),
(309, 'Tagzen'),
(310, 'Taliouine'),
(311, 'Tamegroute'),
(312, 'Tamraght'),
(313, 'Tanoumrite Nkob Zagora'),
(314, 'Taourirt ait zaghar'),
(315, 'Taroudannt'),
(316, 'Temsia'),
(317, 'Tifnit'),
(318, 'Tisgdal'),
(319, 'Tiznit'),
(320, 'Toundoute'),
(321, 'Zagora'),
(322, 'Afourar'),
(323, 'Aghbala'),
(324, 'Azilal'),
(325, 'Aït Majden'),
(326, 'Beni Ayat'),
(327, 'Béni Mellal'),
(328, 'Bin elouidane'),
(329, 'Bradia'),
(330, 'Bzou'),
(331, 'Dar Oulad Zidouh'),
(332, 'Demnate'),
(333, 'Dra\'a'),
(334, 'El Ksiba'),
(335, 'Foum Jamaa'),
(336, 'Fquih Ben Salah'),
(337, 'Kasba Tadla'),
(338, 'Ouaouizeght'),
(339, 'Oulad Ayad'),
(340, 'Oulad M\'Barek'),
(341, 'Oulad Yaich'),
(342, 'Sidi Jaber'),
(343, 'Souk Sebt Oulad Nemma'),
(344, 'Zaouïat Cheikh'),
(345, 'Tanger'),
(346, 'Tétouan'),
(347, 'Akchour'),
(348, 'Assilah'),
(349, 'Bab Berred'),
(350, 'Bab Taza'),
(351, 'Brikcha'),
(352, 'Chefchaouen'),
(353, 'Dar Bni Karrich'),
(354, 'Dar Chaoui'),
(355, 'Fnideq'),
(356, 'Gueznaia'),
(357, 'Jebha'),
(358, 'Karia'),
(359, 'Khémis Sahel'),
(360, 'Ksar El Kébir'),
(361, 'Larache'),
(362, 'M\'diq'),
(363, 'Martil'),
(364, 'Moqrisset'),
(365, 'Oued Laou'),
(366, 'Oued Rmel'),
(367, 'Ouazzane'),
(368, 'Point Cires'),
(369, 'Sidi Lyamani'),
(370, 'Sidi Mohamed ben Abdallah el-Raisuni'),
(371, 'Zinat'),
(372, 'Ajdir'),
(373, 'Aknoul'),
(374, 'Al Hoceïma'),
(375, 'Aït Hichem'),
(376, 'Bni Bouayach'),
(377, 'Bni Hadifa'),
(378, 'Ghafsai'),
(379, 'Guercif'),
(380, 'Imzouren'),
(381, 'Inahnahen'),
(382, 'Issaguen (Ketama)'),
(383, 'Karia (El Jadida)'),
(384, 'Karia Ba Mohamed'),
(385, 'Oued Amlil'),
(386, 'Oulad Zbair'),
(387, 'Tahla'),
(388, 'Tala Tazegwaght'),
(389, 'Tamassint'),
(390, 'Taounate'),
(391, 'Targuist'),
(392, 'Taza'),
(393, 'Taïnaste'),
(394, 'Thar Es-Souk'),
(395, 'Tissa'),
(396, 'Tizi Ouasli'),
(397, 'Laayoune'),
(398, 'El Marsa'),
(399, 'Tarfaya'),
(400, 'Boujdour'),
(401, 'Awsard'),
(402, 'Oued-Eddahab'),
(403, 'Stehat'),
(404, 'Aït Attab');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `clientName` varchar(50) NOT NULL,
  `clientLastName` varchar(50) NOT NULL,
  `clientEmail` varchar(60) NOT NULL,
  `clientPhone` varchar(12) NOT NULL,
  `clientCity` int(11) NOT NULL,
  `clientAdress` varchar(100) NOT NULL,
  `clientPhoto` varchar(20) DEFAULT NULL,
  `clientPassword` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `clientName`, `clientLastName`, `clientEmail`, `clientPhone`, `clientCity`, `clientAdress`, `clientPhoto`, `clientPassword`) VALUES
(15, 'Salah eddine', 'Last', 'salah@gmail.com', '0652897416', 13, 'Address', NULL, '$2b$10$HkMfOXjDscu6doEOSa3g1.W1pRyt/ShcZv5SIDaZq8oa.UwHrClMW'),
(16, 'Aymane', 'aymane', 'aymane@gmail.com', '0157678554', 13, 'Address', NULL, '$2b$10$RGO8RtyTLU0U2fQhihHQr.x0ofVL.D3SZjJnsiHX9zEMlUf/BGdUy'),
(17, 'Simo', 'simo', 'simo@gmail.com', '0654782169', 16, 'Quartier ezouhari', NULL, '$2b$10$DLkESegbRyQSvnLJYo.igu6PmYgH20UzTqhFQvejmlhzQHcg1q2Hm'),
(18, 'Nissrine', 'nissrine', 'nissrine@gmail.com', '0651479258', 12, 'Quariter el woroud', NULL, '$2b$10$nG9TAnw6GjmCpOhMUEUVleRU0FHsvEEti6ziPbdFPzxb59q8vTX3G'),
(19, 'Hafssa', 'hafssa', 'hafssa@gmail.com', '0651478924', 14, 'Quartier el manssour', NULL, '$2b$10$1kJJNPGWbPhgnS7tSMHd0eruuomnSN/z9qry8PsTHkN.X6s8c4Np2'),
(20, 'Najwa', 'najwa', 'najwa@gmail.com', '0514893257', 64, 'Quatier toroke', NULL, '$2b$10$4FY8lCYcvr0BQwHQNrb/LuhjtZKI2xwZKN1M7uvOtcX681JDD2WiO'),
(21, 'Chaima', 'chaima', 'chaima@gmail.com', '0547921658', 26, 'Quariter el mokhtar', NULL, '$2b$10$SsYJZIHzFvazgSNJjmHCv.n.I2EGETmp85wL49KQEM1RrWnjfrY9i');

-- --------------------------------------------------------

--
-- Table structure for table `marks`
--

CREATE TABLE `marks` (
  `markName` varchar(50) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `marks`
--

INSERT INTO `marks` (`markName`, `id`) VALUES
('ACM', 5),
('3 CHÊNES', 6),
('AVENE', 7),
('BIODERMA', 8),
('BIODERMINY', 9),
('BIONIKE', 10);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL,
  `orderClient` int(11) NOT NULL,
  `orderProduct` int(11) NOT NULL,
  `orderState` enum('approved','pending','delivered','canceled') DEFAULT NULL,
  `orderTime` date DEFAULT current_timestamp(),
  `orderQuantity` int(11) NOT NULL,
  `orderPrice` double(8,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderId`, `orderClient`, `orderProduct`, `orderState`, `orderTime`, `orderQuantity`, `orderPrice`) VALUES
(11, 21, 28, 'pending', '2022-09-11', 1, 170.000),
(12, 18, 25, 'pending', '2022-09-11', 2, 126.000),
(13, 15, 24, 'approved', '2022-09-11', 1, 121.000),
(14, 16, 24, 'delivered', '2022-09-11', 1, 121.000),
(15, 17, 28, 'canceled', '2022-09-11', 100, 170.000);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productId` int(11) NOT NULL,
  `productName` varchar(50) NOT NULL,
  `productDescription` text NOT NULL,
  `productOldPrice` double(8,3) DEFAULT NULL,
  `productCurrentPrice` double(8,3) NOT NULL,
  `productMark` varchar(50) NOT NULL,
  `productCategorie` varchar(50) NOT NULL,
  `productImages` varchar(100) NOT NULL,
  `productQuantities` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productId`, `productName`, `productDescription`, `productOldPrice`, `productCurrentPrice`, `productMark`, `productCategorie`, `productImages`, `productQuantities`) VALUES
(23, 'LES 3 CHÊNES SÉBACTASE CRÈME 50ML', 'Les problèmes de peau touchent un grand nombre d’adolescents et d’adultes. On les considère comme un mauvais moment à passer, mais cela peut avoir des conséquences non négligeables sur la qualité de vie et le bien-être psychologique des individus atteints. Le stress, la pollution, les déséquilibres hormonaux et certains cosmétiques peuvent modifier la sécrétion de sébum en le rendant plus abondant et plus irritant. Des bactéries se développent favorisant l’apparition des boutons, la peau grasse et les comédons\r\n\r\nGrâce à la combinaison optimale des ingrédients actifs, la crème :\r\n\r\nmatifie et empêche efficacement la peau de briller\r\nprévient les excès de sébum\r\ndiminue les symptômes de l’acné\r\ndiminue les rougeurs et irritations\r\naméliore le teint\r\nprotège contre les rayons UV (SPF 15)\r\nhydrate et tonifie la peau.', 0.000, 135.000, '3 CHÊNES', 'Soins visage', '1662905725963.jpg', 5),
(24, 'ACM SÉBIONEX GEL NETTOYANT (200 ML)', 'Le gel moussant Sebionex a été conçu pour nettoyer les peaux grasses ou à tendance acnéique sans les dessécher ni les agresser. Le gel moussant Sébionex respecte le pH de la peau. Ne contient pas de savon.', 0.000, 121.000, 'ACM', 'Soins visage', '1662905833797.jpg', 15),
(25, 'ACM NOVIDERM BORÉADE R SOIN RÉPARATEUR APAISANT 40', 'Le soin réparateur apaisant Boréade R des laboratoires Noviderm, est un soin du visage utilisé pour nourrir intensément la peau suite au dessèchement provoqué par des traitements dermatologiques contre l’acné. Avec sa texture onctueuse et non grasse, il fond très rapidement sur la peau afin d’apporter un réconfort immédiat tout en la laissant souple et parfaitement hydratée.\r\n\r\nLa formulation de ce soin réparateur apaisant Boréade R se compose de plusieurs actifs au fort pouvoir hydratant, comme la glycérine, l’oléodistillat de tournesol et des céramides 3. Grâce à eux, la peau est parfaitement hydratée toute la journée, ce qui permet de compenser le dessèchement lié aux traitements dermatologiques anti acnéiques, comme l’isotrétinoïne par exemple.\r\nL’association de beurre de karité, d’extrait de maca et de vitamine E, avec leurs formidables propriétés réparatrices et anti-oxydantes, va apaiser la peau, la rendre plus souple et la réparer en même temps.\r\nAfin d’amplifier ces actions bienfaisantes pour la peau, des peptides de quinoa, actifs que l’on retrouve dans la totalité des soins des laboratoires Noviderm, sont également présents dans cette formulation. Ils ont également des propriétés apaisantes et réparatrices permettant de limiter l’inflammation cutanée liée au dessèchement de la peau. Ils possèdent également des vertus protectrices puisqu’ils vont aider à la restauration de la fonction barrière naturelle de la peau. Enfin, leur action stimulante sur la production d’acide hyaluronique va aider à améliorer l’hydratation de l’épiderme, puisque cette molécule à un fort pouvoir de rétention d’eau, bien utile pour contrer le dessèchement cutané.\r\nEn utilisant ce soin, les sensations d’inconfort sont diminuées directement après son application sur la peau, cette dernière étant intensément nourrie et réparée.\r\n\r\nAppliquez matin et soir sur le visage propre et sec.\r\nConstitue une excellente base de maquillage', 0.000, 126.000, 'ACM', 'Soins visage', '1662905896638.jpg', 30),
(26, 'ALGOTHERM ALGOPURE CORRECTEUR INTENSIF IMPERFECTIO', 'Le soin ciblé anti-imperfections diminue visiblement les imperfections et les rougeurs. Localement et en douceur, il assèche les boutons. La peau retrouve sa netteté. Ses plus : efficace en 24H. TESTÉ SOUS CONTRÔLE DERMATOLOGIQUE - SANS PARABÈNE - SANS PHÉNOXYÉTHANOL\r\n\r\n\r\nCONSEIL D\'UTILISATION :\r\n\r\nAppliquer localement sur les imperfections.', 0.000, 135.000, 'BIODERMINY', 'Soins visage', '1662906006419.jpg', 3),
(27, 'B COM BIO ORGANIC DÈODORANT SANS SEL ALUMINIUM ET ', 'B-COM-BIO Déodorant longue durée certifié Bio, sans Sels d’Aluminium, sans Alcool, qui régule les odeurs sans perturber l’équilibre de la peau. Les odeurs sont neutralisées efficacement et durablement. La peau est fraîche et délicatement parfumée. Sans paraben.\r\n\r\n \r\n\r\nAppliquer sous les aisselles sur une peau propre et sèche.\r\n\r\nEau florale de Sauge BIO, Mélanges d’huiles essentielles, Acides aminés, actifs déodorants naturels.', 0.000, 90.000, '3 CHÊNES', 'Corps', '1662906076685.jpg', 66),
(28, 'FILORGA MOUSSE DÉMAQUILLANTE', 'Descriptif :\r\nLA 1ere MOUSSE anti-âge démaquillante\r\nDébarrasser la peau de tout ce qui la pollue et l’asphyxie, tout en lui apportant les éléments qui lui manquent…\r\nC’est le pari physiologique et technologique de la Mousse Démaquillante Filorga, enrichie en Acide Hyaluronique et Lys Blanc.\r\n\r\nAu-delà de sa texture unique, la Mousse Démaquillante Filorga apporte autant qu’elle enlève. Et c’est là toute sa force…\r\nPremier démaquillant du marché fortement concentré en Acide Hyaluronique et en Lys Blanc, il combine 4 voies d’action originales :\r\n- Une première hydratation : Grâce à sa capacité à retenir 1000 fois son poids en eau, l’Acide Hyaluronique véhiculé par la Mousse Démaquillante Filorga vient se déposer à la surface de la peau pour former un film protecteur isolant, comme ouaté. Ce film limite les pertes hydriques trans-épidermiques et empêche la déshydratation souvent consécutive au rinçage à l’eau, quel qu’il soit.\r\n/ Aucune rougeur, aucun tiraillement, la peau, toute veloutée, semble parfaitement sereine et réhydratée.\r\n- Un repulping immédiat des traits : Grâce à son haut poids moléculaire (1,8 millions de daltons), l’acide hyaluronique de la formule se glisse aussi entre les cellules de la couche cornée pour repulper l’épiderme et lisser les ridules de déshydratation.\r\n/ La peau semble toute fraîche, bien lisse et reposée.\r\n- Une réparation épidermique : Bien connu pour ses propriétés apaisantes, adoucissantes et réparatrices, le Lys Blanc calme les irritations dans l’instant, atténue sérieusement l’inflammation et favorise une cicatrisation accélérée des microlésions apparues dans la journée.\r\n/ La peau, parfaitement régénérée, apparaît plus homogène, plus saine, plus résistante.\r\n- Une protection anti-radicalaire : Le Lys Blanc, puissant anti-oxydant, est également capable de désactiver les radicaux libres déjà présents dans la peau, pour limiter tous les processus d’oxydation.\r\n/ Avec son système de défense intact, la peau peut ensuite mieux affronter les agresseurs quotidiens.\r\n\r\nIndications :\r\nNettoie - Démaquille - Hydrate\r\nVisage et Yeux\r\n\r\nLa Mousse Démaquillante Filorga s’adresse à toutes les peaux, mêmes les plus sensibles. Egalement conseillée aux peaux matures, sujettes au tiraillement, qui ont tendance à produire moins de lipides avec l’âge.\r\n\r\n \r\n\r\nConseils d\'utilisation :\r\nUtilisée matin et soir, toute l’année, la Mousse Démaquillante Filorga purifie la peau et remet ses compteurs à zéro, pour démultiplier l’effet du soin suivant.\r\n/ C’est l’étape clé d’un rituel anti-âge idéal…\r\n1/ Appliquer 2 ou 3 noix de cette mousse fraîche, limpide et légèrement parfumée, dans le creux de la main.\r\n2/ Déposer les noix sur visage humide et émulsionner doucement du bout des doigts en gestes circulaires, y compris sur le contour de l’oeil.\r\n3/ Rincer abondamment à l’eau tiède et recommencer l’opération si nécessaire.\r\nEffet Flash. La peau, purifiée, peut à nouveau parfaitement respirer. Le teint, dégrisé, s’éclaire. Le grain de peau se veloute. Le visage tout entier se transforme en une trame parfaite pour mieux assimiler les actifs des soins de jour ou de nuit.', 200.000, 170.000, 'AVENE', 'NATURE ET BIO', '1662906155760.jpg', 2);

-- --------------------------------------------------------

--
-- Table structure for table `products_categories`
--

CREATE TABLE `products_categories` (
  `categorieName` varchar(50) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products_categories`
--

INSERT INTO `products_categories` (`categorieName`, `id`) VALUES
('Soins visage', 14),
('Corps', 15),
('Maman et Bébé', 16),
('ANTI-INSECTES', 17),
('SOIN CIBLE', 18),
('NATURE ET BIO', 19),
('PALETTE', 20);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('zSWYoP7V0xgdT3AEPcXxy0ksJVXXMOq8', 1662992877, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"client\":15,\"admin\":1}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`adminId`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`cityId`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `clientEmail` (`clientEmail`),
  ADD UNIQUE KEY `clientPhone` (`clientPhone`),
  ADD KEY `clientLocation` (`clientCity`);

--
-- Indexes for table `marks`
--
ALTER TABLE `marks`
  ADD PRIMARY KEY (`markName`),
  ADD UNIQUE KEY `markId` (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `orderClientId` (`orderClient`),
  ADD KEY `orderProductId` (`orderProduct`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `productMarkName` (`productMark`),
  ADD KEY `productCate` (`productCategorie`);

--
-- Indexes for table `products_categories`
--
ALTER TABLE `products_categories`
  ADD PRIMARY KEY (`categorieName`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `adminId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `cityId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=405;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `marks`
--
ALTER TABLE `marks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `products_categories`
--
ALTER TABLE `products_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clientLocation` FOREIGN KEY (`clientCity`) REFERENCES `cities` (`cityId`) ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orderClientId` FOREIGN KEY (`orderClient`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orderProductId` FOREIGN KEY (`orderProduct`) REFERENCES `products` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `productCate` FOREIGN KEY (`productCategorie`) REFERENCES `products_categories` (`categorieName`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productMarkName` FOREIGN KEY (`productMark`) REFERENCES `marks` (`markName`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
