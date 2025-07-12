import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"]
})

const producer = kafka.producer();
const consumer = kafka.consumer({groupId: "test-group"});


async function main() {
  await producer.connect();
  await producer.send({
    topic: "quickstart-events",
    messages: [{
      value: "Hello from kafka user from nodejs app"
    }]
  })

  await consumer.connect();
  await consumer.subscribe({ topic: "quickstart-events", fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message?.value?.toString(),
      })
    },
  })
}


main();
