# NOT

语法

```
[NOT] boolean_expression
```

例 1，`not in`

```sql
SELECT *
FROM employees
WHERE first_name NOT IN ( 'John', 'Dale', 'Susan' );
```

例 2，`is not null`

```sql
SELECT *
FROM employees
WHERE last_name IS NOT NULL;
```

例 3，`not like`

```sql
SELECT employee_id, last_name, first_name
FROM employees
WHERE last_name NOT LIKE 'A%';
```

例 4，`not between`

```sql
SELECT *
FROM employees
WHERE employee_id NOT BETWEEN 200 AND 250;
```

例 5，`not exists`

```sql
SELECT *
FROM employees
WHERE NOT EXISTS (SELECT *
                  FROM contacts
                  WHERE employees.last_name = contacts.last_name
                  AND employees.first_name = contacts.first_name);
```
