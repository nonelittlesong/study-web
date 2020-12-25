#!/bin/bash

start=$(date +'%N')

json=$(wget -qO- http://127.0.0.1:3001/api/time)

jyear=$(echo ${json} | jq '.year')
jmonth=$(echo ${json} | jq '.month')
jdate=$(echo ${json} | jq '.date')
jhours=$(echo ${json} | jq '.hours')
jminutes=$(echo ${json} | jq '.minutes')
jseconds=$(echo ${json} | jq '.seconds')

echo ${jyear}
echo ${jmonth}
echo ${jdate}
echo ${jhours}
echo ${jminutes}
echo ${jseconds}

end=$(date +)