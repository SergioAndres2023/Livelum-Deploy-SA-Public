# 🚀 Guía Completa: Desplegar Backend en Render desde Cero

Esta guía te llevará paso a paso para desplegar tu backend de Livelum en Render.

---

## 📋 Paso 1: Crear Cuenta en Render

1. **Ve a Render:**
   - Abre tu navegador y visita: https://render.com

2. **Crear cuenta:**
   - Click en **"Get Started for Free"** o **"Sign Up"**
   - Puedes registrarte con:
     - Email y contraseña
     - Cuenta de GitHub (RECOMENDADO - facilita la conexión del repositorio)
     - Cuenta de Google

3. **Completa el registro:**
   - Si usas email: verifica tu cuenta por email
   - Si usas GitHub: autoriza los permisos necesarios

4. **Plan gratuito:**
   - Render ofrece un plan gratuito perfecto para empezar
   - Los servicios gratuitos se "duermen" después de 15 minutos sin actividad (se despiertan automáticamente)

---

## 📦 Paso 2: Preparar tu Código (Asegúrate de tenerlo en Git)

### ¿Ya tienes tu código en GitHub/GitLab/Bitbucket?

**Si SÍ tienes tu código en Git:**
- ✅ Continúa al Paso 3

**Si NO tienes tu código en Git:**
Necesitas subir tu código primero:

1. **Inicializar repositorio Git (si no lo has hecho):**
   ```bash
   cd "C:\Users\sergi\Desktop\PROYECTOS\Livelum Deploy"
   git init
   ```

2. **Crear repositorio en GitHub:**
   - Ve a https://github.com/new
   - Crea un nuevo repositorio (ej: `livelum-v2`)
   - **NO** inicialices con README, .gitignore, o licencia

3. **Subir tu código:**
   ```bash
   git add .
   git commit -m "Initial commit - Livelum v2"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/livelum-v2.git
   git push -u origin main
   ```

   (Reemplaza `TU-USUARIO` con tu nombre de usuario de GitHub)

---

## 🔧 Paso 3: Crear Web Service en Render

1. **Ve al Dashboard de Render:**
   - Una vez iniciado sesión, estarás en: https://dashboard.render.com

2. **Crear nuevo servicio:**
   - En la página principal, click en el botón **"New +"** (esquina superior derecha)
   - Selecciona **"Web Service"**

3. **Conectar repositorio:**
   - Render te pedirá conectar tu cuenta de GitHub/GitLab/Bitbucket
   - Si no está conectada, click en **"Connect"**
   - Autoriza los permisos necesarios
   - Una vez conectado, selecciona tu repositorio

---

## ⚙️ Paso 4: Configurar el Servicio

Una vez que seleccionaste tu repositorio, verás un formulario de configuración:

### Configuración Básica:

1. **Name:**
   - Ingresa: `livelum-v2-backend`
   - Este será el nombre de tu servicio

2. **Region:**
   - Selecciona la región más cercana a ti o tus usuarios
   - Ejemplos: `Oregon (US West)`, `Frankfurt (EU)`

3. **Branch:**
   - Generalmente: `main` (o `master` si es tu rama principal)

4. **Root Directory:**
   - ⚠️ **IMPORTANTE:** Ingresa: `livelum-v2-backend`
   - Esto le dice a Render dónde está tu código del backend

5. **Runtime:**
   - Selecciona: **"Docker"**
   - (Render detectará automáticamente tu Dockerfile)

6. **Plan:**
   - Selecciona: **"Free"** (para empezar)

### Build & Start Commands (cuando uses Docker, Render los detecta automáticamente):

- **Build Command:** (Dejar en blanco - Docker lo maneja)
- **Start Command:** (Dejar en blanco - Docker lo maneja)

⚠️ **Nota:** Si en lugar de Docker prefieres usar Node.js directamente:
- **Build Command:** `cd livelum-v2-backend && npm install && npm run build`
- **Start Command:** `cd livelum-v2-backend && npm start`

---

## 🔐 Paso 5: Configurar Variables de Entorno

**ANTES de hacer click en "Create Web Service"**, desplázate hacia abajo y expande la sección **"Environment Variables"**.

### Agregar Variables:

Click en **"Add Environment Variable"** y agrega cada una de estas:

#### 1. NODE_ENV
- **Key:** `NODE_ENV`
- **Value:** `production`

#### 2. PORT
- **Key:** `PORT`
- **Value:** (DEJAR VACÍO o no agregar - Render lo asigna automáticamente)

#### 3. MONGODB_URI (MUY IMPORTANTE)
- **Key:** `MONGODB_URI`
- **Value:** `mongodb+srv://turiadesignsolutions_db_user:Cpz8N5R7zrWxlrDl@cluster0.fwlaofr.mongodb.net/?appName=Cluster0`
- ⚠️ **Copia exactamente este string** (es el que obtuviste de MongoDB Atlas)

#### 4. JWT_SECRET
- **Key:** `JWT_SECRET`
- **Value:** (Genera una contraseña segura)
- Puedes usar este comando en PowerShell para generar una:
  ```powershell
  -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
  ```
