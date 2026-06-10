create extension if not exists pgcrypto;

create table if not exists users (
  id text primary key default concat('user_', replace(gen_random_uuid()::text, '-', '')),
  name text not null,
  email text not null unique,
  avatar text,
  role text not null default 'viewer',
  plan text not null default 'free',
  "followersCount" integer not null default 0,
  "followingCount" integer not null default 0,
  "createdAt" date not null default current_date,
  "isVerified" boolean not null default false
);

create table if not exists sports (
  id text primary key,
  name text not null,
  slug text not null unique,
  icon text not null default '',
  color text not null default '#ef4444',
  "liveCount" integer not null default 0,
  "totalEvents" integer not null default 0
);

create table if not exists games (
  id text primary key default concat('game_', replace(gen_random_uuid()::text, '-', '')),
  name text not null,
  slug text not null unique,
  category text not null default 'Game',
  cover text not null default '',
  "heroImage" text not null default '',
  "accentColor" text not null default '#ef4444',
  "liveStreams" integer not null default 0,
  viewers integer not null default 0,
  followers integer not null default 0,
  "isFeatured" boolean not null default false
);

create table if not exists channels (
  id text primary key,
  name text not null,
  slug text not null unique,
  description text not null default '',
  avatar text not null default '',
  banner text not null default '',
  owner_id text not null references users(id),
  sport_id text not null references sports(id),
  "followersCount" integer not null default 0,
  "isVerified" boolean not null default false,
  "isLive" boolean not null default false,
  "totalViews" integer not null default 0
);

create table if not exists events (
  id text primary key,
  title text not null,
  description text not null default '',
  thumbnail text not null default '',
  sport_id text not null references sports(id),
  channel_id text not null references channels(id),
  status text not null,
  "startTime" timestamptz not null default now(),
  "endTime" timestamptz,
  viewers integer not null default 0,
  likes integer not null default 0,
  views integer not null default 0,
  tags jsonb not null default '[]',
  "streamUrl" text,
  "streamServers" jsonb not null default '[]',
  "isFeatured" boolean not null default false,
  "isPremium" boolean not null default false,
  teams jsonb
);

create table if not exists videos (
  id text primary key,
  title text not null,
  description text not null default '',
  thumbnail text not null default '',
  "videoUrl" text not null,
  duration integer not null default 0,
  views integer not null default 0,
  likes integer not null default 0,
  sport_id text not null references sports(id),
  channel_id text not null references channels(id),
  type text not null,
  "publishedAt" timestamptz not null default now(),
  tags jsonb not null default '[]'
);

create table if not exists ads (
  id text primary key,
  type text not null,
  "videoUrl" text,
  "imageUrl" text,
  "clickUrl" text not null,
  duration integer,
  advertiser text not null,
  sport text,
  "skipAfter" integer
);

create table if not exists ad_events (
  id bigserial primary key,
  ad_id text,
  event_type text not null,
  impression_id text,
  payload jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists event_views (
  id bigserial primary key,
  event_id text not null references events(id) on delete cascade,
  viewer_key text not null,
  created_at timestamptz not null default now(),
  unique (event_id, viewer_key)
);

create table if not exists event_likes (
  id bigserial primary key,
  event_id text not null references events(id) on delete cascade,
  viewer_key text not null,
  created_at timestamptz not null default now(),
  unique (event_id, viewer_key)
);

create table if not exists video_likes (
  id bigserial primary key,
  video_id text not null references videos(id) on delete cascade,
  viewer_key text not null,
  created_at timestamptz not null default now(),
  unique (video_id, viewer_key)
);

create table if not exists channel_follows (
  id bigserial primary key,
  channel_id text not null references channels(id) on delete cascade,
  viewer_key text not null,
  created_at timestamptz not null default now(),
  unique (channel_id, viewer_key)
);

create table if not exists campaigns (
  id text primary key default concat('camp_', replace(gen_random_uuid()::text, '-', '')),
  name text not null,
  advertiser text not null,
  budget numeric(12,2) not null default 0,
  spent numeric(12,2) not null default 0,
  impressions integer not null default 0,
  clicks integer not null default 0,
  ctr numeric(8,2) not null default 0,
  cpm numeric(8,2) not null default 0,
  status text not null default 'active',
  "startDate" date not null default current_date,
  "endDate" date not null default current_date + 30,
  "targetSports" jsonb not null default '[]',
  "targetCountries" jsonb not null default '[]'
);

create or replace view channel_details as
select
  c.id,
  c.name,
  c.slug,
  c.description,
  c.avatar,
  c.banner,
  row_to_json(u)::jsonb as owner,
  row_to_json(s)::jsonb as sport,
  c."followersCount",
  c."isVerified",
  c."isLive",
  c."totalViews"
from channels c
join users u on u.id = c.owner_id
join sports s on s.id = c.sport_id;

create or replace view event_details as
select
  e.id,
  e.title,
  e.description,
  e.thumbnail,
  row_to_json(s)::jsonb as sport,
  row_to_json(cd)::jsonb as channel,
  e.status,
  e."startTime",
  e."endTime",
  e.viewers,
  e.likes,
  e.views,
  e.tags,
  e."streamUrl",
  e."isFeatured",
  e."isPremium",
  e.teams,
  e."streamServers"
from events e
join sports s on s.id = e.sport_id
join channel_details cd on cd.id = e.channel_id;

create or replace view video_details as
select
  v.id,
  v.title,
  v.description,
  v.thumbnail,
  v."videoUrl",
  v.duration,
  v.views,
  v.likes,
  row_to_json(s)::jsonb as sport,
  row_to_json(cd)::jsonb as channel,
  v.type,
  v."publishedAt",
  v.tags
from videos v
join sports s on s.id = v.sport_id
join channel_details cd on cd.id = v.channel_id;
