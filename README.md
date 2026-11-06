# Diplomatura en Profesional Full-Stack Developer

## Curso de desarrollo con Node JS - Profesor: Gabriel Alberini

### Módulo 1: Node JS

### Unidad 4: Integración Front-Back

### Tarea 4: Conectando mi frontend con la API y desplegando.

### Objetivos:

Conectar un frontend (React o Angular) a un backend en Express.

Realizar peticiones reales y preparar ambos entornos para despliegue.

### Consideraciones del frontend de la aplicación:

- Se implementa el funcionamiento del carrito de tal forma que en la base de datos se mantenga la persistencia del carrito del usuario activo. Por lo tanto, el usuario debe loguearse para poder ver el carrito.
- En el esquema del carrito no se repiten los datos del producto, sino que se crea una relación entre el carrito y los productos cargados y entre el carrito y el usuario. De esta forma existirá una relación uno a uno entre el carrito y el usuario.
- Se crea un componente skeleton que permite mostrar un loading (indicador de carga) mientras se cargan los cards de los productos en la página de inicio y además en la página de carrito. Para ello, se reutiliza el componente skeleton diferenciando su funcionalidad por medio del atributo variant.
- El frontend de la aplicación se despliega en Firebase Hosting.
- No se adjuntan imágenes de pantallas, ya que la aplicación se puede ver funcionando desde el link indicado más adelante.

### Pasos para la ejecución local:

1. Clonar el repositorio:

```bash
git clone https://github.com/Diplomatura-Full-Stack-Developer/Node-M1-T4-Frontend
```

2. Instalar las dependencias:

```bash
npm install
```

3. Ejecutar el script de la aplicación:

```bash
ng serve
```

Tener en cuenta que el backend tiene que estar en ejecución para que la aplicación funcione correctamente.

### Pasos para el despliegue:

1. Iniciar sesión en Firebase:

```bash
firebase login
```

2. Configurar el proyecto de Firebase:

```bash
firebase init
```

3. Ejecutar el script de despliegue:

```bash
ng build
```

4. Ejecutar el script de despliegue:

```bash
firebase deploy
```

### Ejecutar aplicación en producción:

[https://angular-m1-t4.web.app](https://angular-m1-t4.web.app)

### Recursos utilizados:

- Node JS - Versión 24.20.0 ([https://nodejs.org/es/download/](https://nodejs.org/es/download/))
- Npm - Versión 12.0.2 (instalado por defecto con Node JS)
- Express - Versión 5.3.0 ([https://www.npmjs.com/package/express](https://www.npmjs.com/package/express))
- Mongoose - Versión 9.11.3 ([https://www.npmjs.com/package/mongoose](https://www.npmjs.com/package/mongoose))
- MongoDB Compass - Versión 1.40.4 ([https://www.mongodb.com/es/products/compass](https://www.mongodb.com/es/products/compass))
- Firebase Hosting ([https://firebase.google.com/docs/hosting](https://firebase.google.com/docs/hosting))
- PrimeNG - Versión 22.1.4 ([https://v17.primeng.org/](https://v17.primeng.org/))

### Alumno: Rubén Seco

### Comisión: 181806
