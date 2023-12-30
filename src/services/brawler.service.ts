import axios from 'axios';
import config from '~/config/config';

export class brawlerService {
  static selectRandomBrawler = async (rarityOption, roleOption, genderOption) =>
    await axios
      .get(`${config.apiURL}/brawler/random`, {
        params: {
          rarity: rarityOption,
          role: roleOption,
          gender: genderOption,
        },
      })
      .then((result) => {
        return result.data;
      });
}
