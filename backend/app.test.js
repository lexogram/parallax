const request = require("supertest");
const openApp = require("./app");

describe("Test the root path", rootPathTest);

function rootPathTest() {
  test("It should respond to the GET method", getMethodTest);
}

function getMethodTest(done) {
  const { app, closeApp } = openApp();

  const checkResponse = (response) => {
    expect(response.statusCode).toBe(200);
    closeApp(done);
  };

  request(app).get("/").then(checkResponse);
};
