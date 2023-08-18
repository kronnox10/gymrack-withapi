-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-07-2023 a las 22:47:23
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gymrack`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `correo` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `privilegio` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`correo`, `password`, `privilegio`) VALUES
('henry@gymrack.com', '0000', 'administrador'),
('jesus@gymrack.com', '0000', 'administrador'),
('jorge@gymrack.com', '0000', 'administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

CREATE TABLE `asistencia` (
  `id_usuario` int(4) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrenador`
--

CREATE TABLE `entrenador` (
  `id` int(4) NOT NULL,
  `name` varchar(15) NOT NULL,
  `Fecha_de_nacimiento` date NOT NULL,
  `direccion` varchar(30) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `Valoracion` double DEFAULT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `entrenador`
--

INSERT INTO `entrenador` (`id`, `name`, `Fecha_de_nacimiento`, `direccion`, `correo`, `Valoracion`, `password`) VALUES
(12, 'Jesus', '2004-01-12', 'Apartamento 4', 'jesuse', 0, '0000'),
(13, 'henryE', '2005-06-14', 'calle 55', 'henrye', 0, '0000'),
(14, 'jorgeE', '2001-01-12', 'calle 78', 'jorgee', 0, '0000'),
(15, 'e', '0000-00-00', 'r', 'r', 0, 'r');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrenador_rutina`
--

CREATE TABLE `entrenador_rutina` (
  `id_entrenador` int(4) NOT NULL,
  `id_rutina` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad_entrenador`
--

CREATE TABLE `especialidad_entrenador` (
  `id_entrenador` int(4) NOT NULL,
  `especialidad` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especialidad_entrenador`
--

INSERT INTO `especialidad_entrenador` (`id_entrenador`, `especialidad`) VALUES
(12, 'css'),
(13, 'boostrap'),
(14, 'especialidad en cardio'),
(15, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planes`
--

CREATE TABLE `planes` (
  `id` varchar(15) NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `precio` mediumint(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `planes`
--

INSERT INTO `planes` (`id`, `nombre`, `precio`) VALUES
('2', 'Diamante', 121212),
('3', 'medium', 12000),
('4', 'jesus', 121212),
('8', 'jesus', 121212);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutina`
--

CREATE TABLE `rutina` (
  `id` int(4) NOT NULL,
  `descripcion` text NOT NULL,
  `tipo_rutina` varchar(30) NOT NULL,
  `id_entrenador` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rutina`
--

INSERT INTO `rutina` (`id`, `descripcion`, `tipo_rutina`, `id_entrenador`) VALUES
(1, 'as', 'da', 12),
(2, 'daa', 'd', 12),
(3, 'jesus el css', 'cardio', 12),
(4, 'abdominales y actividades de movimiento constante', 'aerobica', 12),
(5, '30 lagartijas', 'brazo', 12),
(6, 'pesando pesas', 'pesas', 13),
(7, 'sisi', 'cardio2', 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesion`
--

CREATE TABLE `sesion` (
  `id_usuario` int(4) NOT NULL,
  `id_entrenador` int(4) NOT NULL,
  `Tipo_de_rutina` varchar(30) NOT NULL,
  `Fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sesion`
--

INSERT INTO `sesion` (`id_usuario`, `id_entrenador`, `Tipo_de_rutina`, `Fecha`) VALUES
(1, 12, 'cardio', '2023-07-17'),
(2, 13, 'pesas', '2023-07-17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `telefono_entrenador`
--

CREATE TABLE `telefono_entrenador` (
  `id_entrenador` int(4) NOT NULL,
  `telefono` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `telefono_entrenador`
--

INSERT INTO `telefono_entrenador` (`id_entrenador`, `telefono`) VALUES
(12, '1234'),
(13, '12345'),
(14, '3207542189'),
(15, 'r');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `telefono_usuario`
--

CREATE TABLE `telefono_usuario` (
  `id_usuario` int(4) NOT NULL,
  `telefono_user` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `telefono_usuario`
--

INSERT INTO `telefono_usuario` (`id_usuario`, `telefono_user`) VALUES
(22, '1'),
(23, '2'),
(24, '5'),
(25, '1234'),
(26, '1234'),
(27, '1234'),
(28, '1234'),
(29, '1234'),
(30, '1234'),
(31, '1234'),
(32, '1234'),
(33, '1234'),
(34, '1234'),
(35, '1234'),
(36, '1234'),
(37, '1234'),
(38, '1234'),
(39, '1234'),
(40, '1234'),
(41, '1234'),
(42, '1234'),
(43, '1234'),
(44, '1234'),
(45, '1234'),
(46, '1234'),
(47, '1234'),
(48, '1234'),
(49, '1234'),
(50, '1234');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `name` varchar(65) NOT NULL,
  `id` int(4) NOT NULL,
  `direccion` varchar(30) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `num_valoracion` char(5) DEFAULT NULL,
  `id_planes` varchar(15) DEFAULT NULL,
  `estado` varchar(12) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`name`, `id`, `direccion`, `correo`, `fecha_registro`, `num_valoracion`, `id_planes`, `estado`, `password`) VALUES
('henry', 1, 'cra 14', 'henry', '2023-07-16 17:05:59', NULL, NULL, 'activo', '0000'),
('jesus', 2, 'cra 12', 'jesus', '2023-07-16 17:06:31', NULL, NULL, 'activo', '0000'),
('jorge', 4, 'cra 22', 'jorge', '2023-07-16 17:15:00', NULL, NULL, 'activo', '0000'),
('admin', 5, 'cra 55', 'user', '2023-07-16 17:19:09', NULL, NULL, 'activo', '0000'),
('1', 22, '1', '1@1', '2023-07-16 21:12:35', NULL, NULL, 'activo', '1'),
('2', 23, '2', '2@2', '2023-07-16 21:15:56', NULL, NULL, 'activo', '2'),
('5', 24, '5', '5@5', '2023-07-16 22:31:16', NULL, NULL, 'activo', '5'),
('Roberto', 25, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:37:36', NULL, NULL, 'activo', '4321'),
('Roberto', 26, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:37:38', NULL, NULL, 'activo', '4321'),
('Roberto', 27, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:37:38', NULL, NULL, 'activo', '4321'),
('Roberto', 28, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:37:39', NULL, NULL, 'activo', '4321'),
('Roberto', 29, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:37:39', NULL, NULL, 'activo', '4321'),
('Roberto', 30, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:37:39', NULL, NULL, 'activo', '4321'),
('Roberto', 31, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:37:40', NULL, NULL, 'activo', '4321'),
('Roberto', 32, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:37:40', NULL, NULL, 'activo', '4321'),
('Roberto', 33, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:37:40', NULL, NULL, 'activo', '4321'),
('Roberto', 34, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:37:40', NULL, NULL, 'activo', '4321'),
('Roberto', 35, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:37:40', NULL, NULL, 'activo', '4321'),
('Roberto', 36, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:38:01', NULL, NULL, 'activo', '4321'),
('Roberto', 37, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:38:01', NULL, NULL, 'activo', '4321'),
('Roberto', 38, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:38:02', NULL, NULL, 'activo', '4321'),
('Roberto', 39, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:38:02', NULL, NULL, 'activo', '4321'),
('Roberto', 40, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:38:03', NULL, NULL, 'activo', '4321'),
('Roberto', 41, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:38:03', NULL, NULL, 'activo', '4321'),
('Roberto', 42, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:38:03', NULL, NULL, 'activo', '4321'),
('Roberto', 43, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:38:04', NULL, NULL, 'activo', '4321'),
('Roberto', 44, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:38:04', NULL, NULL, 'activo', '4321'),
('Roberto', 45, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:38:05', NULL, NULL, 'activo', '4321'),
('Roberto', 46, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:38:05', NULL, NULL, 'activo', '4321'),
('Roberto', 47, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:38:06', NULL, NULL, 'activo', '4321'),
('Roberto', 48, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:38:06', NULL, NULL, 'activo', '4321'),
('Roberto', 49, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:38:06', NULL, NULL, 'activo', '4321'),
('Roberto', 50, 'Calle 13', 'Robert@outlook.com', '2023-07-16 22:38:07', NULL, NULL, 'activo', '4321');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoracion`
--

CREATE TABLE `valoracion` (
  `Fecha_de_nacimiento` date NOT NULL,
  `peso` smallint(6) NOT NULL,
  `altura` decimal(3,2) NOT NULL,
  `numero_valor` char(5) NOT NULL,
  `imc` tinyint(4) NOT NULL,
  `Fecha_de_valoracion` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `valoracion`
--

INSERT INTO `valoracion` (`Fecha_de_nacimiento`, `peso`, `altura`, `numero_valor`, `imc`, `Fecha_de_valoracion`) VALUES
('2023-07-12', 12, 9.99, '12', 12, '2023-07-14 02:37:17');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`correo`);

--
-- Indices de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `entrenador`
--
ALTER TABLE `entrenador`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `entrenador_rutina`
--
ALTER TABLE `entrenador_rutina`
  ADD KEY `id_entrenador` (`id_entrenador`,`id_rutina`),
  ADD KEY `id_rutina` (`id_rutina`);

--
-- Indices de la tabla `especialidad_entrenador`
--
ALTER TABLE `especialidad_entrenador`
  ADD KEY `id_enttrenador` (`id_entrenador`);

--
-- Indices de la tabla `planes`
--
ALTER TABLE `planes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rutina`
--
ALTER TABLE `rutina`
  ADD PRIMARY KEY (`id`,`tipo_rutina`),
  ADD KEY `id_entrenador` (`id_entrenador`),
  ADD KEY `tipo_rutina` (`tipo_rutina`);

--
-- Indices de la tabla `sesion`
--
ALTER TABLE `sesion`
  ADD PRIMARY KEY (`id_usuario`,`id_entrenador`),
  ADD KEY `id_usuario` (`id_usuario`,`id_entrenador`),
  ADD KEY `id_entrenador` (`id_entrenador`),
  ADD KEY `Tipo_de_rutina` (`Tipo_de_rutina`);

--
-- Indices de la tabla `telefono_entrenador`
--
ALTER TABLE `telefono_entrenador`
  ADD KEY `id_entrenador` (`id_entrenador`);

--
-- Indices de la tabla `telefono_usuario`
--
ALTER TABLE `telefono_usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `valor` (`num_valoracion`),
  ADD KEY `id_planes` (`id_planes`);

--
-- Indices de la tabla `valoracion`
--
ALTER TABLE `valoracion`
  ADD PRIMARY KEY (`numero_valor`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  MODIFY `id_usuario` int(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `entrenador`
--
ALTER TABLE `entrenador`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `rutina`
--
ALTER TABLE `rutina`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `sesion`
--
ALTER TABLE `sesion`
  MODIFY `id_usuario` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `telefono_usuario`
--
ALTER TABLE `telefono_usuario`
  MODIFY `id_usuario` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD CONSTRAINT `asistencia_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `entrenador_rutina`
--
ALTER TABLE `entrenador_rutina`
  ADD CONSTRAINT `entrenador_rutina_ibfk_3` FOREIGN KEY (`id_entrenador`) REFERENCES `entrenador` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `entrenador_rutina_ibfk_4` FOREIGN KEY (`id_rutina`) REFERENCES `rutina` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `especialidad_entrenador`
--
ALTER TABLE `especialidad_entrenador`
  ADD CONSTRAINT `especialidad_entrenador_ibfk_1` FOREIGN KEY (`id_entrenador`) REFERENCES `entrenador` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `rutina`
--
ALTER TABLE `rutina`
  ADD CONSTRAINT `rutina_ibfk_1` FOREIGN KEY (`id_entrenador`) REFERENCES `entrenador` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sesion`
--
ALTER TABLE `sesion`
  ADD CONSTRAINT `sesion_ibfk_3` FOREIGN KEY (`Tipo_de_rutina`) REFERENCES `rutina` (`tipo_rutina`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sesion_ibfk_4` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sesion_ibfk_5` FOREIGN KEY (`id_entrenador`) REFERENCES `entrenador` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `telefono_entrenador`
--
ALTER TABLE `telefono_entrenador`
  ADD CONSTRAINT `telefono_entrenador_ibfk_1` FOREIGN KEY (`id_entrenador`) REFERENCES `entrenador` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `telefono_usuario`
--
ALTER TABLE `telefono_usuario`
  ADD CONSTRAINT `telefono_usuario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`id_planes`) REFERENCES `planes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
