https://nodejs.org/en/docs/guides/simple-profiling/  

We can easily run the app with the built in profiler:  
```
NODE_ENV=production node --prof app.js
```
and put some load on the server using `ab`(ApacheBench):  
```
curl -X GET "http://localhost:8080/newUser?username=matt&password=password"
ab -k -c 20 -n 250 "http://localhost:8080/auth?username=matt&password=password"
```

打印日志：  
```
node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt
```

