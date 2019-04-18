import { Home } from '@components/home';
import { Quote } from '@components/quote';
import { User } from '@components/user';

export const defaultSinkState = {
  navigation: {
    layout: [
      { name: 'Home', path: '/', component: Home },
      { name: 'Quote', path: '/quote', component: Quote },
      { name: 'User', path: '/user', component: User }
    ]
  }
}