/**
 * Generates an accessible HTML5 schedule matrix table from GTFS corridor stops and trips.
 */
export function buildTimetableMatrix({ routeName, routeColor = '#2563eb', stops = [], trips = [] }) {
  if (!stops.length || !trips.length) {
    throw new Error('Both stops and trips arrays are required to construct a timetable matrix.');
  }

  // Pre-index trip stops for O(1) lookup
  const tripStopIndex = new Map();
  trips.forEach((trip) => {
    const stopTimes = new Map();
    (trip.stops || []).forEach((st) => {
      stopTimes.set(st.stop_id, st.time || st.departure_time || st.arrival_time);
    });
    tripStopIndex.set(trip.trip_id, stopTimes);
  });

  // Build Table HTML
  let html = `<div class="transit-matrix-wrapper" role="region" aria-label="${routeName} Timetable" tabindex="0">\n`;
  html += `  <table class="transit-timetable-table">\n`;
  html += `    <caption style="border-left: 4px solid ${routeColor};">${routeName} - Corridor Schedule Matrix</caption>\n`;

  // Header Row: Trip IDs and Departure Times
  html += `    <thead>\n      <tr>\n        <th scope="col" class="sticky-stop-header">Stop / Station</th>\n`;
  trips.forEach((trip) => {
    html += `        <th scope="col" class="trip-header" data-trip-id="${trip.trip_id}">`;
    html += `<span class="trip-time">${trip.departure_time || trip.stops?.[0]?.time || ''}</span>`;
    if (trip.trip_short_name || trip.trip_id) {
      html += `<span class="trip-name">${trip.trip_short_name || trip.trip_id}</span>`;
    }
    html += `</th>\n`;
  });
  html += `      </tr>\n    </thead>\n`;

  // Body Rows: One row per stop
  html += `    <tbody>\n`;
  stops.forEach((stop, sIdx) => {
    const isTerminus = sIdx === 0 || sIdx === stops.length - 1;
    html += `      <tr class="${isTerminus ? 'terminus-row' : ''}">\n`;
    html += `        <th scope="row" class="sticky-stop-cell">${stop.stop_name}</th>\n`;

    trips.forEach((trip) => {
      const time = tripStopIndex.get(trip.trip_id)?.get(stop.stop_id);
      if (time) {
        html += `        <td class="stop-time-cell" data-stop="${stop.stop_id}">${time}</td>\n`;
      } else {
        html += `        <td class="stop-skip-cell" aria-label="Bypassed">—</td>\n`;
      }
    });

    html += `      </tr>\n`;
  });
  html += `    </tbody>\n  </table>\n</div>`;

  return html;
}
