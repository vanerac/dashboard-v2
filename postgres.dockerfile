FROM postgres:14

COPY apps/api/schema.sql /docker-entrypoint-initdb.d/1-schema.sql
