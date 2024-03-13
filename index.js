import express from "express";
import jsonServer from "json-server";  // Import json-server using CommonJS syntax
import auth from "json-server-auth";

const server = express();

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

const router = jsonServer.router('./data/db.json');
server.use('/api', router);
server.db = router.db;

const middlewares = jsonServer.defaults();
const rules = auth.rewriter({
    products: 444,
    featured_products: 444,
    orders: 660,
    users: 600
});

server.use(rules);
server.use(auth);
server.use(middlewares);
server.use(router);

server.listen(8000);
















// import express from "express";
// import jsonServer from "json-server";
// import fs from "fs";
// import auth from "json-server-auth";

// const server = express();
// const PORT = 8000;

// server.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     next();
// });

// // Load routes from routes.json file
// const routesData = fs.readFileSync('./data/routes.json');
// const routes = JSON.parse(routesData);

// // Define your API routes dynamically using routes from routes.json
// for (const [originalRoute, targetRoute] of Object.entries(routes)) {
//     server.get(originalRoute, (req, res) => {
//         // Replace this with your logic to fetch data from the target route
//         const data = fs.readFileSync(`./data/db.json`); // Assuming db.json is your data file
//         const jsonData = JSON.parse(data);
//         const targetData = jsonData[targetRoute];
//         res.json(targetData);
//     });
// }

// // Apply rewriting rules using auth.rewriter
// const rules = auth.rewriter({
//     products: 444,
//     featured_products: 444,
//     orders: 660,
//     users: 600
// });
// server.use(rules); // Apply rewriting rules globally

// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
