select t1.id , t1.created_by, t1.created_date, t1.last_modified_by,
        t1.last_modified_date, t1.valid_from, t1.valid_to, t1.is_enable,
        t1.device_form_id, t2.value as device_form,
        t1.device_type_id, t3.value as device_type,
        t1.currency_id, t4.value as currency,
        t1.unit_id, t5.value as unit,
        t1.group_rate, t1.division_rate, t1.single_test_mode_rate, t1.single_test_mode_hours, t1.frame_mode_times, t1.organization
 from DtsaStampingFacilityFeeRate t1
          left join META_COLUMN_VALUE t2 on t2.id = t1.device_form_id
          left join META_COLUMN_VALUE t3 on t3.id = t1.device_type_id
          left join META_COLUMN_VALUE t4 on t4.id = t1.currency_id
          left join META_COLUMN_VALUE t5 on t5.id = t1.unit_id
 where t1.id = -9056666616595476158;

select t1.id , t1.created_by, t1.created_date, t1.last_modified_by,
       t1.last_modified_date, t1.valid_from, t1.valid_to, t1.is_enable,
       t1.device_form_id, t2.value as device_form,
       t1.device_type_id, t3.value as device_type,
       t1.currency_id, t4.value as currency,
       t1.unit_id, t5.value as unit,
       t1.group_rate, t1.division_rate, t1.single_test_mode_rate, t1.single_test_mode_hours, t1.frame_mode_times, t1.organization
from (select * from DtsaStampingFacilityFeeRate where id = -9056666616595476158) t1
          left join META_COLUMN_VALUE t2 on t2.id = t1.device_form_id
          left join META_COLUMN_VALUE t3 on t3.id = t1.device_type_id
          left join META_COLUMN_VALUE t4 on t4.id = t1.currency_id
          left join META_COLUMN_VALUE t5 on t5.id = t1.unit_id

select t1.id , t1.created_by, t1.created_date, t1.last_modified_by,
       t1.last_modified_date, t1.valid_from, t1.valid_to, t1.is_enable,
       t1.device_form_id,
       (select value from META_COLUMN_VALUE where id = t1.device_form_id) device_form,
       t1.device_type_id,
       (select value from META_COLUMN_VALUE where id = t1.device_type_id) device_type,
       t1.currency_id,
       (select value from META_COLUMN_VALUE where id = t1.currency_id) currency,
       t1.unit_id,
       (select value from META_COLUMN_VALUE where id = t1.unit_id) unit,
       t1.group_rate, t1.division_rate, t1.single_test_mode_rate, t1.single_test_mode_hours, t1.frame_mode_times, t1.organization
from DtsaStampingFacilityFeeRate t1
where t1.id = -9056666616595476158;

