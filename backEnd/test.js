const request = require("supertest");
const expect = require("chai").expect;
const { app, db } = require("./server");

describe("POST /login", () => {
  it("responds with json", (done) => {
    request(app)
      .post("/login")
      .send({ username: "sakib", password: "sakib" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("token");
        done();
      });
  });
});


describe("GET /doctors", () => {
  it("responds with json", (done) => {
    request(app)
      .get("/doctors")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});

describe("POST /doctor-login", () => {
  it("responds with json", (done) => {
    request(app)
      .post("/doctor-login")
      .send({ username: "tyler_durden", password: "password1" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("token");
        done();
      });
  });
});

describe("GET /appointments/user/:userId", () => {
  it("responds with json", (done) => {
    request(app)
      .get("/appointments/user/1") // replace 1 with a valid user ID
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});

describe("GET /user/:id", () => {
  it("responds with json", (done) => {
    request(app)
      .get("/user/1") // replace 1 with a valid user ID
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});

after(function (done) {
  db.close();
  done();
});
