insert into products (
  product_name, 
  product_price,
  product_image,
  product_info
)
values
  ('Set Go''sht', 26000, 'https://prnt.sc/104ppev', 'Info about product'),
  ('Set KFC', 26000, 'https://prnt.sc/104pv2t', 'Info about product')
;

insert into reserves( reserve_product_count, product_id)
values (5, 1), (3, 2);

insert into 
	clients( tg_user_id, tg_first_name, tg_last_name, tg_username, tg_phone)
values (789123, 'Ali', 'Valiyev', 'gimmick', '998975562189'), (879546, 'Salim', 'Karimov', 'gimmick', '998975568888');

insert into
	sales(sale_product_count, product_id, client_id, location_id)
values (2, 1, 1, 2)
;

insert into
	locations(client_id, latitude, longitude)
values(1, '65.546989', '56.568974'), (1, '70.546989', '75.568974');

insert into
	owners(owner_fullname, owner_username, owner_password)
values('Ali Valiyev', 'gimmick', crypt('123', gen_salt('bf'))), ('Karim Salimov', 'karim', crypt('123', gen_salt('bf')));


select
  s.sale_id,
  s.sale_date,
  s.sale_completed,
  s.sale_product_count,
  s.sale_product_count,
  l.latitude,
  l.longitude,
  p.product_name,
  p.product_price,
  p.product_image,
  p.product_info
from
  sales as s
join
  products as p on p.product_id = s.product_id
join
  locations as l on l.location_id = s.location_id
;

select
  s.sale_product_count,
  p.product_name,
  p.product_price
from 
  sales as s
join
  products as p on p.product_id = s.product_id
where
  s.status = 0 and s.client_id = 15;

  insert into 
    sales (
      sale_product_count,
      product_id,
      client_id,
      location_id
    )
  values
    ($1, $2, $3, $4)

create unique index idx_product_id on sales(product_id);

-------------------------------------------

select
  array_agg(s.sale_id) as sale_id,
  array_agg(s.sale_date) as sale_date,
  array_agg(s.sale_status) as sale_status,
  array_agg(s.sale_product_count) as product_count,
  array_agg(l.latitude) as latitude,
  array_agg(l.longitude) as longitude,
  array_agg(p.product_name) as product_name,
  array_agg(p.product_price) as product_price,
  array_agg(p.product_image) as product_image,
  array_agg(p.product_info) as product_info,
  c.tg_username as tg_username,
  c.tg_phone as tg_phone,
  c.tg_first_name as tg_first_name,
  c.tg_last_name,
  c.client_id
from
  sales as s
join
  products as p on p.product_id = s.product_id
join
  locations as l on l.location_id = s.location_id
join
  clients as c on c.client_id = s.client_id
where
  s.location_id <> 0
group by c.client_id
order by sale_date asc
;

------------------------------

select 
  array_agg(product_id) as product,
  array_agg(sale_product_count) as product_count,
  client_id
from 
  sales 
group by client_id;

