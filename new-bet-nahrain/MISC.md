# todo
- adjust line-height for all small text to 1.3, or 1.4 for android

```
ffmpeg -i audio/new_bet_nahrain.m4a -filter:a "volume=5dB" audio/new_bet_nahrain_5dB.m4a
ffmpeg -i new_bet_nahrain_5dB.m4a -t 125.75 new_bet_nahrain_5dB-trim.m4a
```

deploy check
- check timing on android device when tapping lyrics
