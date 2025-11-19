# 🧬 Microcosmos Library

| Project | Version | License | Build | Storybook |
|---------|---------|---------|-------|-----------|
| Microcosmos | 0.0.0 | MIT | ![Build](https://img.shields.io/badge/build-passing-brightgreen) | [View Storybook](http://localhost:6006) |


Microcosmos is an **Angular component library** designed to be reusable, modular, and easily integrated into any Angular application.  
It provides a collection of UI components, utilities, and shared styles—similar in spirit to modern design systems or UI component libraries, but without relying on any external frameworks.

The library is built using **ng-packagr**, documented with **Storybook**, and includes an SVG-based icon system powered by internal generation scripts.

---

## 🚀 Installation

```bash
npm install
```

---

## 🗂️ Library Structure

```
projects/microcosmos-lib/
│
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   └── icon/          # SVG icon system + scripts
│   │   └── styles/            # Shared SCSS styles
│   └── public-api.ts          # Public API of the library
│
├── .storybook/                # Storybook configuration
└── package.json
```

---

## ▶️ Available Scripts

### 📚 Build the Library

| Script | Description |
|--------|-------------|
| `npm run lib:build` | Builds the library using ng-packagr |
| `npm run lib:build:watch` | Builds the library in watch mode |

---

### 🧪 Tests

| Script | Description |
|--------|-------------|
| `npm run lib:test:watch` | Runs tests in watch mode |
| `npm run lib:test:coverage` | Full test run with coverage (Chrome Headless) |

---

### 🎨 Icon System

The library includes an automated icon generator that processes SVG files.

| Script | Description |
|--------|-------------|
| `npm run lib:scrap-icons` | Scrapes or transforms source SVG icons |
| `npm run lib:generate-icons` | Generates TypeScript icon definitions |

⚠️ The `prebuild` script automatically calls `generate-icons` before building the library.

---

## 📖 Storybook — Interactive Documentation

Storybook is used to visually explore, test, and document the library’s components.

### ▶️ Start Storybook

```bash
npm run storybook:start
```

Default URL:  
http://localhost:6006

### 🏗️ Build static Storybook documentation

```bash
npm run storybook:build
```

Output directory:

```
dist/storybook/microcosmos-lib/
```

---

## 🛠️ Technologies

- Angular 20
- ng-packagr
- TypeScript 5.9
- Storybook 10
- SCSS
- RxJS

---

## 📝 Code Style

Prettier configuration ensures consistent formatting:

- printWidth: 100
- singleQuote: true
- Angular HTML parser enabled

---

## 📦 Distribution

After building the library, the package is available in:

```
dist/microcosmos-lib/
```

To publish (if `private` is set to `false`):

```bash
npm publish dist/microcosmos-lib
```
