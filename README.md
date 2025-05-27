# Fakestore
Este proyecto es una simulación de una tienda online, no realiza ventas reales, los datos son consumidos desde una API llamada Fake Store, la idea principal del proyecto es demostrar habilidades para consumir y manejar los datos de una API. El proyecto permite navegar entre componentes, demostrar los datos como catálogo, filtrarlo entre categorías y ordenarlos entre mayor o menor precio. 

## Funcionalidades:
-	Catalogo de producto con vista individual
-	Filtros dinámicos por categoría
-	Orden de productos de mayor o menor precio.
-	Filtro para mostrar productos relacionados
-	Sistema de navegación con routerLink, queryParams y fragment.
-	Carrito de compras con almacenamiento en localStorage;
-	Cálculo de subtotal, envió (simulación) y total.
-	Diseño responsive para todos los dispositivos
  
## Tecnologías usadas:
-	Angular 19
-	TypeScript
-	SCSS
-	RxJS / BehaviorSubject
-	API REST publica (utilizada para los productos, llamada API FAKE STORE)
-	HTML5 
-	LocalStorage

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
