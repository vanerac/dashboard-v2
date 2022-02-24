CREATE TYPE loginType AS ENUM ('classic', 'SSO');
CREATE TYPE serviceStatus AS ENUM ('OK', 'KO');
CREATE TYPE serviceProvider AS ENUM ('spotify', 'deezer', 'google', 'apple');
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS Users
(
    id          uuid PRIMARY KEY             DEFAULT uuid_generate_v4(),
    email       VARCHAR(256) UNIQUE NULL,
    displayName TEXT                NOT NULL,
    password    VARCHAR(256)        NULL,
    createdAt   DATE                NOT NULL DEFAULT NOW(),
    lastLogin   DATE                NULL,
    editedAt    DATE                NOT NULL DEFAULT NOW(),
    loginType   loginType           NOT NULL DEFAULT 'classic',
    CONSTRAINT unique_email CHECK (loginType = 'classic' AND email IS NOT NULL OR loginType = 'SSO' AND email IS NULL)

);
CREATE UNIQUE INDEX u_email ON Users (email) WHERE loginType = 'classic' AND email IS NOT NULL;

CREATE TABLE IF NOT EXISTS Services
(
    id           uuid PRIMARY KEY         DEFAULT uuid_generate_v4(),
    provider     serviceProvider NOT NULL,
    clientId     VARCHAR(256)    NOT NULL,
    enabled      BOOLEAN         NOT NULL DEFAULT TRUE,
    userId       uuid            NOT NULL,
    accessToken  VARCHAR(256)    NOT NULL,
    tokenExpires TIMESTAMP       NULL,
    refreshToken VARCHAR(256)    NULL,
    status       serviceStatus   NOT NULL DEFAULT 'OK',
    createdAt    DATE            NOT NULL DEFAULT NOW(),
    editedAt     DATE            NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_userId FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE CASCADE,
    CONSTRAINT uk_connection UNIQUE (provider, clientId, userId),
    CONSTRAINT uk_clientId UNIQUE (provider, clientId)
);

CREATE TABLE IF NOT EXISTS Widgets
(
    id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    serviceId   uuid NOT NULL,
    userId      uuid NOT NULL,
    config      TEXT NOT NULL,
    x           INT  NOT NULL    DEFAULT 0,
    y           INT  NOT NULL    DEFAULT 0,
    w           INT  NOT NULL,
    h           INT  NOT NULL,
    CONSTRAINT fk_serviceId FOREIGN KEY (serviceId) REFERENCES Services (id) ON DELETE CASCADE,
    CONSTRAINT fk_userId FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE CASCADE
);
