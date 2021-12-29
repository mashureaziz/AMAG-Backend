const express = require("express");
const dotenv = require("dotenv");
const Site = require("../models/Site");
const Audit = require("../models/Audit");
const User = require("../models/User");
const { convertDate } = require("../utils/convertDate");
dotenv.config();

const router = express.Router();

//Get all sites
router.get("/sites", async (req, res) => {
  const sites = await Site.find({})
    .sort({ createdAt: -1 })
    .select("name region siteNo latitude longitude")
    .limit(6);

  // Simulate aritifical API delay
  setTimeout(() => {
    res.status(200).json(sites);
  }, 5);
});

//Get site Details
  router.get("/site/:id", async (req, res) => {
    const siteId = req.params.id;

    const site = await Site.findById(siteId).populate({
      path: "audits",
      select: "user actionType date",
      populate: { path: "user", select: "name" },
    });

    // Simulate aritifical API delay
    setTimeout(() => {
      res.json(site);
    }, 5);
  });

// Create new Site
router.post("/site", async (req, res) => {
  const { name, region, description, latitude, longitude, user, siteNo } =
    req.body;

  const existingSite = await Site.findOne({ siteNo });
  const existingUser = await User.findById(user);

  if (existingSite) {
    res.status(400).send("Site already exists");
    return;
  }

  if (!existingUser) {
    res.status(403).send("User doesnt exist");
    return;
  }

  const newSite = new Site({
    siteNo,
    name,
    region,
    description,
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  });

  let timestamp = new Date().getTime();
  const audit = new Audit({
    user,
    actionType: "CREATED",
    siteId: newSite.id,
    date: timestamp,
  });

  newSite.set({
    audits: [audit],
  });

  await newSite.save();
  await audit.save();

  // Simulate aritifical API delay
  setTimeout(() => {
    res.json(newSite);
  }, 5);
});

// Update site
router.put("/site/:id", async (req, res) => {
  const siteId = req.params.id;
  const { name, region, description, latitude, longitude, user } = req.body;

  const site = await Site.findById(siteId);

  let timestamp = new Date().getTime();
  const newAudit = new Audit({
    user,
    actionType: "UPDATED",
    siteId: siteId,
    date: timestamp,
  });

  site.set({
    name,
    region,
    description,
    latitude,
    longitude,
    audits: [...site.audits, newAudit],
  });

  await newAudit.save();
  await site.save();

  setTimeout(() => {
    res.json(site);
  }, 1000);
});

module.exports = {
  siteRouter: router,
};
