const request = require("supertest");
const app = require("../index");

//==================== site API test ====================

/**
 * Testing get all sites endpoint
 */
describe("GET /sites", function () {
  it("respond with json containing a list of all sites", function (done) {
    request(app)
      .get("/api/v1/sites")
      .set("Accept", "application/json")
      .expect(200, done);
  });
});

describe("POST /site endpoints", function () {
  let data = {
    user: "random",
    siteNo: "178",
    name: "Test",
    region: "18th and 22nd",
    description: "No longer possible",
    latitude: "90.3",
    longitude: "40.82",
  };

  it("respond 500 for non existing auditor", function (done) {
    request(app)
      .post("/api/v1/site")
      .send(data)
      .set("Accept", "application/json")
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
