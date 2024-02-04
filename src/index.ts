import { login } from "./discord/index.js";
import { sync } from "./models/index.js";
import { pruneCooldowns } from "./prune.js";
import * as http from 'http'

try {
    await sync();
    await pruneCooldowns();
    await login();
    
    const PORT = process.env.PORT || 3000;

    const server = http.createServer((req, res) => {
        // No server logic here
    });

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
catch (err) {
    console.error(err);
}
