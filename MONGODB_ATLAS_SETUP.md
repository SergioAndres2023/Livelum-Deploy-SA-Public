# 🗄️ Guía Completa: Configurar MongoDB Atlas

Esta guía te llevará paso a paso para configurar MongoDB Atlas y obtener la cadena de conexión para usar en producción.

---

## 📋 Paso 1: Crear Cuenta en MongoDB Atlas

1. **Ve a MongoDB Atlas:**
   - Abre tu navegador y visita: https://www.mongodb.com/cloud/atlas

2. **Registro:**
   - Click en **"Try Free"** o **"Sign Up"**
   - Puedes registrarte con:
     - Email y contraseña
     - Cuenta de Google
     - Cuenta de GitHub (recomendado si usas GitHub para el código)

3. **Completa el formulario:**
   - Nombre de usuario
   - Email
   - Contraseña
   - Acepta los términos y condiciones

4. **Verifica tu email** (si es necesario)

---

## 🏗️ Paso 2: Crear tu Primer Cluster

1. **Una vez dentro del dashboard, te pedirá crear un cluster**

2. **Selecciona el tipo de deployment:**
   - **M0 Free** (Recomendado para empezar)
     - 512 MB de almacenamiento
     - Compartido (shared)
     - GRATIS para siempre
   - **M2 o M5** (Si necesitas más recursos, tienen costo)

3. **Configura la región:**
   - Elige una región cercana a ti (ej: `Europe (Ireland)` o `US East`)
   - Esto afecta la latencia, así que elige bien

4. **Nombre del cluster:**
   - Puedes dejarlo por defecto o cambiarlo a algo como `livelum-cluster`

5. **Click en "Create Cluster"**
   - ⏳ Esto puede tomar 1-3 minutos

---

## 👤 Paso 3: Crear Usuario de Base de Datos

1. **Mientras se crea el cluster, te aparecerá un popup de seguridad**

2. **O ve manualmente a:**
   - Menú lateral → **"Security"** → **"Database Access"**

3. **Click en "Add New Database User"**

4. **Configura el usuario:**
   - **Authentication Method:** Password
   - **Username:** `livelum-user` (o el que prefieras)
   - **Password:** 
     - Genera una contraseña automática (recomendado)
     - O crea una manualmente (guárdala bien, la necesitarás)
     - **⚠️ IMPORTANTE:** Guarda la contraseña de forma segura

5. **Privilegios:**
   - Selecciona **"Atlas admin"** (para tener todos los permisos)
   - O **"Read and write to any database"** (más restrictivo pero seguro)

6. **Click en "Add User"**

---

## 🌐 Paso 4: Configurar Acceso de Red (Whitelist de IPs)

1. **Ve a:**
   - Menú lateral → **"Security"** → **"Network Access"**

2. **Click en "Add IP Address"**

3. **Tienes dos opciones:**

   **Opción A: Permitir desde cualquier lugar (fácil pero menos seguro)**
   - Click en **"Allow Access from Anywhere"**
   - Se agregará automáticamente: `0.0.0.0/0`
   - ✅ Funciona para desarrollo y producción
   - ⚠️ Cualquiera puede intentar conectarse (pero necesita usuario/contraseña)

   **Opción B: Agregar IPs específicas (más seguro)**
   - Click en **"Add Current IP Address"** (agrega tu IP actual)
   - Para Render, necesitarás agregar las IPs de Render
   - Puedes agregar múltiples IPs

4. **Click en "Confirm"**

---

## 🔗 Paso 5: Obtener la Cadena de Conexión (Connection String)

1. **Una vez que el cluster esté listo, ve a:**
   - Click en **"Connect"** en la tarjeta de tu cluster

2. **Selecciona cómo conectarte:**
   - Click en **"Connect your application"**

3. **Selecciona el driver:**
   - **Driver:** Node.js
   - **Version:** 5.5 or later (o la última versión)

4. **Verás una cadena de conexión como:**
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

5. **Copia esta cadena** (aún no es la final, necesitas modificarla)

---

## ✏️ Paso 6: Personalizar la Cadena de Conexión

Toma la cadena que copiaste y reemplaza:

1. **`<username>`** → Tu nombre de usuario (ej: `livelum-user`)
2. **`<password>`** → Tu contraseña (la que creaste en el Paso 3)
3. **Agrega el nombre de la base de datos** al final:

   **Cadena original:**
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

   **Cadena personalizada (ejemplo):**
   ```
   mongodb+srv://livelum-user:TuPassword123@cluster0.xxxxx.mongodb.net/livelum?retryWrites=true&w=majority
   ```

   **⚠️ Nota importante:**
   - Reemplaza `TuPassword123` con tu contraseña REAL
   - Los caracteres especiales en la contraseña deben estar codificados en URL (ej: `@` → `%40`, `:` → `%3A`)
   - Mejor aún: usa la contraseña que MongoDB generó automáticamente

