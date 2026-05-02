# Guía de Despliegue en Vercel para PayloadCMS 3.0

Esta guía te orienta en el paso a paso detallado para poner tu aplicación en producción utilizando el plan Hobby (gratuito) de Vercel para alojamiento, bases de datos PostgreSQL para Payload, y Vercel Blob para que las imágenes no se borren en cada nuevo despliegue.

## Paso 1: Sube el código
Asegúrate de haber guardado todo (`git commit`) y  sube tus cambios a un repositorio en **GitHub**. 

## Paso 2: Crear una Base de Datos Postgres en la nube
No puedes conectar la base de datos de tu computadora (por ejemplo el que usas ahora) a la web. Necesitas una pública. Opciones recomendadas y gratuitas:
- **Supabase** (Recomendado y rápido)
- **Neon Cloud**
- **Vercel Postgres** (Desde tu propia cuenta de vercel en la pestaña de `Storage`)

Crea la base de datos y en tu panel de control ahí te darán una URL de tipo connection string. (Se ve algo así: `postgresql://usuario:contraseña@servidor.com:5432/nombre_db`). Guarda esta URL, la necesitaremos a continuación.

## Paso 3: Importar a Vercel
1. Ingresa a [Vercel](https://vercel.com/) e inicia sesión vinculándolo a GitHub.
2. Haz clic en **Add New -> Project**.
3. Selecciona tu repositorio de la lista de GitHub y dale a importar.
4. Vercel detectará automáticamente que es un proyecto **Next.js**.

## Paso 4: Ajustar Variables de Entorno (Environment Variables)
¡IMPORTANTE! Antes de presionar el botón gigante de "Deploy", debes configurar las varibles que tu app necesita para que funcione el backend. Despliega la pestaña "Environment Variables" en esa página y agrega estas variables:

- **`DATABASE_URL`**: Pega la cadena de conexión de tu base de datos apuntada en el **Paso 2**.
- **`PAYLOAD_SECRET`**: Genera un texto alfanumérico súper aleatorio. Puede ser cualquier cosa mientras sea ininteligible y sin espacios, superior a 32 caracteres. Esto encriptará las sesiones y los tokens de usuario.

*(Una vez las configures, ahora sí dale al botón 'Deploy' y deja construir tu app durante un rato, de 2 a 5 minutos).*

## Paso 5: Configurar el Almacenamiento Gratuito de Blob
Cuando finalice el despliegue exitoso ya podrás ver tu app en la web pública, pero aún falta tu contenedor de archivos que acabamos de configurar en el código para que las carpetas "Eventos" y "Comunicados" puedan tener sus archivos adjuntos asegurados:

1. Ingresa a la interfaz de ese Proyecto recién desplegado en Vercel. Ve a la pestaña **Storage** desde el panel horizontal de arriba.
2. Haz clic en el botón de **Connect Store**.
3. Selecciona **Create New** (Crear nuevo) y eliges **"Vercel Blob"**. Déjale un identificador entendible y acepta.
4. Vercel ahora hará automagia: conectará el contenedor con la app y añadirá la variable oculta `BLOB_READ_WRITE_TOKEN` de forma inyectada en todos los ambientes.

Para que los cambios de este contenedor hagan un efecto inmediato, regresa una última vez a la pestaña  **Deployments > Dale al botón tres puntos (...) del último > Redeploy**.

---

### 🎉 Resultado Final
Entra a la URL (`tudominio.vercel.app/admin` o simplemente la que se creé), crea tu primer usuario Administrador y ¡A gozar de tu proyecto completo en la nube!
