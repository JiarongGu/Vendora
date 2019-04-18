import { Home } from '@components/Home';
import { Quote } from '@components/Quote';
import { User } from '@components/User';

export const defaultSinkState = {
  navigation: {
    layout: [
      { name: 'Home', path: '/', component: Home },
      { name: 'Quote', path: '/quote', component: Quote },
      { name: 'User', path: '/user', component: User }
    ]
  }
}