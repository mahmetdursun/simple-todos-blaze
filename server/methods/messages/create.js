import SimpleSchema from 'simpl-schema';
import { Configuration, OpenAIApi } from 'openai'
import axios from 'axios';

new ValidatedMethod({
  name: 'messages.create',
  mixins: [SignedInMixin],//? kullanıcı id si var mı yok mu kontrolü yapıyor singed-in-mixin.js den geliyor
  validate: new SimpleSchema({
    message: MessageSchema.omit('state', 'userId'), //?bunların dışında kalanları pages chat index.js dosyasında kullanıyoruz
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { message } = data;

    message.state = 'pending'
    message.userId = Meteor.userId()//? başka user ıd ile mesaj atmaya çalışılırsa engelliyor 
    // return Messages.insert(message); //? messages.js deki Messages.attachSchema(MessageSchema); kısmından geliyor
    const _id = Messages.insert(message);

    if (message.type === 'text' && message.payload.text.startsWith('/sor')) {

      const prompt = message.payload.text.substring(message.payload.text.indexOf(' ') + 1)
      openAIQuestion(_id, prompt)
    }
    return _id
  }
});

const openAIQuestion = async (_id, prompt) => {
  try {
    console.log("OpenAI Key:", Meteor.settings.OpenAI?.apiKey);

    const configuration = new Configuration({
      apiKey: Meteor.settings.OpenAI.apiKey,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 500,
    });

    console.log("OpenAI response:", response.data);

    Messages.update(
      { _id },
      {
        $set: {
          "payload.chatGPT": response.data,
          state: "sent"
        },
      }
    );
  } catch (err) {
    console.error("OpenAI error:", err.message);

    Messages.update(
      { _id },
      {
        $set: {
          state: "error"
        },
      }
    );
  }
};
