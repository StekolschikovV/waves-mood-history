const path = require(`path`);

module.exports = {
    webpack: {
        alias: {
            "@components": path.resolve(__dirname, "src/components"),
            "@UI": path.resolve(__dirname, "src/UI"),
            "@": path.resolve(__dirname, "src"),
        },
    },
};