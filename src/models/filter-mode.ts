export type FilterMode = 'MatchingUrl' | 'All';

export const FilterModes: { [key in FilterMode]: FilterMode } = {
  MatchingUrl: "MatchingUrl",
  All: "All",
};
