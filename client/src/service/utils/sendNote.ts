import * as nodemailer from 'nodemailer';
import { UserAuthTypeEnum } from '@/constants/common';
import Dysmsapi, * as dysmsapi from '@alicloud/dysmsapi20170525';
// @ts-ignore
import * as OpenApi from '@alicloud/openapi-client';
// @ts-ignore
import * as Util from '@alicloud/tea-util';

const myEmail = process.env.MY_MAIL;
const mailTransport = nodemailer.createTransport({
  host: 'smtp.feishu.cn',
  service: 'feishu',
  secure: true, //安全方式发送,建议都加上
  auth: {
    user: myEmail,
    pass: process.env.MAILE_CODE
  }
});

const emailMap: { [key: string]: any } = {
  [UserAuthTypeEnum.register]: {
    subject: '注册 LMU 平台账号',
    html: (code: string) => `<div>您正在注册 LMU AI开放平台账号，验证码为：${code}</div>`
  },
  [UserAuthTypeEnum.findPassword]: {
    subject: '修改 LMU 平台密码',
    html: (code: string) => `<div>您正在修改 LMU AI开放平台账号密码，验证码为：${code}</div>`
  }
};

export const sendEmailCode = (email: string, code: string, type: `${UserAuthTypeEnum}`) => {
  return new Promise((resolve, reject) => {
    const options = {
      from: `"LMU " ${myEmail}`,
      to: email,
      subject: emailMap[type]?.subject,
      html: emailMap[type]?.html(code)
    };
    mailTransport.sendMail(options, function (err, msg) {
      if (err) {
        console.log('send email error->', err);
        reject('发生邮件异常');
      } else {
        resolve('');
      }
    });
  });
};

export const sendPhoneCode = async (phone: string, code: string) => {
  const accessKeyId = process.env.aliAccessKeyId;
  const accessKeySecret = process.env.aliAccessKeySecret;
  const signName = process.env.aliSignName;
  const templateCode = process.env.aliTemplateCode;
  const endpoint = 'dysmsapi.aliyuncs.com';

  const sendSmsRequest = new dysmsapi.SendSmsRequest({
    phoneNumbers: phone,
    signName,
    templateCode,
    templateParam: `{"code":${code}}`
  });

  const config = new OpenApi.Config({ accessKeyId, accessKeySecret, endpoint });
  const client = new Dysmsapi(config);
  const runtime = new Util.RuntimeOptions({});
  const res = await client.sendSmsWithOptions(sendSmsRequest, runtime);
  if (res.body.code !== 'OK') {
    return Promise.reject(res.body.message || '发送短信失败');
  }
};
