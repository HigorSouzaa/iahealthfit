module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["inline-dotenv"], // Para carregar variáveis de ambiente do .env
  };
};
