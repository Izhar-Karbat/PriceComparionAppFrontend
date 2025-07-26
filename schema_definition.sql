--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


--
-- Name: vector; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA public;


--
-- Name: EXTENSION vector; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION vector IS 'vector data type and ivfflat and hnsw access methods';


--
-- Name: trigger_set_timestamp(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.trigger_set_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: barcode_to_canonical_map; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.barcode_to_canonical_map (
    barcode character varying(50),
    canonical_masterproductid integer
);


--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    categoryid integer NOT NULL,
    categoryname character varying(150) NOT NULL,
    parentcategoryid integer,
    description text,
    createdat timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: categories_categoryid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_categoryid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_categoryid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_categoryid_seq OWNED BY public.categories.categoryid;


--
-- Name: filesprocessed; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.filesprocessed (
    fileid integer NOT NULL,
    retailerid integer NOT NULL,
    storeid integer,
    filename character varying(255) NOT NULL,
    filetype character varying(50) NOT NULL,
    filehash character varying(64),
    filesize bigint,
    filetimestamp timestamp with time zone,
    processingstatus character varying(50) DEFAULT 'PENDING'::character varying,
    processingstarttime timestamp with time zone,
    processingendtime timestamp with time zone,
    rowsadded integer,
    errormessage text,
    createdat timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    download_url text,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    lastattempttime timestamp with time zone
);


--
-- Name: filesprocessed_fileid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.filesprocessed_fileid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: filesprocessed_fileid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.filesprocessed_fileid_seq OWNED BY public.filesprocessed.fileid;


--
-- Name: prices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.prices (
    priceid bigint NOT NULL,
    listingid bigint NOT NULL,
    price numeric(10,2) NOT NULL,
    unitprice numeric(10,4),
    unitofmeasureprice numeric(10,2),
    unitofmeasure character varying(50),
    priceupdatetimestamp timestamp with time zone NOT NULL,
    filesourcetimestamp timestamp with time zone NOT NULL,
    promotionid bigint,
    createdat timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: prices_priceid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.prices_priceid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: prices_priceid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.prices_priceid_seq OWNED BY public.prices.priceid;


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    masterproductid integer NOT NULL,
    barcode character varying(50),
    productname character varying(512) NOT NULL,
    brand character varying(150),
    manufacturername character varying(255),
    categoryid integer,
    standardunitofmeasure character varying(30),
    standardpackagesize numeric(10,3),
    description text,
    imageurl character varying(512),
    isweighted boolean DEFAULT false,
    tags text[],
    createdat timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    embedding public.vector(512)
);


--
-- Name: products_masterproductid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_masterproductid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_masterproductid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_masterproductid_seq OWNED BY public.products.masterproductid;


--
-- Name: promotionproductlinks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.promotionproductlinks (
    promotionproductlinkid bigint NOT NULL,
    promotionid bigint NOT NULL,
    retailerid integer NOT NULL,
    retaileritemcode character varying(100) NOT NULL,
    isapplicable boolean DEFAULT true,
    createdat timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: promotionproductlinks_promotionproductlinkid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.promotionproductlinks_promotionproductlinkid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: promotionproductlinks_promotionproductlinkid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.promotionproductlinks_promotionproductlinkid_seq OWNED BY public.promotionproductlinks.promotionproductlinkid;


--
-- Name: promotions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.promotions (
    promotionid bigint NOT NULL,
    retailerid integer NOT NULL,
    retailerpromotioncode character varying(100) NOT NULL,
    promotiondescription text,
    promotionupdatedate timestamp with time zone,
    promotionstartdate timestamp with time zone,
    promotionenddate timestamp with time zone,
    promotiontypeid integer,
    promotiontypename character varying(100),
    discounttypeid integer,
    discountrate numeric(10,2),
    minqty numeric(10,2),
    maxqty numeric(10,2),
    totalqtyallowed numeric(10,2),
    discountedprice numeric(10,2),
    discountedpriceperuom numeric(10,4),
    minnoofitemofered integer,
    weightunit character varying(50),
    qtyinclubonly boolean,
    rawpromotiondata jsonb,
    createdat timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    subchainid text
);


--
-- Name: promotions_promotionid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.promotions_promotionid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: promotions_promotionid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.promotions_promotionid_seq OWNED BY public.promotions.promotionid;


--
-- Name: retailerproductlistings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.retailerproductlistings (
    listingid bigint NOT NULL,
    masterproductid integer,
    retailerid integer NOT NULL,
    storeid integer NOT NULL,
    retaileritemcode character varying(100) NOT NULL,
    retailerproductname character varying(512),
    retailerbrand character varying(150),
    retailerunitofmeasure character varying(50),
    retailerpackagesize character varying(50),
    isweightedbyretailer boolean,
    allowsmanufacturebreakdown boolean,
    itemtype integer,
    rawproductdata jsonb,
    firstseenat timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    lastseenat timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: retailerproductlistings_listingid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.retailerproductlistings_listingid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: retailerproductlistings_listingid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.retailerproductlistings_listingid_seq OWNED BY public.retailerproductlistings.listingid;


--
-- Name: retailers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.retailers (
    retailerid integer NOT NULL,
    retailername character varying(100) NOT NULL,
    chainid character varying(50),
    pricetransparencyportalurl character varying(255),
    fileformat character varying(20) DEFAULT 'XML'::character varying,
    notes text,
    createdat timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: retailers_retailerid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.retailers_retailerid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: retailers_retailerid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.retailers_retailerid_seq OWNED BY public.retailers.retailerid;


--
-- Name: stores; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stores (
    storeid integer NOT NULL,
    retailerid integer NOT NULL,
    retailerspecificstoreid character varying(50) NOT NULL,
    storename character varying(255),
    address text,
    city character varying(100),
    postalcode character varying(20),
    latitude numeric(9,6),
    longitude numeric(9,6),
    isactive boolean DEFAULT true,
    rawstoredata jsonb,
    createdat timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    subchainid text,
    subchainname character varying(255),
    storetype text,
    lastupdatedfromstoresfile text
);


--
-- Name: stores_storeid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stores_storeid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: stores_storeid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stores_storeid_seq OWNED BY public.stores.storeid;


--
-- Name: categories categoryid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN categoryid SET DEFAULT nextval('public.categories_categoryid_seq'::regclass);


--
-- Name: filesprocessed fileid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.filesprocessed ALTER COLUMN fileid SET DEFAULT nextval('public.filesprocessed_fileid_seq'::regclass);


--
-- Name: prices priceid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prices ALTER COLUMN priceid SET DEFAULT nextval('public.prices_priceid_seq'::regclass);


--
-- Name: products masterproductid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN masterproductid SET DEFAULT nextval('public.products_masterproductid_seq'::regclass);


--
-- Name: promotionproductlinks promotionproductlinkid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotionproductlinks ALTER COLUMN promotionproductlinkid SET DEFAULT nextval('public.promotionproductlinks_promotionproductlinkid_seq'::regclass);


--
-- Name: promotions promotionid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotions ALTER COLUMN promotionid SET DEFAULT nextval('public.promotions_promotionid_seq'::regclass);


--
-- Name: retailerproductlistings listingid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.retailerproductlistings ALTER COLUMN listingid SET DEFAULT nextval('public.retailerproductlistings_listingid_seq'::regclass);


--
-- Name: retailers retailerid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.retailers ALTER COLUMN retailerid SET DEFAULT nextval('public.retailers_retailerid_seq'::regclass);


--
-- Name: stores storeid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stores ALTER COLUMN storeid SET DEFAULT nextval('public.stores_storeid_seq'::regclass);


--
-- Name: categories categories_categoryname_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_categoryname_key UNIQUE (categoryname);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (categoryid);


--
-- Name: filesprocessed filesprocessed_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.filesprocessed
    ADD CONSTRAINT filesprocessed_pkey PRIMARY KEY (fileid);


--
-- Name: filesprocessed filesprocessed_retailerid_filename_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.filesprocessed
    ADD CONSTRAINT filesprocessed_retailerid_filename_key UNIQUE (retailerid, filename);


--
-- Name: prices prices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prices
    ADD CONSTRAINT prices_pkey PRIMARY KEY (priceid);


--
-- Name: products products_barcode_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_barcode_key UNIQUE (barcode);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (masterproductid);


--
-- Name: promotionproductlinks promotionproductlinks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotionproductlinks
    ADD CONSTRAINT promotionproductlinks_pkey PRIMARY KEY (promotionproductlinkid);


--
-- Name: promotionproductlinks promotionproductlinks_promotionid_retailerid_retaileritemco_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotionproductlinks
    ADD CONSTRAINT promotionproductlinks_promotionid_retailerid_retaileritemco_key UNIQUE (promotionid, retailerid, retaileritemcode);


--
-- Name: promotions promotions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT promotions_pkey PRIMARY KEY (promotionid);


--
-- Name: promotions promotions_retailerid_retailerpromotioncode_promotionstartd_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT promotions_retailerid_retailerpromotioncode_promotionstartd_key UNIQUE (retailerid, retailerpromotioncode, promotionstartdate, promotionenddate);


--
-- Name: retailerproductlistings retailerproductlistings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.retailerproductlistings
    ADD CONSTRAINT retailerproductlistings_pkey PRIMARY KEY (listingid);


--
-- Name: retailerproductlistings retailerproductlistings_retailer_store_item_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.retailerproductlistings
    ADD CONSTRAINT retailerproductlistings_retailer_store_item_key UNIQUE (retailerid, storeid, retaileritemcode);


--
-- Name: retailerproductlistings retailerproductlistings_retailerid_storeid_retaileritemcode_ite; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.retailerproductlistings
    ADD CONSTRAINT retailerproductlistings_retailerid_storeid_retaileritemcode_ite UNIQUE (retailerid, storeid, retaileritemcode, itemtype);


--
-- Name: retailerproductlistings retailerproductlistings_retailerid_storeid_retaileritemcode_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.retailerproductlistings
    ADD CONSTRAINT retailerproductlistings_retailerid_storeid_retaileritemcode_key UNIQUE (retailerid, storeid, retaileritemcode, itemtype);


--
-- Name: retailers retailers_chainid_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.retailers
    ADD CONSTRAINT retailers_chainid_key UNIQUE (chainid);


--
-- Name: retailers retailers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.retailers
    ADD CONSTRAINT retailers_pkey PRIMARY KEY (retailerid);


--
-- Name: retailers retailers_retailername_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.retailers
    ADD CONSTRAINT retailers_retailername_key UNIQUE (retailername);


--
-- Name: stores stores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_pkey PRIMARY KEY (storeid);


--
-- Name: stores stores_retailerid_retailerspecificstoreid_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_retailerid_retailerspecificstoreid_key UNIQUE (retailerid, retailerspecificstoreid);


--
-- Name: idx_barcode_map_barcode; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_barcode_map_barcode ON public.barcode_to_canonical_map USING btree (barcode);


--
-- Name: idx_categories_parent_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_categories_parent_category_id ON public.categories USING btree (parentcategoryid);


--
-- Name: idx_filesprocessed_file_timestamp; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_filesprocessed_file_timestamp ON public.filesprocessed USING btree (filetimestamp DESC);


--
-- Name: idx_filesprocessed_retailer_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_filesprocessed_retailer_id ON public.filesprocessed USING btree (retailerid);


--
-- Name: idx_filesprocessed_store_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_filesprocessed_store_id ON public.filesprocessed USING btree (storeid);


--
-- Name: idx_prices_file_source_timestamp; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_prices_file_source_timestamp ON public.prices USING btree (filesourcetimestamp DESC);


--
-- Name: idx_prices_listing_id_timestamp_desc; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_prices_listing_id_timestamp_desc ON public.prices USING btree (listingid, priceupdatetimestamp DESC);


--
-- Name: idx_prices_listingid_timestamp_desc; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_prices_listingid_timestamp_desc ON public.prices USING btree (listingid, priceupdatetimestamp DESC);


--
-- Name: idx_prices_promotion_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_prices_promotion_id ON public.prices USING btree (promotionid) WHERE (promotionid IS NOT NULL);


--
-- Name: idx_products_barcode; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_products_barcode ON public.products USING btree (barcode) WHERE (barcode IS NOT NULL);


--
-- Name: idx_products_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_products_category_id ON public.products USING btree (categoryid);


--
-- Name: idx_products_product_name_brand; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_products_product_name_brand ON public.products USING btree (productname, brand);


--
-- Name: idx_promotionproductlinks_promotion_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_promotionproductlinks_promotion_id ON public.promotionproductlinks USING btree (promotionid);


--
-- Name: idx_promotionproductlinks_retailer_itemcode; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_promotionproductlinks_retailer_itemcode ON public.promotionproductlinks USING btree (retailerid, retaileritemcode);


--
-- Name: idx_promotions_dates; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_promotions_dates ON public.promotions USING btree (promotionstartdate, promotionenddate);


--
-- Name: idx_promotions_retailer_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_promotions_retailer_id ON public.promotions USING btree (retailerid);


--
-- Name: idx_retailerproductlistings_last_seen_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_retailerproductlistings_last_seen_at ON public.retailerproductlistings USING btree (lastseenat DESC);


--
-- Name: idx_retailerproductlistings_master_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_retailerproductlistings_master_product_id ON public.retailerproductlistings USING btree (masterproductid) WHERE (masterproductid IS NOT NULL);


--
-- Name: idx_retailerproductlistings_retailer_store_itemcode; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_retailerproductlistings_retailer_store_itemcode ON public.retailerproductlistings USING btree (retailerid, storeid, retaileritemcode);


--
-- Name: idx_rpl_chain_item_type; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_rpl_chain_item_type ON public.retailerproductlistings USING btree (retailerid, retaileritemcode, COALESCE(itemtype, '-1'::integer)) WHERE (storeid IS NULL);


--
-- Name: idx_rpl_masterproductid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_rpl_masterproductid ON public.retailerproductlistings USING btree (masterproductid);


--
-- Name: idx_rpl_retailerid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_rpl_retailerid ON public.retailerproductlistings USING btree (retailerid);


--
-- Name: idx_rpl_store_item_type; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_rpl_store_item_type ON public.retailerproductlistings USING btree (retailerid, storeid, retaileritemcode, COALESCE(itemtype, '-1'::integer));


--
-- Name: idx_rpl_unique_chain_item_type; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_rpl_unique_chain_item_type ON public.retailerproductlistings USING btree (retailerid, retaileritemcode, COALESCE(itemtype, '-1'::integer)) WHERE (storeid IS NULL);


--
-- Name: idx_rpl_unique_store_item_type; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_rpl_unique_store_item_type ON public.retailerproductlistings USING btree (retailerid, storeid, retaileritemcode, COALESCE(itemtype, '-1'::integer)) WHERE (storeid IS NOT NULL);


--
-- Name: idx_stores_city; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_stores_city ON public.stores USING btree (city);


--
-- Name: idx_stores_retailer_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_stores_retailer_id ON public.stores USING btree (retailerid);


--
-- Name: products_embedding_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_embedding_idx ON public.products USING hnsw (embedding public.vector_l2_ops);


--
-- Name: retailerproductlistings_chain_item_type_unique_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX retailerproductlistings_chain_item_type_unique_idx ON public.retailerproductlistings USING btree (retailerid, retaileritemcode, COALESCE(itemtype, '-1'::integer)) WHERE (storeid IS NULL);


--
-- Name: rpl_unique_chain_item_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX rpl_unique_chain_item_idx ON public.retailerproductlistings USING btree (retailerid, retaileritemcode, COALESCE(itemtype, '-1'::integer)) WHERE (storeid IS NULL);


--
-- Name: rpl_unique_store_item_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX rpl_unique_store_item_idx ON public.retailerproductlistings USING btree (retailerid, storeid, retaileritemcode, COALESCE(itemtype, '-1'::integer));


--
-- Name: filesprocessed set_filesprocessed_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_filesprocessed_updated_at BEFORE UPDATE ON public.filesprocessed FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: categories categories_parentcategoryid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_parentcategoryid_fkey FOREIGN KEY (parentcategoryid) REFERENCES public.categories(categoryid) ON DELETE SET NULL;


--
-- Name: filesprocessed filesprocessed_retailerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.filesprocessed
    ADD CONSTRAINT filesprocessed_retailerid_fkey FOREIGN KEY (retailerid) REFERENCES public.retailers(retailerid) ON DELETE RESTRICT;


--
-- Name: filesprocessed filesprocessed_storeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.filesprocessed
    ADD CONSTRAINT filesprocessed_storeid_fkey FOREIGN KEY (storeid) REFERENCES public.stores(storeid) ON DELETE SET NULL;


--
-- Name: prices prices_listingid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prices
    ADD CONSTRAINT prices_listingid_fkey FOREIGN KEY (listingid) REFERENCES public.retailerproductlistings(listingid) ON DELETE CASCADE;


--
-- Name: prices prices_promotionid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prices
    ADD CONSTRAINT prices_promotionid_fkey FOREIGN KEY (promotionid) REFERENCES public.promotions(promotionid) ON DELETE SET NULL;


--
-- Name: products products_categoryid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_categoryid_fkey FOREIGN KEY (categoryid) REFERENCES public.categories(categoryid) ON DELETE SET NULL;


--
-- Name: promotionproductlinks promotionproductlinks_promotionid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotionproductlinks
    ADD CONSTRAINT promotionproductlinks_promotionid_fkey FOREIGN KEY (promotionid) REFERENCES public.promotions(promotionid) ON DELETE CASCADE;


--
-- Name: promotionproductlinks promotionproductlinks_retailerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotionproductlinks
    ADD CONSTRAINT promotionproductlinks_retailerid_fkey FOREIGN KEY (retailerid) REFERENCES public.retailers(retailerid) ON DELETE RESTRICT;


--
-- Name: promotions promotions_retailerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT promotions_retailerid_fkey FOREIGN KEY (retailerid) REFERENCES public.retailers(retailerid) ON DELETE RESTRICT;


--
-- Name: retailerproductlistings retailerproductlistings_masterproductid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.retailerproductlistings
    ADD CONSTRAINT retailerproductlistings_masterproductid_fkey FOREIGN KEY (masterproductid) REFERENCES public.products(masterproductid) ON DELETE SET NULL;


--
-- Name: retailerproductlistings retailerproductlistings_retailerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.retailerproductlistings
    ADD CONSTRAINT retailerproductlistings_retailerid_fkey FOREIGN KEY (retailerid) REFERENCES public.retailers(retailerid) ON DELETE RESTRICT;


--
-- Name: retailerproductlistings retailerproductlistings_storeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.retailerproductlistings
    ADD CONSTRAINT retailerproductlistings_storeid_fkey FOREIGN KEY (storeid) REFERENCES public.stores(storeid) ON DELETE RESTRICT;


--
-- Name: stores stores_retailerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_retailerid_fkey FOREIGN KEY (retailerid) REFERENCES public.retailers(retailerid) ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

