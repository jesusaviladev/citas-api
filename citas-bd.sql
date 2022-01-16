-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-01-2022 a las 21:04:05
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `citas-bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `appointments`
--

CREATE TABLE `appointments` (
  `id` int(100) NOT NULL,
  `date` date NOT NULL,
  `user_id` int(100) NOT NULL,
  `status` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `appointments`
--

INSERT INTO `appointments` (`id`, `date`, `user_id`, `status`, `is_active`) VALUES
(1, '2022-01-20', 1, 'pending', 1),
(2, '2022-01-20', 2, 'pending', 1),
(3, '2022-01-20', 2, 'pending', 1),
(5, '2022-01-20', 2, 'pending', 1),
(6, '2022-01-20', 1, 'pending', 1),
(7, '2022-01-20', 1, 'cancelled', 0),
(8, '2022-01-20', 1, 'cancelled', 0),
(9, '2022-01-20', 1, 'pending', 1),
(10, '2022-01-20', 1, 'pending', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `description` char(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `description`) VALUES
(1, 'admin'),
(2, 'worker'),
(3, 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(80) NOT NULL,
  `username` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `name` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `lastname` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `birthday` date NOT NULL,
  `ci` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `role` int(45) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `lastname`, `email`, `birthday`, `ci`, `role`, `created_at`) VALUES
(1, 'juan', '$2b$10$i3CTirk6fBoN6Y2o2T9SN.5AQjk71yElu2QwhAEAn3OVhSBZ1Z.We', 'Juan', 'Urbina', 'juan@gmail.com', '1999-01-01', '27806133', 1, '2022-01-16'),
(2, 'yisus', '$2b$10$.XkorQcBb4zO8y3IA5M1zO7c2Ca1omuCHNEDdloF77piEYD1xAzMC', 'Jesus', 'Avila', 'avijesus13@gmail.com', '1998-07-01', '26990863', 3, '2022-01-16');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_app_user_fk` (`user_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_user_fk` (`role`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(80) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `id_app_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `role_user_fk` FOREIGN KEY (`role`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
