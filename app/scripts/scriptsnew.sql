DROP DATABASE novatec;
CREATE DATABASE novatec;

\c novatec
SET datestyle TO "ISO,YMD";

CREATE TABLE if NOT EXISTS seller(
    sellercpf VARCHAR (11) NOT NULL,
    sellername VARCHAR (50) NOT NULL,
    sellerpass VARCHAR (255) NOT NULL,
    pccommision FLOAT NOT NULL,
    dtbirth DATE NOT NULL,
    isadmin BOOLEAN NOT NULL,
    CONSTRAINT pk_seller PRIMARY KEY (sellercpf)
);

CREATE TABLE if NOT EXISTS shop(
    shopname VARCHAR (50) NOT NULL,
    CONSTRAINT pk_shop PRIMARY KEY (shopname)
);

CREATE TABLE if NOT EXISTS cash(
    dtcash DATE NOT NULL,
    change FLOAT NOT NULL,
    shopname VARCHAR (50) NOT NULL,
    isopen BOOLEAN NOT NULL,
    CONSTRAINT pk_cash PRIMARY KEY (dtcash,shopname),
    CONSTRAINT fk_cash_shop FOREIGN KEY (shopname) REFERENCES shop(shopname)
);


CREATE TABLE if NOT EXISTS sellerboard(
    sellercpf VARCHAR (11) NOT NULL,
    shopname VARCHAR (50),
    CONSTRAINT fk_sellerboard_seller FOREIGN KEY (sellercpf) REFERENCES seller(sellercpf),
    CONSTRAINT fk_sellerboard_shop FOREIGN KEY (shopname) REFERENCES shop(shopname)
);

CREATE TABLE IF NOT EXISTS sell (
    idsell INT GENERATED BY DEFAULT AS IDENTITY,
    descr VARCHAR (50) NOT NULL,
    sellvalue FLOAT NOT NULL,
    mtdpayment INT NOT NULL,
    sellercpf VARCHAR (11) NOT NULL,
    dtcash DATE NOT NULL,
    shopname VARCHAR(50) NOT NULL,
    CONSTRAINT pk_sell PRIMARY KEY (idsell),
    CONSTRAINT fk_sell_seller FOREIGN KEY (sellercpf) REFERENCES seller(sellercpf),
    CONSTRAINT fk_sell_cash FOREIGN KEY (dtcash, shopname) REFERENCES cash(dtcash, shopname)
);


CREATE TABLE if NOT EXISTS sellout(
    idout INT GENERATED BY DEFAULT AS IDENTITY,
	descr VARCHAR(50) NOT NULL,
	outvalue float NOT NULL,
	sellercpf VARCHAR(11) NOT NULL,
    dtcash DATE NOT NULL,
    shopname VARCHAR(50) NOT NULL,
    CONSTRAINT pk_sellout PRIMARY KEY (idout),
    CONSTRAINT fk_sellout_seller FOREIGN KEY (sellercpf) REFERENCES seller(sellercpf),
    CONSTRAINT fk_sellout_cash FOREIGN KEY (dtcash, shopname) REFERENCES cash(dtcash, shopname)
);

--INSERTS TESTS
INSERT INTO seller VALUES ('87823215266','dieyson','$2b$10$VvDnMc5hvZ8yPZVo.AJY7uofKDnNx/FSrsIQHdomiLyALRqznpMlu',1,'1996-01-20','TRUE');
INSERT INTO seller VALUES ('13088888812','ryan','$2b$10$.1BNPKAjS7PKKla2czdMxufQzyfS6WHmjXTBPmJu9/6lEjpAY.I3S',5,'2000-02-10','FALSE');
INSERT INTO seller VALUES ('19988823145','vitinho','$2b$10$zN2mzhTSCrE7NtSXhLJrAOPY65/u.TMTlJ4HBUnrpVLB7htK2.F.m',5,'1999-11-10','FALSE');
INSERT INTO shop VALUES('novatec');
INSERT INTO shop VALUES('box10');
INSERT INTO cash VALUES ('2023-12-01',250,'box10','TRUE');
INSERT INTO cash VALUES ('2023-12-01',250,'novatec','TRUE');
INSERT INTO cash VALUES ('2023-11-30',210,'novatec','TRUE');
INSERT INTO sellerboard VALUES ('87823215266','novatec');
INSERT INTO sellerboard VALUES ('87823215266','box10')
INSERT INTO sellerboard VALUES ('13088888812','novatec');
INSERT INTO sellerboard VALUES ('19988823145','novatec');
INSERT INTO sell (descr,sellvalue,mtdpayment,sellercpf,dtcash,shopname) VALUES ('1 Mouse',35,1,'13088888812','2023-12-01','novatec');
INSERT INTO sell (descr,sellvalue,mtdpayment,sellercpf,dtcash,shopname) VALUES ('1 Teclado',55,1,'19988823145','2023-12-01','box10');
INSERT INTO sell (descr,sellvalue,mtdpayment,sellercpf,dtcash,shopname) VALUES ('1 Carregador',25,1,'19988823145','2023-11-30','novatec');
INSERT INTO sellout (descr,outvalue,sellercpf,dtcash,shopname) VALUES ('Pastel',15,'19988823145','2023-12-01','box10');


