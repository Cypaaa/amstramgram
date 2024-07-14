CREATE TABLE users (
    uuid BINARY(16) NOT NULL DEFAULT (UNHEX(REPLACE(UUID(),'-',''))),
    email VARCHAR(180) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name VARCHAR(30) NOT NULL,
    username VARCHAR(30) NOT NULL UNIQUE,
    presentation VARCHAR(150),
    is_admin BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (uuid)
);
 
CREATE TABLE posts (
    id BIGINT AUTO_INCREMENT NOT NULL,
    user_uuid BINARY(16) NOT NULL,
    title VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE images (
    id BIGINT AUTO_INCREMENT NOT NULL,
    post_id BIGINT NOT NULL,
    image LONGBLOB NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    PRIMARY KEY (id)
);

-- Add a constraint to ensure the image does not exceed 2.5 MB
ALTER TABLE images
ADD CONSTRAINT chk_image_size CHECK (LENGTH(image) <= 2621440);
