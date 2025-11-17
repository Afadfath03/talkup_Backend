# SETUP PUBLIK ACCESS DI AZURE VM

## 1. NETWORK SECURITY GROUP (NSG) - ALLOW TRAFFIC

Di Azure Portal:

```
Resource Groups > [Your RG] > [Your VM] > Networking > Network Settings > Create port rule
```

Buka ports berikut:

### Inbound Rules yang perlu dibuka:
- **HTTP (80)** - untuk API
- **HTTPS (443)** - untuk API secure
- **PostgreSQL (5432)** - untuk database (opsional, lebih aman di restricted IPs)
- **SSH (22)** - untuk management

Contoh di Azure CLI:
```bash
# HTTP
az network nsg rule create \
  --resource-group myResourceGroup \
  --nsg-name myNetworkSecurityGroup \
  --name allow-http \
  --priority 1001 \
  --source-address-prefixes '*' \
  --source-port-ranges '*' \
  --access Allow \
  --protocol Tcp \
  --destination-address-prefixes '*' \
  --destination-port-ranges 80

# HTTPS
az network nsg rule create \
  --resource-group myResourceGroup \
  --nsg-name myNetworkSecurityGroup \
  --name allow-https \
  --priority 1002 \
  --source-address-prefixes '*' \
  --source-port-ranges '*' \
  --access Allow \
  --protocol Tcp \
  --destination-address-prefixes '*' \
  --destination-port-ranges 443

# PostgreSQL (optional - restrict to specific IPs)
az network nsg rule create \
  --resource-group myResourceGroup \
  --nsg-name myNetworkSecurityGroup \
  --name allow-postgres \
  --priority 1003 \
  --source-address-prefixes '203.0.113.0/24' \
  --source-port-ranges '*' \
  --access Allow \
  --protocol Tcp \
  --destination-address-prefixes '*' \
  --destination-port-ranges 5432
```

## 2. DOCKER COMPOSE SUDAH CONFIGURED

Docker Compose sudah include:
- **Nginx reverse proxy** di port 80/443
- **App** di port 3000 (internal, tidak expose)
- **PostgreSQL** di port 5432 (dapat di-restrict)

## 3. SSL/HTTPS (OPTIONAL - RECOMMENDED)

### Option A: Menggunakan Let's Encrypt (Recommended)

```bash
# SSH ke Ubuntu VM
ssh azureuser@<your-public-ip>

# Clone Certbot setup
cd /path/to/talkup_Backend

# Create SSL directory
mkdir -p ssl

# Install Certbot
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

# Dapatkan certificate (ganti example.com dengan domain Anda)
sudo certbot certonly \
  --standalone \
  -d your-domain.com \
  -d www.your-domain.com

# Copy certificates ke project
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem ssl/
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem ssl/
sudo chown $USER:$USER ssl/*.pem
```

### Option B: Menggunakan Self-Signed Certificate

```bash
mkdir -p ssl

# Generate self-signed certificate (valid 365 hari)
openssl req -x509 -newkey rsa:4096 -keyout ssl/privkey.pem -out ssl/fullchain.pem -days 365 -nodes \
  -subj "/C=ID/ST=State/L=City/O=Organization/CN=your-domain.com"
```

### Konfigurasi HTTPS di nginx.conf:

```nginx
upstream app {
    server app:3000;
}

server {
    listen 80;
    server_name _;
    
    # Redirect HTTP ke HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name _;
    
    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    client_max_body_size 50M;

    location / {
        proxy_pass http://app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 4. SETUP DI UBUNTU VM

```bash
# 1. SSH ke VM
ssh azureuser@<your-public-ip>

# 2. Install Docker & Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 3. Clone repository
git clone https://github.com/Afadfath03/talkup_Backend.git
cd talkup_Backend

# 4. Copy dan setup .env
cp .env.example .env
# Edit .env dengan nilai production
nano .env

# 5. Jalankan Docker Compose
docker-compose up -d

# 6. Verify status
docker-compose ps
docker-compose logs -f app

# 7. Test API
curl http://localhost/api/v1/health-check
```

## 5. AKSES API & DATABASE

### API Access:
```
http://<azure-vm-public-ip>/api/v1/health-check
http://<azure-vm-public-ip>/api-docs
```

### Database Access (dari local machine):

```bash
# Install psql client (jika belum)
# macOS: brew install libpq
# Ubuntu: sudo apt-get install postgresql-client
# Windows: Download dari https://www.postgresql.org/download/windows/

# Connect ke database
psql -h <azure-vm-public-ip> \
     -U postgres \
     -d talkup_db \
     -p 5432
```

Atau gunakan GUI tool seperti:
- DBeaver
- pgAdmin
- DataGrip

### Connection string:
```
postgresql://postgres:postgres123@<azure-vm-public-ip>:5432/talkup_db
```

## 6. DOMAIN POINTING (OPTIONAL)

Jika menggunakan domain:

1. Di registrar domain, update DNS records:
```
Type: A
Name: @
Value: <azure-vm-public-ip>
```

2. Atau jika ingin subdomain:
```
Type: A
Name: api
Value: <azure-vm-public-ip>
```

3. Tunggu DNS propagate (biasanya 5-30 menit)

## 7. MONITORING & MAINTENANCE

```bash
# Lihat logs
docker-compose logs -f

# Restart services
docker-compose restart

# Update image dan restart
docker-compose pull
docker-compose up -d

# Backup database
docker-compose exec postgres pg_dump -U postgres talkup_db > backup.sql

# Restore database
docker-compose exec -T postgres psql -U postgres talkup_db < backup.sql
```

## 8. FIREWALL AZURE (UBUNTU)

Jika Ubuntu punya firewall built-in:

```bash
# Enable UFW (Uncomplicated Firewall)
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP
sudo ufw allow 80/tcp

# Allow HTTPS
sudo ufw allow 443/tcp

# Allow PostgreSQL (dari specific IP saja)
sudo ufw allow from 203.0.113.0 to any port 5432/tcp

# Check status
sudo ufw status
```

## Checklist:

- [ ] NSG rules opened (80, 443, 5432)
- [ ] Docker & Docker Compose installed
- [ ] Repository cloned
- [ ] .env configured dengan production values
- [ ] SSL certificate configured (optional tapi recommended)
- [ ] `docker-compose up -d` running
- [ ] API accessible via public IP
- [ ] Database accessible via psql atau GUI tool
- [ ] DNS configured (jika pakai domain)
- [ ] Firewall rules setup
- [ ] Backup strategy planned
