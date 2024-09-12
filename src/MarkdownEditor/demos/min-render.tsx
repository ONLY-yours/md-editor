﻿import { MarkdownEditor } from '@ant-design/md-editor';
import { useState } from 'react';

const defaultValue = `## 创始人

腾讯，全称深圳市腾讯计算机系统有限公司，是由五位创始人共同创立的，他们是马化腾、张志东、许晨晔、陈一丹和曾李青。 以下是关于这些创始人的详细信息： 马化腾 马化腾，1971 年 10 月 29 日出生于广东省东方县（现海南省东方市）八所港，广东汕头人，汉族，无党派人士。他毕业于深圳大学电子工程系计算机专业。马化腾是腾讯科技（深圳）有限公司的创始人、董事会主席、首席执行官，并曾是中华人民共和国第十二、十三届全国人民代表大会代表 。马化腾在 1998 年 11 月 11 日与合伙人共同注册成立了腾讯，并在 2004 年 6 月 16 日带领腾讯在香港联合交易所有限公司主板上市。 张志东 张志东，马化腾的同学，被称为 QQ 之父。他的计算机技术非常出色，曾是深圳大学最拔尖的学生之一。张志东在腾讯担任 CTO，并在 2014 年 9 月离职，转任腾讯公司终身荣誉顾问及腾讯学院荣誉院长等职位 。

<!-- {"MarkdownType": "section", "id": "16" } -->


## 表格


| 业务          | 2021Q1  | 2021Q2  | 2021Q3  | 2021Q4  | 2022Q1  | 2022Q2  | 2022Q3  | 2022Q4  | 2023Q1  | 2023Q2  | 2023Q3  | 2023Q4  |
| ------------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| 收入          | 135,303 | 138,259 | 142,368 | 144,188 | 135,471 | 134,034 | 140,093 | 144,954 | 149,986 | 149,208 | 154,625 | 155,200 |
| 增值服务      | 72,443  | 72,013  | 75,203  | 71,913  | 72,738  | 71,683  | 72,727  | 70,417  | 79,337  | 74,211  | 75,748  | 69,100  |
| -网络游戏     | 43,600  | 43,000  | 44,900  | 42,800  | 43,600  | 42,500  | na      | na      | na      | 44,500  | 46,000  | 40,900  |
| -社交网络收入 | 28,800  | 29,000  | 30,300  | 29,100  | 29,100  | 29,200  | na      | na      | na      | 29,700  | 29,700  | 28,200  |
| 网络广告      | 21,820  | 22,833  | 22,495  | 21,518  | 17,988  | 18,638  | 21,443  | 24,660  | 20,964  | 25,003  | 25,721  | 29,794  |
| 其他          | 41,040  | 43,413  | 44,670  | 50,757  | 44,745  | 43,713  | 45,923  | 49,877  | 49,685  | 49,994  | 53,156  | 54,379  |
| -金融科技     | 39,028  | 41,892  | 43,317  | 47,958  | 42,768  | 42,208  | 44,844  | 47,244  | 48,701  | 48,635  | 52,048  | 52,435  |
| -云           | 62,012   | 1,521   | 1,353   | 2,799   | 1,977   | 1,505   | 1,079   | 2,633   | 984     | 1,359   | 1,108   | 1,944   |


## Description


| 业务          | 2021Q1  | 2021Q2  | 2021Q3  | 2021Q4  | 2022Q1  | 2022Q2  | 2022Q3  | 2022Q4  | 2023Q1  | 2023Q2  | 2023Q3  | 2023Q4  |
| ------------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| 收入          | 135,303 | 138,259 | 142,368 | 144,188 | 135,471 | 134,034 | 140,093 | 144,954 | 149,986 | 149,208 | 154,625 | 155,200 |


## 图表

<!-- {"chartType": "bar", "x":"业务", "y":"2021Q1"} -->

| 业务          | 2021Q1  | 2021Q2  | 2021Q3  | 2021Q4  |
| ------------- | ------- | ------- | ------- | ------- |
| 收入          | 135,303 | 138,259 | 142,368 | 144,188 | 
| 增值服务      | 72,443  | 72,013  | 75,203  | 71,913  |
| 网络游戏     | 43,600  | 43,000  | 44,900  | 42,800  |
| 社交网络收入 | 28,800  | 29,000  | 30,300  | 29,100  | 
| 网络广告      | 21,820  | 22,833  | 22,495  | 21,518  | 
| 其他          | 41,040  | 43,413  | 44,670  | 50,757  | 
| 金融科技     | 39,028  | 41,892  | 43,317  | 47,958  | 
| 云           | 162,012   | 111,521   | 111,353   | 112,799   | 

## 图片

![](https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*9F0qRYV8EjUAAAAAAAAAAAAADml6AQ/original)

## 视频

![video:视频名](https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/A*NudQQry0ERwAAAAAAAAAAAAADtN3AQ)


## 附件
<!-- {"updateTime":"2014-07-29","collaborators":[{"Chen Shuai":33},{"Chen Shuai":33},{"Chen Shuai":33},{"Rui Ma":39},{"Rui Ma":39},{"Rui Ma":39},{"Chen Shuai":33},{"Rui Ma":39},{"ivan.cseeing":32},{"InvRet Sales Team":34},{"Chen Shuai":33},{"Rui Ma":39},{"Rui Ma":39},{"Chen Shuai":33},{"Rui Ma":39},{"Rui Ma":39},{"Chen Shuai":33}]} -->
![attachment:测试附件.pdf](https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/A*NudQQry0ERwAAAAAAAAAAAAADtN3AQ)


## 引用

上上任的武汉大学校长是李晓红。[^1][^2]

| 业务          | 2021Q1  | 2021Q2  | 2021Q3  | 2021Q4  | 
| ------------- | ------- | ------- | ------- | ------- | 
| 收入          | 135,303 | 138,259 | 142,368 | 144,188 | 
| 增值服务      | 72,443  | 72,013  | 75,203  | 71,913  | 
| -网络游戏     | 43,600  | 43,000  | 44,900  | 42,800  |
| -社交网络收入 | 28,800  | 29,000  | 30,300  | 29,100  | 
| 网络广告      | 21,820  | 22,833  | 22,495  | 21,518  | 
| 其他          | 41,040  | 43,413  | 44,670  | 50,757  | 
| -金融科技     | 39,028  | 41,892  | 43,317  | 47,958  | 
| -云           | 162,012   | 111,521   | 111,353   | 112,799   | 
> 数据来自 [^3]


[^1]:remarkjs.md
[^2]:remarkjs.md


## 表单

\`\`\`schema
[
  {
    valueType: "mindMap",
    fieldProps: {
      nodeData: {
        id: "d451a556d866ba7b",
        topic: "new topic",
        root: true,
        children: [
          {
            topic: "new node",
            id: "d451a6f027c33b1f",
            direction: 0,
            children: [
              {
                topic: "new node",
                id: "d451a724b7c10970",
              },
              {
                topic: "new node",
                id: "d451a77ca7348eae",
              },
              {
                topic: "new node",
                id: "d451a78e1ec7181c",
              },
            ],
          },
        ],
      },
    },
  },
]
\`\`\`


## 代码

\`\`\`java
Class A {
  main() {
    System.out.println("Hello World");
  }
}
\`\`\`
`;
export default () => {
  const [typewriter, setTypewriter] = useState(true);
  return (
    <div
      style={{
        padding: 64,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        maxWidth: 600,
        margin: '0 auto',
        backgroundColor: '#f0f0f0',
      }}
      onClick={() => setTypewriter(!typewriter)}
    >
      {defaultValue
        .split('##')
        .filter((item) => item)
        .map((item, index) => {
          return (
            <div
              key={index}
              style={{
                padding: 24,
                borderRadius: 24,
                backgroundColor: '#fff',
                border: '1px solid #f0f0f0',
                margin: '20px auto',
                width: '100%',
              }}
            >
              <MarkdownEditor
                toc={false}
                key={index}
                width={'100%'}
                typewriter={typewriter}
                height={'auto'}
                readonly
                initValue={'## ' + item.trim()}
                onChange={(e, s) => {
                  console.log('onChange', s);
                }}
              />
            </div>
          );
        })}
    </div>
  );
};
