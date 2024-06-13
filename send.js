function get_local_ip() {
    const local_ip = "172.20.X.X";
    document.write(local_ip);
    console.log(`Found device IP: ${local_ip}`);
}

get_local_ip()
