import { matchPath } from 'react-router';
import { effect, sink, state, trigger } from 'redux-sink';

@sink('commonSink')
export class CommonSink {
  @state public language: string = '';
  @state public pathname: string = '';

  @state public supportedLanguages: Array<string> = ['zh-cn', 'en-gb'];
  @state public languageRegex = `:language(${this.supportedLanguages.join('|').toLowerCase()})`;

  @effect
  public setLanguage(language: string) {
    if (this.language !== language) {
      this.language = language;
    }
  }

  @effect
  public setPathname(pathname: string) {
    if (this.pathname !== pathname) {
      this.pathname = pathname;
    }
  }

  @trigger('LOCATION_CHANGE', { fireOnInit: true, priority: 100 })
  public triggerByLocation(location: Location) {
    const matches = matchPath<{ language: string }>(location.pathname, { path: '/:language' });
    let pathname = location.pathname;

    if (matches) {
      this.setLanguage(matches.params.language);
      pathname = location.pathname.replace(this.language, '');
    } else {
      this.setLanguage('en-gb');
    }

    if (pathname[0] === '/') {
      pathname = pathname.substring(1);
    }
    this.setPathname(pathname);
  }
}
