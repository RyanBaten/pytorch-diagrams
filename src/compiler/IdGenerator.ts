interface IdGeneratorStash {
  [keys: string]: IdGeneratorStashValues;
}

interface IdGeneratorStashValues {
  seed: number;
  values: Set<string>;
}

export class IdGenerator {
  protected ids: IdGeneratorStash;
  protected defaultKey: string;

  constructor(defaultKey = "") {
    this.defaultKey = defaultKey ? defaultKey : "";
    this.ids = {};
    this.ids[this.defaultKey] = this._newStash();
  }

  generateId(newId?: string, key?: string): string {
    if (!key) key = this.defaultKey;
    if (!(key in this.ids)) this.ids[key] = this._newStash();
    if (!newId) {
      do {
        newId = this._intToId(this.ids[key].seed);
        this.ids[key].seed += 1;
      } while (this.ids[key].values.has(newId));
    }
    if (newId && this.ids[key].values.has(newId)) throw new Error(`Encountered duplicate id: ${newId}`);
    this.ids[key].values.add(newId);
    if (key !== this.defaultKey) return `${key}_${newId}`;
    return newId;
  }

  _newStash(): IdGeneratorStashValues {
    return {
      seed: 0,
      values: new Set(),
    };
  }

  _intToId(value: number): string {
    value += 1;
    var result = "";
    let remainder;
    while (value > 0) {
      remainder = (value - 1) % 26;
      value = Math.trunc((value - 1) / 26);
      result = String.fromCharCode(97 + remainder) + result;
    }
    return result;
  }
}
