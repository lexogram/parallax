const request = require("supertest");
const openApp = require("./app");

describe("Test the root path", rootPathTest);

function rootPathTest() {
  test("It should respond to the GET method", getMethodTest);
}

function getMethodTest(done) {
  const { app, closeApp } = openApp();
  const result = { done, silent: false }

  const checkResponse = (response) => {
    expect(response.statusCode).toBe(200);
    closeApp(result);
  };

  request(app).get("/").then(checkResponse);
};
