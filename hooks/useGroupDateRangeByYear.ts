import { DateTime } from "luxon";

export interface MonthElement {
  year: number;
  month: string | null;
  daysAmount: number;
}

export interface DayElement {
  year: number;
  month: string | null;
  day: DayElementDay;
}

export interface DayElementDay {
  dayInWeek: number;
  dayName: string | null;
}

const useFormatDateRange = (start: string | null | undefined, end: string | null | undefined) => {
  let daysFromRange: DayElement[] = [];
  let monthsFromRange: MonthElement[] = [];

  if (!start || !end) {
    return { monthsFromRange, daysFromRange };
  }
  const startDate = DateTime.fromISO(start);
  const endDate = DateTime.fromISO(end);

  monthsFromRange = selectMonthsFromRange(startDate, endDate);
  daysFromRange = selectDaysFromRange(startDate, endDate);

  return { monthsFromRange, daysFromRange };
};

const selectDaysFromRange = (startDate: DateTime, endDate: DateTime): DayElement[] => {
  const data: DayElement[] = [];

  let currentDate = startDate;

  while (currentDate <= endDate) {
    const year = currentDate.year;
    const month = currentDate.monthLong;
    const dayInWeek = currentDate.day;
    const dayName = currentDate.weekdayShort;

    data.push({ year: year, month: month, day: { dayInWeek, dayName } });

    currentDate = currentDate.plus({ days: 1 });
  }

  return data;
};

const selectMonthsFromRange = (startDate: DateTime, endDate: DateTime): MonthElement[] => {
  const data: MonthElement[] = [];

  let currentDate = startDate;

  while (currentDate <= endDate) {
    const year = currentDate.year;
    const month = currentDate.monthLong;

    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");
    const days = endOfMonth.diff(startOfMonth, "days").days + 1;

    data.push({ year: year, month: month, daysAmount: days });

    currentDate = currentDate.plus({ months: 1 });
  }

  return data;
};
export default useFormatDateRange;
