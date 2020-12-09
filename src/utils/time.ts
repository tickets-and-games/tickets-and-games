/* eslint-disable import/prefer-default-export */

const MINUTE_TO_SECONDS = 60;
const HOUR_TO_SECONDS = MINUTE_TO_SECONDS * 60;
const DAY_TO_SECONDS = HOUR_TO_SECONDS * 24;
const WEEK_TO_SECONDS = DAY_TO_SECONDS * 7;

export function humanizeSeconds(datetime: Date, past: boolean) {
  const currentTime = new Date();
  const timeDelta = Math.abs(Math.round((currentTime.getTime() - datetime.getTime()) / 1000));
  const prefix = past ? '' : 'In ';
  const suffix = past ? ' ago' : '';

  if (timeDelta < MINUTE_TO_SECONDS) {
    return past ? 'Just now' : 'Soon';
  }
  if (timeDelta < HOUR_TO_SECONDS) {
    const minutes = Math.floor(timeDelta / MINUTE_TO_SECONDS);
    return `${prefix}${minutes} minutes${suffix}`;
  }
  if (timeDelta < DAY_TO_SECONDS) {
    const hours = Math.floor(timeDelta / HOUR_TO_SECONDS);
    return `${prefix}${hours} hours${suffix}`;
  }
  if (timeDelta < WEEK_TO_SECONDS) {
    const days = Math.floor(timeDelta / DAY_TO_SECONDS);
    return `${prefix}${days} days${suffix}`;
  }

  return datetime.toDateString();
}
