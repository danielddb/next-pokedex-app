import Resource from './resource';

export default interface ResourceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Resource[];
}
