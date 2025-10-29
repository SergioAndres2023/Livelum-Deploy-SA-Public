# 📚 Instrucciones para Ver Swagger Actualizado

## 🔄 Problema Común
Si no ves los nuevos endpoints en Swagger, es porque **el servidor necesita reiniciarse** para cargar los nuevos módulos y rutas.

---

## ✅ Solución: Reiniciar el Servidor

### **Paso 1: Detener el servidor actual**
Si tienes el servidor corriendo, presiona:
```
Ctrl + C
```

### **Paso 2: Compilar TypeScript (si es necesario)**
```bash
npm run build
```

### **Paso 3: Iniciar el servidor**
```bash
npm start
# o
npm run dev  # para modo desarrollo con hot-reload
```

### **Paso 4: Abrir Swagger UI**
Una vez iniciado el servidor, abre en tu navegador:
```
http://localhost:3000/docs
```

---

## 🎯 Verificación Rápida

### **Endpoints que deberías ver en Swagger:**

#### **14 Nuevos Tags Agregados Hoy:**
1. ✅ **Auth** - Login, password reset
2. ✅ **Users** - Gestión de usuarios
3. ✅ **People** - Gestión de personal
4. ✅ **Objectives** - Gestión de objetivos
5. ✅ **Stakeholders** - Partes interesadas
6. ✅ **Suppliers** - Proveedores
7. ✅ **Findings** - Hallazgos
8. ✅ **ActionPlans** - Planes de acción
9. ✅ **JobProfiles** - Perfiles de puesto
10. ✅ **TrainingPlans** - Planes de capacitación
11. ✅ **Minutes** - Minutas/actas
12. ✅ **Skills** - Competencias
13. ✅ **Authorizations** - Autorizaciones
14. ✅ **Equipment** - Equipos y sistemas

#### **Tags Existentes:**
- companies
- documents
- audits
- process-types
- process-names
- risks
- indicators
- alerts
- clients

---

## 🔍 Diagnóstico

### **Si no ves los nuevos endpoints:**

1. **Verifica que el servidor esté corriendo:**
   ```bash
   # Deberías ver un mensaje como:
   # "Servidor iniciado en http://localhost:3000"
   ```

2. **Verifica la ruta correcta:**
   - ✅ Correcto: `http://localhost:3000/docs`
   - ❌ Incorrecto: `http://localhost:3000/documentation`

3. **Verifica la configuración:**
   ```bash
   # En backend/config/index.ts
   # Debería tener:
   swagger: {
     enabled: isDevelopment(env),  // true en desarrollo
     path: '/docs',                // ruta de swagger
   }
   ```

4. **Revisa los logs del servidor:**
   ```bash
   # Busca errores de registro de rutas
   # Deberías ver logs de registro de módulos
   ```

---

## 🚀 Testing Rápido

### **Probar un endpoint desde Swagger UI:**

1. **Abre** `http://localhost:3000/docs`
2. **Encuentra** el tag "Users" o "People"
3. **Expande** `POST /api/users`
4. **Click** en "Try it out"
5. **Completa** el body con datos de prueba:
   ```json
   {
     "username": "testuser",
     "nombre": "Test",
     "apellido": "User",
     "email": "test@example.com",
     "password": "password123",
     "companyId": "test-company-id"
   }
   ```
6. **Click** en "Execute"
7. **Verifica** la respuesta

---

## 📊 Estadísticas Esperadas

Una vez reiniciado, deberías ver:

| Métrica | Valor Esperado |
|---------|----------------|
| **Tags visibles** | 21-23 |
| **Endpoints totales** | ~80 |
| **Nuevos endpoints** | ~70 (14 módulos) |

---

## 🔧 Troubleshooting

### **Error: "Cannot GET /docs"**
**Solución**: Verifica que `swagger.enabled = true` en config

### **No se ven los nuevos módulos**
**Solución**: Reinicia el servidor con `Ctrl+C` y luego `npm start`

### **Error de compilación**
**Solución**: 
```bash
# Limpia y recompila
rm -rf dist
npm run build
npm start
```

### **Puerto 3000 ocupado**
**Solución**:
```bash
# Encuentra el proceso
lsof -ti:3000
# Mátalo
kill -9 $(lsof -ti:3000)
# O usa otro puerto
PORT=3001 npm start
```

---

## ✅ Verificación Final

Una vez reiniciado el servidor, deberías poder:

✅ Ver todos los 21 tags en el sidebar
✅ Expandir cada módulo y ver sus endpoints
✅ Ver los schemas de validación
✅ Probar requests con "Try it out"
✅ Ver responses de ejemplo

---

## 🎉 ¡Todo Listo!

Si sigues estos pasos, **Swagger debería mostrar todos los 14 módulos nuevos** que implementamos hoy.

**Ruta correcta**: `http://localhost:3000/docs`

---

**Última actualización**: Octubre 2025  
**Versión del backend**: 2.0.0

