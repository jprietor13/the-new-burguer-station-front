# 🍔 The New Burger Station - Frontend

Este es el repositorio frontend de **The New Burger Station**, una aplicación hecha con **React**, **Vite**, **TailwindCSS** y **TypeScript**. Esta aplicación permite a los usuarios:

- Autenticarse (registro/login) usando JWT.
- Ver hamburguesas disponibles.
- Personalizar pedidos (extras, salsas, bebidas, acompañamiento).
- Visualizar sus pedidos anteriores.
- Recibir confirmaciones por correo.

---

## 🧪 Stack Tecnológico

- **React + Vite**
- **TypeScript**
- **React Router**
- **Tailwind CSS**
- **React Hot Toast**
- **Axios**
- **Deploy:** Vercel

---

## ⚙️ Instalación local

### 1. Clona el repositorio

```bash
git clone https://github.com/jprietor13/the-new-burguer-station-front.git
cd the-new-burguer-station-front
```

### 2. Instala las dependencias

```bash
npm install
# o
yarn
```

### 3. Archivos importantes

- `src/api/api.ts`: instancia de Axios que añade el token automáticamente.
- `src/context/AuthContext.tsx`: contexto global de autenticación.
- `src/pages`: vistas principales (Login, Registro, Home, Orden, Pedidos).
- `src/components`: Navbar, BurgerCard, Footer, etc.
- `src/hooks`: useHomePage, useLoginPage, useOrderPage y useRegisterPage(controlan la logica de los datos para renderizar en sus respectivos componentes)

---

## 🚀 Comandos útiles

```bash
npm run dev        # Inicia en local
npm run build      # Genera el build de producción
npm run preview    # Previsualiza el build
```

---

## 🖼️ Imágenes locales

Las imágenes de hamburguesas están en `/public/images/burgers/`. Se asignan por nombre desde el `imageMap` en `HomePage.tsx`.

---

## 🧠 Lógica de negocio

- El usuario puede seleccionar hasta 3 **extras** y 2 **salsas**.
- La aplicación calcula automáticamente el **precio total**.
- El pedido se envía al backend vía `/orders` con token.
- Al confirmar, se muestra un **toast** y se redirige al Home.

---

## 🔄 Rutas

- `/login` → Página de inicio de sesión
- `/register` → Página de registro
- `/` → Listado de hamburguesas
- `/order/:id` → Personalizar hamburguesa
- `/my-orders` → Historial de pedidos

---

## 🌐 Deploy

Desplegado en **Vercel**:  
🔗 https://the-new-burguer-station-front.vercel.app/

Para rutas relativas se usa `HashRouter` en producción para evitar errores de recarga.

---

## ✍️ Autor

Creado por **Juan Prieto Rodríguez**  
📫 [jp1739@gmail.com](mailto:jp1739@gmail.com)  
💼 Frontend & Fullstack Developer

---
