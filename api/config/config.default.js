/* eslint valid-jsdoc: "off" */

'use strict';

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
    }
    
  };

  config.keys = appInfo.name + '_1620206666@qq.com';

  config.middleware = [];

  const userConfig = {
  };

  return {
    ...config,
    ...userConfig,
  };
};