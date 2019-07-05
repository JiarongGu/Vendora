export type ValueProvider<TModel> = (key: string) => Promise<TModel>;

export class Cache<TModel> {
  private cacheMap: Map<string, TModel> = new Map();
  private processMap: Map<string, Promise<TModel>> = new Map();

  public async get(key: string, valueProvider?: ValueProvider<TModel>) {
    let value = this.cacheMap.get(key);

    if (!value && valueProvider) {
      let process = this.processMap.get(key);

      if (!process) {
        process = valueProvider(key).finally(() => {
          this.processMap.delete(key);
        });
        this.processMap.set(key, process);
      }

      value = await process;
    }

    return value;
  }
}
