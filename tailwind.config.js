module.exports = {
  content: [
    './App.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './Screens/**/*.{js,ts,tsx}',      // ← esto faltaba
    './Navigation/**/*.{js,ts,tsx}',   // ← por si acaso
  ],
  presets: [require('nativewind/preset')],
  theme: { extend: {} },
  plugins: [],
};