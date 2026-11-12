# Transit Matrix Timetable Renderer

[![npm version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/shivrajsinhzala/transit-matrix-timetable-renderer/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Accessibility: WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1_AA_Compliant-success.svg)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Transit Engine](https://img.shields.io/badge/Ecosystem-Stopwatch_&_Headway-orange.svg)](https://transit.shivrajsinh.in)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/shivrajsinhzala/transit-matrix-timetable-renderer/pulls)

> Zero-dependency accessible HTML5 timetable matrix generator for transit agencies, mobile web applications, and commuter portals.

---

## 🚌 Overview

Traditional GTFS timetable viewers often present static PDFs or unreadable mobile lists where commuters cannot quickly glance across an entire corridor to find express bypasses or trip frequency intervals.

**Transit Matrix Timetable Renderer** generates accessible, 2D stop-by-trip schedule matrices with:
- 📌 **Sticky Stop Column**: Left-hand station names stay visible during horizontal scrolling.
- ♿ **Strict WCAG 2.1 AA Compliance**: Built using semantic `<table>`, `<caption>`, `<th scope="row">`, and `<th scope="col">` markup.
- ⚡ **Express Service Detection**: Automatically renders bypass markers (`—`) for skipped stations.
- 🎨 **Minimal CSS Footprint**: Lightweight styles ready for dark mode, mobile viewports, and custom transit brand colors.

This component powers schedule displays across:
- 🚆 **[Stopwatch Transit](https://transit.shivrajsinh.in)**: Free, real-time bus and train timetable tracker with live vehicle updates.
- ⏱️ **[Headway](https://headway.shivrajsinh.in)**: Commuter headway regularity analytics, bunching detection, and wait-time indexing.

---

## 📦 Installation

```bash
npm install transit-matrix-timetable-renderer
```

---

## 🚀 Quick Usage

```javascript
import { buildTimetableMatrix } from 'transit-matrix-timetable-renderer';
import 'transit-matrix-timetable-renderer/styles.css';

const stops = [
  { stop_id: 'S1', stop_name: 'Ahmedabad Central Bus Station' },
  { stop_id: 'S2', stop_name: 'Sabarmati Riverfront' },
  { stop_id: 'S3', stop_name: 'Gandhinagar Sector 21' }
];

const trips = [
  {
    trip_id: 'T101',
    departure_time: '07:00',
    stops: [
      { stop_id: 'S1', time: '07:00' },
      { stop_id: 'S2', time: '07:20' },
      { stop_id: 'S3', time: '07:50' }
    ]
  },
  {
    trip_id: 'T102_EXPRESS',
    departure_time: '07:15',
    stops: [
      { stop_id: 'S1', time: '07:15' },
      // S2 bypassed
      { stop_id: 'S3', time: '07:42' }
    ]
  }
];

const htmlOutput = buildTimetableMatrix({
  routeName: 'Corridor 101 Express',
  routeColor: '#f97316',
  stops,
  trips
});

document.getElementById('timetable-container').innerHTML = htmlOutput;
```

---

## 🔗 Related Transit Projects

- **[Stopwatch Transit](https://transit.shivrajsinh.in)**: Real-time public transit tracking, live bus telemetry, and zero-latency timetable PWA.
- **[Headway](https://headway.shivrajsinh.in)**: Commuter wait-time optimization, Welch-Paull headway calculation, and regularity benchmarking.
- **[GTFS Static Brotli Packer](https://github.com/shivrajsinhzala/gtfs-static-brotli-packer)**: Shards static GTFS into pre-compressed edge shards.

---

## 📄 License

MIT © [Shivrajsinh Zala](https://github.com/shivrajsinhzala)
