create table if not exists players (
                                       id serial primary key,
                                       first_name varchar,
                                       last_name varchar,
                                       gender varchar check ( gender in ( 'MALE', 'FEMALE' )),
    birth_date timestamp check ( birth_date < current_date + interval '1 day' ),
    team varchar,
    country varchar check ( country in ( 'USA' , 'ITALY' , 'RUSSIA' ))
);

