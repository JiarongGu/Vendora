import { Location } from 'history';
import { matchPath } from 'react-router';
import { trigger } from 'redux-sink';

export const locationTrigger = (pathRegex: string) =>
  (target: any, name: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;

    descriptor.value = function (location: Location) {
      const matches = matchPath(
        location.pathname, { path: pathRegex }
      );
      if (matches) {
        method.call(this, matches);
      }
    };

    return trigger('LOCATION_CHANGE')(target, name, descriptor);
  };
