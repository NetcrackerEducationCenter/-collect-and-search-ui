const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka1:9092', 'kafka2:9092', 'localhost:9092']
})

const producer = kafka.producer()

//Send messages to kafka topic 'ui-search-requests'
const  send = async function()  {
     // Creating new producer to ui-search-results-topic
  let requestValue = {
    ticketSystem: "JIRA",  //this.state.ticketSystem,
    login: "kakashka_am@mail.ru", //this.state.email,
    password: 'IdBigXbJL2aIgrJhGGg2B1A8', //this.state.tocken,
    url: "https://netcrackereducation.atlassian.net/", //this.state.url
    userId: '1232131'
  };

  try {
    const producer = kafka.producer()

    await producer.connect()
    await producer.send({
      topic: 'ui-search-requests',
      messages: [
        { value: requestValue },
      ],
    })

    await producer.disconnect()

    return 'OK';

  } catch (err) {
    console.log("Producer err: " + err)
    return 'ERR';
  }
}
