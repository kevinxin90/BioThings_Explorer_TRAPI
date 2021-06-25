const app = require("../../../src/app");
const request = require('supertest');
const fs = require("fs");
var path = require('path');

describe("Testing /v1/query endpoints", () => {
    const invalid_example_folder = path.resolve(__dirname, "../../../examples/v1.1/invalid");
    test("Input query graph that doesn't pass Swagger Validation should return 400 error", async () => {
        const InvalidInputQueryGraph = {
            message1: 1
        };
        await request(app)
            .post("/v1/query")
            .send(InvalidInputQueryGraph)
            .set('Accept', 'application/json')
            .expect(400)
            .expect('Content-Type', /json/)
            .then(response => {
                expect(response.body).toHaveProperty("error", "Your input query graph is invalid");
            })
    })

    test("Input query graph missing nodes definition should return 400", async () => {
        const query_with_nodes_undefined = JSON.parse(fs.readFileSync(path.join(invalid_example_folder, "query_graph_with_nodes_not_specified.json")));
        await request(app)
            .post("/v1/query")
            .send(query_with_nodes_undefined)
            .set('Accept', 'application/json')
            .expect(400)
            .expect('Content-Type', /json/)
            .then(response => {
                expect(response.body).toHaveProperty("error", "Your input query graph is invalid");
            })
    })

    test("Input query graph missing edges definition should return 400 error", async () => {
        const query_with_edges_undefined = JSON.parse(fs.readFileSync(path.join(invalid_example_folder, "query_graph_with_edges_not_specified.json")));
        await request(app)
            .post("/v1/query")
            .send(query_with_edges_undefined)
            .set('Accept', 'application/json')
            .expect(400)
            .expect('Content-Type', /json/)
            .then(response => {
                expect(response.body).toHaveProperty("error", "Your input query graph is invalid");
            })
    })

    test("Input query graph with nodes and edges mismatch should return 400 error", async () => {
        const query_with_nodes_and_edges_not_match = JSON.parse(fs.readFileSync(path.join(invalid_example_folder, "query_graph_with_nodes_and_edges_not_match.json")));
        await request(app)
            .post("/v1/query")
            .send(query_with_nodes_and_edges_not_match)
            .set('Accept', 'application/json')
            .expect(400)
            .expect('Content-Type', /json/)
            .then(response => {
                expect(response.body).toHaveProperty("error", "Your input query graph is invalid");
            })
    })
})