import { setClient } from '~/request/request'

export default ({ app, store }) => {
    setClient(app.$axios)
}
