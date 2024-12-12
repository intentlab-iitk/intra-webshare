# Intra WebShare

Below are instructions for setting up intra-webshare with nginx.

**NOTE:** This is a developement config so, it is hosted on localhost:8080.

## Ngnix setup instructions

- **Install:** Update system and install nginx using below command
   ```bash
   sudo apt update && sudo apt install nginx -y
   ```

- **Start nginx:** Enable and start nginx using below command
   ```bash
   sudo systemctl enable nginx && sudo systemctl start nginx
   ```

-  **Allow in firewall:** If you're using UFW, allow Nginx traffic
   ```bash
   sudo ufw allow 'Nginx Full'
   ```

-  **Set nginx config:**  
   - Copy pre-configured conf file and update php-fpm version
      ```bash
      sudo cp configs/IntraWebShare.conf /etc/nginx/sites-available
      sudo chmod +x configs/update-phpv.sh && sudo configs/update-phpv.sh
      ```
   - Create new soft link
      ```bash
      sudo ln -s /etc/nginx/sites-available/IntraWebShare.conf /etc/nginx/sites-enabled
      ```

- **Restart nginx:** Check the conf and restart the ngnix
   ```bash
   sudo nginx -t && sudo systemctl restart nginx
   ```

----
[Back to main](README.md)