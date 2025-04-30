# mkcert - Instalación y Configuración

[mkcert](https://github.com/FiloSottile/mkcert) es una herramienta sencilla para crear certificados SSL locales auto-firmados que son confiables por navegadores. 

Este archivo proporciona instrucciones para instalar y configurar `mkcert` en macOS y Linux.

---

Si ya cumples con los requisitos previos, el comando rápido es:
```bash
mkcert {your-hostname}
```
---

## Requisitos Previos

- **Homebrew** (macOS)
- **curl** y **openssl** (Linux)
- Acceso de superusuario (sudo)

---

## Instalación

### macOS

1. **Instalar mkcert usando Homebrew**  
   Ejecuta el siguiente comando:
   ```bash
   brew install mkcert
   ```

2. **Instalar nss (opcional para Firefox)**  
   Si usas Firefox, instala `nss`:
   ```bash
   brew install nss
   ```

3. **Configurar la CA local**  
   Inicializa la autoridad certificadora (CA) en tu máquina:
   ```bash
   mkcert -install
   ```

---

### Linux

1. **Descargar el binario de mkcert**  
   Descarga la última versión de `mkcert` desde su repositorio oficial:  
   [https://github.com/FiloSottile/mkcert/releases](https://github.com/FiloSottile/mkcert/releases)

   Por ejemplo, usa `wget` o `curl`:
   ```bash
   curl -Lo mkcert https://dl.filippo.io/mkcert/latest?for=linux/amd64
   ```

2. **Hacer el binario ejecutable**  
   ```bash
   chmod +x mkcert
   ```

3. **Moverlo a un directorio accesible**  
   Colócalo en `/usr/local/bin` o en otro directorio incluido en `$PATH`:
   ```bash
   sudo mv mkcert /usr/local/bin
   ```

4. **Configurar la CA local**  
   Inicializa la autoridad certificadora (CA):
   ```bash
   mkcert -install
   ```

5. **Instalar dependencias para Firefox (opcional)**  
   Si usas Firefox, instala `libnss3-tools`:
   ```bash
   sudo apt install libnss3-tools
   ```

---

## Generar Certificados

1. **Crear certificados para un dominio o subdominios**  
   Por ejemplo, para `localhost`:
   ```bash
   mkcert localhost
   ```

   Esto generará dos archivos:
   - `localhost.pem` (certificado)
   - `localhost-key.pem` (clave privada)

2. **Uso de los certificados en un servidor**  
   Configura tu servidor web (por ejemplo, Nginx, Apache o Node.js) para usar los certificados generados.

---

## Desinstalar la CA Local

Si necesitas eliminar la CA local instalada por `mkcert`, ejecuta:
```bash
mkcert -uninstall
```

---

## Recursos

- Repositorio oficial: [https://github.com/FiloSottile/mkcert](https://github.com/FiloSottile/mkcert)
- Documentación completa: [mkcert Wiki](https://github.com/FiloSottile/mkcert/wiki)

---
