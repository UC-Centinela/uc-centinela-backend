# UC Centinela Backend

## Docker

Docker es una plataforma que se utiliza para desarrollar, enviar y ejecutar aplicaciones dentro de contenedores. En este proyecto, Docker nos permite encapsular nuestros microservicios en entornos aislados, asegurando que se ejecuten de manera consistente en diferentes configuraciones.

### Docker Compose

Docker Compose es una herramienta para definir y ejecutar aplicaciones Docker con múltiples contenedores. Utilizamos `docker-compose` para gestionar y orquestar nuestros servicios. Las configuraciones se definen en los archivos `docker-compose.dev.yml`.


## Configuración del Proyecto

### Requisitos

- Docker & Docker Compose
- Node.js (para desarrollo fuera de Docker)
- Variables de entorno definidas en el `root` del proyecto:

![alt text](image.png)

### Ejecutando los Servicios

Para poner en marcha todos los servicios:

#### 1. Clona este repositorio:
```bash
git clone https://github.com/iic2154-uc-cl/2024-1-S4-Grupo3-Backend.git
```

#### 2. Navega al directorio raíz y ejecuta:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

Esto iniciará todos los servicios según lo definido en el archivo `docker-compose.dev.yml`.

#### 3. Ejecutar comandos

```bash
docker-compose -f docker-compose.dev.yml exec nombre_contenedor comando_a_ejecutar
```

Con `exec` podrán correr comandos dentro de cada contenedor para instalar dependencias, formatear código o lo que sea necesario. Los más usados son:

```bash
docker-compose -f docker-compose.dev.yml exec nombre_contenedor npm i paquete_a_instalar
```

Si desean instalar un nuevo paquete en el package json del contenedor.

# MUY IMPORTANTE

Este comando debe ser corrido antes de hacer el commit para poder formatear con `Prettier` todo el código y que este no se caiga a la hora de correr los `Github Actions`. Primero hay que dirigirse a la carpeta /api-cocreaciones, y luego correr este comando:
```bash
npm run prettier-format
```



### Accediendo a los Servicios
- **API**: Accesible en `http://localhost:3000/api`.
- **Documentación Endpoints**: Accesible en `http://localhost:3000/api/api-docs`

## Contribuciones (MUY IMPORTANTE)
Si deseas contribuir, sigue los siguientes pasos:

1. **Creación de Ramas (Branching)**: Siempre crea una nueva rama para tus cambios. Los nombres de las ramas deben ser descriptivos y llevar un prefijo según el tipo de cambio que estés realizando:

- Características: `feat/nombre-de-tu-rama`
- Correcciones: `fix/nombre-de-tu-rama`
- Documentación: `docs/nombre-de-tu-rama`

2. **Realiza tus Cambios**: Asegúrate de seguir la configuración de Prettier para el estilo del código, aunque estás se debería ver reflejadas de manera automática en cada commit.

3. **Commit y Push**: Una vez termines tus cambios, haz commit y push a tu fork.

4. **Abre una Pull Request**: Ve al repositorio original y abre una solicitud de extracción desde tu rama hacia development.