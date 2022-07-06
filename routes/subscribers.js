let express = require("express");
const subscriber = require("../models/subscriber");
let router = express.Router();
let Subscriber = require("../models/subscriber");

let getSubscriber = async (req, res, next) => {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "cannot find the user" });
    }
    res.subscriber = subscriber;
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//get all
router.get("/", async (req, res) => {
  try {
    let subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
//get one
router.get("/:id", getSubscriber, (req, res) => {
  res.status(200).json(res.subscriber);
});
//create one
router.post("/", async (req, res) => {
  let subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    let newsubscriber = await subscriber.save();
    res.status(201).json(newsubscriber);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
//update one
router.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
  }
  try {
    let updatedSubscriber = await res.subscriber.save();
    res.status(200).json(updatedSubscriber);
  } catch (err) {
    res.status(400);
  }
});
//delete one
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: "successfully deleted" });
  } catch (err) {
    res.status(500).json({ message: "unable to delete" });
  }
});

module.exports = router;
