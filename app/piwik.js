import PiwikReactRouter from 'piwik-react-router';
import config from '../config.json';

export default PiwikReactRouter({
  url: config.piwik.url,
  siteId: config.piwik.id
});
