import Zonemaster from 'zonemaster-js';
import config from '../config.json';

const backend = new Zonemaster(config.backendUrl);
export default backend;
