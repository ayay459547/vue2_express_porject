 
# 系統的使用者 
CREATE TABLE `user`(
	`user_id` BIGINT NOT NULL AUTO_INCREMENT,
	`user_name` VARCHAR(50) NOT NULL,
	`user_account` VARCHAR(50) NOT NULL,
	`user_password` VARCHAR(200) NOT NULL,
	`user_void` TINYINT NOT NULL DEFAULT 0,
	PRIMARY KEY (`user_id`)
);

INSERT INTO 
	`user` (`user_name`, `user_account`, `user_password`) 
VALUES 
	('超級使用者', 'cm9vdA==', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2');
 
# 系統功能
CREATE TABLE `menu`(
	`menu_id` BIGINT NOT NULL AUTO_INCREMENT,
	`menu_name` VARCHAR(50) NOT NULL,
	`menu_router` VARCHAR(50) NOT NULL,
	`menu_icon` VARCHAR(50) NOT NULL,
	`menu_void` TINYINT NOT NULL DEFAULT 0,
	PRIMARY KEY (`menu_id`)
);

INSERT INTO 
	`menu` (`menu_name`, `menu_router`, `menu_icon`, `menu_void`) 
VALUES 
	('基本資料', 'Information', 'fa-solid fa-file-signature', 1),
	('使用者管理', 'Users', 'fa-solid fa-user-gear', 0),
	('帳號管理', 'Account', 'fa-solid fa-id-card', 1),
	('功能管理', 'System', 'fa-solid fa-bars-progress', 0);

# 使用者能使用的功能
CREATE TABLE `userMenu`(
	`userMenu_userId` BIGINT NOT NULL,
	`userMenu_menuId` BIGINT NOT NULL,
	`userMenu_void` TINYINT NOT NULL DEFAULT 0,
	PRIMARY KEY (`userMenu_userId`, `userMenu_menuId`),
	CONSTRAINT `fk_userMenu_userId` FOREIGN KEY (`userMenu_userId`) REFERENCES user(user_id),
	CONSTRAINT `fk_userMenu_menuId` FOREIGN KEY (`userMenu_menuId`) REFERENCES menu(menu_id)
);

INSERT INTO 
	`usermenu` (`userMenu_userId`, `userMenu_menuId`) 
VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(1, 4);
