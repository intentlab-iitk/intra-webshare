const os = require('os');

function getLocalIP() {
    const networkInterfaces = os.networkInterfaces();
    let ipAddr = '';
    for (const interfaceName in networkInterfaces) {
        const networkInterface = networkInterfaces[interfaceName];
        for (const alias of networkInterface) {
            if (alias.family === 'IPv4' && !alias.internal) {
                ipAddr = alias.address;
                break;
            }
        }
        if (ipAddr) {
            break;
        }
    }
    // document.write(ipAddr)
    return ipAddr;
}

console.log('Your IP Address is:', getLocalIP());
