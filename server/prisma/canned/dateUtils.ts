// Native implementation of date manipulation using builder pattern

const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

type DayOfWeek = (typeof days)[number];

export class DateUtils {
  private date: Date;

  constructor(dayOfWeek?: DayOfWeek) {
    if (dayOfWeek) {
      this.date = this.getDayOfTheWeek(dayOfWeek);
    } else {
      this.date = new Date();
    }
  }

  private getDayOfTheWeek(dayOfTheWeek: DayOfWeek): Date {
    const targetDayIndex = days.indexOf(dayOfTheWeek);

    if (targetDayIndex === -1) {
      throw new Error("Invalid day of the week");
    }

    const today = new Date();

    const todayIndex = today.getDay() % 7;

    const newDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDay() - (todayIndex - targetDayIndex)
    );

    return newDate;
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
