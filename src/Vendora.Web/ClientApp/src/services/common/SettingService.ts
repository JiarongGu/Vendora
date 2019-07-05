import { CustomCache } from '@services/cache';
import { HttpClient } from '@services/httpclient';

export class SettingService {
  private cache: CustomCache = new CustomCache();

  constructor(private language: string) { }

  public async get(group: string, name?: string) {
    const contentGroup = await this.cache.get(group,
      () => new HttpClient().get(`/contents/${this.language}/${group}.json`).then((response) => response.data)
    );
    if (name)
      return contentGroup[name];
    return contentGroup;
  }
}
