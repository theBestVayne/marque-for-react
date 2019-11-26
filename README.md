---
title:
  en-US: Marquee
  zh-CN: 滚动字幕
---

滚动字幕组件，用于展示平台公告

## API

| 参数        | 说明                              | 类型         |   默认值  |
|------------|-----------------------------------|--------------|-----------|
| content    | 滚动的文字内容，可以是html字符串     | `string`     |     -     |
| step       | 每次滚动的水平偏移量，单位是px        | `number`     |     1    |
| frequency  | 每次滚动的时间间隔，单位是毫秒        | `number`     |    20    |
| loop       | 最大循环次数                        | `number`      |    0    |
| onStart    | 开始滚动的回调                      | `function`   |    -    |
| onEnd      | 结束滚动的回调                      | `function`   |    -    |
