PGDMP     /    (    
        	    u            gyit-post-publisher    10.0    10.0 
    �
           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �
           1262    16394    gyit-post-publisher    DATABASE     �   CREATE DATABASE "gyit-post-publisher" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Vietnamese_Vietnam.1258' LC_CTYPE = 'Vietnamese_Vietnam.1258';
 %   DROP DATABASE "gyit-post-publisher";
             dp0613    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            �
           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    12924    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            �
           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    16403    users    TABLE     h   CREATE TABLE users (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);
    DROP TABLE public.users;
       public         dp0613    false    3            �
          0    16403    users 
   TABLE DATA               0   COPY users (id, username, password) FROM stdin;
    public       dp0613    false    196   _       n
           2606    16407    users users_pkey 
   CONSTRAINT     G   ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public         dp0613    false    196            �
   9   x�3�L)0034�0025\F��y)�!�*��ť�E\1z\\\ P��     