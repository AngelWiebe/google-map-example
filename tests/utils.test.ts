import { capitalizeFirstOfEachWord, sortByDistance } from '../src/utils';
import { Coordinates } from '../src/interfaces/coordinates';
import { Therapist } from '../src/interfaces/therapist';

describe('capitalizeFirstOfEachWord', () => {
  it('should capitalize the first letter of a string', () => {
    const input = 'hello world';
    const output = capitalizeFirstOfEachWord(input);
    expect(output).toBe('Hello world');
  });

  it('should handle empty strings', () => {
    const input = '';
    const output = capitalizeFirstOfEachWord(input);
    expect(output).toBe('');
  });

  it('should not alter already capitalized words', () => {
    const input = 'Hello World';
    const output = capitalizeFirstOfEachWord(input);
    expect(output).toBe('Hello World');
  });
});

describe('sortByDistance', () => {
  const center: Coordinates = { lat: 50, lng: 50 };
  const data: Therapist[] = [
    { id: '1', lat: '51', lng: '51', name: 'Therapist A', address: '', phone: '', email: '', url: '', category_name: '' },
    { id: '2', lat: '49', lng: '49', name: 'Therapist B', address: '', phone: '', email: '', url: '', category_name: '' },
    { id: '3', lat: '52', lng: '52', name: 'Therapist C', address: '', phone: '', email: '', url: '', category_name: '' },
  ];

  it('should sort therapists by distance from the center', () => {
    const sortedData = sortByDistance(center, data);
    expect(sortedData[0].name).toBe('Therapist B');
    expect(sortedData[1].name).toBe('Therapist A');
    expect(sortedData[2].name).toBe('Therapist C');
  });

  it('should handle empty data arrays', () => {
    const sortedData = sortByDistance(center, []);
    expect(sortedData).toEqual([]);
  });
});
