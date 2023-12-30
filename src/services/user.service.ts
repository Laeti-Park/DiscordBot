import axios from 'axios';
import config from '~/config/config';

export class userService {
  static selectUser = async (id: string) => {
    return await axios.get(`${config.apiURL}/brawlian/${id}`).then((result) => {
      return result.data;
    });
  };

  static async selectUserBrawler(id: string, brawlerName: string) {
    return await axios
      .get(`${config.apiURL}/brawlian/${id}/brawler`, {
        params: {
          brawlerName,
        },
      })
      .then((result) => {
        return result.data;
      });
  }
}
