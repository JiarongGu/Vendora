import { matchPath } from 'react-router';
import { effect, sink, state, trigger } from 'redux-sink';
import { SettingService } from './SettingService';

@sink('commonSink')
export class CommonSink {
  @state public settings: SettingService;
  @state public language: string;
  @state public pathname: string;

  private settingServiceMap: Map<string, SettingService> = new Map();

  @effect
  public setServiceByLanguage(language: string) {
    let service = this.settingServiceMap.get(language);
    if (!service) {
      service = new SettingService(language);
      this.settingServiceMap.set(language, service);
    }
    this.settings = service;
  }

  @effect
  public setLanguage(language: string) {
    if (this.language !== language) {
      this.language = language;
      this.setServiceByLanguage(language);
    }
  }

  @effect
  public setPathname(pathname: string) {
    if (this.pathname !== pathname) {
      this.pathname = pathname;
    }
  }

  @trigger('LOCATION_CHANGE', { fireOnInit: true })
  public triggerByLocation(location: Location) {
    const matches = matchPath<{ language: string }>(location.pathname, { path: '/:language' });
    let pathname = location.pathname;
    if (matches) {
      this.setLanguage(matches.params.language);
      pathname = location.pathname.replace(this.language, '');
    } else {
      this.setLanguage('zh-cn');
    }

    if (pathname[0] === '/') {
      pathname = pathname.substring(1);
    }
    this.setPathname(pathname);
  }
}