---
title: Optimizing Postgres Queries
description: 'Optimizing Postgres queries using indexes, EXPLAIN, EXPLAIN ANALYZE and bad system designs'
type:
    - blog
tags:
    - database
    - postgres
    - optimization
    - indexes
published: true
date: 'September 25 2024'
---

I have been working on a [project](https://github.com/adnan007d/social-media-api) using Postgres as the database.
Its a simple API like a social media platform where users can create posts, like, and comment on them.

After I created the basic API, I started to test it with a large amount of data which I created
using node (It was not good you can have a look
[here](https://github.com/adnan007d/Social-media-api/blob/master/src/seed.ts))
I noticed that some queries were taking a long time to execute. I had to optimize the queries to make the API faster.

A overview of the database schema

<div class="grid xl:grid-cols-2 gap-5 xl:place-items-center overflow-x-scroll max-w-[95vw]">

```sql
CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text NOT NULL UNIQUE,
    password text NOT NULL,
    role role NOT NULL DEFAULT 'user'::role,
    email_verified boolean DEFAULT false,
    username text NOT NULL UNIQUE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);
```

```sql
CREATE TABLE IF NOT EXISTS images (
id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
type image_type NOT NULL,
url text NOT NULL,
ref_id uuid NOT NULL,
public_id text NOT NULL,
created_at timestamptz NOT NULL DEFAULT now(),
updated_at timestamptz NOT NULL DEFAULT now()
);
```

```sql
CREATE TABLE IF NOT EXISTS posts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);
```

```sql
CREATE TABLE IF NOT EXISTS likes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT one_like_per_post UNIQUE (user_id, post_id)
);
```

<div class="col-span-full">

```sql
CREATE TABLE IF NOT EXISTS comments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    content text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);
```

</div>
</div>

`role` and `image_type` are enums

```sql
CREATE TYPE role AS ENUM ('user', 'admin');
CREATE TYPE image_type AS ENUM ('profile', 'post');
```

## EXPLAIN and EXPLAIN ANALYZE

Users table has 10000 rows

Before we start optimizing lets insert a row and see how `EXPLAIN` and `EXPLAIN ANALYZE` work

<small>

**_password should be hashed but for the sake of simplicity I am using plain text_**
</small>

```sql
EXPLAIN INSERT INTO users (email, password, username) VALUES ('woow@woow.com', 'password', 'woow');
```

```
                    QUERY PLAN
---------------------------------------------------
 Insert on users  (cost=0.00..0.02 rows=0 width=0)
   ->  Result  (cost=0.00..0.02 rows=1 width=137)
(2 rows)
```

EXPLAIN shows the plan of the query without executing it. It shows the cost of the query starting from `0.00ms` to `0.02ms`, it also returns the `estimated` number of rows with the average width of each row

```sql
EXPLAIN ANALYZE INSERT INTO users (email, password, username) VALUES ('woow@woow.com', 'password', 'woow');
```

```
                                         QUERY PLAN
---------------------------------------------------------------------------------------------
 Insert on users  (cost=0.00..0.02 rows=0 width=0) (actual time=2.227..2.231 rows=0 loops=1)
   ->  Result  (cost=0.00..0.02 rows=1 width=137) (actual time=0.053..0.056 rows=1 loops=1)
 Planning Time: 0.039 ms
 Execution Time: 2.272 ms
(4 rows)
```

EXPLAIN ANALYZE shows the plan of the query and also executes it. It shows the actual time taken to execute the query.

Users table already has indexes on `id`, `email`, and `username` columns that were created while creating the table using the constraints I have.

```
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_email_unique" UNIQUE CONSTRAINT, btree (email)
    "users_username_unique" UNIQUE CONSTRAINT, btree (username)
```

Lets select a row and see how indexes work.

```sql
EXPLAIN ANALYZE SELECT id, email, role, password FROM users WHERE email = 'woow@woow.com';
```

```
                                                         QUERY PLAN
----------------------------------------------------------------------------------------------------------------------------
 Index Scan using users_email_unique on users  (cost=0.29..8.30 rows=1 width=104) (actual time=0.027..0.031 rows=1 loops=1)
   Index Cond: (email = 'woow@woow.com'::text)
 Planning Time: 0.128 ms
 Execution Time: 0.059 ms
(4 rows)
```

As we can see the query used the `users_email_unique` index to find the row with the email

Just for testing lets select a row using a column that doesn't have an index without an index

---

### Query 1

```sql
EXPLAIN ANALYZE SELECT id, email, role email_verified FROM users ORDER BY created_at desc LIMIT 12;
```

```
                                                      QUERY PLAN
-----------------------------------------------------------------------------------------------------------------------
 Limit  (cost=547.25..547.28 rows=12 width=51) (actual time=40.912..40.992 rows=12 loops=1)
   ->  Sort  (cost=547.25..572.25 rows=10000 width=51) (actual time=40.908..40.936 rows=12 loops=1)
         Sort Key: created_at DESC
         Sort Method: top-N heapsort  Memory: 27kB
         ->  Seq Scan on users  (cost=0.00..318.00 rows=10000 width=51) (actual time=0.009..20.368 rows=10001 loops=1)
 Planning Time: 0.198 ms
 Execution Time: 41.055 ms
(7 rows)
```

Lets read from bottom to top, `Seq Scan` means a `full table scan` it reads the whole table for this query which is bad.
After that it sorts the data using `top-N heapsort` <small>
_(I don't get it how it works on top of my head, I think it heapify only if the new element is greater/smaller than the root element of the heap)_ </small>
Once the sorting is done the top 12 rows are selected.

Now lets create an index on `created_at` column in descending order and run the query again see how it affects it.

```sql
CREATE INDEX users_created_at ON users(created_at DESC);
```

```
                                                              QUERY PLAN
---------------------------------------------------------------------------------------------------------------------------------------
 Limit  (cost=0.29..1.66 rows=12 width=51) (actual time=0.067..0.156 rows=12 loops=1)
   ->  Index Scan using users_created_at on users  (cost=0.29..1142.29 rows=10001 width=51) (actual time=0.062..0.107 rows=12 loops=1)
 Planning Time: 0.339 ms
 Execution Time: 0.208 ms
(4 rows)
```

As we can see the query now uses the index and performs a `Index Scan` instead of `Seq Scan` and the query is now faster.
(Even if the index we created was in `ascending` order postgres would be smart enough to perform a `Index Scan Backward`)

---

### Query 2

A bit insight on the system. I am storing post and profile image inside the images table with `type` as `profile` or `post` and `ref_id` will be the id of the user or post.

```sql
SELECT u.id, u.email, u.role, u.email_verified, i.url
FROM users u
LEFT JOIN images i ON
u.id = i.ref_id AND i.type = 'profile'
WHERE u.id = '5ff13dcb-30b2-4ef5-bb4f-15ca8c0960bf'
ORDER BY i.created_at DESC
LIMIT 1;
```

Just by looking at the query we can tell we need an index on `created_at` in `images` table and a composite index on `ref_id` and `type` columns.
Lets run `EXPLAIN ANALYZE` on the query.

```
                                                             QUERY PLAN
---------------------------------------------------------------------------------------------------------------------------------------
 Limit  (cost=1164.92..1164.93 rows=1 width=159) (actual time=6.253..6.274 rows=1 loops=1)
   ->  Sort  (cost=1164.92..1164.93 rows=1 width=159) (actual time=6.248..6.262 rows=1 loops=1)
         Sort Key: i.created_at DESC
         Sort Method: quicksort  Memory: 25kB
         ->  Nested Loop Left Join  (cost=0.29..1164.91 rows=1 width=159) (actual time=0.051..6.241 rows=1 loops=1)
               ->  Index Scan using users_pkey on users u  (cost=0.29..8.30 rows=1 width=44) (actual time=0.033..0.044 rows=1 loops=1)
                     Index Cond: (id = '5ff13dcb-30b2-4ef5-bb4f-15ca8c0960bf'::uuid)
               ->  Seq Scan on images i  (cost=0.00..1156.60 rows=1 width=131) (actual time=0.010..6.177 rows=1 loops=1)
                     Filter: ((type = 'profile'::image_type) AND (ref_id = '5ff13dcb-30b2-4ef5-bb4f-15ca8c0960bf'::uuid))
                     Rows Removed by Filter: 26039
 Planning Time: 0.216 ms
 Execution Time: 6.335 ms
(12 rows)
```

Again start from the bottom. `Seq Scan` on images which is bad, lets continue `Index Scan` on users
looking good there. Joining the result then `Sorting` by `created_at` and limiting the result to one.

Well the query is working but this is not I wanted it to do. I wanted to filter and order and limit the images table not the whole query.

```sql
SELECT u.id, u.email, u.role, u.email_verified, i.url
FROM users u
LEFT JOIN LATERAL (
    SELECT url
    FROM images
    WHERE ref_id = u.id
      AND type = 'profile'
    ORDER BY created_at DESC
    LIMIT 1
) i ON true
WHERE u.id = '5ff13dcb-30b2-4ef5-bb4f-15ca8c0960bf';
```

```
                                                        QUERY PLAN
---------------------------------------------------------------------------------------------------------------------------
 Nested Loop Left Join  (cost=1156.89..1164.94 rows=1 width=151) (actual time=4.214..4.246 rows=1 loops=1)
   ->  Index Scan using users_pkey on users u  (cost=0.29..8.30 rows=1 width=44) (actual time=0.024..0.034 rows=1 loops=1)
         Index Cond: (id = '5ff13dcb-30b2-4ef5-bb4f-15ca8c0960bf'::uuid)
   ->  Limit  (cost=1156.61..1156.62 rows=1 width=115) (actual time=4.181..4.191 rows=1 loops=1)
         ->  Sort  (cost=1156.61..1156.62 rows=1 width=115) (actual time=4.176..4.181 rows=1 loops=1)
               Sort Key: images.created_at DESC
               Sort Method: quicksort  Memory: 25kB
               ->  Seq Scan on images  (cost=0.00..1156.60 rows=1 width=115) (actual time=0.008..4.164 rows=1 loops=1)
                     Filter: ((ref_id = u.id) AND (type = 'profile'::image_type))
                     Rows Removed by Filter: 26039
 Planning Time: 0.151 ms
 Execution Time: 4.288 ms
(12 rows)
```

Didn't improve much but Sorting and limit is happening on the images table now.

Lets analyze the query and see where we can add index. First is simple `created_at`.
There is a condition on `ref_id` and `type` a composite index on these two columns will be helpful.

```sql
CREATE INDEX images_ref_id_type ON images(ref_id, type);
CREATE INDEX images_created_at ON images(created_at DESC);
```

```
                                                                  QUERY PLAN
-----------------------------------------------------------------------------------------------------------------------------------------------
 Nested Loop Left Join  (cost=8.60..16.64 rows=1 width=151) (actual time=0.068..0.087 rows=1 loops=1)
   ->  Index Scan using users_pkey on users u  (cost=0.29..8.30 rows=1 width=44) (actual time=0.017..0.020 rows=1 loops=1)
         Index Cond: (id = '5ff13dcb-30b2-4ef5-bb4f-15ca8c0960bf'::uuid)
   ->  Limit  (cost=8.32..8.32 rows=1 width=115) (actual time=0.043..0.052 rows=1 loops=1)
         ->  Sort  (cost=8.32..8.32 rows=1 width=115) (actual time=0.040..0.044 rows=1 loops=1)
               Sort Key: images.created_at DESC
               Sort Method: quicksort  Memory: 25kB
               ->  Index Scan using images_ref_id_type on images  (cost=0.29..8.31 rows=1 width=115) (actual time=0.023..0.027 rows=1 loops=1)
                     Index Cond: ((ref_id = u.id) AND (type = 'profile'::image_type))
 Planning Time: 0.462 ms
 Execution Time: 0.134 ms
(11 rows)
```

Good improvement but can we eliminate sorting? rather than creating a composite index on
`ref_id` and `type` we can create a composite index on `ref_id`, `type`, and `created_at` in descending order.

```sql
DROP INDEX images_ref_id_type;
CREATE INDEX images_ref_id_type_created ON images(ref_id, type, created_at DESC);
```

```
                                                                   QUERY PLAN
-------------------------------------------------------------------------------------------------------------------------------------------------
 Nested Loop Left Join  (cost=0.57..16.63 rows=1 width=151) (actual time=0.047..0.069 rows=1 loops=1)
   ->  Index Scan using users_pkey on users u  (cost=0.29..8.30 rows=1 width=44) (actual time=0.014..0.018 rows=1 loops=1)
         Index Cond: (id = '5ff13dcb-30b2-4ef5-bb4f-15ca8c0960bf'::uuid)
   ->  Limit  (cost=0.29..8.31 rows=1 width=115) (actual time=0.025..0.032 rows=1 loops=1)
         ->  Index Scan using images_ref_id_type_created on images  (cost=0.29..8.31 rows=1 width=115) (actual time=0.020..0.022 rows=1 loops=1)
               Index Cond: ((ref_id = u.id) AND (type = 'profile'::image_type))
 Planning Time: 0.365 ms
 Execution Time: 0.108 ms
(8 rows)
```

There is not a big difference but the query planner used the `images_ref_id_type_created`
index to get the desired result, which is optimal for big tables

---

### Query 3

This is to remove the old profile images of the user when a user uploads a new in, it runs in the background after the user uploads an image.

For testing lets insert some 10-20 images for the user

```sql
INSERT INTO images (ref_id, type, public_id, url)
SELECT '5ff13dcb-30b2-4ef5-bb4f-15ca8c0960bf', 'profile', 'data', 'https://avatars.githubusercontent.com/u/53809439'
FROM generate_series(1, 20);
-- This one is the new image
INSERT INTO images (ref_id, type, public_id, url) VALUES ('5ff13dcb-30b2-4ef5-bb4f-15ca8c0960bf', 'profile', 'data', 'https://avatars.githubusercontent.com/u/53809439');
```

```sql
DELETE FROM images
WHERE
    ref_id = '5ff13dcb-30b2-4ef5-bb4f-15ca8c0960bf'
    AND type = 'profile'
    AND created_at < (
      SELECT created_at
      FROM images
      WHERE
        ref_id = '5ff13dcb-30b2-4ef5-bb4f-15ca8c0960bf'
        AND type = 'profile'
      ORDER BY created_at DESC
      LIMIT 1
  );
```

```sql
                                                                          QUERY PLAN
---------------------------------------------------------------------------------------------------------------------------------------------------------------
 Delete on images  (cost=8.59..16.62 rows=0 width=0) (actual time=0.202..0.215 rows=0 loops=1)
   InitPlan 1 (returns $0)
     ->  Limit  (cost=0.29..8.31 rows=1 width=8) (actual time=0.042..0.049 rows=1 loops=1)
           ->  Index Only Scan using images_ref_id_type_created on images images_1  (cost=0.29..8.31 rows=1 width=8) (actual time=0.037..0.039 rows=1 loops=1)
                 Index Cond: ((ref_id = '5ff13dcb-30b2-4ef5-bb4f-15ca8c0960bf'::uuid) AND (type = 'profile'::image_type))
                 Heap Fetches: 1
   ->  Index Scan using images_ref_id_type_created on images  (cost=0.29..8.31 rows=1 width=6) (actual time=0.061..0.133 rows=21 loops=1)
         Index Cond: ((ref_id = '5ff13dcb-30b2-4ef5-bb4f-15ca8c0960bf'::uuid) AND (type = 'profile'::image_type) AND (created_at < $0))
 Planning Time: 0.197 ms
 Execution Time: 0.256 ms
(10 rows)
```

Due to index we created earlier the query is already optimal.

---

### Query 4

Getting a single post with likes and comments

Now this query is an example of bad system design? fetching likes and comments for a single post
in the same query using `count(*)` is not a good idea.

```sql
SELECT
    p.id, p.content, p.updated_at, p.created_at,
    count(l.id) as "likes", -- count(c.id) as "comments",
    pi.url as "image", u.username,
    ui.url as "user_image"
FROM
posts p
INNER JOIN users u ON p.user_id = u.id
LEFT JOIN images pi ON p.id = pi.ref_id AND pi.type = 'post'
LEFT JOIN images ui ON u.id = ui.ref_id AND ui.type = 'profile'
LEFT JOIN likes l ON p.id = l.post_id
LEFT JOIN comments c ON p.id = c.post_id
WHERE p.id = '8442bdc8-b146-4a5f-97d4-3e28d7efcf0c'
GROUP BY p.id, pi.url, ui.url, u.username, p.content, p.updated_at, p.created_at;
```

This query isn't only bad but it is incorrect as well. The aggregate count(\*) didn't return the correct result.
So rather than fixing this query lets create a new one step by step.

---

Only fetchig the username

```sql
SELECT
    p.id, p.content, p.updated_at, p.created_at,
    u.username
FROM
posts p
INNER JOIN users u on p.user_id = u.id
WHERE p.id = '8442bdc8-b146-4a5f-97d4-3e28d7efcf0c';
```

```sql
                                                         QUERY PLAN
----------------------------------------------------------------------------------------------------------------------------
 Nested Loop  (cost=0.57..16.61 rows=1 width=99) (actual time=0.050..0.072 rows=1 loops=1)
   ->  Index Scan using posts_pkey on posts p  (cost=0.29..8.30 rows=1 width=104) (actual time=0.022..0.027 rows=1 loops=1)
         Index Cond: (id = '8442bdc8-b146-4a5f-97d4-3e28d7efcf0c'::uuid)
   ->  Index Scan using users_pkey on users u  (cost=0.29..8.30 rows=1 width=27) (actual time=0.015..0.018 rows=1 loops=1)
         Index Cond: (id = p.user_id)
 Planning Time: 0.394 ms
 Execution Time: 0.123 ms
(7 rows)
```

Looking good here lets add the images

```sql
SELECT
    p.id, p.content, p.updated_at, p.created_at,
    pi.url as "image",
    u.username, ui.url as "user_image"
FROM
posts p
INNER JOIN users u on p.user_id = u.id
LEFT JOIN LATERAL (
        SELECT url FROM images
        WHERE ref_id = p.id AND type = 'post'
        ORDER BY created_at DESC
        LIMIT 1
) as pi ON true
LEFT JOIN LATERAL (
        SELECT url FROM images
        WHERE ref_id = p.user_id AND type = 'profile'
        ORDER BY created_at DESC
        LIMIT 1
) as ui ON true
WHERE p.id = '8442bdc8-b146-4a5f-97d4-3e28d7efcf0c';
```

```
                                                                        QUERY PLAN
----------------------------------------------------------------------------------------------------------------------------------------------------------
 Nested Loop Left Join  (cost=1.15..33.26 rows=1 width=313) (actual time=0.100..0.157 rows=1 loops=1)
   ->  Nested Loop Left Join  (cost=0.86..24.94 rows=1 width=222) (actual time=0.073..0.110 rows=1 loops=1)
         ->  Nested Loop  (cost=0.57..16.61 rows=1 width=115) (actual time=0.043..0.061 rows=1 loops=1)
               ->  Index Scan using posts_pkey on posts p  (cost=0.29..8.30 rows=1 width=104) (actual time=0.021..0.027 rows=1 loops=1)
                     Index Cond: (id = '8442bdc8-b146-4a5f-97d4-3e28d7efcf0c'::uuid)
               ->  Index Scan using users_pkey on users u  (cost=0.29..8.30 rows=1 width=27) (actual time=0.013..0.016 rows=1 loops=1)
                     Index Cond: (id = p.user_id)
         ->  Limit  (cost=0.29..8.31 rows=1 width=115) (actual time=0.021..0.029 rows=1 loops=1)
               ->  Index Scan using images_ref_id_type_created on images  (cost=0.29..8.31 rows=1 width=115) (actual time=0.017..0.019 rows=1 loops=1)
                     Index Cond: ((ref_id = p.id) AND (type = 'post'::image_type))
   ->  Limit  (cost=0.29..8.31 rows=1 width=115) (actual time=0.020..0.028 rows=1 loops=1)
         ->  Index Scan using images_ref_id_type_created on images images_1  (cost=0.29..8.31 rows=1 width=115) (actual time=0.016..0.019 rows=1 loops=1)
               Index Cond: ((ref_id = p.user_id) AND (type = 'profile'::image_type))
 Planning Time: 0.637 ms
 Execution Time: 0.228 ms
(15 rows)
```

Pretty good now lets add the likes and comments

```sql
SELECT
    p.id, p.content, p.updated_at, p.created_at,
    pi.url as "image",
    u.username, ui.url as "user_image",
    (SELECT count(*) FROM likes WHERE post_id = p.id) as "likes",
    (SELECT count(*) FROM comments WHERE post_id = p.id) as "comments"
FROM
posts p
INNER JOIN users u on p.user_id = u.id
LEFT JOIN LATERAL (
        SELECT url FROM images
        WHERE ref_id = p.id AND type = 'post'
        ORDER BY created_at DESC
        LIMIT 1
) as pi ON true
LEFT JOIN LATERAL (
        SELECT url FROM images
        WHERE ref_id = p.user_id AND type = 'profile'
        ORDER BY created_at DESC
        LIMIT 1
) as ui ON true
WHERE p.id = '8442bdc8-b146-4a5f-97d4-3e28d7efcf0c';
```

```
                                                                        QUERY PLAN
----------------------------------------------------------------------------------------------------------------------------------------------------------
 Nested Loop Left Join  (cost=1.15..51355.45 rows=1 width=329) (actual time=174.554..174.614 rows=1 loops=1)
   ->  Nested Loop Left Join  (cost=0.86..24.94 rows=1 width=222) (actual time=0.045..0.077 rows=1 loops=1)
         ->  Nested Loop  (cost=0.57..16.61 rows=1 width=115) (actual time=0.026..0.042 rows=1 loops=1)
               ->  Index Scan using posts_pkey on posts p  (cost=0.29..8.30 rows=1 width=104) (actual time=0.012..0.020 rows=1 loops=1)
                     Index Cond: (id = '8442bdc8-b146-4a5f-97d4-3e28d7efcf0c'::uuid)
               ->  Index Scan using users_pkey on users u  (cost=0.29..8.30 rows=1 width=27) (actual time=0.007..0.009 rows=1 loops=1)
                     Index Cond: (id = p.user_id)
         ->  Limit  (cost=0.29..8.31 rows=1 width=115) (actual time=0.014..0.020 rows=1 loops=1)
               ->  Index Scan using images_ref_id_type_created on images  (cost=0.29..8.31 rows=1 width=115) (actual time=0.011..0.012 rows=1 loops=1)
                     Index Cond: ((ref_id = p.id) AND (type = 'post'::image_type))
   ->  Limit  (cost=0.29..8.31 rows=1 width=115) (actual time=0.010..0.018 rows=1 loops=1)
         ->  Index Scan using images_ref_id_type_created on images images_1  (cost=0.29..8.31 rows=1 width=115) (actual time=0.007..0.008 rows=1 loops=1)
               Index Cond: ((ref_id = p.user_id) AND (type = 'profile'::image_type))
   SubPlan 1
     ->  Aggregate  (cost=37560.65..37560.66 rows=1 width=8) (actual time=129.858..129.865 rows=1 loops=1)
           ->  Seq Scan on likes  (cost=0.00..37560.49 rows=63 width=0) (actual time=48.354..129.708 rows=100 loops=1)
                 Filter: (post_id = p.id)
                 Rows Removed by Filter: 1646579
   SubPlan 2
     ->  Aggregate  (cost=13761.52..13761.53 rows=1 width=8) (actual time=44.608..44.614 rows=1 loops=1)
           ->  Seq Scan on comments  (cost=0.00..13761.49 rows=15 width=0) (actual time=17.019..44.573 rows=15 loops=1)
                 Filter: (post_id = p.id)
                 Rows Removed by Filter: 448504
 Planning Time: 0.481 ms
 Execution Time: 174.698 ms
(25 rows)
```

Well the `count(*)` is slow because it is doing a full table scan on the `likes` and `comments` table.
Lets see if adding indexes on likes and comments table helps.

```sql
CREATE INDEX likes_post_id ON likes(post_id);
CREATE INDEX likes_user_id ON likes(user_id);
CREATE INDEX comments_post_id ON comments(post_id);
CREATE INDEX comments_user_id ON comments(user_id);
```

```
                                                                        QUERY PLAN
----------------------------------------------------------------------------------------------------------------------------------------------------------
 Nested Loop Left Join  (cost=1.15..43.69 rows=1 width=329) (actual time=0.514..0.566 rows=1 loops=1)
   ->  Nested Loop Left Join  (cost=0.86..24.94 rows=1 width=222) (actual time=0.040..0.063 rows=1 loops=1)
         ->  Nested Loop  (cost=0.57..16.61 rows=1 width=115) (actual time=0.022..0.032 rows=1 loops=1)
               ->  Index Scan using posts_pkey on posts p  (cost=0.29..8.30 rows=1 width=104) (actual time=0.009..0.012 rows=1 loops=1)
                     Index Cond: (id = '8442bdc8-b146-4a5f-97d4-3e28d7efcf0c'::uuid)
               ->  Index Scan using users_pkey on users u  (cost=0.29..8.30 rows=1 width=27) (actual time=0.006..0.008 rows=1 loops=1)
                     Index Cond: (id = p.user_id)
         ->  Limit  (cost=0.29..8.31 rows=1 width=115) (actual time=0.013..0.018 rows=1 loops=1)
               ->  Index Scan using images_ref_id_type_created on images  (cost=0.29..8.31 rows=1 width=115) (actual time=0.010..0.011 rows=1 loops=1)
                     Index Cond: ((ref_id = p.id) AND (type = 'post'::image_type))
   ->  Limit  (cost=0.29..8.31 rows=1 width=115) (actual time=0.009..0.015 rows=1 loops=1)
         ->  Index Scan using images_ref_id_type_created on images images_1  (cost=0.29..8.31 rows=1 width=115) (actual time=0.006..0.007 rows=1 loops=1)
               Index Cond: ((ref_id = p.user_id) AND (type = 'profile'::image_type))
   SubPlan 1
     ->  Aggregate  (cost=5.69..5.70 rows=1 width=8) (actual time=0.358..0.365 rows=1 loops=1)
           ->  Index Only Scan using likes_post_id on likes  (cost=0.43..5.53 rows=63 width=0) (actual time=0.043..0.201 rows=100 loops=1)
                 Index Cond: (post_id = p.id)
                 Heap Fetches: 0
   SubPlan 2
     ->  Aggregate  (cost=4.72..4.73 rows=1 width=8) (actual time=0.089..0.096 rows=1 loops=1)
           ->  Index Only Scan using comments_post_id on comments  (cost=0.42..4.69 rows=15 width=0) (actual time=0.037..0.063 rows=15 loops=1)
                 Index Cond: (post_id = p.id)
                 Heap Fetches: 0
 Planning Time: 0.755 ms
 Execution Time: 0.621 ms
(25 rows)
```

Here it did improve the performance but still the query is slow becaue this is for just one post
and for home/landing page there will be 12 of this query running for each post.

---

This is the same above query but with multiple rows for home/landing pages

```sql
SELECT
    p.id, p.content, p.updated_at, p.created_at,
    pi.url as "image",
    u.username, ui.url as "user_image",
    (SELECT count(*) FROM likes WHERE post_id = p.id) as "likes",
    (SELECT count(*) FROM comments WHERE post_id = p.id) as "comments"
FROM
posts p
INNER JOIN users u on p.user_id = u.id
LEFT JOIN LATERAL (
        SELECT url FROM images
        WHERE ref_id = p.id AND type = 'post'
        ORDER BY created_at DESC
        LIMIT 1
) as pi ON true
LEFT JOIN LATERAL (
        SELECT url FROM images
        WHERE ref_id = p.user_id AND type = 'profile'
        ORDER BY created_at DESC
        LIMIT 1
) as ui ON true
ORDER BY p.created_at DESC
LIMIT 12;
```

```
                                                                                         QUERY PLAN
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Limit  (cost=335143.76..335269.07 rows=12 width=329) (actual time=975.115..977.212 rows=12 loops=1)
   ->  Result  (cost=335143.76..647656.45 rows=29927 width=329) (actual time=958.859..960.923 rows=12 loops=1)
         ->  Sort  (cost=335143.76..335218.57 rows=29927 width=313) (actual time=958.478..958.530 rows=12 loops=1)
               Sort Key: p.created_at DESC
               Sort Method: top-N heapsort  Memory: 32kB
               ->  Nested Loop Left Join  (cost=443.61..334457.68 rows=29927 width=313) (actual time=32.108..908.629 rows=29927 loops=1)
                     ->  Nested Loop Left Join  (cost=443.31..250528.98 rows=29927 width=222) (actual time=32.064..554.942 rows=29927 loops=1)
                           ->  Hash Join  (cost=443.02..1311.88 rows=29927 width=115) (actual time=32.005..172.199 rows=29927 loops=1)
                                 Hash Cond: (p.user_id = u.id)
                                 ->  Seq Scan on posts p  (cost=0.00..790.27 rows=29927 width=104) (actual time=0.033..42.931 rows=29927 loops=1)
                                 ->  Hash  (cost=318.01..318.01 rows=10001 width=27) (actual time=31.887..31.892 rows=10001 loops=1)
                                       Buckets: 16384  Batches: 1  Memory Usage: 712kB
                                       ->  Seq Scan on users u  (cost=0.00..318.01 rows=10001 width=27) (actual time=0.022..16.623 rows=10001 loops=1)
                           ->  Limit  (cost=0.29..8.31 rows=1 width=115) (actual time=0.007..0.008 rows=1 loops=29927)
                                 ->  Index Scan using images_ref_id_type_created on images  (cost=0.29..8.31 rows=1 width=115) (actual time=0.004..0.004 rows=1 loops=29927)
                                       Index Cond: ((ref_id = p.id) AND (type = 'post'::image_type))
                     ->  Memoize  (cost=0.30..8.33 rows=1 width=107) (actual time=0.005..0.007 rows=1 loops=29927)
                           Cache Key: p.user_id
                           Cache Mode: binary
                           Hits: 19927  Misses: 10000  Evictions: 0  Overflows: 0  Memory Usage: 1466kB
                           ->  Subquery Scan on ui  (cost=0.29..8.32 rows=1 width=107) (actual time=0.009..0.011 rows=1 loops=10000)
                                 ->  Limit  (cost=0.29..8.31 rows=1 width=115) (actual time=0.006..0.007 rows=1 loops=10000)
                                       ->  Index Scan using images_ref_id_type_created on images images_1  (cost=0.29..8.31 rows=1 width=115) (actual time=0.003..0.003 rows=1 loops=10000)
                                             Index Cond: ((ref_id = p.user_id) AND (type = 'profile'::image_type))
         SubPlan 1
           ->  Aggregate  (cost=5.69..5.70 rows=1 width=8) (actual time=0.133..0.134 rows=1 loops=12)
                 ->  Index Only Scan using likes_post_id on likes  (cost=0.43..5.53 rows=63 width=0) (actual time=0.007..0.068 rows=46 loops=12)
                       Index Cond: (post_id = p.id)
                       Heap Fetches: 0
         SubPlan 2
           ->  Aggregate  (cost=4.72..4.73 rows=1 width=8) (actual time=0.050..0.051 rows=1 loops=12)
                 ->  Index Only Scan using comments_post_id on comments  (cost=0.42..4.69 rows=15 width=0) (actual time=0.006..0.026 rows=15 loops=12)
                       Index Cond: (post_id = p.id)
                       Heap Fetches: 0
 Planning Time: 0.509 ms
 JIT:
   Functions: 45
   Options: Inlining false, Optimization false, Expressions true, Deforming true
   Timing: Generation 1.656 ms, Inlining 0.000 ms, Optimization 0.474 ms, Emission 15.891 ms, Total 18.021 ms
 Execution Time: 979.172 ms
(40 rows)
```

Thats a lot of information. but we can add a `created_at` index on `posts`

```sql
CREATE INDEX posts_created_at ON posts(created_at DESC);
```

```
                                                                                 QUERY PLAN
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Limit  (cost=1.17..262.67 rows=12 width=329) (actual time=0.570..4.663 rows=12 loops=1)
   ->  Nested Loop Left Join  (cost=1.17..652163.77 rows=29927 width=329) (actual time=0.563..4.604 rows=12 loops=1)
         ->  Nested Loop Left Join  (cost=0.87..256096.45 rows=29927 width=222) (actual time=0.089..0.625 rows=12 loops=1)
               ->  Nested Loop  (cost=0.58..6879.36 rows=29927 width=115) (actual time=0.055..0.344 rows=12 loops=1)
                     ->  Index Scan using posts_created_at on posts p  (cost=0.29..2749.19 rows=29927 width=104) (actual time=0.022..0.073 rows=12 loops=1)
                     ->  Memoize  (cost=0.30..0.35 rows=1 width=27) (actual time=0.015..0.016 rows=1 loops=12)
                           Cache Key: p.user_id
                           Cache Mode: logical
                           Hits: 0  Misses: 12  Evictions: 0  Overflows: 0  Memory Usage: 2kB
                           ->  Index Scan using users_pkey on users u  (cost=0.29..0.34 rows=1 width=27) (actual time=0.009..0.009 rows=1 loops=12)
                                 Index Cond: (id = p.user_id)
               ->  Limit  (cost=0.29..8.31 rows=1 width=115) (actual time=0.014..0.016 rows=1 loops=12)
                     ->  Index Scan using images_ref_id_type_created on images  (cost=0.29..8.31 rows=1 width=115) (actual time=0.009..0.010 rows=1 loops=12)
                           Index Cond: ((ref_id = p.id) AND (type = 'post'::image_type))
         ->  Memoize  (cost=0.30..8.33 rows=1 width=107) (actual time=0.022..0.029 rows=1 loops=12)
               Cache Key: p.user_id
               Cache Mode: binary
               Hits: 0  Misses: 12  Evictions: 0  Overflows: 0  Memory Usage: 3kB
               ->  Subquery Scan on ui  (cost=0.29..8.32 rows=1 width=107) (actual time=0.017..0.022 rows=1 loops=12)
                     ->  Limit  (cost=0.29..8.31 rows=1 width=115) (actual time=0.013..0.015 rows=1 loops=12)
                           ->  Index Scan using images_ref_id_type_created on images images_1  (cost=0.29..8.31 rows=1 width=115) (actual time=0.009..0.009 rows=1 loops=12)
                                 Index Cond: ((ref_id = p.user_id) AND (type = 'profile'::image_type))
         SubPlan 1
           ->  Aggregate  (cost=5.69..5.70 rows=1 width=8) (actual time=0.203..0.205 rows=1 loops=12)
                 ->  Index Only Scan using likes_post_id on likes  (cost=0.43..5.53 rows=63 width=0) (actual time=0.010..0.105 rows=46 loops=12)
                       Index Cond: (post_id = p.id)
                       Heap Fetches: 0
         SubPlan 2
           ->  Aggregate  (cost=4.72..4.73 rows=1 width=8) (actual time=0.077..0.080 rows=1 loops=12)
                 ->  Index Only Scan using comments_post_id on comments  (cost=0.42..4.69 rows=15 width=0) (actual time=0.009..0.042 rows=15 loops=12)
                       Index Cond: (post_id = p.id)
                       Heap Fetches: 0
 Planning Time: 0.925 ms
 Execution Time: 4.922 ms
(34 rows)
```

The index did improve the performance but still the query is slow. This is because the `likes` and `comments` `count(*)`

I will think about how to tackle this particular case. I am already using redis to cache the request
for a set amount of time but that doesn't solve the main problem

-   Create a field of `likes` and `comments` in post table and update it periodically?

One thing to add about using `OFFSET` it can be slow if the offset is high as it fetches all
the rows and then offset/delete not required rows. It is better to use alternative here is a good
article on this [https://use-the-index-luke.com/no-offset](https://use-the-index-luke.com/no-offset)

That is all for now. I will update this as I learn more about optimizing Postgres queries.
