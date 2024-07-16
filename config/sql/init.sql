CREATE TABLE users (
    uuid BINARY(16) NOT NULL DEFAULT (UNHEX(REPLACE(UUID(),'-',''))),
    email VARCHAR(180) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name VARCHAR(30) NOT NULL,
    username VARCHAR(30) NOT NULL UNIQUE,
    presentation VARCHAR(150),
    is_admin BOOLEAN NOT NULL DEFAULT 0,
    likes BIGINT UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY (uuid)
);
 
CREATE TABLE posts (
    id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
    user_uuid BINARY(16) NOT NULL,
    title VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_uuid) REFERENCES users(uuid),
    PRIMARY KEY (id)
);

CREATE TABLE images (
    id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
    post_id BIGINT UNSIGNED NOT NULL,
    image LONGBLOB NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    PRIMARY KEY (id)
);

CREATE TABLE comments (
    id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
    user_uuid BINARY(16) NOT NULL,
    post_id BIGINT UNSIGNED NOT NULL,
    content VARCHAR(500) NOT NULL,
    likes BIGINT UNSIGNED NOT NULL DEFAULT 0,
    FOREIGN KEY (user_uuid) REFERENCES users(uuid),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    PRIMARY KEY (id)
);

CREATE TABLE likes_posts (
    user_uuid BINARY(16) NOT NULL,
    post_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (user_uuid) REFERENCES users(uuid),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    PRIMARY KEY (user_uuid, post_id)
);

CREATE TABLE likes_comments (
    user_uuid BINARY(16) NOT NULL,
    comment_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (user_uuid) REFERENCES users(uuid),
    FOREIGN KEY (comment_id) REFERENCES comments(id),
    PRIMARY KEY (user_uuid, comment_id)
);

-- Add a constraint to ensure the image does not exceed 2.5 MB
ALTER TABLE images
ADD CONSTRAINT chk_image_size CHECK (LENGTH(image) <= 2621440);

-- Like Triggers

DELIMITER //
CREATE TRIGGER trg_likes_posts_insert
AFTER INSERT ON likes_posts
FOR EACH ROW
BEGIN
    UPDATE posts
    SET likes = likes + 1
    WHERE id = NEW.post_id;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_likes_posts_delete
AFTER DELETE ON likes_posts
FOR EACH ROW
BEGIN
    UPDATE posts
    SET likes = likes - 1
    WHERE id = OLD.post_id;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_likes_comments_insert
AFTER INSERT ON likes_comments
FOR EACH ROW
BEGIN
    UPDATE comments
    SET likes = likes + 1
    WHERE id = NEW.comment_id;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_likes_comments_delete
AFTER DELETE ON likes_comments
FOR EACH ROW
BEGIN
    UPDATE comments
    SET likes = likes - 1
    WHERE id = OLD.comment_id;
END;
//
DELIMITER ;