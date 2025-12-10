create table post
(
    id      integer not null
        constraint post_pk
            primary key autoincrement,
    subject text not null,
    content text not null
);
CREATE TABLE gry
(
    id      INTEGER NOT NULL
        CONSTRAINT gry_pk
            PRIMARY KEY AUTOINCREMENT,
    subject TEXT NOT NULL,
    content TEXT NOT NULL
);