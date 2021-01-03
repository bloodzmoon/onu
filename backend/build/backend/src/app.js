"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var http_1 = __importDefault(require("http"));
var routes_1 = __importDefault(require("./routes"));
var socket_1 = __importDefault(require("./socket"));
var PORT = process.env.PORT || 5000;
var app = express_1.default();
var server = http_1.default.createServer(app);
app.use(routes_1.default);
app.use(cors_1.default());
app.use(express_1.default.json());
socket_1.default.init(server);
server.listen(PORT, function () {
    console.log("Server has started at port " + PORT);
});
// test
