/* eslint valid-jsdoc: "off" */

'use strict';

const fs = require('fs');
const path = require('path');

module.exports = appInfo => {

  const config = exports = {
    mongoose: {
      client: {
        url: 'mongodb://admin:admin@localhost:27017/cloud-docx',
        options: {
          useCreateIndex: true,
          useFindAndModify: false,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      },
    },

    redis: {
      client: {
        port: 6379,
        host: '127.0.0.1',
        password: '',
        db: 0
      },
    },

    session: {
      key: 'SESS_ID',
      maxAge: 300000,
      httpOnly: true,
      encrypt: true,
    },

    security: {
      csrf: {
        ignore: ctx => ctx.request.url.indexOf('/api') != -1 ? true : false
      },
    },
    cors: {
      origin:'*',
      allowMethods: 'GET,PUT,POST,DELETE'
    },

    proxy: true,
    maxProxyCount: 1,
  };

  config.keys = appInfo.name + '_1620206666@qq.com';

  const userConfig = {
    // QWT过期时间 60天
    qwtEndTime: 5184000000,
    // RSA加密私钥
    PRIVATE_KEY: fs.readFileSync(path.join(__dirname, './csr/rsa_private_key.pem'), 'ascii'),
    // RSA解密公钥
    PUBLIC_KEY: fs.readFileSync(path.join(__dirname, './csr/rsa_public_key.pem'), 'ascii'),
    // OpenAI密钥
    OPENAI_KEY: fs.readFileSync(path.join(__dirname, './csr/open_ai_key.txt'), 'ascii'),
    // 问答记录层数 * ChatGPT是更具回答的上下文生成最新的回答，记录层数过高会导致mongo和带宽的压力
    QA_RECORD: 10,
  };

  return {
    ...config,
    ...userConfig,
  };
};
