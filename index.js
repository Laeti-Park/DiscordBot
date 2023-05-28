import loaders from "./loaders/index.js";

const main = async () => {
    await loaders();
}

main().then(() => {
    console.log('🌸HELLO BLOSSOM BOT');
});