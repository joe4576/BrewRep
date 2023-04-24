// Native implementation of date manipulation using builder pattern
// TODO: replace with JSJoda
export class DateUtils {
  private date: Date;

  constructor() {
    this.date = new Date();
  }

  plusMinutes(minutes: number): DateUtils {
    this.date = new Date(this.date.getTime() + minutes * 60000);
    return this;
  }

  plusHours(hours: number): DateUtils {
    this.date = new Date(this.date.getTime() + hours * 60 * 60000);
    return this;
  }

  plusDays(days: number): DateUtils {
    this.date = new Date(this.date.getTime() + days * 24 * 60 * 60000);
    return this;
  }

  toDate(): Date {
    return this.date;
  }
}
