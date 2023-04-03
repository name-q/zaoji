"use strict";
const Service = require("egg").Service;

const { Configuration, OpenAIApi } = require("openai");

class ChatGPTService extends Service {
  // 提问ChatGPT
  async putQuestions(content, { model } = { model: "gpt-3.5-turbo-0301" }) {
    let { ctx, config } = this;
    if (
      !content ||
      Object.prototype.toString.call(content) !== "[object String]"
    )
      throw "参数错误";
    try {
      const configuration = new Configuration({
        apiKey: config.OPENAI_KEY,
      });
      const openai = new OpenAIApi(configuration);
      let messages = [
        {
          role: "user",
          content,
        },
      ];
      const result = await openai.createChatCompletion({
        // 配置侧
        model,
        messages,
      });
      return result.data;
    } catch {
      ctx.logger.error("put questions To ChatGPT error, content:", content);
      throw "操作失败";
    }
  }

  /**
   * 保存对话讯息
   * @param {*} user_id _id
   * @param {*} message chatGPT result message
   * @param {*} title 提问的第一个消息前20个字
   */
  async saveMessage(user_id, message, title) {
    let { ctx } = this;
    try {
      title = String(title).slice(0, 20);
      if (!title) return;
      let createTime = Date.now();
      // 载入数据库
      let { message_history, _id } = await ctx.service.mongo.save(
        "ChatGPTMessage",
        {
          createTime,
          updateTime: createTime,
          user_id,
          message_history: [message],
          title,
        }
      );
      return { createTime, message_history, updateTime: createTime, _id };
    } catch (error) {
      ctx.logger.error("saveMessage error:", error);
    }
  }
}
module.exports = ChatGPTService;
