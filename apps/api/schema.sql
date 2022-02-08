CREATE TYPE loginType AS ENUM ('classic', 'SSO');
-- CREATE TYPE roleType AS ENUM ('admin', 'user');
-- CREATE TYPE widgetType AS ENUM ('playlist', 'search');
CREATE TYPE serviceStatus AS ENUM ('OK', 'KO');
CREATE TYPE serviceProvider AS ENUM ('spotify', 'deezer', 'google', 'apple');
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS Users
(
    id          UUID PRIMARY KEY             DEFAULT uuid_generate_v4(),
    email       VARCHAR(256) UNIQUE NULL,
    displayName TEXT                NOT NULL,
    password    VARCHAR(256)        NULL,
    createdAt   DATE                NOT NULL DEFAULT NOW(),
    lastLogin   DATE                NULL,
    editedAt    DATE                NOT NULL DEFAULT NOW(),
--     userType    roleType            NOT NULL DEFAULT 'user',
    loginType   loginType           NOT NULL DEFAULT 'classic',
    CONSTRAINT unique_email CHECK (loginType = 'classic' AND email IS NOT NULL OR loginType = 'SSO' AND email IS NULL)

);
CREATE UNIQUE INDEX u_email ON Users (email) WHERE loginType = 'classic' AND email IS NOT NULL;

CREATE TABLE IF NOT EXISTS Services
(
    id           UUID PRIMARY KEY         DEFAULT uuid_generate_v4(),
    provider     serviceProvider NOT NULL,
    clientId     VARCHAR(256)    NOT NULL,
    enabled      BOOLEAN         NOT NULL DEFAULT TRUE,
    userId       UUID            NOT NULL,
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
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     type        widgetType NOT NULL,
    serviceId   UUID NOT NULL,
    userId      UUID NOT NULL,
    refreshRate INT  NOT NULL    DEFAULT 10000,
    config      TEXT NOT NULL,
    positionX   INT  NOT NULL    DEFAULT 0,
    positionY   INT  NOT NULL    DEFAULT 0,
    CONSTRAINT fk_serviceId FOREIGN KEY (serviceId) REFERENCES Services (id) ON DELETE CASCADE,
    CONSTRAINT fk_userId FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE CASCADE
);
