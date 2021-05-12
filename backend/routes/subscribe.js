const router = require("express").Router();
const webpush = require("web-push");
require("dotenv").config();
const Subscribers = require("../models/subscription.model");

const subs  = {"endpoint":"https://fcm.googleapis.com/fcm/send/e2qb0k0V3PM:APA91bGaOodlxf8C8jWl3KsA-hAzKSXlOMj4NVVBLRsCXJnARG8Fi95vclThYfony5GwE6SSSiI5imOKfvNGOo25m9WqeGZfWgXwwLPuSXfisn8n_DBteYPYWz56Kt--Mc5iae5fhtBj","expirationTime":null,"keys":{"p256dh":"BNA5t1if0qclHY6krgAllMiOVMk4RkI0KizPPdNQKacerEWt5mZ4vLlcYO-RqTj-vlCKYGd8hkK_iiDD7GtKlJU","auth":"3BhpWiFHbg8rpXqYkWFZCw"}}

const publicVapidKey = "BGZpPKao_Ys-a6IwmeITyD5j2oqH3Oc74c3BbaEOeJ94Lm7pusHcepolWmrkWBJ9pVWuO0J6hCJ4-41uqbA79nQ";
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails("mailto:iamsh4r10@gmail.com", publicVapidKey, privateVapidKey);

router.post('/', (req,res) => {
    newSub = new Subscribers({
        endpoint: req.body.endpoint,
        keys: req.body.keys
    });
    newSub.save()
        .then(() => res.json(newSub))
        .catch(err => res.sendStatus(400));
})

module.exports = router;
