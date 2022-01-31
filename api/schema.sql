CREATE TYPE loginType AS ENUM ('classic', 'SSO');
CREATE TYPE roleType AS ENUM ('admin', 'user');
CREATE TYPE widgetType AS ENUM ('playlist', 'search');
CREATE TYPE serviceType AS ENUM ('spotify', 'deezer', 'youtube', 'apple_music');

CREATE TABLE IF NOT EXISTS Users
(
    id          SERIAL UNIQUE,
    email       VARCHAR(256) UNIQUE NULL,
    displayName TEXT                NOT NULL,
    password    VARCHAR(256)        NULL,
    createdAt   DATE                NOT NULL DEFAULT NOW(),
    lastLogin   DATE                NULL,
    editedAt    DATE                NOT NULL DEFAULT NOW(),
    userType    roleType            NOT NULL DEFAULT 'user',
    loginType   loginType           NOT NULL DEFAULT 'classic',
    CONSTRAINT unique_email CHECK (loginType = 'classic' AND email IS NOT NULL OR loginType = 'SSO' AND email IS NULL)

    );
CREATE UNIQUE INDEX u_email ON Users (email) WHERE loginType = 'classic' AND email IS NOT NULL;

CREATE TABLE IF NOT EXISTS SSO
(
    id           SERIAL,
    provider     VARCHAR(256) NOT NULL,
    clientId     VARCHAR(256) NOT NULL,
    email        VARCHAR(256) NULL,
    token        VARCHAR(256) NOT NULL,
    expiresAt    TIMESTAMP    NULL,
    refreshToken VARCHAR(256) NULL,
    userId       INT          NOT NULL,
    createdAt    DATE         NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_userId FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE CASCADE,
    CONSTRAINT uk_sso UNIQUE (provider, clientId)
--     CONSTRAINT uk_user UNIQUE(provider, userId)
    );

CREATE TABLE IF NOT EXISTS Services
(
    id          SERIAL UNIQUE,
    type        serviceType NOT NULL,
    description TEXT        NOT NULL,
    enabled     BOOLEAN     NOT NULL DEFAULT TRUE,
    userId      INT         NOT NULL,
    CONSTRAINT fk_userId FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE CASCADE,
    CONSTRAINT uk_service UNIQUE (type, userId)
    );

CREATE TABLE IF NOT EXISTS Widgets
(
    id          SERIAL,
--     type        widgetType NOT NULL,
    serviceId   INT        NOT NULL,
    userId      INT        NOT NULL,
    refreshRate INT        NOT NULL DEFAULT 10000,
    config      TEXT       NOT NULL,
    positionX   INT        NOT NULL DEFAULT 0,
    positionY   INT        NOT NULL DEFAULT 0,
    CONSTRAINT fk_serviceId FOREIGN KEY (serviceId) REFERENCES Services (id) ON DELETE CASCADE,
    CONSTRAINT fk_userId FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE CASCADE
    );
