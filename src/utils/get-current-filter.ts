import { Filter, CombinedMatcher } from "@/lib/adblockplus";
import { dMatcher } from "./default-pac-list";

const getCurrentFilter = (url: string, patterns: string[]): null | Filter => {
  const { hostname, href } = new URL(url);
  const uMatcher = patterns.reduce((pre, cur) => {
    pre.add(Filter.fromText(cur));
    return pre;
  }, new CombinedMatcher());

  const uFilter = uMatcher.matchesAny(href, hostname);
  if (uFilter) return uFilter;
  return dMatcher.matchesAny(href, hostname);
};

export default getCurrentFilter;
