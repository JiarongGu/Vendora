export type ValueProvider<TModel> = (key: string) => Promise<TModel>;

export class CustomCache<TModel = any> {
  private cacheMap: Map<string, TModel> = new Map();
  private processMap: Map<string, Promise<TModel>> = new Map();

  public async get(key: string, valueProvider?: ValueProvider<TModel>) {
    let value = this.cacheMap.get(key);

    if (!value && valueProvider) {
      let process = this.processMap.get(key);
      const firstProcess = !process;

      if (!process) {
        process = valueProvider(key).finally(() => {
          this.processMap.delete(key);
        });
        this.processMap.set(key, process);
      }

      value = await process;

      if (firstProcess)
        this.cacheMap.set(key, value);
    }

    return value;
  }
}
