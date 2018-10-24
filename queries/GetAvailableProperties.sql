SELECT
       street_num,
       street_name,
       city,
       state,
       zip,
       apt_num,
       price,
       time_listed,
       number_of_beds,
       number_of_baths,
       square_ft,
       year_built
FROM property
INNER JOIN address ON property.address_id = address.id
WHERE time_sold IS NULL