SELECT type
FROM account_type
INNER JOIN users ON account_type.id = users.account_type_id
WHERE username = 'admin' AND password = 'password'