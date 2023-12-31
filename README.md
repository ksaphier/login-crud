
# Login y CRUD con Node.js, React y MongoDB

## Descripción
Este proyecto es una aplicación Full Stack que implementa un sistema de autenticación y un CRUD (Crear, Leer, Actualizar, Eliminar) utilizando Node.js, React y MongoDB.

## Backend: loginycrud
- **Tecnologías Usadas:** Node.js, Express, Mongoose, JWT, bcryptjs, etc.
- **Dependencias Principales:** Express, Mongoose, bcryptjs, cors, dotenv, jsonwebtoken, mongodb, mongoose, morgan, zod.
- **Dependencias de Desarrollo:** Nodemon.

## Frontend: client
- **Tecnologías Usadas:** React, Vite, Axios, TailwindCSS, etc.
- **Dependencias Principales:** React, axios, dayjs, js-cookie, react-hook-form, react-router-dom.
- **Dependencias de Desarrollo:** @types/react, @types/react-dom, @vitejs/plugin-react, autoprefixer, eslint, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh, postcss, tailwindcss, vite.

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/ksaphier/login-crud-tutorial.git
   ```
2. Instala las dependencias del backend:
   ```
   cd login-crud-tutorial
   npm install
   ```
3. Instala las dependencias del frontend:
   ```
   cd client
   npm install
   ```

## Uso

1. Inicia el servidor backend:
   ```
   npm run dev
   ```
   (El servidor estará disponible en `http://localhost:5000` por defecto)

2. En una nueva terminal, inicia el cliente:
   ```
   cd client
   npm run dev
   ```
   (El cliente estará disponible en `http://localhost:3000`)

Visita `http://localhost:3000` en tu navegador para ver la aplicación en funcionamiento.

## Contribuir
Este proyecto es principalmente un tutorial y no está activamente buscando contribuciones. Sin embargo, si encuentras un error o tienes alguna sugerencia, siéntete libre de abrir un issue en este repositorio.

## Licencia
Este proyecto está bajo la licencia [MIT].
