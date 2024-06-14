function getLocalIP() {
    let ipAddr = '172.26.189.77'
    document.getElementById('ipAddr').textContent = ipAddr;
    return ipAddr
}

console.log('Your IP Address is:', getLocalIP());
