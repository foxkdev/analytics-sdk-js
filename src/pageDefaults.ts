'use strict';

import { PageDefaults } from './types';

/**
 * Return a default `options.context.page` object.
 *
 * https://segment.com/docs/spec/page/#properties
 */

export function pageDefaults(): PageDefaults {
  return {
    path: canonicalPath(),
    referrer: document.referrer,
    search: location.search,
    title: document.title,
    url: canonicalUrl(location.search),
    navigator: getNavigator()
  };
}

function getNavigator(): any {
    const userAgent = navigator.userAgent;
    let browserName = '';
    if(userAgent.match(/chrome|chromium|crios/i)){
        browserName = "chrome";
      }else if(userAgent.match(/firefox|fxios/i)){
        browserName = "firefox";
      }  else if(userAgent.match(/safari/i)){
        browserName = "safari";
      }else if(userAgent.match(/opr\//i)){
        browserName = "opera";
      } else if(userAgent.match(/edg/i)){
        browserName = "edge";
      }else{
        browserName="no-browser-detected";
      }
  return {
    name: browserName,
    version: navigator.appVersion,
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
};
}
/**
 * Return the canonical path for the page.
 */

function canonicalPath(): string {
    return window.location.pathname;
}

/**
 * Return the canonical URL for the page concat the given `search`
 * and strip the hash.
 */

function canonicalUrl(search: string): string {
  var url = window.location.href;
  var i = url.indexOf('#');
  return i === -1 ? url : url.slice(0, i);
}

/*
 * Exports.
 */
