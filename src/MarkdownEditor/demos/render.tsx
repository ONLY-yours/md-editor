﻿import { MarkdownEditor } from '@ant-design/md-editor';
import { Card } from 'antd';
import React from 'react';
const defaultValue = `<!-- {"MarkdownType": "report", "id": "8", "section_ids": " [15, 16, 17] "} -->

# 腾讯研究报告

<!-- {"MarkdownType": "section", "id": "15" } -->

## 创始人

腾讯，全称深圳市腾讯计算机系统有限公司，是由五位创始人共同创立的，他们是马化腾、张志东、许晨晔、陈一丹和曾李青。 以下是关于这些创始人的详细信息： 马化腾 马化腾，1971 年 10 月 29 日出生于广东省东方县（现海南省东方市）八所港，广东汕头人，汉族，无党派人士。他毕业于深圳大学电子工程系计算机专业。马化腾是腾讯科技（深圳）有限公司的创始人、董事会主席、首席执行官，并曾是中华人民共和国第十二、十三届全国人民代表大会代表 。马化腾在 1998 年 11 月 11 日与合伙人共同注册成立了腾讯，并在 2004 年 6 月 16 日带领腾讯在香港联合交易所有限公司主板上市。 张志东 张志东，马化腾的同学，被称为 QQ 之父。他的计算机技术非常出色，曾是深圳大学最拔尖的学生之一。张志东在腾讯担任 CTO，并在 2014 年 9 月离职，转任腾讯公司终身荣誉顾问及腾讯学院荣誉院长等职位 。

<!-- {"MarkdownType": "section", "id": "16" } -->


<!--{"mergeCells":[{"row":1,"col":0,"rowspan":13,"colspan":1},{"row":14,"col":0,"rowspan":10,"colspan":1},{"row":24,"col":0,"rowspan":2,"colspan":1},{"row":26,"col":0,"rowspan":6,"colspan":1}] }-->\n| 大类别   | 子问题                          | 详情 | 是否符合 |\n|--------|-----------------------------|----|------|\n| **商业模式** | 要求行业空间大，至少得是千亿rmb利润规模以上，最好是万亿规模 | 中国游戏市场规模超千亿，在线教育/音乐等新兴赛道持续增长 | 符合 |\n|        | 行业规模会随着时间上升             | 手游/海外市场驱动行业增长，但受政策周期影响 | 符合 |\n|        | 显性进入壁垒：政策、牌照             | 游戏版号审批制度构成强政策壁垒 | 优秀 |\n|        | 隐性进入壁垒                     | 14年游戏研发积累+顶级IP储备+用户生态 | 优秀 |\n|        | 用户使用偏好                     | 《梦幻西游》等头部产品用户生命周期超10年 | 优秀 |\n|        | 专利、技术优势                   | 自研Messiah引擎/AI音乐生成技术 | 符合 |\n|        | 是否有网络效应                   | 游戏社交属性形成有限网络效应 | 符合 |\n|        | 毛利率 > 40%                   | 2023年毛利率60.95% | 优秀 |\n|        | ROE > 20%                    | 2023年ROE 22% | 符合 |\n|        | 净利润 > 15%                   | 2023年净利率28.37% | 优秀 |\n|        | 品牌优势                       | 中国第二大手游厂商，App Store畅销榜TOP10常年占3席 | 优秀 |\n|        | 成本优势                       | 研运一体化+自有用户平台降低获客成本 | 符合 |\n|        | 转换成本                       | 游戏账号资产/社交关系链形成中等转换成本 | 符合 |\n| **企业文化** | 是否股东导向                     | 连续6年提高分红，2023年股息支付率27% | 优秀 |\n|        | 是否言行一致                     | 管理层长期专注核心业务，无战略摇摆记录 | 优秀 |\n|        | 是否行事风格谨慎                   | 现金资产占比总资产35%，零有息负债 | 优秀 |\n|        | 是否专注                       | 游戏收入占比72%，业务集中度持续提升 | 优秀 |\n|        | 是否乱投资、乱花钱                 | 战略投资聚焦游戏产业链，商誉占比<1% | 符合 |\n|        | 是否有道德败坏的行为                 | 无重大ESG负面事件记录 | 符合 |\n|        | 是否强调用户导向，为消费者提供优质的产品与服务 | 用户净推荐值(NPS)行业领先 | 优秀 |\n|        | 对员工是否权责到位                 | 游戏工作室合伙人制度激发创造力 | 符合 |\n|        | 是否内部选拔                     | CEO丁磊任职27年，核心团队均为内部培养 | 优秀 |\n|        | 是否公平合理、对等互利的对待上下游商业合作伙伴 | 与暴雪解约事件展现契约精神 | 符合 |\n| **估值**   | 当前P/S, P/E 在历史水平         | P/E 17.2x处近五年25%分位 | 符合 |\n|        | FCF/Market Cap 与10年期国债收益率比较 | FCF Yield 4.77% vs 国债4.7% | 符合 |\n| **杂项**   | 是否不是政策不鼓励行业               | 游戏行业监管常态化，网易版号获取率100% | 符合 |\n|        | 是否是政策支持行业                 | 数字创意产业属"十四五"规划重点 | 符合 |\n|        | 不受关税影响                      | 海外收入占比<10% | 优秀 |\n|        | 不受技术封锁影响                    | 游戏引擎完全自主可控 | 优秀 |\n|        | 不受战争影响                      | 主要市场在中国大陆 | 优秀 |\n|        | 不受疫情影响                      | 线上业务占比95%+ | 优秀 |\n\n


## 表格


| 业务          | 2021Q1  | 2021Q2  | 2021Q3  | 2021Q4  | 2022Q1  | 2022Q2  | 2022Q3  | 2022Q4  | 2023Q1  | 2023Q2  | 2023Q3  | 2023Q4  |
| ------------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| 收入          | 135,303 | 138,259 | 142,368 | 144,188 | 135,471 | 134,034 | 140,093 | 144,954 | 149,986 | 149,208 | 154,625 | 155,200 |
| 增值服务      | 72,443  | 72,013  | 75,203  | 71,913  | 72,738  | 71,683  | 72,727  | 70,417  | 79,337  | 74,211  | 75,748  | 69,100  |
| 网络游戏     | 43,600  | 43,000  | 44,900  | 42,800  | 43,600  | 42,500  | na      | na      | na      | 44,500  | 46,000  | 40,900  |
| 社交网络收入 | 28,800  | 29,000  | 30,300  | 29,100  | 29,100  | 29,200  | na      | na      | na      | 29,700  | 29,700  | 28,200  |
| 网络广告      | 21,820  | 22,833  | 22,495  | 21,518  | 17,988  | 18,638  | 21,443  | 24,660  | 20,964  | 25,003  | 25,721  | 29,794  |
| 其他          | 41,040  | 43,413  | 44,670  | 50,757  | 44,745  | 43,713  | 45,923  | 49,877  | 49,685  | 49,994  | 53,156  | 54,379  |
| 金融科技     | 39,028  | 41,892  | 43,317  | 47,958  | 42,768  | 42,208  | 44,844  | 47,244  | 48,701  | 48,635  | 52,048  | 52,435  |
| 云           | 62,012   | 1,521   | 1,353   | 2,799   | 1,977   | 1,505   | 1,079   | 2,633   | 984     | 1,359   | 1,108   | 1,944   |

## 图表

<!-- {"chartType": "bar", "x":"业务", "y":"2021Q1"} -->

| 业务          | 2021Q1  | 2021Q2  | 2021Q3  | 2021Q4  | 2022Q1  | 
| ------------- | ------- | ------- | ------- | ------- | ------- |
| 收入          | 135,303 | 138,259 | 142,368 | 144,188 | 135,471 |
| 增值服务      | 72,443  | 72,013  | 75,203  | 71,913  | 72,738  | 
| 网络游戏     | 43,600  | 43,000  | 44,900  | 42,800  | 43,600  | 
| 社交网络收入 | 28,800  | 29,000  | 30,300  | 29,100  | 29,100  |
| 网络广告      | 21,820  | 22,833  | 22,495  | 21,518  | 17,988  | 
| 其他          | 41,040  | 43,413  | 44,670  | 50,757  | 44,745  |
| 金融科技     | 39,028  | 41,892  | 43,317  | 47,958  | 42,768  | 
| 云           | 162,012   | 111,521   | 111,353   | 112,799   | 111,977   | 


|    |   num_of_data_levels |
|---:|---------------------:|
|  0 |                   24 |

## 表单
\`\`\`schema
[
  {
    "title": "标题",
    "dataIndex": "title",
    "formItemProps": {
      "rules": [{ "required": true, "message": "此项为必填项" }]
    },
    "width": "md"
  }
]
\`\`\`

## 删除线
~~腾讯六大事业群腾讯六大事业群腾讯六大事业群~~
`;
export default () => {
  return (
    <MarkdownEditor
      width={'100vw'}
      height={'100vh'}
      initValue={defaultValue}
      eleItemRender={(props, defaultDom) => {
        if (
          props.element.type !== 'table-cell' &&
          props.element.type !== 'table-row' &&
          props.element.type !== 'head' &&
          props.element.type !== 'card-before' &&
          props.element.type !== 'card-after'
        ) {
          return (
            <Card
              title={props.element.type}
              extra={<a href="#">More</a>}
              style={{
                marginBottom: 24,
              }}
              hoverable
            >
              {defaultDom}
            </Card>
          );
        }
        return defaultDom as React.ReactElement;
      }}
    />
  );
};
