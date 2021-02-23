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
values (3, 1, 2, 2);

insert into
	locations(client_id, latitude, longitude)
values(1, '65.546989', '56.568974'), (2, '70.546989', '75.568974');

insert into
	owners(owner_fullname, owner_username, owner_password)
values('Ali Valiyev', 'gimmick', crypt('123', gen_salt('bf'))), ('Karim Salimov', 'karim', crypt('123', gen_salt('bf')));
