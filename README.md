Este es un proyecto creado con Next.js

## Como ejecutarlo

1- Lo primero ha de ser clonar el repositorio con el siguiente comando:

```bash
  git clone https://github.com/zenix-s/Project-Manager-nextjs13.git
```

2- Lo siguiente ha de ser instalar las dependencias con el siguiente comando:

```bash
npm install
```

4- Establecer las variables en el fichero .env

```typescript
  DATABASE_URL=
  NEXTAUTH_SECRET=
  NEXTAUTH_URL=
```

5- Crear la base de datos con el siguiente comando:

```bash
  npx prisma migrate dev --name init
```


6- Luego debes ejecutar el siguiente comando para correr el proyecto:

```bash
npm run dev
```

7- Por ultimo debes abrir [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Guia del proyecto

Varbas es una aplicación web que ayuda a equipos de trabajo a gestionar proyectos y tareas de manera efectiva y eficiente. 
La aplicación está diseñada para permitir a los equipos crear, asignar, rastrear y completar tareas de manera organizada y colaborativa.

###  Tecnologías utilizadas

#### Front End

En el desarrollo de Varbas se han utilizado las siguientes tecnologías frontend:
- **Next.js**: Framework de React para crear aplicaciones web con alto rendimiento y escalabilidad.
- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Tailwind CSS**: Framework de CSS para construir rápidamente interfaces de usuario personalizadas y receptivas.

#### Back End
##### API

- **Prisma**: ORM para bases de datos que permite interactuar con la base de datos de manera segura y eficiente.
- **Node.js**: Plataforma de desarrollo para construir aplicaciones web escalables y robustas.
- **TypeScript**: Lenguaje de programación que añade características de tipado estático al JavaScript, para mejorar la calidad del código y reducir errores.

##### Base de datos
- **MySQL**: Sistema de gestión de bases de datos relacional de código abierto.

