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
 * Default system timezone (US Eastern Time)
 */
export const DEFAULT_TIMEZONE = "America/New_York";
export const DEFAULT_TIMEZONE_LABEL = "EST";

/**
 * Format any datetime into US Eastern Time (EST)
 * e.g. "Aug 27, 2026, 4:58 AM EST"
 * @param {string|Date} timeStr 
 * @param {string} customTz 
 * @returns {string}
 */
export const formatTimeWithZone = (timeStr, customTz) => {
  if (!timeStr) return "—";
  try {
    const str = String(timeStr).trim();
    const dateStr = str.includes("T") ? str : str.replace(" ", "T");
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return timeStr;

    const tz = customTz && customTz !== "Asia/Dhaka" ? customTz : DEFAULT_TIMEZONE;
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: tz,
      timeZoneName: "short",
    };

    let formatted = date.toLocaleString("en-US", options);
    // Replace EDT with EST per client specification
    formatted = formatted.replace(/\bEDT\b/g, "EST");
    return formatted;
  } catch (e) {
    return timeStr;
  }
};

/**
 * Format time only in US Eastern Time (EST)
 * e.g. "04:58 AM"
 * @param {string|Date} timeStr 
 * @param {string} customTz 
 * @returns {string}
 */
export const formatTimeOnlyWithZone = (timeStr, customTz) => {
  if (!timeStr) return "";
  try {
    const str = String(timeStr).trim();
    const dateStr = str.includes("T") ? str : str.replace(" ", "T");
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      const parts = str.split(" ");
      if (parts.length > 1) {
        const timeParts = parts[1].split(":");
        if (timeParts.length > 1) {
          return `${timeParts[0]}:${timeParts[1]}`;
        }
      }
      return timeStr;
    }
    const tz = customTz && customTz !== "Asia/Dhaka" ? customTz : DEFAULT_TIMEZONE;
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: tz,
    });
  } catch (e) {
    return timeStr;
  }
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
