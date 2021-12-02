DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `mainPictureUrl` VARCHAR(255) NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
INSERT INTO
  `projects` (`title`, `description`, `mainPictureUrl`)
VALUES
  (
    'P1',
    'P1 description',
    'https://ucarecdn.com/be32d5a2-4ef2-4a47-8e73-7142f80ae188/ms_project_2013_2.jpg'
  ),
  (
    'P2',
    'P2 description',
    'https://ucarecdn.com/ddffed41-46bc-4cd8-a161-a41e49c2aa72/innovatiedoel.jpg'
  )