import { DateTime } from 'luxon';

export const formatDateToString = (date: DateTime) => {
	return date.toISO();
};

export const formatDateStringToDateTime = (date: string) => {
	return DateTime.fromISO(date);
};