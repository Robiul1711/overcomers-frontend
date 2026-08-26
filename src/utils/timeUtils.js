import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export const DEFAULT_TIMEZONE = "America/New_York";

/**
 * Parse any time or datetime string into a valid dayjs object with timezone support
 * @param {string|Date} timeStr 
 * @param {string} tz 
 * @returns {dayjs.Dayjs|null}
 */
export const parseTime = (timeStr, tz = DEFAULT_TIMEZONE) => {
  if (!timeStr) return null;

  if (timeStr instanceof Date) {
    return dayjs(timeStr).tz(tz);
  }

  const str = String(timeStr).trim();

  // If it's an ISO datetime string or UTC string
  if (str.includes("T") || (str.includes("-") && str.length >= 10)) {
    if (str.endsWith("Z") || /[+-]\d{2}:\d{2}$/.test(str)) {
      const utcObj = dayjs.utc(str);
      return utcObj.isValid() ? utcObj.tz(tz) : null;
    }
    const tzObj = dayjs.tz(str, tz);
    if (tzObj.isValid()) return tzObj;
  }

  // Try parsing multiple common time formats strictly
  const formats = [
    "h:mm A",
    "h:mm a",
    "hh:mm A",
    "hh:mm a",
    "h:mm:ss A",
    "h:mm:ss a",
    "hh:mm:ss A",
    "hh:mm:ss a",
    "H:mm",
    "HH:mm",
    "H:mm:ss",
    "HH:mm:ss",
    "YYYY-MM-DDTHH:mm:ss",
    "YYYY-MM-DDTHH:mm:ssZ",
    "YYYY-MM-DD HH:mm:ss",
  ];

  for (const fmt of formats) {
    const d = dayjs(str, fmt);
    if (d.isValid()) return d;
  }

  // Fallback to standard dayjs parser
  const fallback = dayjs(str);
  if (fallback.isValid()) {
    return fallback.tz ? fallback.tz(tz) : fallback;
  }

  return null;
};

/**
 * Convert any time format to 24-hour "HH:mm" (for HTML5 <input type="time" />)
 * @param {string|Date} timeStr 
 * @param {string} tz
 * @returns {string} e.g. "09:00"
 */
export const formatTo24Hour = (timeStr, tz = DEFAULT_TIMEZONE) => {
  if (!timeStr) return "";
  const parsed = parseTime(timeStr, tz);
  return parsed ? parsed.format("HH:mm") : "";
};

/**
 * Convert any time format to 12-hour "h:mm A" (e.g. "9:00 AM" or "10:42 PM" for display and API)
 * @param {string|Date} timeStr 
 * @param {string} tz
 * @returns {string} e.g. "9:00 AM"
 */
export const formatTo12Hour = (timeStr, tz = DEFAULT_TIMEZONE) => {
  if (!timeStr) return "";
  const parsed = parseTime(timeStr, tz);
  return parsed ? parsed.format("h:mm A") : String(timeStr);
};

/**
 * Format current time in EST/EDT for API/UI e.g. "10:42 PM"
 * @param {string} format e.g. "h:mm A"
 * @param {string} tz e.g. "America/New_York"
 * @returns {string}
 */
export const getCurrentFormattedTime = (format = "h:mm A", tz = DEFAULT_TIMEZONE) => {
  return dayjs().tz(tz).format(format);
};

/**
 * Get current date in EST/EDT
 * @param {string} format e.g. "YYYY-MM-DD"
 * @param {string} tz
 * @returns {string}
 */
export const getCurrentFormattedDate = (format = "YYYY-MM-DD", tz = DEFAULT_TIMEZONE) => {
  return dayjs().tz(tz).format(format);
};

/**
 * Convert YYYY-MM-DD or date object to DD/MM/YYYY for API in EST
 * @param {string|Date} dateStr 
 * @param {string} tz
 * @returns {string}
 */
export const formatDateToDDMMYYYY = (dateStr, tz = DEFAULT_TIMEZONE) => {
  if (!dateStr) return "";
  if (dateStr instanceof Date) {
    return dayjs(dateStr).tz(tz).format("DD/MM/YYYY");
  }
  const parsed = dayjs(dateStr);
  return parsed.isValid() ? parsed.format("DD/MM/YYYY") : String(dateStr);
};

/**
 * Convert Date / object to YYYY-MM-DD for <input type="date" /> in EST
 * @param {string|Date} date 
 * @param {string} tz
 * @returns {string}
 */
export const formatDateToYYYYMMDD = (date, tz = DEFAULT_TIMEZONE) => {
  if (!date) return "";
  if (date instanceof Date) {
    return dayjs(date).tz(tz).format("YYYY-MM-DD");
  }
  const parsed = dayjs(date);
  return parsed.isValid() ? parsed.format("YYYY-MM-DD") : "";
};

export default dayjs;
