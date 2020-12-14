const client = require("twilio")("TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN");

const people = [
  {
    name: "Person 1",
    number: "+11111111",
  },
  {
    name: "Person 2",
    number: "+111111111",
  },
];

if (people.length % 2 !== 0) {
  throw "Must provide an even number of people";
}

(async function () {
  let senderShuffle = [...people.sort(() => (Math.random() > 0.5 ? 1 : -1))];
  let recieverShuffle = [...people.sort(() => (Math.random() > 0.5 ? 1 : -1))];

  while (senderShuffle.length) {
    const sender = senderShuffle.pop();

    let reciever;
    if (recieverShuffle[recieverShuffle.length - 1].name === sender.name) {
      reciever = recieverShuffle.shift();
    } else {
      reciever = recieverShuffle.pop();
    }

    await sendSMS(sender, reciever.name);
  }
})();

async function sendSMS(to, giftRecipient) {
  await client.messages.create({
    from: "+14111111111",
    to: to.number,
    body: giftRecipient,
  });
}
