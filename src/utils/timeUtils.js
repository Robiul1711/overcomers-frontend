import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

/**
 * Parse any time string into a valid dayjs object
 * @param {string|Date} timeStr 
 * @returns {dayjs.Dayjs|null}
 */
export const parseTime = (timeStr) => {
  if (!timeStr) return null;
  const str = String(timeStr).trim();

  // Try parsing multiple common formats strictly
  const formats = [
    "h:mm A",
    "h:mm a",
    "hh:mm A",
    "hh:mm a",
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
  return fallback.isValid() ? fallback : null;
};

/**
 * Convert any time format to 24-hour "HH:mm" (for HTML5 <input type="time" />)
 * @param {string|Date} timeStr 
 * @returns {string} e.g. "09:00"
 */
export const formatTo24Hour = (timeStr) => {
  if (!timeStr) return "";
  const parsed = parseTime(timeStr);
  return parsed ? parsed.format("HH:mm") : "";
};

/**
 * Convert any time format to 12-hour "h:mm A" (e.g. "9:00 AM" for display and API)
 * @param {string|Date} timeStr 
 * @returns {string} e.g. "9:00 AM"
 */
export const formatTo12Hour = (timeStr) => {
  if (!timeStr) return "";
  const parsed = parseTime(timeStr);
  return parsed ? parsed.format("h:mm A") : String(timeStr);
};

/**
 * Format current time for API e.g. "5:54 pm" or "9:00 am"
 * @returns {string}
 */
export const getCurrentFormattedTime = () => {
  return dayjs().format("h:mm a");
};

/**
 * Convert YYYY-MM-DD or date object to DD/MM/YYYY for API
 * @param {string|Date} dateStr 
 * @returns {string}
 */
export const formatDateToDDMMYYYY = (dateStr) => {
  if (!dateStr) return "";
  const parsed = dayjs(dateStr);
  return parsed.isValid() ? parsed.format("DD/MM/YYYY") : String(dateStr);
};

/**
 * Convert Date / object to YYYY-MM-DD for <input type="date" />
 * @param {string|Date} date 
 * @returns {string}
 */
export const formatDateToYYYYMMDD = (date) => {
  if (!date) return "";
  const parsed = dayjs(date);
  return parsed.isValid() ? parsed.format("YYYY-MM-DD") : "";
};

export default dayjs;
