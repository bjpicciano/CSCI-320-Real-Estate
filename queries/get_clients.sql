SELECT
       client.first_name,
       client.last_name,
       client.phone_number,
       client.email,
       address.street_num,
       address.street_name,
       address.apt_num,
       address.city,
       address.state,
       address.zip,
       agent.first_name as agent_first_name,
       agent.last_name as agent_last_name,
       property.time_listed,
       property.time_sold,
       property.price
FROM client
INNER JOIN address ON home_address = address.id
INNER JOIN agent ON agent_id = agent.id
LEFT JOIN property ON client.id = property.client_id