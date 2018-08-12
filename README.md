# 10000people-challenge

目指せ10,000人！

- build
```shell
$ docker build -t counter .
```

- env
  - Ambient関係
    - AMBIENT_CHANNEL_ID
    - AMBIENT_WRITE_KEY
    - AMBIENT_READ_KEY
    - AMBIENT_USER_KEY
  - Cron
    - COUNTER_CRON
      - Cron書式で

- run
```shell
$ docker run -it -v `pwd`/src:/home/counter/src -e AMBIENT_CHANNEL_ID=XXX -e AMBIENT_WRITE_KEY=XXX -e AMBIENT_READ_KEY=XXX -e AMBIENT_USER_KEY=XXX -e COUNTER_CRON=XXX counter
```
