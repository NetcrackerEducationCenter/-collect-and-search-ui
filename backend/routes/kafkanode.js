const kafkaNode = require('kafka-node');
const config = require('config');
const { Router } = require('express');
const router = Router();

router.post('/push', async (req, res) => {
    try {
        const Producer = kafkaNode.Producer;
        const client = new kafkaNode.KafkaClient(config.get('port'));
        const producer = new Producer(client);
        const kafka_topic = 'ui-search-requests';
        console.log(kafka_topic);
        let msg = {
            'ticketSystem': req.body.ticketSystem,
            'login': req.body.login,
            'password': req.body.password,
            'url': req.body.url,
            'userId': req.body.userId
        }
        console.log(msg);
        // let payloads = [
        //     {
        //         topic: kafka_topic,
        //         messages: msg
        //     }
        // ];
        // producer.on('ready', async function () {
        //     let push_status = producer.send(payloads, (err, data) => {
        //         if (err) {
        //             console.log('[kafka-producer -> ' + kafka_topic + ']: broker failed');
        //         } else {
        //             console.log('[kafka-producer -> ' + kafka_topic + ']: broker success');
        //         }
        //     });
        // });
        // producer.on('error', function (err) {
        //     console.log(err);
        //     console.log('[kafka-producer -> ' + kafka_topic + ']: connection error');
        //     // throw err;
        // });
    }
    catch (e) {
        console.log(e);
    }
})

module.exports = router;
