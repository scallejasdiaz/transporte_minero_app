# 🚍 Plataforma de Visibilidad en Tiempo Real para el Transporte del Personal Minero

Este prototipo funcional es parte de un MVP diseñado para optimizar el transporte de personal a faenas mineras en Antofagasta. Desarrollado en **React Native con TypeScript**, simula reservas, visualización de rutas y confirmación de transportes mediante un sistema similar a Uber.

---

## 📲 Funcionalidades implementadas

- 📍 **Creación de reservas** con dirección fija de recogida y horario definido (4:20 AM / 5:00 PM).
- 🧭 **Visualización de reservas creadas** con estado (pendiente, confirmada, etc.).
- ⌛ **Cambio automático de estado** de las reservas a "confirmada" tras 10 segundos.
- 🗂️ Modal detallado con información completa de la reserva.
- 📅 Lógica de restricción de fechas pasadas al crear reserva.
- 🧪 Prototipo sin backend, con almacenamiento en dispositivo local (`AsyncStorage`).

---

## 🧱 Estructura del proyecto

```
transporte-minero-app/
├── src/
│   ├── components/
│   ├── screens/
│   ├── types/
│   └── utils/
├── assets/
├── App.tsx
├── package.json
└── tsconfig.json
```

---

## 🚧 Roadmap (futuro)

- ✅ Simulación de buses en mapa (ETA animada)
- 🔄 Conexión con backend Django (API REST)
- 🧑‍🤝‍🧑 Roles de usuario: pasajero, conductor, administrador
- 🔔 Notificaciones push y confirmación de viajes
- 🧠 Integración de IA para optimización de rutas y carga

---

## 🚀 Stack Tecnológico

- **React Native** con Expo
- **TypeScript**
- **AsyncStorage**
- **react-navigation**
- **react-native-maps**

---

## 🛠 Instalación local

```bash
git clone https://github.com/scallejasdiaz/transporte_minero_app.git
cd transporte_minero_app
npm install
npx expo start
```

---

## 👨🏻‍💻 Autor

Sebastián Callejas — [@scallejasdiaz](https://github.com/scallejasdiaz)

Proyecto académico con fines de prototipado funcional y validación temprana para soluciones de transporte minero inteligente en Chile.
