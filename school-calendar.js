"use strict";

function parseSchoolCalendar(input, formatHongKongDate) {
  if (input.length > 500000 || !/^\s*BEGIN:VCALENDAR\s*$/mi.test(input)) return null;
  const lines = input.replace(/\r\n?/g,"\n").replace(/\n[ \t]/g,"").split("\n");
  const results = new Map();
  let item;
  let nested = 0;
  for (const line of lines) {
    if (/^BEGIN:(VEVENT|VTODO)$/i.test(line)) {
      item = {task:/VTODO$/i.test(line)};
      nested = 0;
    } else if (/^END:(VEVENT|VTODO)$/i.test(line) && item) {
      const date = item.due || item.date;
      if (date && item.name && !item.cancelled) {
        const key = JSON.stringify([item.uid || item.name,date]);
        const search = [item.categories,item.name].filter(Boolean).join(" ");
        let type = item.task ? "work" : "event";
        if (/results?|grad(?:e release|es\b)|report card|放榜|出成績|派成績|成績公[佈布]|公布成績|成績表/i.test(search)) type = "grades";
        else if (/assessment|exam|test\b|quiz|小測|測驗|考試|評估/i.test(search)) type = "exam";
        else if (/homework|assignment|deadline|worksheet|due\b|功課|作業|截止/i.test(search)) type = "work";
        results.set(key,{id:"ics:"+key,date,name:item.name.slice(0,85),type,source:"School calendar feed"});
      }
      item = undefined;
    } else if (item) {
      if (/^BEGIN:/i.test(line)) {nested++; continue;}
      if (/^END:/i.test(line)) {nested = Math.max(0,nested-1); continue;}
      if (nested) continue;
      const property = /^(DTSTART|DUE|SUMMARY|CATEGORIES|STATUS|UID)(?:;[^:]*)?:(.*)$/i.exec(line);
      if (!property) continue;
      const [,name,value] = property;
      switch (name.toUpperCase()) {
        case "DTSTART": item.date = schoolCalendarDate(value.trim(),formatHongKongDate); break;
        case "DUE": item.due = schoolCalendarDate(value.trim(),formatHongKongDate); break;
        case "SUMMARY": item.name = value.replace(/\\([nN,;\\])/g,(_,char)=>/[nN]/.test(char) ? " " : char).trim(); break;
        case "CATEGORIES": item.categories = value; break;
        case "UID": item.uid = value.slice(0,180); break;
        case "STATUS": item.cancelled = /^CANCELLED$/i.test(value.trim()); break;
      }
    }
  }
  return results.size && results.size <= 1000 ? [...results.values()] : null;
}

function schoolCalendarDate(value, formatHongKongDate) {
  const match = /^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?$/i.exec(value);
  if (!match) return null;
  const [,year,month,date,hour="12",minute="00",second="00",utc] = match;
  const calendarDay = `${year}-${month}-${date}`;
  const stamp = new Date(`${calendarDay}T${hour}:${minute}:${second}Z`);
  if (!Number.isFinite(+stamp) || stamp.toISOString().slice(0,10) !== calendarDay) return null;
  return utc ? formatHongKongDate(stamp) : calendarDay;
}
