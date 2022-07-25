# MySQL 异常手册

## 1. group by

```diff
mysql> select * from data_worker
    -> group by mac_address;
- ERROR 1055 (42000): Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'aoi-labeling.data_worker.machine_id' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by
```

参考：

- https://stackoverflow.com/questions/41887460/select-list-is-not-in-group-by-clause-and-contains-nonaggregated-column-inc