- O simplemente usa una contraseña larga y aleatoria (ej: `TuClaveSuperSegura123!@#`)

#### 5. JWT_EXPIRES_IN
- **Key:** `JWT_EXPIRES_IN`
- **Value:** `24h`

#### 6. DOMAIN
- **Key:** `DOMAIN`
- **Value:** (DEJAR VACÍO por ahora - Render te dará una URL después)

#### 7. FRONTEND_URL
- **Key:** `FRONTEND_URL`
- **Value:** (DEJAR VACÍO por ahora - la configurarás después cuando despliegues el frontend en Vercel)

---

## 🚀 Paso 6: Crear y Desplegar

1. **Verifica todas las configuraciones** una vez más

2. **Click en "Create Web Service"**

3. **Render comenzará a construir tu aplicación:**
   - Esto puede tomar 5-10 minutos
   - Verás los logs en tiempo real
   - Render ejecutará:
     - `docker build` (si usas Docker)
     - O `npm install` y `npm run build` (si usas Node.js)

4. **Espera a que termine el build:**
   - Verás mensajes de progreso
   - Si hay errores, aparecerán en los logs

---

## ✅ Paso 7: Verificar el Despliegue

1. **Una vez que el build termine**, Render te dará una URL:
   - Ejemplo: `https://livelum-v2-backend.onrender.com`

2. **Prueba el health check:**
   - Abre en tu navegador: `https://TU-URL.onrender.com/health`
   - Deberías ver una respuesta JSON con el estado del servicio:
     ```json
     {
       "status": "ok",
       "timestamp": "...",
       "uptime": ...,
       "environment": "production"
     }
     ```

3. **Si funciona, ¡felicidades!** 🎉
   - Tu backend está desplegado

---

## 🔄 Paso 8: Actualizar Variables de Entorno (Después del Despliegue)

1. **Una vez que tengas la URL de Render**, actualiza estas variables:

### Actualizar DOMAIN:
- Ve a tu servicio en Render
- Click en **"Environment"** (menú lateral izquierdo)
- Busca la variable `DOMAIN`
- Click en **"Edit"**
- Actualiza con: `https://livelum-v2-backend.onrender.com` (tu URL real)
- Guarda

### Actualizar FRONTEND_URL (cuando despliegues el frontend):
- Cuando tengas la URL de Vercel (ej: `https://livelum-v2-frontend.vercel.app`)
- Actualiza `FRONTEND_URL` con esa URL
- Esto es importante para CORS

---

## 🐛 Solución de Problemas Comunes

### Error: "Build failed"
- **Verifica los logs** en Render
- Asegúrate de que `Root Directory` sea correcto (`livelum-v2-backend`)
- Verifica que tu `package.json` tenga los scripts correctos

### Error: "Cannot connect to MongoDB"
- Verifica que `MONGODB_URI` esté correctamente copiado (sin espacios)
- Verifica que tu MongoDB Atlas tenga `0.0.0.0/0` en Network Access
- Verifica las credenciales (usuario y contraseña)

### Error: "Service failed to start"
- Revisa los logs de inicio
- Verifica que todas las variables de entorno estén configuradas
- Asegúrate de que tu `Dockerfile` esté en `livelum-v2-backend/`

### El servicio se "duerme"
- En el plan gratuito, Render "duerme" los servicios después de 15 minutos sin actividad
- Esto es normal - se despiertan automáticamente cuando reciben una petición
- La primera petición después de dormir puede tardar 30-60 segundos

---

## 📝 Checklist Final

- [ ] Cuenta creada en Render
- [ ] Código subido a GitHub/GitLab/Bitbucket
- [ ] Repositorio conectado en Render
- [ ] Servicio creado con configuración correcta
- [ ] Variables de entorno configuradas (especialmente `MONGODB_URI`)
- [ ] Build completado exitosamente
- [ ] Health check funcionando (`/health`)
- [ ] `DOMAIN` actualizado con la URL de Render
- [ ] `FRONTEND_URL` actualizado (cuando despliegues el frontend)

---

## 🎉 ¡Listo!

Tu backend está desplegado en Render. Guarda esta información:

- **URL del Backend:** `https://TU-URL.onrender.com`
- **Health Check:** `https://TU-URL.onrender.com/health`
- **Dashboard:** https://dashboard.render.com

**Próximo paso:** Desplegar el frontend en Vercel y conectar ambos servicios.

---

## 💡 Consejos Adicionales

1. **Monitoreo:**
   - Render muestra métricas básicas en el dashboard
   - Revisa los logs regularmente

2. **Actualizaciones:**
   - Cada push a `main` desplegará automáticamente una nueva versión
   - Render detecta cambios automáticamente

3. **Custom Domain (opcional):**
   - Puedes agregar tu propio dominio desde Settings → Custom Domains

4. **Backups:**
   - MongoDB Atlas hace backups automáticos en planes pagos
   - Considera exportar datos importantes regularmente

¡Empieza ahora! 🚀

