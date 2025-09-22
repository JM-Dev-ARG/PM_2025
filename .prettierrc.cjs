/** @type {import("prettier").Config} */
module.exports = {
    plugins: ["prettier-plugin-tailwindcss"],
    semi: true,
    tabWidth: 2,
    singleQuote: true,
    trailingComma: "es5",
    printWidth: 100,
    tailwindStylesheet: "./src/styles/global.css",

};
