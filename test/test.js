import assert from 'node:assert/strict';
import { buildTimetableMatrix } from '../src/index.js';

console.log('🧪 Testing transit-matrix-timetable-renderer...');

const stops = [
  { stop_id: 'S1', stop_name: 'Metro Terminal' },
  { stop_id: 'S2', stop_name: 'Financial District' },
  { stop_id: 'S3', stop_name: 'Airport Junction' }
];

const trips = [
  {
    trip_id: 'T101',
    departure_time: '08:00',
    stops: [
      { stop_id: 'S1', time: '08:00' },
      { stop_id: 'S2', time: '08:15' },
      { stop_id: 'S3', time: '08:35' }
    ]
  },
  {
    trip_id: 'T102_EXP',
    departure_time: '08:10',
    stops: [
      { stop_id: 'S1', time: '08:10' },
      // S2 bypassed (express)
      { stop_id: 'S3', time: '08:30' }
    ]
  }
];

const html = buildTimetableMatrix({
  routeName: 'Blue Line Rapid',
  routeColor: '#0284c7',
  stops,
  trips
});

assert.ok(html.includes('Blue Line Rapid'), 'Table must contain route name caption');
assert.ok(html.includes('Metro Terminal'), 'Table must contain stop row headers');
assert.ok(html.includes('08:00'), 'Table must contain departure times');
assert.ok(html.includes('—'), 'Table must display bypass dash for skipped express stops');
assert.ok(html.includes('scope="row"'), 'Table must be accessible with scope attributes');

console.log('  ✓ Accessible schedule matrix generated with express skip detection');
console.log('🎉 All tests passed successfully!');
