import { client } from '~/loaders/client';

const main = async () => {
  await client();
};

main().then(() => {
  console.log('🌸HELLO BLOSSOM BOT');
});
