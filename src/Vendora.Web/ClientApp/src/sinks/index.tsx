import { Home } from '@components/Home';
import { Quote } from '@components/Quote';

export const defaultSinkState = {
  navigation: {
    layout: [
      { name: 'Home', path: '/', component: Home },
      { name: 'Quote', path: '/quote', component: Quote }
    ]
  }
}