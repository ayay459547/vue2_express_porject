/** 
 * 系統的使用者
 */
CREATE TABLE `user`(
	`user_id` BIGINT NOT NULL AUTO_INCREMENT,
	`user_name` VARCHAR(50) NOT NULL,
	`user_account` VARCHAR(50) NOT NULL,
	`user_password` VARCHAR(200) NOT NULL,
	PRIMARY KEY (`user_id`)
);

INSERT INTO `user` (`user_name`, `user_account`, `user_password`) VALUES ('超級使用者', 'root', 'root');
