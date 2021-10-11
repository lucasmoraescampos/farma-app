import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /*
   * items: array to be filtered.
   * fields: fields to be filtered. e.g: 'field1' for a single field or 'field1,field2,field3,...' for a multiple fields.
   * value: value to be sought.
  */
  transform(items: any[], fields: string, value: string): any[] {

    if (!items) {
      return [];
    }

    if (value === undefined) {
      return items;
    }

    return items.filter(item => {

      item = flatten(item);

      const keys = fields.split(',');

      return keys.some(key => {
        return normalize(item[key]).includes(normalize(value));
      });

    });

  }

}

function normalize(value: string) {

  const map = {
    'a': 'á|à|ã|â|À|Á|Ã|Â',
    'e': 'é|è|ê|É|È|Ê',
    'i': 'í|ì|î|Í|Ì|Î',
    'o': 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
    'u': 'ú|ù|û|ü|Ú|Ù|Û|Ü',
    'c': 'ç|Ç',
    'n': 'ñ|Ñ'
  };

  value = String(value).toLowerCase();

  for (let pattern in map) {
    value = value.replace(new RegExp(map[pattern], 'g'), pattern);
  };

  return value;

}

function merge(objects: any) {

  let out = {};

  for (let i = 0; i < objects.length; i++) {

    for (let p in objects[i]) {

      out[p] = objects[i][p];

    }

  }

  return out;

}

/*
 * The method flattens a multi-dimensional array into a single level array that uses "dot" notation to indicate depth
 */
function flatten(obj: any, name?: any, stem?: any) {

  let out = {};

  let newStem = (typeof stem !== 'undefined' && stem !== '') ? stem + '.' + name : name;

  if (typeof obj !== 'object') {

    out[newStem] = obj;

    return out;

  }

  for (let p in obj) {

    let prop = flatten(obj[p], p, newStem);

    out = merge([out, prop]);

  }

  return out;

};