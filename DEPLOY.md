# 🚀 Guía de Despliegue - Livelum v2

Esta guía te ayudará a desplegar el frontend en **Vercel** y el backend en **Render**.

## 📋 Requisitos Previos

1. Cuenta en [Vercel](https://vercel.com)
2. Cuenta en [Render](https://render.com)
3. Base de datos MongoDB para producción (puedes usar [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) gratuito)
4. GitHub/GitLab/Bitbucket (recomendado para conectarlo con los servicios)

### 📝 Nota sobre MongoDB

**Para Desarrollo Local:**
- ✅ Ya tienes MongoDB en Docker (`livelum-mongodb` en puerto `27017`)
- Tu backend local puede usar: `mongodb://localhost:27017/livelum`

**Para Producción en Render:**
- ⚠️ Necesitas MongoDB en la nube (MongoDB Atlas recomendado)
- Render no puede acceder a tu MongoDB local en Docker
- MongoDB Atlas ofrece un tier gratuito (M0) perfecto para empezar

---

## 🔧 Paso 1: Desplegar Backend en Render

### 1.1 Preparar el Backend

1. **Asegúrate de tener tu código en un repositorio Git** (GitHub, GitLab, etc.)

2. **Verifica que tengas un archivo `.gitignore`** que incluya:
   - `node_modules/`
   - `.env`
   - `dist/`

### 1.2 Crear Servicio en Render

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Click en **"New +"** → **"Web Service"**
3. Conecta tu repositorio Git
4. Configura el servicio:

   - **Name**: `livelum-v2-backend`
   - **Runtime**: `Docker` (o `Node` si prefieres usar el build de Node.js)
   - **Branch**: `main` (o tu rama principal)
   - **Root Directory**: `livelum-v2-backend`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

### 1.3 Configurar MongoDB Atlas (si aún no lo tienes)

**Pasos para crear MongoDB Atlas:**

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) y crea una cuenta gratuita
2. Crea un nuevo cluster (elige el tier **M0 Free**)
3. Crea un usuario de base de datos (menú "Database Access")
4. Configura la whitelist de IPs (menú "Network Access"):
   - Para desarrollo: Agrega `0.0.0.0/0` (permite desde cualquier IP)
   - O agrega la IP específica de Render (que aparecerá en los logs)
5. Obtén el connection string:
   - Click en "Connect" → "Connect your application"
   - Copia el string que comienza con `mongodb+srv://`

**Para local, sigue usando tu MongoDB en Docker:**
```
MONGODB_URI=mongodb://localhost:27017/livelum
```

### 1.4 Configurar Variables de Entorno en Render

En la sección **"Environment"** de Render, agrega las siguientes variables:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/livelum?retryWrites=true&w=majority
JWT_SECRET=tu-secret-key-super-segura-aqui
JWT_EXPIRES_IN=24h
DOMAIN=https://livelum-v2-backend.onrender.com
FRONTEND_URL=https://tu-frontend.vercel.app
```

**Notas importantes:**
- Reemplaza `MONGODB_URI` con tu string de conexión de MongoDB Atlas (no uses `localhost`, eso solo funciona en tu máquina)
- Usa un `JWT_SECRET` seguro y aleatorio (puedes generar uno con: `openssl rand -base64 32`)
- `PORT` será asignado automáticamente por Render (normalmente 10000)
- `DOMAIN` será la URL que Render te proporcione (ej: `https://livelum-v2-backend.onrender.com`)
- `FRONTEND_URL` será la URL de tu frontend en Vercel (la configurarás después)

### 1.5 Desplegar

1. Click en **"Create Web Service"**
2. Render construirá y desplegará tu aplicación automáticamente
3. Espera a que el despliegue termine (puede tomar 5-10 minutos)
4. Anota la URL de tu backend (ej: `https://livelum-v2-backend.onrender.com`)

---

## 🌐 Paso 2: Desplegar Frontend en Vercel

### 2.1 Preparar el Frontend

1. **Asegúrate de tener tu código en un repositorio Git**

2. **El archivo `vercel.json` ya está configurado** en la carpeta `livelum-v2-frontend`

### 2.2 Crear Proyecto en Vercel

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Click en **"Add New..."** → **"Project"**
3. Importa tu repositorio Git
4. Configura el proyecto:

   - **Framework Preset**: `Vite` (se detectará automáticamente)
   - **Root Directory**: `livelum-v2-frontend`
   - **Build Command**: `npm run build` (ya configurado)
   - **Output Directory**: `dist` (ya configurado)

### 2.3 Configurar Variables de Entorno en Vercel

En la sección **"Environment Variables"**, agrega:

```
VITE_API_BASE_URL=https://livelum-v2-backend.onrender.com/api
```

**Nota:** 
- Reemplaza `https://livelum-v2-backend.onrender.com` con la URL real de tu backend en Render
- Asegúrate de incluir `/api` al final si tu backend tiene ese prefijo de ruta

### 2.4 Desplegar

1. Click en **"Deploy"**
2. Vercel construirá y desplegará tu aplicación automáticamente
3. Una vez finalizado, recibirás una URL (ej: `https://livelum-v2-frontend.vercel.app`)

### 2.5 Actualizar CORS en el Backend

**IMPORTANTE:** Después de obtener la URL de Vercel, regresa a Render y actualiza la variable `FRONTEND_URL`:

1. Ve a tu servicio en Render
2. Click en **"Environment"**
3. Actualiza `FRONTEND_URL` con la URL de Vercel:
   ```
   FRONTEND_URL=https://livelum-v2-frontend.vercel.app
   ```
4. Render reiniciará automáticamente el servicio con la nueva configuración

---

## ✅ Paso 3: Verificar el Despliegue

### 3.1 Verificar Backend

1. Abre tu navegador en: `https://tu-backend.onrender.com/health`
2. Deberías ver una respuesta JSON indicando que el servicio está funcionando

### 3.2 Verificar Frontend

1. Abre tu navegador en la URL de Vercel
2. Prueba las funcionalidades que hacen llamadas al backend
3. Verifica en la consola del navegador que no haya errores de CORS

---

## 🔄 Actualizaciones Futuras

### En Render (Backend):
- Render detecta automáticamente cambios en tu rama principal
- Cada push a `main` desencadenará un nuevo despliegue
- Los logs están disponibles en el dashboard de Render

### En Vercel (Frontend):
- Vercel detecta automáticamente cambios en tu rama principal
- Cada push desencadenará un nuevo despliegue
- Puedes ver el estado en el dashboard de Vercel

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to MongoDB"
- **Para desarrollo local:** Verifica que tu contenedor `livelum-mongodb` esté corriendo en Docker
- **Para producción:** Verifica que `MONGODB_URI` apunte a MongoDB Atlas (no a `localhost`)
- Asegúrate de que tu IP esté en la whitelist de MongoDB Atlas (o usa `0.0.0.0/0` para permitir todas las IPs)
- Verifica que las credenciales de MongoDB Atlas sean correctas

### Error: "CORS policy"
- Verifica que `FRONTEND_URL` en Render coincida exactamente con la URL de Vercel
- Asegúrate de incluir `https://` en la URL
- Verifica que no haya barras finales `/` en las URLs

### Error: "Build failed"
- Verifica los logs en Render/Vercel
- Asegúrate de que todas las dependencias estén en `package.json`
- Verifica que el Node.js version sea compatible (>=18.0.0)

### Error: "Environment variables not found"
- Verifica que todas las variables de entorno estén configuradas
- Asegúrate de que los nombres de las variables coincidan exactamente (case-sensitive)

---

## 📝 Checklist de Despliegue

- [ ] Backend desplegado en Render
- [ ] Base de datos MongoDB configurada y accesible
- [ ] Variables de entorno del backend configuradas
- [ ] Backend responde en `/health`
- [ ] Frontend desplegado en Vercel
- [ ] Variable `VITE_API_BASE_URL` configurada en Vercel
- [ ] Variable `FRONTEND_URL` actualizada en Render con la URL de Vercel
- [ ] CORS funcionando correctamente
- [ ] Aplicación funcionando end-to-end

---

## 🎉 ¡Listo!

Una vez completados todos los pasos, tu aplicación estará desplegada y funcionando en producción.

Para cualquier duda o problema, revisa los logs en ambos servicios:
- **Render**: Dashboard → Tu servicio → Logs
- **Vercel**: Dashboard → Tu proyecto → Deployments → Logs