---

## 🔐 Paso 7: Escapar Caracteres Especiales (si es necesario)

Si tu contraseña tiene caracteres especiales, debes codificarlos en URL:

| Carácter | Código URL |
|----------|------------|
| `@`      | `%40`      |
| `:`      | `%3A`      |
| `/`      | `%2F`      |
| `?`      | `%3F`      |
| `#`      | `%23`      |
| `[`      | `%5B`      |
| `]`      | `%5D`      |
| ` ` (espacio) | `%20` |

**Ejemplo:**
- Contraseña: `Mi@Pass:123`
- En URL: `Mi%40Pass%3A123`

**💡 Tip:** Para evitar problemas, usa una contraseña generada automáticamente por MongoDB Atlas (son más seguras y fáciles de usar).

---

## ✅ Paso 8: Probar la Conexión (Opcional)

### Opción A: Desde tu aplicación local

Puedes probar la conexión temporalmente en tu backend local:

1. **Actualiza tu `.env` local temporalmente:**
   ```env
   MONGODB_URI=mongodb+srv://livelum-user:password@cluster0.xxxxx.mongodb.net/livelum?retryWrites=true&w=majority
   ```

2. **Ejecuta tu backend local:**
   ```bash
   npm run start:dev
   ```

3. **Verifica que se conecte correctamente** (deberías ver mensajes de conexión exitosa)

4. **Vuelve a cambiar a tu MongoDB local después:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/livelum
   ```

### Opción B: Desde MongoDB Compass (GUI)

1. **Descarga MongoDB Compass:**
   - https://www.mongodb.com/products/compass

2. **Abre Compass y pega tu connection string**

3. **Click en "Connect"**

---

## 📝 Paso 9: Usar en Render

1. **Ve a tu proyecto en Render Dashboard**

2. **Sección "Environment" o "Environment Variables"**

3. **Agrega la variable:**
   - **Key:** `MONGODB_URI`
   - **Value:** Tu cadena de conexión completa
     ```
     mongodb+srv://livelum-user:password@cluster0.xxxxx.mongodb.net/livelum?retryWrites=true&w=majority
     ```

4. **Guarda los cambios**

5. **Render reiniciará automáticamente tu servicio**

---

## 🛡️ Paso 10: Seguridad Adicional (Recomendado)

### Cambiar la contraseña regularmente:
1. Ve a **"Database Access"**
2. Click en tu usuario
3. Click en **"Edit"**
4. Cambia la contraseña

### Restringir IPs en producción:
1. Ve a **"Network Access"**
2. En lugar de `0.0.0.0/0`, agrega solo las IPs necesarias:
   - Tu IP de desarrollo (si pruebas localmente)
   - Las IPs de Render (si las conoces)

---

## 📊 Resumen de tu Configuración

Guarda esta información de forma segura:

```
Cluster: livelum-cluster (o el nombre que elegiste)
Usuario: livelum-user
Contraseña: [guárdala en un gestor de contraseñas]
Base de datos: livelum
Connection String: mongodb+srv://livelum-user:password@cluster0.xxxxx.mongodb.net/livelum?retryWrites=true&w=majority
Region: [la región que elegiste]
```

---

## ❓ Preguntas Frecuentes

### ¿Cuánto cuesta?
- **M0 Free:** GRATIS para siempre (512 MB)
- **M2:** ~$9/mes
- **M5:** ~$25/mes

### ¿Puedo usar mi MongoDB local en producción?
- ❌ No, Render no puede acceder a tu `localhost`
- ✅ Necesitas una base de datos en la nube (Atlas es la mejor opción)

### ¿Es seguro usar `0.0.0.0/0`?
- Si tienes una contraseña fuerte, es relativamente seguro
- Para mayor seguridad, agrega solo las IPs que necesitas

### ¿Puedo tener múltiples bases de datos?
- ✅ Sí, puedes crear múltiples bases de datos en el mismo cluster
- Solo cambia el nombre de la base de datos en el connection string

### ¿Qué pasa si olvido mi contraseña?
- Puedes resetearla desde **"Database Access"** → Click en tu usuario → **"Edit"**

---

## 🎉 ¡Listo!

Ya tienes MongoDB Atlas configurado. Ahora puedes usar la cadena de conexión en Render.

**Próximos pasos:**
1. Agrega `MONGODB_URI` en Render con tu connection string
2. Despliega tu backend
3. ¡Todo debería funcionar! 🚀

