class Checker<T> {
  private _value: T;

  constructor(value: T) {
    this._value = value;
  }

  public isKey(message: string) {
    this._check(
      () => {
        return (
          typeof this._value !== "number" ||
          isNaN(this._value) ||
          this._value < 1
        );
      },
      message,
      `expected key (numeric value) for property "${message}" but received '${
        this._value
      }'`
    );
  }

  public isSet(message: string): any {
    this._check(
      () => {
        return (
          this._value === undefined ||
          this._value === null ||
          (typeof this._value === "string" && this._value === "")
        );
      },
      message,
      `expected value "${message}" to have been set`
    );
  }

  private _check(
    fn: () => boolean,
    userMessage: string,
    defaultMessage: string
  ) {
    if (fn.apply(this)) {
      throw new Error(this._finalMessageFor(userMessage, defaultMessage));
    }
  }

  private _finalMessageFor(
    userMessage: string,
    defaultMessage: string
  ): string {
    // if the userMessage is just one word, assume it is a field name
    //  otherwise assume the user required their own crafted message
    return userMessage.split(" ").length > 1 ? defaultMessage : userMessage;
  }
}

class Fluency {
  public that<T>(value: T): Checker<T> {
    return new Checker(value);
  }
}

export const check = new Fluency();
