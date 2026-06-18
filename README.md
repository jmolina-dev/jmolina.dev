# jmolina.dev

Código fuente de mi sitio web personal y blog de sistemas/DevOps.

## Estructura

* `index.html`: Portafolio principal con mi stack técnico, trayectoria y sección de contacto (Web3Forms).
* `css/style.css`: Estilos del sitio y tokens de diseño.
* `js/main.js`: Lógica del modo oscuro, menú dinámico y script para copiar bloques de código.

## Desarrollo local

Para levantar el proyecto de forma local y evitar problemas de CORS o rutas relativas:

```bash
python3 -m http.server 8000
```

Para regenerar y minificar el CSS compilado ejecutando:

```bash
npx tailwindcss@3 -i css/style.css -o css/style.css --minify
```

## Despliegue (CI/CD)

El sitio se despliega de forma automática en GitHub Pages mediante el workflow en `.github/workflows/deploy.yml` al hacer push a la rama `main`. El pipeline realiza las siguientes optimizaciones:
1. Compila y minifica el CSS final con Tailwind CLI leyendo las clases de los HTML.
2. Elimina las dependencias de desarrollo (`cdn.tailwindcss.com` y la configuración local) de los archivos HTML mediante `sed` para optimizar la velocidad de carga en producción.
3. Despliega la carpeta raíz como artefacto estático.
