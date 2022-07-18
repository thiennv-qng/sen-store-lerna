import { env, net } from '@sentre/senhub'
import manifest from './manifest.config'
import sol from './sol.config'
import register from './register.config'

const configs = {
  manifest: manifest[env],
  sol: sol[net],
  register: register[env],
}

/**
 * Module exports
 */
export default configs
